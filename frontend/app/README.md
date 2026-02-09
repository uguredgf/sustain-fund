# SustainFund 🌍 - Transparent Medical Crowdfunding dApp

SustainFund is a decentralized application (dApp) built on the Stellar network using Soroban smart contracts. It enables transparent and secure medical crowdfunding, ensuring that donations are verifiable on the blockchain.

## 🚀 Project Overview
* **Transparent:** All donations are recorded on the Stellar Testnet.
* **Secure:** Smart contract logic handles the funds.
* **User-Friendly:** Simple interface integrated with Freighter Wallet.

## 🛠️ Tech Stack
* **Blockchain:** Stellar Network (Testnet)
* **Smart Contract:** Rust & Soroban SDK
* **Frontend:** Next.js, TypeScript, Tailwind CSS
* **Wallet:** Freighter

## ⚙️ Setup & Installation

### Prerequisites
* Node.js (v18+)
* Rust & Soroban CLI
* Freighter Wallet Extension

### 1. Smart Contract (Backend)
Navigate to the contracts folder to build and test the contract:

```bash
cd contracts
cargo build --target wasm32-unknown-unknown --release
# Deploy command (Already deployed to Testnet)
# stellar contract deploy --wasm target/wasm32-unknown-unknown/release/sustain_fund.wasm --source my_account --network testnet
```

Deployed Contract ID: CAU2NH2UZ7JNV5ZPUXI7444AT6YM4JHXUIKSDUSDU5NPZ5HHF2SRW37F

### 2. Frontend
Navigate to the frontend folder and install dependencies:

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## 📸 Usage

1. Connect your Freighter Wallet.

2. Enter the amount of XLM you want to donate.

3. Click "Bağışı Gönder" and approve the transaction.

Developed for KOD 2026 Hackathon.

@uguredgf