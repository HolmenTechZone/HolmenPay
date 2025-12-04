import React, { useState } from 'react';
import Modal from '../ui/Modal';

interface FundWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (amount: number) => void;
}

const methods = [
  { id: 'card', name: 'Debit Card', icon: '💳', desc: 'Visa, Mastercard, Verve' },
  { id: 'bank', name: 'Bank Transfer', icon: '🏦', desc: 'Transfer from any bank' },
  { id: 'ussd', name: 'USSD', icon: '📱', desc: 'Dial *737# or *901#' },
];

const amounts = [1000, 2000, 5000, 10000, 20000, 50000];

const FundWalletModal: React.FC<FundWalletModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [method, setMethod] = useState('card');
  const [amount, setAmount] = useState<number | ''>('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    setLoading(true);
    setTimeout(() => {
      onSuccess(Number(amount));
      setLoading(false);
      setAmount('');
      onClose();
    }, 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Fund Wallet">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
          <div className="space-y-2">
            {methods.map(m => (
              <button key={m.id} type="button" onClick={() => setMethod(m.id)}
                className={`w-full p-4 rounded-xl border-2 text-left flex items-center gap-4 transition-all ${method === m.id ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}>
                <span className="text-2xl">{m.icon}</span>
                <div>
                  <p className="font-medium">{m.name}</p>
                  <p className="text-sm text-gray-500">{m.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {amounts.map(a => (
              <button key={a} type="button" onClick={() => setAmount(a)}
                className={`py-2 rounded-lg font-medium transition-all ${amount === a ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                ₦{a.toLocaleString()}
              </button>
            ))}
          </div>
          <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value) || '')} placeholder="Enter custom amount" min="100"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500" />
        </div>
        <button type="submit" disabled={!amount || loading}
          className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 transition-all">
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Processing...
            </span>
          ) : `Fund ₦${amount ? Number(amount).toLocaleString() : '0'}`}
        </button>
      </form>
    </Modal>
  );
};

export default FundWalletModal;
