'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  BarChart,
  FolderLock,
  UploadCloud,
  UserCheck,
  ShieldCheck,
  ActivitySquare,
  Settings,
  HelpCircle,
  LogOut,
  Bell
} from 'lucide-react';

const sidebarItems = [
  { name: 'Dashboard', href: '/dashboard/patient', icon: LayoutDashboard },
  { name: 'Analytics', href: '/analytics', icon: BarChart },
  { name: 'Patient Records', href: '/records', icon: FolderLock },
  { name: 'Upload Record', href: '/upload-record', icon: UploadCloud },
  { name: 'Access Management', href: '/access', icon: UserCheck },
  { name: 'Access Requests', href: '/access/requests', icon: Bell },
  { name: 'Audit Logs', href: '/audit', icon: ShieldCheck },
  { name: 'Activity Timeline', href: '/activity', icon: ActivitySquare },
];

const bottomItems = [
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Help Center', href: '/help', icon: HelpCircle },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-card border-r border-border h-full flex flex-col justify-between hidden md:flex rounded-tr-2xl rounded-br-2xl shadow-sm">
      <div className="p-6">
        <div className="space-y-1 mt-6">
          <p className="text-xs uppercase text-muted-foreground font-semibold tracking-wider mb-4 px-3">Menu</p>
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className={cn("mr-3 h-5 w-5 transition-colors", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
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
                className="flex items-center px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-200 group"
              >
                <Icon className="mr-3 h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                {item.name}
              </Link>
            );
          })}
          <button className="w-full flex items-center px-3 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-all duration-200 mt-2">
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
