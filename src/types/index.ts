export interface Transaction {
  id: string;
  type: 'airtime' | 'electricity' | 'cable' | 'transfer' | 'funding';
  description: string;
  amount: number;
  status: 'success' | 'pending' | 'failed';
  date: string;
  reference: string;
}

export interface Beneficiary {
  id: string;
  name: string;
  accountNumber: string;
  bankCode: string;
  bankName: string;
}

export interface CablePlan {
  id: string;
  name: string;
  price: number;
  duration: string;
}

export interface ElectricityProvider {
  id: string;
  name: string;
  code: string;
}

export interface Bank {
  id: string;
  name: string;
  code: string;
}

export interface NetworkProvider {
  id: string;
  name: string;
  logo: string;
}
