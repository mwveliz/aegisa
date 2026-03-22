import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Aegisa Testnet Dashboard',
  description: 'Open Source Testnet Dashboard and Faucet Manager supporting IOTA 2.0 (Move-based) and several EVM testnets.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-cyber-grid`}>
        {children}
      </body>
    </html>
  );
}
