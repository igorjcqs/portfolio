'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [ascii] = useState(() => {
    const chars = ['+', '.', '*', ' ', ' ', ' '];
    let res = '';
    // Generate enough characters for full viewport coverage
    // At 10px font-size, each char is ~6px wide and ~10px tall
    const cols = 500; // covers up to ~3000px wide screens
    const rows = 400; // covers up to ~4000px tall screens (scrollable pages)
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        res += chars[Math.floor(Math.random() * chars.length)];
      }
      res += '\n';
    }
    return res;
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'About' },
    { href: '/career', label: 'Career' },
    { href: '/projects', label: 'Projects' },
    { href: '/travels', label: 'Travels' },
  ];

  const socialLinks = [
    {
      icon: <Github className="w-4 h-4" />,
      href: 'https://github.com/igorjcqs',
      label: 'GitHub',
    },
    {
      icon: <Linkedin className="w-4 h-4" />,
      href: 'https://linkedin.com/in/igorjacques',
      label: 'LinkedIn',
    },
    {
      icon: <Mail className="w-4 h-4" />,
      href: 'mailto:igorjcqs@gmail.com',
      label: 'Email',
    },
  ];

  const isTravels = pathname === '/travels';

  return (
    <div
      className={cn(
        'min-h-screen bg-background text-foreground flex flex-col font-sans relative',
        !isTravels &&
          'max-w-5xl mx-auto px-6 md:px-12 border-x border-dashed border-border/30'
      )}
    >
      <div className="ascii-bg" suppressHydrationWarning>
        {ascii}
      </div>
      <div className="scanline" />

      <header className="fixed top-6 left-0 right-0 z-50 px-6 flex justify-center pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          <nav className="hidden md:flex gap-1 md:gap-2 p-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full shadow-2xl">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-4 py-2 text-[10px] md:text-xs font-medium tracking-widest uppercase transition-all rounded-full whitespace-nowrap',
                  pathname === item.href
                    ? 'bg-white text-black font-bold'
                    : 'text-muted-foreground hover:text-white hover:bg-white/5'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="md:hidden flex flex-col items-center">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-full bg-black/40 backdrop-blur-md border-white/10 text-white w-12 h-12 shadow-2xl"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/90 backdrop-blur-xl md:hidden animate-in fade-in duration-300 flex flex-col items-center justify-center p-6">
          <nav className="flex flex-col items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  'text-2xl font-serif tracking-widest uppercase transition-all',
                  pathname === item.href
                    ? 'text-white scale-110'
                    : 'text-muted-foreground hover:text-white'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-16 flex gap-8">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-white transition-colors"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      )}

      <main className="flex-1 py-24 md:py-32 fade-in-50 animate-in slide-in-from-bottom-4 duration-700 relative z-10">
        {children}
      </main>

      <footer
        className={cn(
          'py-16 border-t border-dashed border-border/30 mt-12 relative z-10',
          isTravels && 'px-6 md:px-12'
        )}
      >
        <div
          className={cn(
            'space-y-12',
            !isTravels && 'max-w-2xl mx-auto'
          )}
        >
          <div className="text-center space-y-4">
            <p className="text-lg md:text-xl font-serif italic text-muted-foreground leading-relaxed">
              &quot;The best way to predict the future is to build
              it.&quot;
            </p>
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground/50">
              — Alan Kay
            </p>
          </div>

          <div className="flex flex-col items-center gap-8 pt-8 border-t border-white/5">
            <div className="flex gap-6">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-white transition-all duration-300 flex items-center gap-2 group"
                >
                  <span className="p-2 rounded-full border border-white/5 group-hover:border-white/20 transition-colors">
                    {link.icon}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest hidden lg:block">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>

            <div className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-[0.2em] flex flex-col items-center gap-2">
              <span>
                IGOR_JACQUES // © {new Date().getFullYear()}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
