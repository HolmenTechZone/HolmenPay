import React, { useState } from 'react';
import Modal from '../ui/Modal';
import { electricityProviders } from '@/data/providers';

interface ElectricityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (amount: number, desc: string) => void;
}

const ElectricityModal: React.FC<ElectricityModalProps> = ({ isOpen, onClose, onSuccess }) => {
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
      onClose();
    }, 1500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Pay Electricity Bill">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Provider</label>
          <select
            value={provider}
            onChange={e => setProvider(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            <option value="">Choose provider</option>
            {electricityProviders.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Meter Type</label>
          <div className="grid grid-cols-2 gap-3">
            {(['prepaid', 'postpaid'] as const).map(type => (
              <button key={type} type="button" onClick={() => setMeterType(type)}
                className={`py-3 rounded-xl font-medium capitalize transition-all ${meterType === type ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                {type}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Meter Number</label>
          <input
            type="text"
            value={meterNumber}
            onChange={e => setMeterNumber(e.target.value.replace(/\D/g, '').slice(0, 13))}
            placeholder="Enter meter number"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Amount (₦)</label>
          <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value) || '')} placeholder="Enter amount" min="500"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500" />
          <p className="text-xs text-gray-500 mt-1">Minimum: ₦500</p>
        </div>
        <button type="submit" disabled={!provider || !meterNumber || !amount || loading}
          className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50 transition-colors">
          {loading ? 'Processing...' : `Pay ₦${amount ? Number(amount).toLocaleString() : '0'}`}
        </button>
      </form>
    </Modal>
  );
};

export default ElectricityModal;
