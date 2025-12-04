import { useState, useCallback } from 'react';
import { Transaction } from '@/types';
import { sampleTransactions } from '@/data/transactions';

export const useDashboard = () => {
  const [balance, setBalance] = useState(125750);
  const [transactions, setTransactions] = useState<Transaction[]>(sampleTransactions);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '' });

  const showToast = useCallback((message: string) => {
    setToast({ visible: true, message });
  }, []);

  const hideToast = useCallback(() => {
    setToast({ visible: false, message: '' });
  }, []);

  const handleTransaction = useCallback((amount: number, description: string, type: Transaction['type']) => {
    const newTx: Transaction = {
      id: Date.now().toString(),
      type,
      description,
      amount,
      status: 'success',
      date: new Date().toISOString().slice(0, 16).replace('T', ' '),
      reference: `TXN${Date.now()}`,
    };
    setTransactions(prev => [newTx, ...prev]);
    if (type === 'funding') {
      setBalance(prev => prev + amount);
      showToast(`Wallet funded with ₦${amount.toLocaleString()}`);
    } else {
      setBalance(prev => prev - amount);
      showToast(`${description} - ₦${amount.toLocaleString()}`);
    }
  }, [showToast]);

  const handleAirtime = useCallback((amount: number, desc: string) => {
    handleTransaction(amount, desc, 'airtime');
  }, [handleTransaction]);

  const handleElectricity = useCallback((amount: number, desc: string) => {
    handleTransaction(amount, desc, 'electricity');
  }, [handleTransaction]);

  const handleCable = useCallback((amount: number, desc: string) => {
    handleTransaction(amount, desc, 'cable');
  }, [handleTransaction]);

  const handleTransfer = useCallback((amount: number, desc: string) => {
    handleTransaction(amount, desc, 'transfer');
  }, [handleTransaction]);

  const handleFunding = useCallback((amount: number) => {
    handleTransaction(amount, 'Wallet Funding', 'funding');
  }, [handleTransaction]);

  return {
    balance,
    transactions,
    activeTab,
    setActiveTab,
    sidebarOpen,
    setSidebarOpen,
    toast,
    hideToast,
    handleAirtime,
    handleElectricity,
    handleCable,
    handleTransfer,
    handleFunding,
  };
};
