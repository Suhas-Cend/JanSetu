import React, { useState } from 'react';
import { Home, PlusCircle, ShieldCheck, Trophy, UserCircle, LogOut } from 'lucide-react';

export default function AppLayout({ role = 'citizen', children }) {
  const [activeScreen, setActiveScreen] = useState('home');

  const navItems = role === 'citizen' 
    ? [
        { id: 'home', label: 'Home', icon: Home },
        { id: 'post', label: 'Post Awaaz', icon: PlusCircle },
        { id: 'verify', label: 'AI Verification View', icon: ShieldCheck },
        { id: 'ledger', label: 'Public Team Ledger', icon: Trophy },
        { id: 'profile', label: 'Profile', icon: UserCircle },
      ]
    : [
        { id: 'home', label: 'Home', icon: Home },
        { id: 'verify', label: 'AI Verification View', icon: ShieldCheck },
        { id: 'ledger', label: 'Public Team Ledger', icon: Trophy },
        { id: 'profile', label: 'Profile', icon: UserCircle },
      ];

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 font-lora overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[260px] flex flex-col bg-[var(--color-primary)] text-white">
        <div className="p-6 font-bebas text-3xl tracking-wide border-b border-white/20">
          AWAAZ APP
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveScreen(item.id)}
                className={`flex items-center w-full gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeScreen === item.id ? 'bg-white/20 font-bold' : 'hover:bg-white/10'
                }`}
              >
                <Icon size={20} strokeWidth={1.5} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCircle size={24} />
            <span className="text-sm">{role === 'citizen' ? 'R. Sharma' : 'Officer Patel'}</span>
          </div>
          <button className="text-white/70 hover:text-white"><LogOut size={18} /></button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}
