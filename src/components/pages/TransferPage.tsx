import React, { useState } from 'react';
import { banks, sampleBeneficiaries } from '@/data/banks';

interface TransferPageProps {
  onSuccess: (amount: number, desc: string) => void;
  balance: number;
}

const TransferPage: React.FC<TransferPageProps> = ({ onSuccess, balance }) => {
  const [bank, setBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [amount, setAmount] = useState<number | ''>('');
  const [loading, setLoading] = useState(false);
  const [validating, setValidating] = useState(false);

  const validateAccount = () => {
    if (accountNumber.length === 10 && bank) {
      setValidating(true);
      setTimeout(() => { setAccountName('John Doe Verified'); setValidating(false); }, 1000);
    }
  };

  const selectBeneficiary = (b: typeof sampleBeneficiaries[0]) => {
    setBank(b.bankCode); setAccountNumber(b.accountNumber); setAccountName(b.name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountName || !amount || Number(amount) > balance) return;
    setLoading(true);
    setTimeout(() => {
      onSuccess(Number(amount), `Transfer to ${accountName}`);
      setLoading(false);
      setBank(''); setAccountNumber(''); setAccountName(''); setAmount('');
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto grid md:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Transfer Money</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Bank</label>
            <select value={bank} onChange={e => { setBank(e.target.value); setAccountName(''); }}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white">
              <option value="">Choose bank</option>
              {banks.map(b => <option key={b.id} value={b.code}>{b.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
            <input type="text" value={accountNumber} onChange={e => { setAccountNumber(e.target.value.replace(/\D/g, '').slice(0, 10)); setAccountName(''); }}
              onBlur={validateAccount} placeholder="0123456789" className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
            {validating && <p className="text-sm text-gray-500 mt-1">Validating account...</p>}
            {accountName && <p className="text-sm text-emerald-600 font-medium mt-1">{accountName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
            <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value) || '')} placeholder="Enter amount"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
            <p className="text-sm text-gray-500 mt-1">Available: ₦{balance.toLocaleString()}</p>
          </div>
          <button type="submit" disabled={!accountName || !amount || Number(amount) > balance || loading}
            className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-bold hover:opacity-90 disabled:opacity-50">
            {loading ? 'Processing...' : `Transfer ₦${amount ? Number(amount).toLocaleString() : '0'}`}
          </button>
        </form>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-bold text-gray-900 mb-4">Saved Beneficiaries</h3>
        <div className="space-y-3">
          {sampleBeneficiaries.map(b => (
            <button key={b.id} onClick={() => selectBeneficiary(b)}
              className="w-full p-4 rounded-xl border border-gray-200 text-left hover:border-emerald-300 hover:bg-emerald-50 transition-all">
              <p className="font-semibold text-gray-900">{b.name}</p>
              <p className="text-sm text-gray-500">{b.bankName} • {b.accountNumber}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransferPage;
