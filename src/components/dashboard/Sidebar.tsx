import React from 'react';
import { HomeIcon, PhoneIcon, LightningIcon, TvIcon, TransferIcon, HistoryIcon, WalletIcon, CloseIcon } from '../icons/Icons';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: HomeIcon },
  { id: 'airtime', label: 'Buy Airtime', icon: PhoneIcon },
  { id: 'electricity', label: 'Electricity', icon: LightningIcon },
  { id: 'cable', label: 'Cable TV', icon: TvIcon },
  { id: 'transfer', label: 'Transfer', icon: TransferIcon },
  { id: 'history', label: 'History', icon: HistoryIcon },
];

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      )}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#1a1f36] transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <WalletIcon className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">PayEase</span>
          </div>
          <button onClick={onClose} className="lg:hidden p-2 text-white/70 hover:text-white">
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); onClose(); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-indigo-600 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
