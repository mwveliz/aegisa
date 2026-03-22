import { useState } from 'react';

export function useGuardian() {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [lowGasNetworks, setLowGasNetworks] = useState<string[]>([]);

  const connect = () => {
    setIsConnected(true);
    setAddress("0x71C...97bA");
    
    // Guardian simulation: detects low gas on a network after delay
    setTimeout(() => {
      setLowGasNetworks(['base']);
    }, 2000);
  };

  return { isConnected, address, lowGasNetworks, connect };
}
