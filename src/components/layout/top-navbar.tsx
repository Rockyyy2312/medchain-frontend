'use client';

import { Bell, Search, Menu, Settings, User } from 'lucide-react';

export function TopNavbar() {
    return (
        <header className="h-20 border-b border-slate-100 bg-white flex items-center justify-between px-8 sticky top-0 z-30">
            <div className="flex items-center gap-4 w-full max-w-2xl">
                <button className="md:hidden text-slate-500 hover:text-slate-900 active:scale-95 transition-all p-2 rounded-lg hover:bg-slate-100">
                    <Menu className="h-5 w-5" />
                </button>

                {/* Search */}
                <div className="hidden md:flex relative w-full items-center">
                    <Search className="absolute left-4 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search records, doctors..."
                        className="h-11 w-full max-w-lg rounded-full bg-slate-100/70 hover:bg-slate-100 active:bg-slate-100/90 pl-11 pr-4 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all border-none"
                    />
                </div>
            </div>

            <div className="flex items-center gap-6">
                <button className="relative text-slate-500 hover:text-slate-900 hover:bg-slate-100 p-2.5 rounded-full active:scale-95 transition-all">
                    <Bell className="h-5 w-5" />
                </button>
                <button className="relative text-slate-500 hover:text-slate-900 hover:bg-slate-100 p-2.5 rounded-full active:scale-95 transition-all">
                    <Settings className="h-5 w-5" />
                </button>

                {/* Profile Avatar */}
                <button className="h-10 w-10 rounded-full bg-orange-100 border-2 border-white ring-2 ring-blue-100 flex items-center justify-center text-sm font-semibold text-orange-600 shadow-sm cursor-pointer hover:ring-blue-500 hover:scale-105 active:scale-95 overflow-hidden relative transition-all">
                    {/* Simulated avatar */}
                    <img src="https://i.pravatar.cc/150?img=68" alt="Profile" className="w-full h-full object-cover" />
                </button>
            </div>
        </header>
    );
}
