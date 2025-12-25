"use client";

import Layout from "@/components/Layout";
import dynamic from "next/dynamic";

const TravelsMap = dynamic(() => import("@/components/TravelsMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] md:h-[700px] bg-secondary/20 flex items-center justify-center">
      <div className="text-muted-foreground font-mono text-sm">Loading map...</div>
    </div>
  ),
});

export default function Travels() {
  return (
    <Layout>
      <div className="h-full flex flex-col">
        <div className="py-12 px-6 md:px-12 space-y-2">
          <h1 className="text-3xl md:text-5xl font-serif">Wanderlust</h1>
          <p className="text-muted-foreground max-w-2xl">
            Exploring the world one city at a time. Here are some of the places
            that have shaped my perspective.
          </p>
        </div>

        <TravelsMap />
      </div>
    </Layout>
  );
}
