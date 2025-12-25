'use client';

import Layout from '@/components/Layout';
import {
  ExternalLink,
  Github,
  GitPullRequest,
  CheckCircle2,
} from 'lucide-react';

export default function Projects() {
  const projects: {
    title: string;
    description: string;
    link: string;
    icon: React.ReactNode;
  }[] = [];

  const openSource: {
    title: string;
    description: string;
    link: string;
    repo: string;
    prCount: number;
    icon: React.ReactNode;
  }[] = [];

  return (
    <Layout>
      <div className="space-y-16 max-w-3xl mx-auto pb-20">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground">
              / Projects
            </h1>
            <div className="h-px w-full bg-border/30"></div>
          </div>

          {projects.length > 0 ? (
            <div className="grid gap-8">
              {projects.map((project, idx) => (
                <div
                  key={idx}
                  className="group flex items-center gap-8 p-6 rounded-lg hover:bg-white/5 transition-all border border-white/5 hover:border-white/10"
                >
                  <div className="flex-shrink-0 w-16 h-16 rounded-md bg-secondary flex items-center justify-center text-primary border border-white/10 group-hover:border-primary/50 transition-colors">
                    {project.icon}
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-sans font-bold text-white tracking-tight">
                        {project.title}
                      </h3>
                      {project.link !== '#' && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-lg border border-dashed border-white/10 text-center">
              <p className="text-muted-foreground text-sm italic">
                Coming soon...
              </p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground">
              / Open Source
            </h2>
            <div className="h-px w-full bg-border/30"></div>
          </div>

          <div className="grid gap-6">
            {openSource.length > 0 ? (
              <div className="grid gap-8">
                {openSource.map((item, idx) => (
                  <div
                    key={idx}
                    className="group p-5 rounded-lg border border-white/5 hover:border-white/20 transition-all"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="text-primary/80">
                          {item.icon}
                        </div>
                        <h3 className="text-lg font-sans font-bold text-white/90">
                          {item.title}
                        </h3>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors ml-auto"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-4 pt-2 text-xs text-muted-foreground">
                        <span className="font-mono text-primary/80">
                          {item.repo}
                        </span>
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-green-500" />
                          {item.prCount} PRs merged
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 rounded-lg border border-dashed border-white/10 text-center">
                <p className="text-muted-foreground text-sm italic">
                  Coming soon...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
