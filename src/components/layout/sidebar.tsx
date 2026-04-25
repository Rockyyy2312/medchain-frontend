'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useWalletStore } from '@/store/useWalletStore';
import {
  LayoutDashboard,
  FolderOpen as Folder,
  CalendarDays,
  Shield,
  ClipboardList,
  UserCircle,
  HelpCircle,
  LogOut,
  ShieldHalf,
  Share2
} from 'lucide-react';

const patientSidebarItems = [
  { name: 'Dashboard', href: '/dashboard/patient', icon: LayoutDashboard },
  { name: 'Records', href: '/records', icon: Folder },
  { name: 'Appointments', href: '/appointments', icon: CalendarDays },
  { name: 'Access Control', href: '/access', icon: Shield },
  { name: 'Requests', href: '/requests', icon: ClipboardList },
  { name: 'Profile', href: '/profile', icon: UserCircle },
];

const doctorSidebarItems = [
  { name: 'Dashboard', href: '/dashboard/doctor', icon: LayoutDashboard },
  { name: 'Shared with Me', href: '/records', icon: Share2 },
  { name: 'Access Control', href: '/access', icon: Shield },
  { name: 'Profile', href: '/profile', icon: UserCircle },
];

const bottomItems = [
  { name: 'Help Center', href: '/help', icon: HelpCircle },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { role } = useWalletStore();

  const isDoctor = role === 'doctor';
  const sidebarItems = isDoctor ? doctorSidebarItems : patientSidebarItems;

  const handleSignOut = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_role');
    document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = '/login';
  };

  return (
    <div className="w-64 bg-slate-50/20 border-r border-slate-100 h-full flex flex-col justify-between hidden md:flex">
      <div className="p-6">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 mb-10 pt-2 cursor-pointer group hover:scale-[1.02] active:scale-95 transition-all">
          <div className={cn("rounded-xl p-2.5 text-white shadow-md transition-colors", isDoctor ? "bg-emerald-600 group-hover:bg-emerald-700" : "bg-blue-600 group-hover:bg-blue-700")}>
            <ShieldHalf className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className={cn("text-xl font-extrabold tracking-tight leading-tight", isDoctor ? "text-emerald-600" : "text-blue-600")}>MedChain</span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase mt-0.5">
              {isDoctor ? 'Provider Portal' : 'Patient Portal'}
            </span>
          </div>
        </Link>

        <div className="space-y-1 mt-6">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);
            const accentColor = isDoctor ? 'text-emerald-600' : 'text-blue-600';
            const activeBg = isDoctor
              ? 'bg-white text-emerald-600 shadow-sm border border-slate-100/50'
              : 'bg-white text-blue-600 shadow-sm border border-slate-100/50';
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group mb-1.5 active:scale-95",
                  isActive
                    ? activeBg
                    : "text-slate-500 hover:bg-white hover:text-slate-900 hover:shadow-sm"
                )}
              >
                <Icon className={cn("mr-3 h-5 w-5 transition-colors", isActive ? accentColor : `text-slate-400 group-hover:${accentColor}`)} />
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
            onClick={handleSignOut}
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
