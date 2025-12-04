import React, { useState } from 'react';
import Modal from '../ui/Modal';
import { banks, sampleBeneficiaries } from '@/data/banks';

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (amount: number, desc: string) => void;
  balance: number;
}

const TransferModal: React.FC<TransferModalProps> = ({ isOpen, onClose, onSuccess, balance }) => {
  const [tab, setTab] = useState<'new' | 'saved'>('new');
  const [bank, setBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [amount, setAmount] = useState<number | ''>('');
  const [loading, setLoading] = useState(false);
  const [validating, setValidating] = useState(false);

  const validateAccount = () => {
    if (accountNumber.length === 10 && bank) {
      setValidating(true);
      setTimeout(() => {
        setAccountName('John Doe Verified');
        setValidating(false);
      }, 1000);
    }
  };

  const selectBeneficiary = (b: typeof sampleBeneficiaries[0]) => {
    setBank(b.bankCode);
    setAccountNumber(b.accountNumber);
    setAccountName(b.name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountName || !amount || Number(amount) > balance) return;
    setLoading(true);
    setTimeout(() => {
      onSuccess(Number(amount), `Transfer to ${accountName}`);
      setLoading(false);
      setBank(''); setAccountNumber(''); setAccountName(''); setAmount('');
      onClose();
    }, 1500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Transfer Money">
      <div className="flex gap-2 mb-5">
        {(['new', 'saved'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-1 py-2 rounded-lg font-medium capitalize ${tab === t ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
            {t === 'new' ? 'New Transfer' : 'Saved'}
          </button>
        ))}
      </div>
      {tab === 'saved' ? (
        <div className="space-y-2">
          {sampleBeneficiaries.map(b => (
            <button key={b.id} onClick={() => { selectBeneficiary(b); setTab('new'); }}
              className="w-full p-3 rounded-xl border border-gray-200 text-left hover:border-indigo-300 hover:bg-indigo-50">
              <p className="font-medium">{b.name}</p>
              <p className="text-sm text-gray-500">{b.bankName} - {b.accountNumber}</p>
            </button>
          ))}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bank</label>
            <select value={bank} onChange={e => { setBank(e.target.value); setAccountName(''); }}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white">
              <option value="">Select bank</option>
              {banks.map(b => <option key={b.id} value={b.code}>{b.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
            <input type="text" value={accountNumber} onChange={e => { setAccountNumber(e.target.value.replace(/\D/g, '').slice(0, 10)); setAccountName(''); }}
              onBlur={validateAccount} placeholder="0123456789" className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
            {validating && <p className="text-sm text-gray-500 mt-1">Validating...</p>}
            {accountName && <p className="text-sm text-emerald-600 mt-1">{accountName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
            <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value) || '')} placeholder="Enter amount"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
            <p className="text-xs text-gray-500 mt-1">Balance: ₦{balance.toLocaleString()}</p>
          </div>
          <button type="submit" disabled={!accountName || !amount || Number(amount) > balance || loading}
            className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold disabled:opacity-50">
            {loading ? 'Processing...' : `Transfer ₦${amount ? Number(amount).toLocaleString() : '0'}`}
          </button>
        </form>
      )}
    </Modal>
  );
};

export default TransferModal;
