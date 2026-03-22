"use client";

import { useQuery } from '@tanstack/react-query';
import { Droplets, Copy, Activity, ServerCrash, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface Network {
  id: string;
  name: string;
  type: 'evm' | 'move';
}

export function NetworkCard({ network }: { network: Network }) {
  const [dispensing, setDispensing] = useState(false);
  const mockAddress = network.type === 'move' ? '0xIOTA...89x' : '0x71C...97bA';

  const { data: balance, isLoading, refetch } = useQuery({
    queryKey: ['balance', network.id],
    queryFn: async () => {
      await new Promise(r => setTimeout(r, 800));
      if (network.id === 'base') return '0.001'; 
      return '1.542';
    }
  });

  const handleFaucetRequest = async () => {
    setDispensing(true);
    try {
      const res = await fetch('/api/faucets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ network: network.id, address: mockAddress })
      });
      const data = await res.json();
      
      if (data.success) {
        alert(`${data.message}\n\nTX Hash: ${data.txHash}`);
        refetch(); // Refresh mock balance artificially to display change
      } else {
        alert(data.error);
      }
    } catch (e) {
      alert("Failed to connect to Faucet Node.");
    } finally {
      setDispensing(false);
    }
  };

  const isLowGas = parseFloat(balance || '0') < 0.05;

  return (
    <div className={`relative p-5 rounded-xl border flex flex-col justify-between transition-all bg-card hover:bg-card/80 ${isLowGas ? 'border-destructive/50 shadow-[0_0_15px_rgba(220,38,38,0.2)] z-10' : 'border-border hover:border-primary/50'}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-mono font-bold text-lg text-foreground flex items-center space-x-2">
            {network.name}
          </h3>
          <span className="text-xs uppercase tracking-widest text-muted-foreground px-2 py-0.5 rounded-full bg-secondary inline-block mt-2">
            {network.type} CHAIN
          </span>
        </div>
        <Activity className={`w-5 h-5 ${isLowGas ? 'text-destructive animate-pulse' : 'text-primary'}`} />
      </div>

      <div className="space-y-4">
        <div className="bg-background rounded p-3 font-mono">
          <div className="text-xs text-muted-foreground mb-1">CURRENT BAL</div>
          <div className={`text-2xl ${isLoading ? 'animate-pulse bg-muted text-transparent rounded w-24 h-8' : isLowGas ? 'text-destructive font-black' : 'text-foreground'}`}>
            {isLoading ? '0.000' : balance} {network.type === 'move' ? 'IOTA' : 'ETH'}
          </div>
        </div>

        <button 
          onClick={handleFaucetRequest}
          disabled={dispensing}
          className={`w-full py-3 rounded uppercase font-bold text-sm flex items-center justify-center space-x-2 transition-colors disabled:opacity-50 ${
            network.type === 'move'
              ? 'bg-primary text-primary-foreground hover:bg-primary/90'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
        >
          {dispensing ? (
             <><Loader2 className="w-4 h-4 animate-spin" /><span>DISPENSING...</span></>
          ) : (
             <><Droplets className="w-4 h-4" /><span>REQUEST {network.type === 'move' ? 'IOTA' : 'ETH'} FUNDS</span></>
          )}
        </button>
      </div>
    </div>
  );
}
