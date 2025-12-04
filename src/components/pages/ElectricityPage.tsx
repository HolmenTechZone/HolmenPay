import React, { useState } from 'react';
import { electricityProviders } from '@/data/providers';

interface ElectricityPageProps {
  onSuccess: (amount: number, desc: string) => void;
}

const ElectricityPage: React.FC<ElectricityPageProps> = ({ onSuccess }) => {
  const [provider, setProvider] = useState('');
  const [meterType, setMeterType] = useState<'prepaid' | 'postpaid'>('prepaid');
  const [meterNumber, setMeterNumber] = useState('');
  const [amount, setAmount] = useState<number | ''>('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!provider || !meterNumber || !amount) return;
    setLoading(true);
    setTimeout(() => {
      const prov = electricityProviders.find(p => p.id === provider);
      onSuccess(Number(amount), `${prov?.name} - ${meterNumber}`);
      setLoading(false);
      setProvider(''); setMeterNumber(''); setAmount('');
    }, 1500);
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Pay Electricity Bill</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Provider</label>
            <select value={provider} onChange={e => setProvider(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 bg-white text-lg">
              <option value="">Choose electricity provider</option>
              {electricityProviders.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Meter Type</label>
            <div className="grid grid-cols-2 gap-4">
              {(['prepaid', 'postpaid'] as const).map(type => (
                <button key={type} type="button" onClick={() => setMeterType(type)}
                  className={`py-4 rounded-xl font-semibold capitalize transition-all ${meterType === type ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Meter Number</label>
            <input type="text" value={meterNumber} onChange={e => setMeterNumber(e.target.value.replace(/\D/g, '').slice(0, 13))} placeholder="Enter your meter number"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 text-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount (₦)</label>
            <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value) || '')} placeholder="Enter amount" min="500"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 text-lg" />
            <p className="text-sm text-gray-500 mt-2">Minimum amount: ₦500</p>
          </div>
          <button type="submit" disabled={!provider || !meterNumber || !amount || loading}
            className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-bold text-lg hover:opacity-90 disabled:opacity-50 transition-all">
            {loading ? 'Processing...' : `Pay ₦${amount ? Number(amount).toLocaleString() : '0'}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ElectricityPage;
