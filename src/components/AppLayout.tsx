import React, { useState } from 'react';
import { useDashboard } from '@/hooks/useDashboard';
import Sidebar from './dashboard/Sidebar';
import Header from './dashboard/Header';
import MobileNav from './dashboard/MobileNav';
import SuccessToast from './dashboard/SuccessToast';
import DashboardHome from './dashboard/DashboardHome';
import AirtimePage from './pages/AirtimePage';
import ElectricityPage from './pages/ElectricityPage';
import CableTVPage from './pages/CableTVPage';
import TransferPage from './pages/TransferPage';
import HistoryPage from './pages/HistoryPage';
import FundWalletModal from './modals/FundWalletModal';

const AppLayout: React.FC = () => {
  const {
    balance, transactions, activeTab, setActiveTab,
    sidebarOpen, setSidebarOpen, toast, hideToast,
    handleAirtime, handleElectricity, handleCable, handleTransfer, handleFunding,
  } = useDashboard();

  const [fundModalOpen, setFundModalOpen] = useState(false);

  const handleQuickAction = (action: string) => {
    if (action === 'history') setActiveTab('history');
    else setActiveTab(action);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'airtime':
        return <AirtimePage onSuccess={handleAirtime} />;
      case 'electricity':
        return <ElectricityPage onSuccess={handleElectricity} />;
      case 'cable':
        return <CableTVPage onSuccess={handleCable} />;
      case 'transfer':
        return <TransferPage onSuccess={handleTransfer} balance={balance} />;
      case 'history':
        return <HistoryPage transactions={transactions} />;
      default:
        return (
          <DashboardHome
            balance={balance}
            transactions={transactions}
            onFundWallet={() => setFundModalOpen(true)}
            onQuickAction={handleQuickAction}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 lg:p-6 pb-24 lg:pb-6">
          {renderContent()}
        </main>
      </div>
      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <FundWalletModal
        isOpen={fundModalOpen}
        onClose={() => setFundModalOpen(false)}
        onSuccess={handleFunding}
      />
      <SuccessToast message={toast.message} isVisible={toast.visible} onClose={hideToast} />
    </div>
  );
};

export default AppLayout;
