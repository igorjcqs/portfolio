"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Download, ChevronDown, ChevronUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Career() {
  const [showMore, setShowMore] = useState(false);

  const experiences = [
    {
      period: "May 2025 — Present",
      location: "Austin, TX (Remote)",
      title: "Software Engineer",
      company: "MentorPass",
      description: "Building the future of mentorship with AI-powered matching and scheduling. Full-stack development with a focus on real-time features and scalable architecture."
    },
    {
      period: "Sep 2024 — Jun 2025",
      location: "Boston, MA (Remote)",
      title: "Software Engineer",
      company: "Trio",
      description: "Developed enterprise software solutions for US-based clients. Focused on API integrations, serverless architectures, and performance optimization."
    },
    {
      period: "Aug 2023 — Nov 2024",
      location: "Brazil (Remote)",
      title: "Software Engineer",
      company: "HB Company (Level8)",
      description: "Led development of internal and external web solutions with a team of 40+ people. Built scrapers, lead capture systems, notification systems, data analysis dashboards, and AI solutions for major brands including RedBull, Listerine, Oi, and Estácio. Mastered microservice architecture, TDD, CI/CD, and Golang."
    },
    {
      period: "Feb 2023 — Aug 2023",
      location: "Dallas, TX (Remote)",
      title: "Software Engineer",
      company: "Good Software Dev",
      description: "Developed platforms for international clients including a truck insurance platform connected to CoverWhale. Worked with globally distributed teams across India, USA, Brazil, Pakistan, and UK. Focused on AWS cloud integration and scalable architectures."
    },
    {
      period: "Apr 2022 — May 2023",
      location: "Brazil (Remote)",
      title: "Software Engineer",
      company: "Player's Bank (Itaú)",
      description: "Built web solutions for Brazil's gamer-focused bank in partnership with Itaú. Developed highly scalable applications supporting 250k monthly users and 30k/hour peak traffic during launches with LOUD, Xbox Brasil, and LOL Worlds."
    },
    {
      period: "Feb 2022 — May 2023",
      location: "Brazil (Remote)",
      title: "Software Engineer",
      company: "MetaMath Software",
      description: "Developed Web3 and blockchain solutions for DAOs in the US, China, and Canada. Built Portales, a cross-chain bridge enabling cryptocurrency transactions between different networks like Binance and XDC Network."
    }
  ];

  const allExperiences = [
    ...experiences,
    {
      period: "Oct 2022 — Dec 2022",
      location: "Brazil (Remote)",
      title: "Software Engineer",
      company: "Warlocks (contract)",
      description: "Short-term contract developing web applications and implementing new features for client projects."
    },
    {
      period: "Mar 2022 — Jun 2022",
      location: "Brazil (Remote)",
      title: "Software Engineer",
      company: "Venda+ Sistemas (contract)",
      description: "Contract work building e-commerce solutions and integrating payment systems."
    },
    {
      period: "Feb 2021 — Mar 2021",
      location: "Brazil (Remote)",
      title: "Software Engineer",
      company: "Ziraflix (contract)",
      description: "Contributed to streaming platform development with focus on frontend features."
    }
  ];

  const visibleExperiences = showMore ? allExperiences : allExperiences.slice(0, 4);
  const hiddenCount = allExperiences.length - 4;

  const honors = [
    {
      place: 1,
      title: "1st Place — Moonriver Hackathon",
      organization: "DoraHacks",
      description: "Won first place building innovative blockchain solutions on the Moonriver network."
    }
  ];

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-16">
        <section className="space-y-6">
          <div className="flex justify-between items-baseline">
            <h2 className="text-3xl font-serif">Experience</h2>
            <Button variant="ghost" className="text-xs uppercase tracking-wider hover:bg-transparent hover:text-muted-foreground hover:underline">
              <Download className="mr-2 h-3 w-3" /> Download CV
            </Button>
          </div>
          
          <div className="space-y-12">
            {visibleExperiences.map((exp, idx) => (
              <div key={idx} className="group">
                <div className="flex justify-between text-sm mb-2 text-muted-foreground uppercase tracking-wider">
                  <span>{exp.period}</span>
                  <span>{exp.location}</span>
                </div>
                <h3 className="text-xl font-medium mb-1 group-hover:underline decoration-1 underline-offset-4">{exp.title}</h3>
                <p className="text-sm text-primary/80 mb-2">{exp.company}</p>
                <p className="text-muted-foreground">{exp.description}</p>
              </div>
            ))}

            <button
              onClick={() => setShowMore(!showMore)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors group cursor-pointer"
            >
              {showMore ? (
                <>
                  <ChevronUp className="h-4 w-4 group-hover:-translate-y-0.5 transition-transform" />
                  See less
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
                  See more ({hiddenCount})
                </>
              )}
            </button>
          </div>
        </section>

        <Separator className="bg-border/50" />

        <section className="space-y-6">
          <h2 className="text-3xl font-serif">Honors & Awards</h2>
          
          <div className="space-y-8">
            {honors.map((honor, idx) => (
              <div key={idx} className="group">
                <h3 className="text-xl font-medium mb-1 group-hover:underline decoration-1 underline-offset-4">
                  {honor.place === 1 && <span className="mr-2">🥇</span>}
                  {honor.title}
                </h3>
                <p className="text-sm text-primary/80 mb-2">{honor.organization}</p>
                <p className="text-muted-foreground">{honor.description}</p>
              </div>
            ))}
          </div>
        </section>
        
        <Separator className="bg-border/50" />

        <section className="space-y-6">
          <h2 className="text-3xl font-serif">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {[
              "TypeScript", "Node.js", "React", "Next.js", "Python", "Golang",
              "AWS", "GCP", "RAG", "AI Agents", "LangChain", "Groq",
              "PostgreSQL", "Redis", "Docker", "Microservices", "TDD", "CI/CD"
            ].map((skill) => (
              <span key={skill} className="px-3 py-1 text-sm border border-white/10 rounded-full text-muted-foreground hover:text-white hover:border-white/30 transition-colors">
                {skill}
              </span>
            ))}
          </div>
        </section>

        <Separator className="bg-border/50" />

        <section className="space-y-6">
          <h2 className="text-3xl font-serif">Tools</h2>
          <div className="flex flex-wrap gap-2">
            {[
              "Cursor", "Claude Code", "OpenCode", "VSCode", "GitHub Copilot",
              "v0", "Lovable", "ChatGPT", "Claude",
              "Warp", "Linear", "Notion", "Figma"
            ].map((tool) => (
              <span key={tool} className="px-3 py-1 text-sm border border-white/10 rounded-full text-muted-foreground hover:text-white hover:border-white/30 transition-colors">
                {tool}
              </span>
            ))}
          </div>
        </section>

        <Separator className="bg-border/50" />

        <section className="space-y-6">
          <h2 className="text-3xl font-serif">Goals</h2>
          <p className="text-muted-foreground leading-relaxed">
            I&apos;m focused on pushing the boundaries of Applied AI—building autonomous systems that deliver real value. 
            Open to Senior/Staff AI or full-stack roles where I can ship 0→1 products with strong evals and observability. 
            Remote preferred, impact required.
          </p>
        </section>
      </div>
    </Layout>
  );
}
