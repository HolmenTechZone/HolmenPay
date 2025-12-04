import React, { useState } from 'react';
import { Transaction } from '@/types';
import { PhoneIcon, LightningIcon, TvIcon, TransferIcon, WalletIcon } from '../icons/Icons';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const typeIcons = {
  airtime: PhoneIcon,
  electricity: LightningIcon,
  cable: TvIcon,
  transfer: TransferIcon,
  funding: WalletIcon,
};

const statusColors = {
  success: 'bg-emerald-100 text-emerald-700',
  pending: 'bg-amber-100 text-amber-700',
  failed: 'bg-red-100 text-red-700',
};

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  const [filter, setFilter] = useState<string>('all');
  const filters = ['all', 'airtime', 'electricity', 'cable', 'transfer', 'funding'];

  const filtered = filter === 'all' ? transactions : transactions.filter(t => t.type === filter);

  const formatCurrency = (amount: number) => new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="p-4 border-b border-gray-100">
        <div className="flex flex-wrap gap-2">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${filter === f ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
        {filtered.map(tx => {
          const Icon = typeIcons[tx.type];
          return (
            <div key={tx.id} className="p-4 flex items-center gap-4 hover:bg-gray-50">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <Icon className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{tx.description}</p>
                <p className="text-sm text-gray-500">{tx.date}</p>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${tx.type === 'funding' ? 'text-emerald-600' : 'text-gray-900'}`}>
                  {tx.type === 'funding' ? '+' : '-'}{formatCurrency(tx.amount)}
                </p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[tx.status]}`}>{tx.status}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TransactionHistory;
