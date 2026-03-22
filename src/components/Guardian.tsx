"use client";

import { useGuardian } from '@/hooks/useGuardian';
import { ShieldAlert, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Guardian() {
  const { isConnected, address, lowGasNetworks, connect } = useGuardian();

  if (!isConnected) {
    return (
      <button 
        onClick={connect}
        className="px-6 py-2 bg-primary/10 border border-primary text-primary hover:bg-primary/20 transition-all rounded-md font-mono"
      >
        [ INIT GUARDIAN ]
      </button>
    );
  }

  const isHealthy = lowGasNetworks.length === 0;

  return (
    <div className="flex items-center space-x-4 bg-background border border-border p-3 rounded-lg font-mono text-sm">
      <div className="flex items-center space-x-2 text-muted-foreground">
        <span>ID:</span>
        <span className="text-foreground">{address?.slice(0,6)}...{address?.slice(-4)}</span>
      </div>
      <div className="h-6 w-px bg-border" />
      <AnimatePresence mode="popLayout">
        {isHealthy ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center space-x-2 text-primary"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>GAS OPTIMAL</span>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center space-x-2 text-destructive animate-pulse"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>LOW GAS {lowGasNetworks[0]}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
