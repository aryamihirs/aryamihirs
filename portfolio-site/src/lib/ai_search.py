import os
import json
import numpy as np
from typing import List, Dict, Any
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain.schema import Document
import glob
from pathlib import Path
import frontmatter

class PortfolioSearchEngine:
    def __init__(self, content_dir: str = "content"):
        self.content_dir = content_dir
        # Get API key from environment
        api_key = os.getenv('GOOGLE_API_KEY')
        if not api_key:
            raise ValueError("GOOGLE_API_KEY environment variable is required")
        
        # Using Gemini for embeddings and chat
        self.embeddings = GoogleGenerativeAIEmbeddings(
            model="models/embedding-001",
            google_api_key=api_key
        )
        self.llm = ChatGoogleGenerativeAI(
            model="gemini-1.5-flash",
            google_api_key=api_key
        )
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=500,
            chunk_overlap=50
        )
        self.vectorstore = None
        self.documents = []
        
    def load_content(self) -> List[Document]:
        """Load all content from JSON and Markdown files"""
        documents = []
        
        # Load experiences
        for filepath in glob.glob(f"{self.content_dir}/experiences/*.json"):
            with open(filepath, 'r') as f:
                data = json.load(f)
                content = f"Experience: {data['title']} at {data['company']}\n"
                content += f"Role: {data['role']}\n"
                content += f"Summary: {data['summary']}\n"
                content += f"Problem: {data['problem']}\n"
                content += f"Solution: {data['solution']}\n"
                content += f"Impact: {' '.join(data['impact']['metrics'])}\n"
                content += f"Learnings: {' '.join(data['learnings'])}"
                
                doc = Document(
                    page_content=content,
                    metadata={
                        "type": "experience",
                        "id": data['id'],
                        "title": data['title'],
                        "citation": f"Experience: {data['title']}"
                    }
                )
                documents.append(doc)
        
        # Load projects
        for filepath in glob.glob(f"{self.content_dir}/projects/*.json"):
            with open(filepath, 'r') as f:
                data = json.load(f)
                content = f"Project: {data['title']}\n"
                content += f"Description: {data['description']}\n"
                content += f"Tech Stack: {', '.join(data['techStack'])}\n"
                content += f"Highlights: {' '.join(data['highlights'])}"
                
                doc = Document(
                    page_content=content,
                    metadata={
                        "type": "project",
                        "id": data['id'],
                        "title": data['title'],
                        "citation": f"Project: {data['title']}"
                    }
                )
                documents.append(doc)
        
        # Load blogs
        for filepath in glob.glob(f"{self.content_dir}/blogs/*.md"):
            with open(filepath, 'r', encoding='utf-8') as f:
                post = frontmatter.load(f)
                content = f"Blog: {post['title']}\n"
                content += f"Summary: {post['summary']}\n"
                content += f"Content: {post.content[:1000]}..."  # First 1000 chars
                
                doc = Document(
                    page_content=content,
                    metadata={
                        "type": "blog",
                        "id": Path(filepath).stem,
                        "title": post['title'],
                        "citation": f"Blog: {post['title']}"
                    }
                )
                documents.append(doc)
        
        # Load education
        for filepath in glob.glob(f"{self.content_dir}/education/*.json"):
            with open(filepath, 'r') as f:
                data = json.load(f)
                content = f"Education: {data['degree']} from {data['institution']}\n"
                content += f"Field: {data['field']}\n"
                content += f"Duration: {data['duration']}\n"
                content += f"Highlights: {' '.join(data['highlights'])}"
                
                doc = Document(
                    page_content=content,
                    metadata={
                        "type": "education",
                        "id": data['id'],
                        "title": f"{data['degree']} - {data['institution']}",
                        "citation": f"Education: {data['institution']}"
                    }
                )
                documents.append(doc)
        
        self.documents = documents
        return documents
    
    def build_index(self):
        """Build FAISS index from documents"""
        if not self.documents:
            self.load_content()
        
        # Split documents into chunks
        chunks = []
        for doc in self.documents:
            doc_chunks = self.text_splitter.split_documents([doc])
            # Preserve metadata for all chunks
            for chunk in doc_chunks:
                chunk.metadata = doc.metadata
            chunks.extend(doc_chunks)
        
        # Create vector store
        self.vectorstore = FAISS.from_documents(chunks, self.embeddings)
    
    def search(self, query: str, k: int = 5) -> List[Dict[str, Any]]:
        """Search for relevant content"""
        if not self.vectorstore:
            self.build_index()
        
        # Perform similarity search
        results = self.vectorstore.similarity_search_with_score(query, k=k)
        
        # Format results
        formatted_results = []
        seen_ids = set()
        
        for doc, score in results:
            doc_id = doc.metadata['id']
            if doc_id not in seen_ids:
                seen_ids.add(doc_id)
                formatted_results.append({
                    'id': doc_id,
                    'type': doc.metadata['type'],
                    'title': doc.metadata['title'],
                    'citation': doc.metadata['citation'],
                    'relevance': float(1 / (1 + score)),  # Convert distance to relevance
                    'content': doc.page_content
                })
        
        return formatted_results[:k]
    
    def generate_response(self, query: str, results: List[Dict[str, Any]]) -> str:
        """Generate a natural language response using Gemini"""
        if not results:
            return "I couldn't find specific information about that in my portfolio. Feel free to ask about my experiences, projects, education, or blog posts!"
        
        # Prepare context from search results
        context = "\n\n".join([f"{r['citation']}: {r['content']}" for r in results[:3]])
        
        # Create prompt for Gemini
        prompt = f"""Based on the following information from my portfolio, please answer the user's question in a conversational and helpful way.

Context from my portfolio:
{context}

User question: {query}

Please provide a natural, conversational response that draws from the relevant information above. Keep it concise but informative, and mention specific experiences or projects when relevant."""

        try:
            # Use Gemini to generate response
            response = self.llm.invoke(prompt)
            return response.content
        except Exception as e:
            print(f"Error generating response: {e}")
            # Fallback to simple response
            top_result = results[0]
            if top_result['type'] == 'experience':
                return f"Based on my experience with {top_result['title']}, I can share relevant insights from that work."
            elif top_result['type'] == 'project':
                return f"I've worked on {top_result['title']}, which relates to your question."
            elif top_result['type'] == 'blog':
                return f"I wrote about this topic in my blog post '{top_result['title']}'."
            else:
                return f"I have relevant information about this in my {top_result['type']} section."

# Initialize and test
if __name__ == "__main__":
    # Make sure GOOGLE_API_KEY is set
    if not os.getenv('GOOGLE_API_KEY'):
        print("Please set GOOGLE_API_KEY environment variable")
        exit(1)
    
    engine = PortfolioSearchEngine()
    engine.build_index()
    
    # Test search
    test_query = "AI and machine learning experience"
    results = engine.search(test_query)
    response = engine.generate_response(test_query, results)
    
    print(f"Query: {test_query}")
    print(f"Response: {response}")
    print(f"Citations: {[r['citation'] for r in results]}")