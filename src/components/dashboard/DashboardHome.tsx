import React from 'react';
import WalletCard from './WalletCard';
import QuickActions from './QuickActions';
import StatsCards from './StatsCards';
import TransactionHistory from './TransactionHistory';
import { Transaction } from '@/types';

interface DashboardHomeProps {
  balance: number;
  transactions: Transaction[];
  onFundWallet: () => void;
  onQuickAction: (action: string) => void;
}

const heroImage = 'https://d64gsuwffb70l.cloudfront.net/69314facba73dc9dcc4ddac1_1764839455792_ddea28cb.webp';

const DashboardHome: React.FC<DashboardHomeProps> = ({ balance, transactions, onFundWallet, onQuickAction }) => {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden">
        <img src={heroImage} alt="PayEase" className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1f36]/90 to-transparent flex items-center px-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Pay Bills Instantly</h2>
            <p className="text-white/80">Airtime, Electricity, Cable TV & Transfers</p>
          </div>
        </div>
      </div>

      {/* Wallet Card */}
      <WalletCard balance={balance} onFundWallet={onFundWallet} />

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
        <QuickActions onAction={onQuickAction} />
      </div>

      {/* Stats */}
      <StatsCards transactions={transactions} />

      {/* Recent Transactions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Recent Transactions</h3>
          <button onClick={() => onQuickAction('history')} className="text-indigo-600 text-sm font-medium hover:underline">
            View All
          </button>
        </div>
        <TransactionHistory transactions={transactions.slice(0, 5)} />
      </div>
    </div>
  );
};

export default DashboardHome;
