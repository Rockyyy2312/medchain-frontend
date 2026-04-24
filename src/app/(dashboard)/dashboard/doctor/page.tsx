'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Search, ShieldCheck, Users, FileText, Activity, Link2,
    ArrowRight, ClipboardCheck, Eye, Clock, Stethoscope, Share2
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function DoctorDashboard() {
    const router = useRouter();
    const [tokenInput, setTokenInput] = useState('');

    const handleTokenLookup = () => {
        if (tokenInput.trim()) {
            router.push(`/share/${tokenInput.trim()}`);
        }
    };

    return (
        <div className="min-h-full bg-slate-50/50 pb-16">
            <div className="flex-1 space-y-10 p-8 max-w-[1100px] animate-in fade-in duration-500 mt-2">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-[2rem] font-bold tracking-tight text-slate-900 flex items-center gap-2">
                            Welcome, Dr. Provider 👋
                        </h2>
                        <p className="text-slate-500 font-semibold mt-2 text-[15px]">
                            Access patient records securely using share tokens.
                        </p>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center gap-2 px-5 py-2.5 bg-emerald-50/80 text-emerald-600 font-bold rounded-full shadow-sm text-sm border border-emerald-100/50 hover:bg-emerald-100 hover:shadow-md cursor-pointer transition-all active:scale-95">
                            <Stethoscope className="w-4 h-4" />
                            Provider Account
                        </div>
                    </div>
                </div>

                {/* Token Lookup Card — Primary CTA */}
                <Card className="relative overflow-hidden border border-emerald-100 shadow-sm rounded-[2rem] bg-gradient-to-br from-emerald-50/40 to-white group hover:shadow-lg transition-all">
                    <div className="absolute right-[-8%] top-[-15%] opacity-[0.04] pointer-events-none">
                        <Link2 className="w-[280px] h-[280px] text-emerald-600" />
                    </div>
                    <CardContent className="p-8 space-y-6 relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                                <Share2 className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-[1.35rem] font-bold text-slate-900">Access Shared Records</h3>
                                <p className="text-slate-500 font-medium text-[14px] mt-1">
                                    Enter a patient&apos;s share token to view their medical records securely.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Paste share token here (e.g., aBcD3f...xYz)"
                                    value={tokenInput}
                                    onChange={(e) => setTokenInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleTokenLookup()}
                                    className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-6 py-4 text-[15px] font-medium text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-300 transition-all outline-none"
                                />
                            </div>
                            <Button
                                onClick={handleTokenLookup}
                                disabled={!tokenInput.trim()}
                                className="px-8 py-4 h-auto bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold rounded-2xl shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Eye className="w-5 h-5 mr-2" />
                                Access Records
                            </Button>
                        </div>

                        <p className="text-[12px] font-medium text-slate-400 flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            Tokens expire after 1 hour. All access is logged on the blockchain.
                        </p>
                    </CardContent>
                </Card>

                {/* Stats Row */}
                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="border-0 shadow-sm rounded-[1.5rem] bg-slate-50 hover:bg-slate-100 hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer flex items-center group">
                        <CardContent className="p-6 flex items-center justify-center gap-5 w-full">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0 border border-slate-100 group-hover:border-emerald-200 transition-colors">
                                <Users className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div className="flex flex-col">
                                <p className="text-[11px] font-extrabold text-slate-500 tracking-widest mb-1">PATIENTS SHARED</p>
                                <h4 className="text-[1.75rem] font-extrabold text-slate-900 leading-none">12</h4>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-0 shadow-sm rounded-[1.5rem] bg-slate-50 hover:bg-slate-100 hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer flex items-center group">
                        <CardContent className="p-6 flex items-center justify-center gap-5 w-full">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0 border border-slate-100 group-hover:border-emerald-200 transition-colors">
                                <Eye className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div className="flex flex-col">
                                <p className="text-[11px] font-extrabold text-slate-500 tracking-widest mb-1">TOKEN LOOKUPS TODAY</p>
                                <h4 className="text-[1.75rem] font-extrabold text-slate-900 leading-none">05</h4>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-0 shadow-sm rounded-[1.5rem] bg-slate-50 hover:bg-slate-100 hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer flex items-center group">
                        <CardContent className="p-6 flex items-center justify-center gap-5 w-full">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0 border border-slate-100 group-hover:border-emerald-200 transition-colors">
                                <FileText className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div className="flex flex-col">
                                <p className="text-[11px] font-extrabold text-slate-500 tracking-widest mb-1">RECORDS ACCESSED</p>
                                <h4 className="text-[1.75rem] font-extrabold text-slate-900 leading-none">38</h4>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Shared Records */}
                <div className="space-y-5">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-slate-900">Recently Accessed Records</h3>
                        <span className="text-[13px] font-bold text-emerald-600 cursor-pointer hover:text-emerald-800 active:scale-95 transition-all">View all</span>
                    </div>

                    <div className="space-y-4">
                        {/* Record 1 */}
                        <Card className="border border-slate-100/50 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-md hover:-translate-y-0.5 transition-all rounded-[1.5rem] bg-white cursor-pointer group">
                            <CardContent className="p-5 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-[15px] font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">Annual Physical Report</h4>
                                        <p className="text-[13px] font-medium text-slate-500 mt-0.5">General Health • Dr. Williams • Oct 15, 2023</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 shrink-0">
                                    <span className="px-3 py-1.5 bg-emerald-50 text-emerald-600 text-[11px] font-bold rounded-full">CONFIRMED</span>
                                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Record 2 */}
                        <Card className="border border-slate-100/50 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-md hover:-translate-y-0.5 transition-all rounded-[1.5rem] bg-white cursor-pointer group">
                            <CardContent className="p-5 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center shrink-0">
                                        <Activity className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-[15px] font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">Chest X-Ray Results</h4>
                                        <p className="text-[13px] font-medium text-slate-500 mt-0.5">Radiology • Dr. Patel • Nov 02, 2023</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 shrink-0">
                                    <span className="px-3 py-1.5 bg-yellow-50 text-yellow-600 text-[11px] font-bold rounded-full">PENDING</span>
                                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Record 3 */}
                        <Card className="border border-slate-100/50 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-md hover:-translate-y-0.5 transition-all rounded-[1.5rem] bg-white cursor-pointer group">
                            <CardContent className="p-5 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center shrink-0">
                                        <ClipboardCheck className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-[15px] font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">Blood Panel Results</h4>
                                        <p className="text-[13px] font-medium text-slate-500 mt-0.5">Laboratory • Dr. Lee • Sep 28, 2023</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 shrink-0">
                                    <span className="px-3 py-1.5 bg-emerald-50 text-emerald-600 text-[11px] font-bold rounded-full">CONFIRMED</span>
                                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Info Banner */}
                <div className="bg-emerald-600 rounded-[2rem] p-8 text-white flex flex-col md:flex-row items-center justify-between shadow-lg shadow-emerald-600/20">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-[11px] font-extrabold tracking-wider text-emerald-200">
                            <ShieldCheck className="w-4 h-4" /> SECURE ACCESS
                        </div>
                        <h3 className="text-[1.75rem] font-bold">All Record Access is Audited</h3>
                        <p className="text-[14px] font-medium text-emerald-100 max-w-xl">
                            Every token lookup and record view is cryptographically signed and timestamped on the MedChain blockchain for complete transparency.
                        </p>
                    </div>
                    <div className="mt-6 md:mt-0 flex items-center gap-8 bg-emerald-500/30 rounded-3xl px-8 py-5 border border-emerald-400/30">
                        <div className="flex flex-col items-center">
                            <span className="text-[10px] font-extrabold text-emerald-200 tracking-wider">ACTIVE TOKENS</span>
                            <span className="text-[2.25rem] leading-none font-black mt-1">07</span>
                        </div>
                        <div className="w-px h-12 bg-emerald-400/50"></div>
                        <div className="flex flex-col items-center">
                            <span className="text-[10px] font-extrabold text-emerald-200 tracking-wider">EXPIRED (24H)</span>
                            <span className="text-[2.25rem] leading-none font-black mt-1">03</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
