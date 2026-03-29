'use client';

import { Bell, Search, Menu, Settings, User } from 'lucide-react';
<<<<<<< HEAD
=======
import { usePathname } from 'next/navigation';
>>>>>>> 44ca52bdedef8288ca4a2a4b598a3d2d1047fc30

export function TopNavbar() {
    const pathname = usePathname();

    const getPageTitle = () => {
        if (pathname.includes('/records')) return 'My Records';
        if (pathname.includes('/appointments')) return 'Appointments';
        if (pathname.includes('/access')) return 'Access Control';
        if (pathname.includes('/requests')) return 'Access Requests';
        if (pathname.includes('/profile')) return 'Patient Profile';
        if (pathname.includes('/help')) return 'Help Center';
        // Add others as needed or return nothing for dashboard
        return '';
    };

    const title = getPageTitle();

    return (
        <header className="h-20 border-b border-slate-100 bg-white flex items-center justify-between px-8 sticky top-0 z-30">
<<<<<<< HEAD
            <div className="flex items-center gap-4 w-full max-w-2xl">
                <button className="md:hidden text-slate-500 hover:text-slate-900">
                    <Menu className="h-5 w-5" />
                </button>

                {/* Search */}
                <div className="hidden md:flex relative w-full items-center">
                    <Search className="absolute left-4 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search records, doctors..."
                        className="h-11 w-full max-w-lg rounded-full bg-slate-100/70 pl-11 pr-4 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all border-none"
                    />
                </div>
            </div>

            <div className="flex items-center gap-6">
                <button className="relative text-slate-500 hover:text-slate-900 transition-colors">
                    <Bell className="h-5 w-5" />
                </button>
                <button className="relative text-slate-500 hover:text-slate-900 transition-colors">
                    <Settings className="h-5 w-5" />
                </button>

                {/* Profile Avatar */}
                <div className="h-10 w-10 rounded-full bg-orange-100 border-2 border-white ring-2 ring-blue-100 flex items-center justify-center text-sm font-semibold text-orange-600 shadow-sm cursor-pointer overflow-hidden relative">
                    {/* Simulated avatar */}
                    <img src="https://i.pravatar.cc/150?img=68" alt="Profile" className="w-full h-full object-cover" />
=======
            <div className="flex flex-1 items-center gap-4">
                <button className="md:hidden text-slate-500 hover:text-slate-900 active:scale-95 transition-all p-2 rounded-lg hover:bg-slate-100">
                    <Menu className="h-5 w-5" />
                </button>

                {title && (
                    <h1 className="hidden md:block text-[1.5rem] font-bold text-blue-600 tracking-tight">
                        {title}
                    </h1>
                )}
            </div>

            <div className="flex items-center justify-end gap-6 flex-1">
                {/* Search */}
                <div className="hidden md:flex relative w-64 items-center">
                    <Search className="absolute left-4 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search records or doctors..."
                        className="h-10 w-full rounded-full bg-slate-50 hover:bg-slate-100 active:bg-slate-100/90 pl-11 pr-4 text-[13px] font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all border border-slate-100"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <button className="relative text-slate-500 hover:text-slate-900 hover:bg-slate-100 p-2 rounded-full active:scale-95 transition-all">
                        <Bell className="h-5 w-5" />
                    </button>

                    {/* Profile Avatar */}
                    <button className="h-9 w-9 rounded-full bg-slate-50 border-2 border-white ring-2 ring-slate-100 flex items-center justify-center text-sm font-semibold text-slate-400 shadow-sm cursor-pointer hover:ring-blue-500 hover:scale-105 active:scale-95 overflow-hidden relative transition-all">
                        <User className="w-5 h-5 text-slate-600" />
                    </button>
>>>>>>> 44ca52bdedef8288ca4a2a4b598a3d2d1047fc30
                </div>
            </div>
        </header>
    );
}
