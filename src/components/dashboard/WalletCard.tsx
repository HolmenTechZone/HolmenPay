import React from 'react';
import { WalletIcon } from '../icons/Icons';

interface WalletCardProps {
  balance: number;
  onFundWallet: () => void;
}

const WalletCard: React.FC<WalletCardProps> = ({ balance, onFundWallet }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#1a1f36] via-[#2d3561] to-[#4f46e5] rounded-2xl p-6 text-white">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      <div className="relative">
        <div className="flex items-center gap-2 text-white/70 mb-2">
          <WalletIcon className="w-5 h-5" />
          <span className="text-sm font-medium">Wallet Balance</span>
        </div>
        <div className="text-3xl md:text-4xl font-bold mb-6">
          {formatCurrency(balance)}
        </div>
        <button
          onClick={onFundWallet}
          className="bg-white text-[#1a1f36] px-6 py-3 rounded-xl font-semibold hover:bg-white/90 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Fund Wallet
        </button>
      </div>
    </div>
  );
};

export default WalletCard;
