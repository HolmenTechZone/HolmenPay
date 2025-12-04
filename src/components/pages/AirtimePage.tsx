import React, { useState } from 'react';
import { networkProviders } from '@/data/providers';

interface AirtimePageProps {
  onSuccess: (amount: number, desc: string) => void;
}

const amounts = [100, 200, 500, 1000, 2000, 5000];

const AirtimePage: React.FC<AirtimePageProps> = ({ onSuccess }) => {
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
    }, 1500);
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Buy Airtime</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Select Network</label>
            <div className="grid grid-cols-4 gap-3">
              {networkProviders.map(n => (
                <button key={n.id} type="button" onClick={() => setNetwork(n.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${network === n.id ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <span className="text-3xl block mb-1">{n.logo}</span>
                  <p className="text-sm font-medium">{n.name}</p>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input type="tel" value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 11))} placeholder="08012345678"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Select Amount</label>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {amounts.map(a => (
                <button key={a} type="button" onClick={() => setAmount(a)}
                  className={`py-3 rounded-xl font-semibold transition-all ${amount === a ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  ₦{a.toLocaleString()}
                </button>
              ))}
            </div>
            <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value) || '')} placeholder="Or enter custom amount"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500" />
          </div>
          <button type="submit" disabled={!network || !phone || !amount || loading}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:opacity-90 disabled:opacity-50 transition-all">
            {loading ? 'Processing...' : `Buy Airtime - ₦${amount ? Number(amount).toLocaleString() : '0'}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AirtimePage;
