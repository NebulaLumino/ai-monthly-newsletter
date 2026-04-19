"use client";
import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({ companyName: "", monthYear: "", highlights: "", productUpdates: "", teamNews: "", industryNews: "" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult("");
    setError("");
    try {
      const res = await fetch("/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      setResult(data.result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-pink-600/20 border border-pink-500/30 mb-6">
            <svg className="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
            AI Monthly Newsletter Generator
          </h1>
          <p className="text-gray-400 text-lg">Generate a polished monthly newsletter with highlights, updates, and more.</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-gray-900/60 border border-gray-700/50 rounded-2xl p-8 mb-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Company / Product Name</label>
              <input type="text" required value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} placeholder="Nebula AI" className="w-full bg-gray-800/80 border border-gray-600/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/70 focus:ring-1 focus:ring-pink-500/30 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Month / Year</label>
              <input type="text" required value={form.monthYear} onChange={(e) => setForm({ ...form, monthYear: e.target.value })} placeholder="April 2026" className="w-full bg-gray-800/80 border border-gray-600/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/70 focus:ring-1 focus:ring-pink-500/30 transition-all" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Key Highlights</label>
            <textarea required rows={3} value={form.highlights} onChange={(e) => setForm({ ...form, highlights: e.target.value })} placeholder="Shipped 3 major features, crossed 10,000 users, won 2 industry awards..." className="w-full bg-gray-800/80 border border-gray-600/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/70 focus:ring-1 focus:ring-pink-500/30 transition-all resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Product Updates</label>
            <textarea required rows={3} value={form.productUpdates} onChange={(e) => setForm({ ...form, productUpdates: e.target.value })} placeholder="Released AI-powered analytics, redesigned dashboard, added dark mode..." className="w-full bg-gray-800/80 border border-gray-600/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/70 focus:ring-1 focus:ring-pink-500/30 transition-all resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Team News</label>
            <textarea required rows={3} value={form.teamNews} onChange={(e) => setForm({ ...form, teamNews: e.target.value })} placeholder="Welcomed 3 new engineers, promoted Jane to Head of Product..." className="w-full bg-gray-800/80 border border-gray-600/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/70 focus:ring-1 focus:ring-pink-500/30 transition-all resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Industry News</label>
            <textarea required rows={3} value={form.industryNews} onChange={(e) => setForm({ ...form, industryNews: e.target.value })} placeholder="AI regulation updates, new market trends, competitor launches..." className="w-full bg-gray-800/80 border border-gray-600/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/70 focus:ring-1 focus:ring-pink-500/30 transition-all resize-none" />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2">
            {loading ? (<><svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Generating...</>) : (<><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>Generate Newsletter</>)}
          </button>
        </form>
        {error && <div className="bg-red-900/30 border border-red-700/50 rounded-xl p-4 mb-8 text-red-300">{error}</div>}
        {result && (
          <div className="bg-gray-900/60 border border-gray-700/50 rounded-2xl p-8">
            <div className="flex items-center gap-2 mb-6"><svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><h2 className="text-xl font-semibold text-green-400">Generated Newsletter</h2></div>
            <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">{result}</div>
          </div>
        )}
      </div>
    </div>
  );
}
