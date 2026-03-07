'use client';

import { Bell, Search, Menu, Stethoscope } from 'lucide-react';

export function TopNavbar() {
    return (
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 sticky top-0 z-30 shadow-sm">
            <div className="flex items-center gap-4">
                <button className="md:hidden text-muted-foreground hover:text-foreground">
                    <Menu className="h-5 w-5" />
                </button>
                <div className="flex items-center gap-2 md:hidden">
                    <Stethoscope className="h-6 w-6 text-primary" />
                    <span className="font-bold text-lg text-primary tracking-tight">Medchain</span>
                </div>
                <div className="hidden md:flex items-center gap-2">
                    <Stethoscope className="h-7 w-7 text-primary" />
                    <span className="font-bold text-xl text-primary tracking-tight">Medchain</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                {/* Network Indicator */}
                <div className="hidden sm:flex items-center px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold border border-primary/20 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse" />
                    Polygon Matic
                </div>

                {/* Search */}
                <div className="hidden md:flex relative ml-4">
                    <Search className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search records..."
                        className="h-9 w-64 rounded-full border border-border bg-muted/50 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                </div>

                {/* Notifications */}
                <button className="relative p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full border border-card" />
                </button>

                {/* Profile Dropdown Simulation */}
                <div className="h-9 w-9 rounded-full bg-secondary border border-border flex items-center justify-center text-sm font-semibold text-secondary-foreground shadow-sm cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all">
                    DR
                </div>
            </div>
        </header>
    );
}
