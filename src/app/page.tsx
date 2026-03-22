"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NetworkCard } from '@/components/NetworkCard';
import { AgentHealth } from '@/components/AgentHealth';
import { Guardian } from '@/components/Guardian';

const queryClient = new QueryClient();

export default function Home() {
  const networks = [
    { id: 'iota', name: 'IOTA Rebased Testnet', type: 'move' as const },
    { id: 'sepolia', name: 'Ethereum Sepolia', type: 'evm' as const },
    { id: 'base', name: 'Base Sepolia', type: 'evm' as const },
    { id: 'shimmer', name: 'ShimmerEVM Testnet', type: 'evm' as const },
    { id: 'polygon', name: 'Polygon Amoy', type: 'evm' as const },
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <main className="container mx-auto p-6 space-y-12">
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-border pb-6 mt-12">
          <div>
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent uppercase tracking-tighter">
              Aegisa Dashboard
            </h1>
            <p className="text-muted-foreground mt-2 font-mono">
              <span className="text-primary">&gt; </span>IOTA 2.0 & Cross-Chain Testnet Manager
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Guardian />
          </div>
        </header>

        <section>
          <div className="flex items-center space-x-2 mb-6">
            <div className="h-4 w-4 rounded-sm bg-primary animate-pulse" />
            <h2 className="text-2xl font-bold font-mono tracking-tight text-foreground uppercase">
              Network Terminals
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {networks.map((net) => (
              <NetworkCard key={net.id} network={net} />
            ))}
          </div>
        </section>

        <section className="bg-card border border-border rounded-lg p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-3xl rounded-full pointer-events-none" />
          <AgentHealth />
        </section>
      </main>
    </QueryClientProvider>
  );
}
