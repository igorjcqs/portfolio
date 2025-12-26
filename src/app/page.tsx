'use client';

import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useRef } from 'react';

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const journeySteps = [
    {
      label: 'BEFORE',
      text: 'Started coding at 12, diving into Java to build plugins for Minecraft servers. What began as a hobby quickly became an obsession—creating custom game mechanics and learning that code could shape experiences.',
    },
    {
      label: '2020 — ORIGIN',
      text: 'Landed my first career job in web development. From GTA V mods to Discord bots, I transitioned into building interactive experiences for gaming communities, discovering how to bring people together through technology.',
    },
    {
      label: '2022 — WEB3',
      text: 'Dove deep into blockchain and Web3, building cross-chain bridges and NFT solutions. Worked with DAOs across the globe, learning that decentralization was about more than just technology—it was about trust.',
    },
    {
      label: '2023 — SCALE',
      text: 'Led development teams building highly scalable applications. From gaming banks handling 250k monthly users to enterprise platforms for major brands like RedBull and Listerine. Mastered AWS, microservices, and the art of shipping fast.',
    },
    {
      label: 'PRESENT',
      text: 'Now focused on building scalable systems and shipping fast. Mastering AI tools to accelerate development and deliver products at unprecedented speed. The future belongs to those who build quickly and iterate relentlessly.',
    },
  ];

  return (
    <Layout>
      <div className="space-y-32 pb-20">
        <section className="grid md:grid-cols-2 gap-12 items-center min-h-[60vh] py-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 md:order-1 space-y-6"
          >
            <div className="font-mono text-[10px] opacity-40 mb-2">
              [SESSION_ACTIVE // UID_IGOR_JACQUES]
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-[1.1] tracking-tight text-white">
              Hello, I&apos;m <br />
              <span className="italic text-muted-foreground">
                Igor Jacques.
              </span>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-md font-light">
              Applied AI engineer shipping agentic automation, RAG
              systems, and real-time experiences. Full-stack delivery
              optimized for latency, reliability, and cost.
            </p>

            <div className="pt-4 flex items-center gap-4">
              <Link href="/career">
                <Button
                  variant="outline"
                  className="group rounded-full px-8 h-12 border-white/10 hover:bg-white hover:text-black transition-all duration-500 cursor-pointer"
                >
                  Explore Work
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="order-1 md:order-2 flex justify-center md:justify-end"
          >
            <div
              className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 cursor-pointer"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="absolute inset-0 border border-white/5 rounded-full animate-[spin_30s_linear_infinite]" />
              <div className="absolute inset-8 border border-white/5 rounded-full animate-[spin_20s_linear_infinite_reverse]" />

              <Image
                src="/assets/me/me.png"
                alt="Igor Jacques"
                width={384}
                height={384}
                className={`absolute inset-0 w-full h-full object-cover rounded-full z-10 transition-opacity duration-500 ${
                  isHovered ? 'opacity-0' : 'opacity-100'
                }`}
              />

              <video
                ref={videoRef}
                src="/assets/me/vercelf.mp4"
                muted
                loop
                playsInline
                preload="auto"
                className={`absolute inset-0 w-full h-full object-cover rounded-full z-10 transition-opacity duration-500 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
              />

              <a
                href="https://v0-vercelf-yourself.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className={`absolute left-1/2 -translate-x-1/2 bottom-4 z-20 flex items-center gap-2 px-4 py-2 bg-black/80 backdrop-blur-sm border border-white/10 rounded-full transition-all duration-300 hover:bg-white/10 hover:border-white/20 ${
                  isHovered
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-2 pointer-events-none'
                }`}
              >
                <svg
                  viewBox="0 0 76 65"
                  fill="white"
                  className="w-4 h-4"
                >
                  <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                </svg>
                <span className="text-white text-sm font-medium">
                  Vercelf
                </span>
              </a>

              <div className="absolute -bottom-6 -right-6 font-mono text-[8px] opacity-20 text-right leading-relaxed z-20">
                RECIFE, BR
                <br />
                APPLIED_AI
              </div>
            </div>
          </motion.div>
        </section>

        <section className="max-w-3xl space-y-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-xs font-mono uppercase tracking-[0.4em] text-muted-foreground">
              / Journey
            </h2>
            <div className="h-px w-24 bg-white/20"></div>
          </motion.div>

          <div className="space-y-20">
            {journeySteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="flex flex-col md:flex-row gap-4 md:gap-12">
                  <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase pt-1.5 min-w-[120px] md:text-right">
                    {step.label}
                  </span>
                  <div className="space-y-4 max-w-xl">
                    <p className="text-lg md:text-xl text-muted-foreground group-hover:text-white transition-colors duration-700 leading-relaxed font-light">
                      {step.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
