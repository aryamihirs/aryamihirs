'use client';

import Hero from "@/components/sections/Hero";
import CaseStudies from "@/components/sections/CaseStudies";
import Blog from "@/components/sections/Blog";
import EducationSection from "@/components/sections/Education";
import ConsultingCTA from "@/components/sections/ConsultingCTA";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <Hero />
      <main className="relative z-10">
        <CaseStudies />
        <Blog />
        <EducationSection />
        <ConsultingCTA />
      </main>
    </div>
  );
}