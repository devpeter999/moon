"use client";

import { useState } from "react";
import { Code, Coins, Rocket, ShieldCheck } from "lucide-react";
// Import official x402 packages
import { fetchX402 } from "@x402/fetch";
import { createEd25519Signer } from "@x402/stellar";

export default function Home() {
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const addLog = (message: string) => {
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  const handleCallEndpoint = async () => {
    setLoading(true);
    addLog("Initiating request to Express Backend (http://localhost:3001/api/demo)...");

    try {
      // 1. Initialize the Signer
      // In a real app, this might hook into Freighter. We use a dummy secret for the scaffold.
      // TODO: [Good First Issue] Connect to Freighter browser extension instead of Ed25519 signer
      const dummySecret = "SA3Q6YY242TCHJ6T5R3BBNHTV4R6X2NY5M6Q7T4R7K4M6R7M6R7M6R7M";
      const signer = createEd25519Signer(dummySecret);

      // 2. Fetch using @x402/fetch wrapper
      // This will automatically handle the 402 challenge, sign the transaction, and retry!
      addLog("Making fetchX402 request. This will automatically handle the 402 challenge!");
      
      const response = await fetchX402("http://localhost:3001/api/demo", {
        signer: signer,
      });

      if (response.ok) {
        const data = await response.json();
        addLog(`Success! Received data: ${JSON.stringify(data)}`);
      } else {
        addLog(`Failed with status: ${response.status}`);
      }
    } catch (error: any) {
      addLog(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-50 p-8 md:p-24 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header Section */}
        <header className="space-y-4 text-center md:text-left flex flex-col md:flex-row items-center md:items-start justify-between">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              MOON Protocol
            </h1>
            <p className="text-neutral-400 text-lg md:text-xl mt-2 max-w-2xl">
              Stellar x402 API Monetization. Turn any endpoint into a paid micro-service instantly.
            </p>
          </div>
          <div className="hidden md:flex items-center justify-center p-4 bg-neutral-900 rounded-full border border-neutral-800">
            <Rocket className="w-8 h-8 text-emerald-400" />
          </div>
        </header>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
            <Code className="w-6 h-6 text-blue-400" />
            <h3 className="font-semibold text-lg">Wrap Endpoints</h3>
            <p className="text-neutral-400 text-sm">Use our simple Next.js middleware to protect routes in seconds.</p>
          </div>
          <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
            <Coins className="w-6 h-6 text-yellow-400" />
            <h3 className="font-semibold text-lg">Auto-Payments</h3>
            <p className="text-neutral-400 text-sm">Users pay per-request in USDC directly on the Stellar network.</p>
          </div>
          <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <h3 className="font-semibold text-lg">x402 Standard</h3>
            <p className="text-neutral-400 text-sm">Built on the robust x402 protocol for machine-to-machine payments.</p>
          </div>
        </div>

        {/* Demo Section */}
        <section className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold">Try the Demo</h2>
              <p className="text-neutral-400">Watch the x402 flow in action.</p>
            </div>
            <button
              onClick={handleCallEndpoint}
              disabled={loading}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-neutral-950 font-bold rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? "Processing..." : "Call Protected Endpoint"}
            </button>
          </div>

          {/* Terminal / Logs */}
          <div className="bg-black rounded-xl p-4 font-mono text-sm border border-neutral-800 min-h-[200px] overflow-y-auto max-h-[400px]">
            {logs.length === 0 ? (
              <span className="text-neutral-600">Waiting for interaction...</span>
            ) : (
              logs.map((log, i) => (
                <div key={i} className="text-emerald-400 mb-1">
                  {log}
                </div>
              ))
            )}
          </div>
        </section>
        
        {/* Call to Action for Contributors */}
        <footer className="text-center space-y-4 pt-12 border-t border-neutral-800">
          <h3 className="text-xl font-semibold">Open for Contributions</h3>
          <p className="text-neutral-400 text-sm max-w-xl mx-auto">
            This is a foundational scaffold for the Drips Wave. We have open issues for implementing Freighter, actual Stellar transaction submission, and dashboard UIs.
          </p>
          <a href="https://github.com/your-repo/moon" className="inline-block text-blue-400 hover:text-blue-300 hover:underline">
            View on GitHub →
          </a>
        </footer>
      </div>
    </main>
  );
}
