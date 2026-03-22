"use client";

import { useQuery } from '@tanstack/react-query';
import { Server, Activity } from 'lucide-react';

export function AgentHealth() {
  const { data: health, isLoading } = useQuery({
    queryKey: ['agent-health'],
    queryFn: async () => {
      const res = await fetch('/api/faucets');
      return res.json();
    },
    refetchInterval: 5000
  });

  return (
    <div>
      <div className="flex items-center space-x-2 mb-6">
        <Server className="text-accent w-5 h-5" />
        <h2 className="text-xl font-bold font-mono tracking-tight text-foreground uppercase">
          Agent Health & Faucets (Soberbia Factor)
        </h2>
      </div>

      {isLoading ? (
        <div className="h-24 flex items-center justify-center opacity-50">
          <Activity className="animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-sm">
          <HealthNode name="Aegisa API" status="online" />
          <HealthNode name="IOTA Faucet" status={health?.iota?.status} />
          <HealthNode name="Sepolia Faucet" status={health?.sepolia?.status} />
          <HealthNode name="Base Faucet" status={health?.base?.status} />
        </div>
      )}
    </div>
  );
}

function HealthNode({ name, status }: { name: string, status?: string }) {
  const isOnline = status === 'online';
  return (
    <div className="border border-border bg-background p-3 rounded flex items-center space-x-3">
      <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-primary shadow-[0_0_8px_rgba(45,212,191,0.8)]' : 'bg-destructive shadow-[0_0_8px_rgba(220,38,38,0.8)]'}`} />
      <div>
        <div className="text-muted-foreground text-xs">{name}</div>
        <div className={isOnline ? 'text-primary' : 'text-destructive'}>
          {status?.toUpperCase() || 'UNKNOWN'}
        </div>
      </div>
    </div>
  );
}
