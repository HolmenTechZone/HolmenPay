import { Transaction } from '@/types';

export const sampleTransactions: Transaction[] = [
  { id: '1', type: 'airtime', description: 'MTN Airtime - 08012345678', amount: 1000, status: 'success', date: '2024-12-04 08:30', reference: 'TXN001234567' },
  { id: '2', type: 'electricity', description: 'Ikeja Electric - 45678901234', amount: 5000, status: 'success', date: '2024-12-04 07:15', reference: 'TXN001234568' },
  { id: '3', type: 'cable', description: 'DSTV Compact - 7023456789', amount: 10500, status: 'success', date: '2024-12-03 19:45', reference: 'TXN001234569' },
  { id: '4', type: 'transfer', description: 'Transfer to John Adeyemi', amount: 25000, status: 'success', date: '2024-12-03 14:20', reference: 'TXN001234570' },
  { id: '5', type: 'funding', description: 'Wallet Funding via Card', amount: 50000, status: 'success', date: '2024-12-03 10:00', reference: 'TXN001234571' },
  { id: '6', type: 'airtime', description: 'Glo Airtime - 08098765432', amount: 500, status: 'pending', date: '2024-12-02 16:30', reference: 'TXN001234572' },
  { id: '7', type: 'electricity', description: 'Eko Electric - 12345678901', amount: 10000, status: 'failed', date: '2024-12-02 12:45', reference: 'TXN001234573' },
  { id: '8', type: 'cable', description: 'GOtv Max - 1234567890', amount: 5700, status: 'success', date: '2024-12-01 20:15', reference: 'TXN001234574' },
  { id: '9', type: 'transfer', description: 'Transfer to Mary Okonkwo', amount: 15000, status: 'success', date: '2024-12-01 09:30', reference: 'TXN001234575' },
  { id: '10', type: 'airtime', description: 'Airtel Airtime - 08076543210', amount: 2000, status: 'success', date: '2024-11-30 18:00', reference: 'TXN001234576' },
  { id: '11', type: 'electricity', description: 'PHED - 98765432101', amount: 7500, status: 'success', date: '2024-11-30 11:20', reference: 'TXN001234577' },
  { id: '12', type: 'funding', description: 'Wallet Funding via Bank', amount: 100000, status: 'success', date: '2024-11-29 15:45', reference: 'TXN001234578' },
  { id: '13', type: 'cable', description: 'StarTimes Classic - 9876543210', amount: 3000, status: 'success', date: '2024-11-29 08:10', reference: 'TXN001234579' },
  { id: '14', type: 'transfer', description: 'Transfer to David Chukwu', amount: 8000, status: 'success', date: '2024-11-28 17:30', reference: 'TXN001234580' },
  { id: '15', type: 'airtime', description: '9mobile Airtime - 08091234567', amount: 300, status: 'success', date: '2024-11-28 13:00', reference: 'TXN001234581' },
];
