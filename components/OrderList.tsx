
import React, { useState } from 'react';
import { Order, OrderStatus, PUCCFile, VehicleType } from '../types';

interface OrderListProps {
  orders: Order[];
  onUpdateStatus: (id: string, pdf: PUCCFile) => void;
}

const OrderList: React.FC<OrderListProps> = ({ orders, onUpdateStatus }) => {
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
  
  const toggleExpand = (id: string) => {
    const next = new Set(expandedOrders);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpandedOrders(next);
  };

  const handleDownload = (file: PUCCFile) => {
    const link = document.createElement('a');
    link.href = file.data;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleWhatsAppShare = (order: Order) => {
    const phone = "9612221233";
    const message = `*STATUS UPDATE*%0A%0A` +
      `*ID:* ${order.id}%0A` +
      `*Owner:* ${order.ownerName}%0A` +
      `*Vehicle:* ${order.vehicleNumber}%0A` +
      (order.dob ? `*DOB:* ${order.dob}%0A` : '') +
      `*Status:* ${order.status}%0A` +
      `*Date:* ${order.createdAt}%0A%0A` +
      `_Generated via Digital World Cyber- Retail WebSpace_`;
    
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message.replace(/%0A/g, '\n'))}`, '_blank');
  };

  const handlePdfUploadForExisting = (e: React.ChangeEvent<HTMLInputElement>, orderId: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateStatus(orderId, {
          name: file.name,
          type: file.type,
          data: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const getVehicleDisplay = (type: VehicleType) => {
    switch (type) {
      case VehicleType.TWO_WHEELER: return '🏍️ 2-WHEEL RIG';
      case VehicleType.THREE_WHEELER: return '🛺 3-WHEEL RIG';
      case VehicleType.FOUR_WHEELER: return '🚗 4-WHEEL RIG';
      default: return type;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-2">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight uppercase">Registry Ledger</h3>
        <span className="text-[10px] font-black text-slate-400 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full">{orders.length} TOTAL</span>
      </div>
      
      <div className="space-y-4">
        {orders.map((order) => {
          const isExpanded = expandedOrders.has(order.id);
          const isApproved = order.status === OrderStatus.APPROVED;
          
          return (
            <div 
              key={order.id} 
              className={`bg-white dark:bg-slate-900 rounded-[2rem] border-l-[10px] p-6 shadow-sm transition-all hover:shadow-xl group ${isApproved ? 'border-emerald-500' : 'border-slate-300 dark:border-slate-800'}`}
            >
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="space-y-3 flex-grow">
                  <div className="flex items-center space-x-3">
                    <span className="text-[10px] font-mono font-black bg-slate-50 dark:bg-slate-800 px-3 py-1 rounded-lg text-slate-500 border dark:border-slate-700">{order.id}</span>
                    <h4 className="font-black text-slate-900 dark:text-white text-lg tracking-tight uppercase">{order.ownerName}</h4>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500">
                    <span className="flex items-center space-x-1.5 font-bold dark:text-slate-400">
                      <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      <span className="tracking-wide">{order.vehicleNumber}</span>
                    </span>
                    <button 
                      onClick={() => toggleExpand(order.id)}
                      className="text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-widest hover:bg-emerald-50 dark:hover:bg-emerald-900/20 px-3 py-1 rounded-lg transition-colors"
                    >
                      {isExpanded ? 'Collapse' : 'Audit Data'}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-4">
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => handleWhatsAppShare(order)}
                      className="p-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg transition-all active:scale-90"
                      title="Share to Desk"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86(9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    </button>
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${isApproved ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    {order.documentPdf ? (
                      <div className="flex items-center space-x-1">
                        <button 
                          onClick={() => handleDownload(order.documentPdf!)}
                          className="p-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-all"
                          title="Download Compliance PDF"
                        >
                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        </button>
                      </div>
                    ) : (
                      <div className="relative group">
                        <input 
                          type="file" 
                          accept=".pdf"
                          onChange={(e) => handlePdfUploadForExisting(e, order.id)}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        />
                        <button className="px-4 py-2 text-[10px] bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-black uppercase tracking-widest rounded-xl border border-amber-200 dark:border-amber-800 transition-all shadow-sm">
                          Post PDF
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 animate-in slide-in-from-top-4 duration-500">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-3xl border border-slate-100 dark:border-slate-800">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Subject</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white uppercase">{order.ownerName}</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-3xl border border-slate-100 dark:border-slate-800">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Reference No.</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white font-mono tracking-tighter">{order.vehicleNumber}</p>
                    </div>
                    {order.dob && (
                      <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-3xl border border-slate-100 dark:border-slate-800">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Date of Birth</p>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{order.dob}</p>
                      </div>
                    )}
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-3xl border border-slate-100 dark:border-slate-800">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Classification</p>
                      <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
                        {getVehicleDisplay(order.vehicleType)}
                      </p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-3xl border border-slate-100 dark:border-slate-800">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Timestamp</p>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{order.createdAt}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex flex-col sm:flex-row gap-4">
                    <div className="flex-grow p-5 rounded-3xl bg-slate-900 dark:bg-slate-950 text-white shadow-xl">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Compliance Audit</span>
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed font-medium">
                        Digital verification complete. Documentation stored in decentralized registry. Current status: <span className="text-white font-bold">{order.status}</span>. Reference ID linked to vehicle chassis.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderList;
