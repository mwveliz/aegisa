# Aegisa Testnet Dashboard

Aegisa is an Open Source Testnet Dashboard and **True Self-Hosted Faucet Node** supporting IOTA 2.0 (Rebased) and several EVM testnets.

**Why rely on broken external testnet faucets? Simply have your own gas.** 
Unlike traditional dashboards that redirect traffic to public faucets, Aegisa acts as a secure, standalone gas dispenser. By provisioning your own heavily-funded private keys via environment variables, Aegisa automatically broadcasts and dispenses your own testnet tokens to AI agents, automated tests, and local devs on-chain using `viem` and the IOTA SDK.

## Features
- **Agentic API**: A set of JSON endpoints (`/api/faucets`) for other AI agents to query faucet statuses and enqueue testnet tokens natively.
- **Guardian Component**: Global React UI component that monitors cross-chain low gas events for a connected wallet.
- **Soberbia Factor**: Real-time observability dashboard tracking public faucet health and liftoff statuses.

## Local Development (Without Docker)

You can easily run this project locally using Node.js without needing Docker.

1. **Install dependencies**:
```bash
npm install
```

2. **Run the development server**:
```bash
npm run dev
```

3. **Open the Dashboard**:
Open [http://localhost:3000](http://localhost:3000) in your browser to view the Aegisa Dashboard. Hot-reloading is enabled natively.


