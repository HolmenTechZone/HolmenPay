import React, { useState } from 'react';
import { Transaction } from '@/types';
import { PhoneIcon, LightningIcon, TvIcon, TransferIcon, WalletIcon } from '../icons/Icons';

interface HistoryPageProps {
  transactions: Transaction[];
}

const typeIcons = { airtime: PhoneIcon, electricity: LightningIcon, cable: TvIcon, transfer: TransferIcon, funding: WalletIcon };
const statusColors = { success: 'bg-emerald-100 text-emerald-700', pending: 'bg-amber-100 text-amber-700', failed: 'bg-red-100 text-red-700' };

const HistoryPage: React.FC<HistoryPageProps> = ({ transactions }) => {
  const [filter, setFilter] = useState('all');
  const filters = ['all', 'airtime', 'electricity', 'cable', 'transfer', 'funding'];
  const filtered = filter === 'all' ? transactions : transactions.filter(t => t.type === filter);

  const exportPDF = () => {
    alert('PDF export functionality would be implemented here');
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-gray-900">Transaction History</h2>
        <button onClick={exportPDF} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
          Export PDF
        </button>
      </div>
      <div className="p-4 border-b border-gray-100 flex flex-wrap gap-2">
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${filter === f ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {f}
          </button>
        ))}
      </div>
      <div className="divide-y divide-gray-100">
        {filtered.map(tx => {
          const Icon = typeIcons[tx.type];
          return (
            <div key={tx.id} className="p-4 flex items-center gap-4 hover:bg-gray-50">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <Icon className="w-6 h-6 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900">{tx.description}</p>
                <p className="text-sm text-gray-500">{tx.date} • {tx.reference}</p>
              </div>
              <div className="text-right">
                <p className={`font-bold text-lg ${tx.type === 'funding' ? 'text-emerald-600' : 'text-gray-900'}`}>
                  {tx.type === 'funding' ? '+' : '-'}₦{tx.amount.toLocaleString()}
                </p>
                <span className={`text-xs px-2 py-1 rounded-full ${statusColors[tx.status]}`}>{tx.status}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryPage;
