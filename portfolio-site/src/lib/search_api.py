#!/usr/bin/env python3
"""
Search API wrapper for the portfolio site
Usage: python search_api.py
Reads query from stdin as JSON, returns results as JSON
"""
import sys
import json
import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables from .env.local
project_root = Path(__file__).parent.parent.parent
env_path = project_root / '.env.local'
load_dotenv(env_path)

# Add the current directory to Python path
sys.path.append(str(Path(__file__).parent))

from ai_search import PortfolioSearchEngine

def main():
    try:
        # Read query from stdin
        input_data = sys.stdin.read()
        request = json.loads(input_data)
        query = request.get('query', '')
        
        if not query:
            print(json.dumps({
                'error': 'No query provided'
            }))
            sys.exit(1)
        
        # Get content directory from environment or use default
        content_dir = os.getenv('CONTENT_DIR', 'content')
        
        # Initialize search engine
        engine = PortfolioSearchEngine(content_dir)
        engine.build_index()
        
        # Perform search
        results = engine.search(query)
        response = engine.generate_response(query, results)
        
        # Format results for API
        formatted_results = []
        for result in results:
            formatted_results.append({
                'id': result['id'],
                'type': result['type'],
                'title': result['title'],
                'summary': result['content'][:200] + '...' if len(result['content']) > 200 else result['content'],
                'relevance': result['relevance'],
                'citation': result['citation']
            })
        
        output = {
            'results': formatted_results,
            'response': response
        }
        
        print(json.dumps(output))
        
    except Exception as e:
        print(json.dumps({
            'error': str(e),
            'results': [],
            'response': "I encountered an error processing your request. Please try again."
        }))
        sys.exit(1)

if __name__ == "__main__":
    main()