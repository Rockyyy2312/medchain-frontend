'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FolderOpen as Folder,
  CalendarDays,
  Shield,
  ClipboardList,
  UserCircle,
  HelpCircle,
  LogOut,
  ShieldHalf
} from 'lucide-react';

const sidebarItems = [
  { name: 'Dashboard', href: '/dashboard/patient', icon: LayoutDashboard },
  { name: 'Records', href: '/records', icon: Folder },
  { name: 'Appointments', href: '/appointments', icon: CalendarDays },
  { name: 'Access Control', href: '/access', icon: Shield },
  { name: 'Requests', href: '/requests', icon: ClipboardList },
  { name: 'Profile', href: '/profile', icon: UserCircle },
];

const bottomItems = [
  { name: 'Help Center', href: '/help', icon: HelpCircle },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="w-64 bg-slate-50/20 border-r border-slate-100 h-full flex flex-col justify-between hidden md:flex">
      <div className="p-6">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 mb-10 pt-2 cursor-pointer group hover:scale-[1.02] active:scale-95 transition-all">
          <div className="bg-blue-600 rounded-xl p-2.5 text-white shadow-md group-hover:bg-blue-700 transition-colors">
            <ShieldHalf className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-blue-600 leading-tight">MedChain</span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase mt-0.5">Patient Portal</span>
          </div>
        </Link>

        <div className="space-y-1 mt-6">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            // Strict match for Dashboard route, or starts with for others
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group mb-1.5 active:scale-95",
                  isActive
                    ? "bg-white text-blue-600 shadow-sm border border-slate-100/50"
                    : "text-slate-500 hover:bg-white hover:text-slate-900 hover:shadow-sm"
                )}
              >
                <Icon className={cn("mr-3 h-5 w-5 transition-colors", isActive ? "text-blue-600" : "text-slate-400 group-hover:text-blue-600")} />
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-1">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center px-4 py-3 rounded-xl text-sm font-semibold text-slate-500 hover:bg-white hover:text-slate-900 hover:shadow-sm active:scale-95 transition-all duration-200 group mb-1.5"
              >
                <Icon className="mr-3 h-5 w-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                {item.name}
              </Link>
            );
          })}
          <button
            onClick={() => router.push('/')}
            className="w-full flex items-center px-4 py-3 rounded-xl text-sm font-semibold text-slate-500 hover:bg-white hover:text-red-600 hover:shadow-sm active:scale-95 transition-all duration-200 group"
          >
            <LogOut className="mr-3 h-5 w-5 text-slate-400 group-hover:text-red-500 transition-colors" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
