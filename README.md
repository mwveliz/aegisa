# Aegisa Testnet Dashboard

Aegisa is an Open Source Testnet Dashboard and **True Self-Hosted Faucet Node** supporting IOTA 2.0 (Rebased) and several EVM testnets.

**Landing Info / Previews:** [https://mwveliz.github.io/aegisa/](https://mwveliz.github.io/aegisa/)

**Why rely on broken external testnet faucets? Simply have your own gas.** 
Unlike traditional dashboards that redirect traffic to public faucets, Aegisa acts as a secure, standalone gas dispenser. By provisioning your own heavily-funded private keys via environment variables, Aegisa automatically broadcasts and dispenses your own testnet tokens to AI agents, automated tests, and local devs on-chain using `viem` and the IOTA SDK.

## How Aegisa Works Internally

```text
  [ User Dashboard ]       [ Autonomous AI Agents ]
          |                          |
          |       (POST Request)     |
          +------------+-------------+
                       |
                       v
         +-----------------------------+
         |    Next.js /api/faucets     |
         |  (Serverless Faucet Node)   |
         |                             |
         |  +-----------------------+  |
         |  |   .env (Private Keys) |  |
         |  +-----------------------+  |
         |             |               |
         |   [Viem] & [IOTA SDK]       |
         +-------------+---------------+
                       |
             (Signed Transactions)
                       |
         +-------------+---------------+
         |                             |
    [EVM Networks]             [IOTA 2.0 Move]
```

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

## Running with Docker

Aegisa comes with container support configuration files out of the box. To quickly build and run the application using Docker Compose, simply execute:

```bash
docker compose up --build -d
```

### Environment Variables

Before running, ensure you provide the following placeholders in your `docker-compose.yml` or through a `.env` file:
- `FAUCET_PRIVATE_KEY`: Your EVM private key for networks like Sepolia or Base.
- `IOTA_MNEMONIC`: Your IOTA 2.0 mnemonic phrase for the Move network.

The server will be available at [http://localhost:3000](http://localhost:3000).
