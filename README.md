# MedChain: Patient-Centric Zero-Trust Frontend Dashboard

**MedChain** is a decentralized, secure, and user-empowered digital dashboard for patient medical records and clinical intelligence. Built using **Next.js**, **React 19**, and **TailwindCSS**, it features a zero-trust architecture, Web3 wallet anchoring simulation, interactive clinical charts, and a real-time AI clinical assistant powered by FastAPI and Retrieval-Augmented Generation (RAG).

---

## 📸 Core Features

### 1. Role-Based Dashboards
* **Patient Portal**: Visualizes historical timelines, health vitals charts, diagnostic trends, active prescriptions list, and secure sharing widgets.
* **Provider (Doctor/Clinic) Portal**: Administer patient registries, submit clinical observations (Vitals, Diagnoses, Prescriptions), review secure access permissions, and run comparative reports.

### 2. MedChain AI Assistant Widget
* A floating conversational agent utilizing a RAG pipeline to retrieve relevant patient medical records and address questions.
* Dynamically displays source citations/badges for retrieved records, indicating details and relevance scores.
* Features automatic follow-up questions tailored to the current context.
* Provides a quick-trigger index rebuilder status indicator and reindex button.

### 3. Secure Zero-Trust Design
* Authenticated using JSON Web Tokens (JWT) mapped to local storage.
* Integrates with Ethereum-compatible wallets (via Ethers.js) to sign hashes and anchor medical uploads onto simulated blockchain blocks for immutable proof-of-integrity.
* Clean and interactive Tailwind UI featuring smooth Framer Motion animations and responsive grid layouts.

---

## 🛠 Technology Stack

* **Core**: Next.js 16 (App Router), React 19, TypeScript
* **Styling**: TailwindCSS 4, Tailwind Merge, TailwindCSS Animate
* **State Management**: Zustand
* **Animations**: Framer Motion 12
* **Charts**: Recharts (for vitals, BMI, blood pressure history)
* **Web3 Integration**: Ethers.js v6
* **Icons**: Lucide React

---

## 📁 Folder Structure

```
MedchainFrontend/
├── public/                 # Static assets (images, fonts, logs)
├── src/
│   ├── app/                # Next.js App Router folders
│   │   ├── (dashboard)/    # Authenticated Layouts
│   │   │   ├── dashboard/  # Patient & Doctor dashboard home pages
│   │   │   ├── access/     # Access permissions & requests view
│   │   │   ├── records/    # Patient records uploader and timeline
│   │   │   └── doctor/     # Doctor patient list, schedule, analytics pages
│   │   ├── login/          # JWT Sign-in / registration
│   │   └── loading-secure/ # Wallet transaction pending loader
│   ├── components/         # Reusable components
│   │   ├── layout/         # Shell, Sidebar, and AIAssistantWidget
│   │   └── ui/             # Card, Dialog, Input, and Button primitives
│   ├── lib/
│   │   ├── api/            # API call client wrapper (auth endpoints & RAG client)
│   │   └── utils/          # Tailwind merger and formatting helpers
│   └── context/            # Global React Contexts
├── tsconfig.json           # TS rules
├── tailwind.config.ts      # Tailwind Styling rules
└── package.json            # Scripts & node packages
```

---

## 🚀 Getting Started

### 1. Prerequisites
* **Node.js**: v18.17+ (v20+ recommended)
* **Package Manager**: npm, yarn, or pnpm

---

### 2. Configuration Setup
Create a `.env.local` file at the root of the project to map the backend APIs:

```env
# URL for the core Django Backend API
NEXT_PUBLIC_API_URL=http://localhost:8000

# URL for the FastAPI RAG service endpoint
NEXT_PUBLIC_RAG_URL=http://localhost:8001/api/v1

# OAuth/Web3 client IDs if applicable
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-oauth-client-id
```

---

### 3. Installation & Run commands

1. **Clone the repository and install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Build the production package**:
   ```bash
   npm run build
   ```

4. **Start the production server**:
   ```bash
   npm start
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the client dashboard.

---

## 🔌 API Client Library (`src/lib/api/rag.ts`)

The frontend communicates with the clinical RAG assistant using a dedicated API module. You can import `ragApi` to query, reindex, check health, or compare patients:

```typescript
import { ragApi } from '@/lib/api/rag';

// 1. Submit a RAG query
const response = await ragApi.query({
  query: "What is my blood pressure history?",
  top_k: 5
});

// 2. Perform cross-patient comparison (Doctor only)
const comparison = await ragApi.compare({
  patient_id_1: "P001",
  patient_id_2: "P002",
  aspects: ["risk factors", "medications"]
});

// 3. Rebuild FAISS index
const reindexResult = await ragApi.reindex();
```