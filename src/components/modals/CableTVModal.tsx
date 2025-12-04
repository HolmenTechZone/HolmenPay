import React, { useState } from 'react';
import Modal from '../ui/Modal';
import { cableProviders, dstvPlans, gotvPlans, startimesPlans } from '@/data/providers';

interface CableTVModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (amount: number, desc: string) => void;
}

const plansByProvider: Record<string, typeof dstvPlans> = {
  dstv: dstvPlans,
  gotv: gotvPlans,
  startimes: startimesPlans,
};

const CableTVModal: React.FC<CableTVModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [provider, setProvider] = useState('dstv');
  const [plan, setPlan] = useState('');
  const [smartcard, setSmartcard] = useState('');
  const [loading, setLoading] = useState(false);

  const plans = plansByProvider[provider] || [];
  const selectedPlan = plans.find(p => p.id === plan);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!plan || !smartcard || !selectedPlan) return;
    setLoading(true);
    setTimeout(() => {
      const prov = cableProviders.find(p => p.id === provider);
      onSuccess(selectedPlan.price, `${prov?.name} ${selectedPlan.name} - ${smartcard}`);
      setLoading(false);
      setPlan(''); setSmartcard('');
      onClose();
    }, 1500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Cable TV Subscription">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Provider</label>
          <div className="grid grid-cols-3 gap-2">
            {cableProviders.map(p => (
              <button key={p.id} type="button" onClick={() => { setProvider(p.id); setPlan(''); }}
                className={`py-3 rounded-xl font-medium transition-all ${provider === p.id ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                {p.name}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Package</label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {plans.map(p => (
              <button key={p.id} type="button" onClick={() => setPlan(p.id)}
                className={`w-full p-3 rounded-xl border-2 text-left transition-all ${plan === p.id ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}>
                <div className="flex justify-between items-center">
                  <span className="font-medium">{p.name}</span>
                  <span className="text-indigo-600 font-bold">₦{p.price.toLocaleString()}</span>
                </div>
                <span className="text-xs text-gray-500">{p.duration}</span>
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Smartcard/IUC Number</label>
          <input type="text" value={smartcard} onChange={e => setSmartcard(e.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="Enter smartcard number"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500" />
        </div>
        <button type="submit" disabled={!plan || !smartcard || loading}
          className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50 transition-colors">
          {loading ? 'Processing...' : `Pay ₦${selectedPlan?.price.toLocaleString() || '0'}`}
        </button>
      </form>
    </Modal>
  );
};

export default CableTVModal;
