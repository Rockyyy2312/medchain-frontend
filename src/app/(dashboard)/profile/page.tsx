'use client';

import { useState } from 'react';
import {
    Pencil, Copy, Droplets, AlertTriangle, Edit3, Bell, Shield, Fingerprint, Key, ChevronRight
} from "lucide-react"

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState('personal');
    const [reminders, setReminders] = useState(true);
    const [results, setResults] = useState(true);

    return (
        <div className="min-h-full bg-slate-50/50 pb-20 relative">
            <div className="flex-1 p-8 max-w-[1200px] mx-auto animate-in fade-in duration-500 mt-2 space-y-8">

                {/* Header Section */}
                <div className="space-y-2 mb-10">
                    <h2 className="text-[2.25rem] font-bold tracking-tight text-slate-900 leading-tight">
                        Patient Profile
                    </h2>
                    <p className="text-[15px] font-medium text-slate-500">
                        Manage your centralized health identity and clinical settings.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-8">

                    {/* Left Column */}
                    <div className="space-y-6">
                        {/* Profile Card */}
                        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center pb-8">
                            <div className="relative mb-6 group cursor-pointer">
                                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-900 bg-slate-100 shadow-sm">
                                    <img src="https://i.pravatar.cc/150?img=5" alt="Sarah J. Connor" className="w-full h-full object-cover" />
                                </div>
                                <div className="absolute bottom-0 right-0 w-9 h-9 bg-blue-600 rounded-full border-[3px] border-white flex items-center justify-center text-white hover:bg-blue-700 transition-colors shadow-sm">
                                    <Pencil className="w-4 h-4 ml-0.5" />
                                </div>
                            </div>

                            <h3 className="text-[1.35rem] font-bold text-slate-900 mb-1">Priya Sharma</h3>
                            <p className="text-[12px] font-medium text-slate-500 mb-8">Patient ID: #MC-8829-01</p>

                            <div className="bg-slate-50 w-full rounded-[1rem] p-4 flex items-center justify-between border border-slate-100/80 group hover:border-slate-200 hover:bg-slate-100/50 transition-colors cursor-pointer">
                                <div>
                                    <p className="text-[9px] font-extrabold text-slate-400 tracking-wider uppercase mb-1.5 text-left">WALLET ADDRESS</p>
                                    <p className="text-[12px] font-bold text-blue-600 tracking-wide font-mono">0x71C765...6789</p>
                                </div>
                                <div className="text-slate-400 group-hover:text-blue-600 transition-colors">
                                    <Copy className="w-4 h-4" />
                                </div>
                            </div>
                        </div>

                        {/* Quick Vitals */}
                        <div className="bg-slate-50 rounded-[2rem] p-7 border border-slate-100/80">
                            <h4 className="text-[14px] font-bold text-slate-900 mb-5 pl-1">Quick Vitals</h4>

                            <div className="space-y-3">
                                <div className="bg-white p-4 rounded-[1.25rem] flex items-center justify-between shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] border border-slate-100/50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                            <Droplets className="w-4 h-4" />
                                        </div>
                                        <span className="text-[13px] font-bold text-slate-700">Blood Type</span>
                                    </div>
                                    <span className="text-[13px] font-bold text-blue-600">O Positive</span>
                                </div>

                                <div className="bg-white p-4 rounded-[1.25rem] flex items-center justify-between shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] border border-slate-100/50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-orange-50 text-[#cc5500] flex items-center justify-center shrink-0">
                                            <AlertTriangle className="w-4 h-4" />
                                        </div>
                                        <span className="text-[13px] font-bold text-slate-700">Allergies</span>
                                    </div>
                                    <span className="text-[13px] font-bold text-[#cc5500]">Penicillin</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">

                        {/* Tabs */}
                        <div className="bg-white border border-slate-100 shadow-sm p-1.5 rounded-[1.25rem] flex items-center mb-8">
                            <button
                                onClick={() => setActiveTab('personal')}
                                className={`flex-1 py-3.5 text-[14px] font-bold rounded-xl transition-all ${activeTab === 'personal' ? 'bg-white text-blue-600 shadow-sm border border-slate-100/50' : 'text-slate-500 hover:text-slate-700'
                                    }`}
                            >
                                Personal Info
                            </button>
                            <button
                                onClick={() => setActiveTab('medical')}
                                className={`flex-1 py-3.5 text-[14px] font-bold rounded-xl transition-all ${activeTab === 'medical' ? 'bg-white text-blue-600 shadow-sm border border-slate-100/50' : 'text-slate-500 hover:text-slate-700'
                                    }`}
                            >
                                Medical Info
                            </button>
                            <button
                                onClick={() => setActiveTab('settings')}
                                className={`flex-1 py-3.5 text-[14px] font-bold rounded-xl transition-all ${activeTab === 'settings' ? 'bg-white text-blue-600 shadow-sm border border-slate-100/50' : 'text-slate-500 hover:text-slate-700'
                                    }`}
                            >
                                Settings
                            </button>
                        </div>

                        {/* Identity & Contact Card */}
                        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-[18px] font-bold text-slate-900">Identity & Contact</h3>
                                <button className="flex items-center gap-2 text-[13px] font-bold text-blue-600 hover:text-blue-800 transition-colors">
                                    <Edit3 className="w-3.5 h-3.5" /> Edit Details
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-extrabold text-slate-500">Full Legal Name</label>
                                    <div className="w-full bg-slate-50/80 border border-slate-100/80 text-slate-900 text-[14px] font-medium p-3.5 rounded-xl">
                                        Priya Sharma
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-extrabold text-slate-500">Date of Birth</label>
                                    <div className="w-full bg-slate-50/80 border border-slate-100/80 text-slate-900 text-[14px] font-medium p-3.5 rounded-xl">
                                        May 12, 1984
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-extrabold text-slate-500">Email Address</label>
                                    <div className="w-full bg-slate-50/80 border border-slate-100/80 text-slate-900 text-[14px] font-medium p-3.5 rounded-xl">
                                        priya.sharma@gmail.com
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-extrabold text-slate-500">Phone Number</label>
                                    <div className="w-full bg-slate-50/80 border border-slate-100/80 text-slate-900 text-[14px] font-medium p-3.5 rounded-xl">
                                        +91 98765 43210
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[11px] font-extrabold text-slate-500">Residential Address</label>
                                <div className="w-full bg-slate-50/80 border border-slate-100/80 text-slate-900 text-[14px] font-medium p-3.5 rounded-xl">
                                    Block B, 1st Floor, Indira Nagar, Bangalore 560038
                                </div>
                            </div>
                        </div>

                        {/* Bottom Row (Notifications & Security) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Notifications */}
                            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                        <Bell className="w-4 h-4" />
                                    </div>
                                    <h3 className="text-[15px] font-bold text-slate-900">Notifications</h3>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center justify-between cursor-pointer" onClick={() => setReminders(!reminders)}>
                                        <span className="text-[13px] font-medium text-slate-700">Appointment Reminders</span>
                                        <div className={`w-11 h-6 rounded-full transition-colors flex items-center px-1 shrink-0 ${reminders ? 'bg-blue-600 justify-end' : 'bg-slate-200 justify-start'}`}>
                                            <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between cursor-pointer" onClick={() => setResults(!results)}>
                                        <span className="text-[13px] font-medium text-slate-700">New Test Results</span>
                                        <div className={`w-11 h-6 rounded-full transition-colors flex items-center px-1 shrink-0 ${results ? 'bg-blue-600 justify-end' : 'bg-slate-200 justify-start'}`}>
                                            <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Security Options */}
                            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                        <Shield className="w-4 h-4" />
                                    </div>
                                    <h3 className="text-[15px] font-bold text-slate-900">Security Options</h3>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center justify-between cursor-pointer group">
                                        <div className="flex items-center gap-3 text-slate-400 group-hover:text-blue-600 transition-colors">
                                            <Fingerprint className="w-4 h-4" />
                                            <span className="text-[13px] font-medium text-slate-700">Biometric Authentication</span>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
                                    </div>
                                    <div className="flex items-center justify-between cursor-pointer group">
                                        <div className="flex items-center gap-3 text-slate-400 group-hover:text-blue-600 transition-colors">
                                            <Key className="w-4 h-4" />
                                            <span className="text-[13px] font-medium text-slate-700">Two-Factor Auth (2FA)</span>
                                        </div>
                                        <span className="bg-[#fff5f0] text-[#cc5500] px-3 py-1 rounded-[0.4rem] text-[9px] font-black tracking-wider shadow-sm border border-[#fff5f0]">OFF</span>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Bottom Actions */}
                        <div className="flex flex-col md:flex-row items-center gap-4 pt-4">
                            <button className="flex-1 md:flex-none md:w-[65%] py-4 bg-blue-600 text-white font-bold text-[14px] rounded-[1.25rem] hover:bg-blue-700 active:scale-95 shadow-md shadow-blue-600/20 transition-all">
                                Save Changes
                            </button>
                            <button className="flex-1 md:flex-none md:w-[35%] py-4 bg-white border border-slate-200 text-slate-700 font-bold text-[14px] rounded-[1.25rem] hover:bg-slate-50 hover:text-slate-900 active:scale-95 transition-all shadow-sm">
                                Discard Edits
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}
