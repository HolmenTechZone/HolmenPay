import React from 'react';
import { PhoneIcon, LightningIcon, TvIcon, TransferIcon } from '../icons/Icons';

interface QuickActionsProps {
  onAction: (action: string) => void;
}

const actions = [
  { id: 'airtime', label: 'Buy Airtime', icon: PhoneIcon, gradient: 'from-orange-500 to-amber-500', desc: 'MTN, Glo, Airtel, 9mobile' },
  { id: 'electricity', label: 'Electricity', icon: LightningIcon, gradient: 'from-yellow-500 to-orange-500', desc: 'Pay your power bills' },
  { id: 'cable', label: 'Cable TV', icon: TvIcon, gradient: 'from-purple-500 to-indigo-500', desc: 'DSTV, GOtv, StarTimes' },
  { id: 'transfer', label: 'Transfer', icon: TransferIcon, gradient: 'from-emerald-500 to-teal-500', desc: 'Send money instantly' },
];

const QuickActions: React.FC<QuickActionsProps> = ({ onAction }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action) => (
        <button
          key={action.id}
          onClick={() => onAction(action.id)}
          className="group bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 text-left border border-gray-100 hover:border-transparent hover:-translate-y-1"
        >
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
            <action.icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">{action.label}</h3>
          <p className="text-sm text-gray-500">{action.desc}</p>
        </button>
      ))}
    </div>
  );
};

export default QuickActions;
