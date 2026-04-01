'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import {
  LayoutDashboard,
  HelpCircle,
  Users,
  Trophy,
  LogOut,
  Shield,
} from 'lucide-react';
import Link from 'next/link';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/questions', label: 'Questions', icon: HelpCircle },
  { href: '/admin/leads', label: 'Leads', icon: Users },
  { href: '/admin/leaderboard', label: 'Leaderboard', icon: Trophy },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, signOut } = useAdminAuth();
  const pathname = usePathname();
  const router = useRouter();

  // Don't gate the login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amac-blue" />
      </div>
    );
  }

  if (!user) {
    router.push('/admin/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-amac-blue" />
            <div>
              <h1 className="text-lg font-bold text-white">USA Test</h1>
              <p className="text-xs text-gray-400">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-amac-blue text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <div className="text-xs text-gray-400 mb-2 truncate">{user.email}</div>
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
