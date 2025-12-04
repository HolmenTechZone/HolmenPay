import React from 'react';
import { Transaction } from '@/types';

interface StatsCardsProps {
  transactions: Transaction[];
}

const StatsCards: React.FC<StatsCardsProps> = ({ transactions }) => {
  const thisMonth = transactions.filter(t => t.date.startsWith('2024-12'));
  const totalSpent = thisMonth.filter(t => t.type !== 'funding').reduce((sum, t) => sum + t.amount, 0);
  const successRate = Math.round((thisMonth.filter(t => t.status === 'success').length / Math.max(thisMonth.length, 1)) * 100);
  const totalTx = thisMonth.length;

  const stats = [
    { label: 'Total Spent', value: `₦${totalSpent.toLocaleString()}`, change: 'This month', color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Transactions', value: totalTx.toString(), change: 'This month', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Success Rate', value: `${successRate}%`, change: 'All time', color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-500">{stat.label}</span>
            <span className={`text-xs px-2 py-1 rounded-full ${stat.bg} ${stat.color}`}>{stat.change}</span>
          </div>
          <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
