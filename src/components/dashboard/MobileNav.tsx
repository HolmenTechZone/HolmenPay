import React from 'react';
import { HomeIcon, PhoneIcon, LightningIcon, TvIcon, TransferIcon } from '../icons/Icons';

interface MobileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Home', icon: HomeIcon },
  { id: 'airtime', label: 'Airtime', icon: PhoneIcon },
  { id: 'electricity', label: 'Power', icon: LightningIcon },
  { id: 'cable', label: 'TV', icon: TvIcon },
  { id: 'transfer', label: 'Transfer', icon: TransferIcon },
];

const MobileNav: React.FC<MobileNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden z-40">
      <div className="flex justify-around py-2">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              activeTab === item.id ? 'text-indigo-600' : 'text-gray-500'
            }`}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs mt-1 font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;
