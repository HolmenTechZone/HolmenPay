import React, { useState } from 'react';
import Modal from '../ui/Modal';
import { networkProviders } from '@/data/providers';

interface AirtimeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (amount: number, desc: string) => void;
}

const amounts = [100, 200, 500, 1000, 2000, 5000];

const AirtimeModal: React.FC<AirtimeModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [network, setNetwork] = useState('');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState<number | ''>('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!network || !phone || !amount) return;
    setLoading(true);
    setTimeout(() => {
      const provider = networkProviders.find(n => n.id === network);
      onSuccess(Number(amount), `${provider?.name} Airtime - ${phone}`);
      setLoading(false);
      setNetwork(''); setPhone(''); setAmount('');
      onClose();
    }, 1500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Buy Airtime">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Network</label>
          <div className="grid grid-cols-4 gap-2">
            {networkProviders.map(n => (
              <button
                key={n.id}
                type="button"
                onClick={() => setNetwork(n.id)}
                className={`p-3 rounded-xl border-2 transition-all ${network === n.id ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}
              >
                <span className="text-2xl">{n.logo}</span>
                <p className="text-xs font-medium mt-1">{n.name}</p>
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 11))}
            placeholder="08012345678"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
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
          <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value) || '')} placeholder="Enter custom amount"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500" />
        </div>
        <button type="submit" disabled={!network || !phone || !amount || loading}
          className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
          {loading ? 'Processing...' : `Pay ₦${amount ? Number(amount).toLocaleString() : '0'}`}
        </button>
      </form>
    </Modal>
  );
};

export default AirtimeModal;
