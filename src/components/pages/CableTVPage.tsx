import React, { useState } from 'react';
import { cableProviders, dstvPlans, gotvPlans, startimesPlans } from '@/data/providers';

interface CableTVPageProps {
  onSuccess: (amount: number, desc: string) => void;
}

const plansByProvider: Record<string, typeof dstvPlans> = { dstv: dstvPlans, gotv: gotvPlans, startimes: startimesPlans };

const CableTVPage: React.FC<CableTVPageProps> = ({ onSuccess }) => {
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
    }, 1500);
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Cable TV Subscription</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Select Provider</label>
            <div className="grid grid-cols-3 gap-3">
              {cableProviders.map(p => (
                <button key={p.id} type="button" onClick={() => { setProvider(p.id); setPlan(''); }}
                  className={`py-4 rounded-xl font-semibold transition-all ${provider === p.id ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  {p.name}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Select Package</label>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
              {plans.map(p => (
                <button key={p.id} type="button" onClick={() => setPlan(p.id)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${plan === p.id ? 'border-purple-600 bg-purple-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">{p.name}</span>
                    <span className="text-purple-600 font-bold text-lg">₦{p.price.toLocaleString()}</span>
                  </div>
                  <span className="text-sm text-gray-500">{p.duration}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Smartcard/IUC Number</label>
            <input type="text" value={smartcard} onChange={e => setSmartcard(e.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="Enter smartcard number"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 text-lg" />
          </div>
          <button type="submit" disabled={!plan || !smartcard || loading}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold text-lg hover:opacity-90 disabled:opacity-50 transition-all">
            {loading ? 'Processing...' : `Subscribe - ₦${selectedPlan?.price.toLocaleString() || '0'}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CableTVPage;
