
import React, { useState, useEffect } from 'react';
import { Order, OrderStatus, PUCCFile } from '../types';
import OrderForm from './OrderForm';
import OrderList from './OrderList';

export type ApplicationType = 'PUCC' | 'DL' | 'RC' | 'INSURANCE' | 'ONLINE_SERVICES';

const Dashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('pucc_orders');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeFormType, setActiveFormType] = useState<ApplicationType | null>(null);
  const [lastCreatedOrder, setLastCreatedOrder] = useState<Order | null>(null);

  useEffect(() => {
    localStorage.setItem('pucc_orders', JSON.stringify(orders));
  }, [orders]);

  const handlePlaceOrder = (newOrder: Omit<Order, 'id' | 'status' | 'createdAt'>) => {
    const prefix = activeFormType === 'DL' ? 'DL' : (activeFormType === 'RC' ? 'RC' : (activeFormType === 'INSURANCE' ? 'INS' : (activeFormType === 'ONLINE_SERVICES' ? 'ONL' : 'ORD')));
    
    const order: Order = {
      ...newOrder,
      id: `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`,
      status: newOrder.documentPdf ? OrderStatus.APPROVED : OrderStatus.PENDING,
      createdAt: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    setOrders([order, ...orders]);
    setLastCreatedOrder(order);
    setActiveFormType(null);
  };

  const updateOrderStatus = (id: string, pdf: PUCCFile) => {
    setOrders(prev => prev.map(order => 
      order.id === id 
        ? { ...order, documentPdf: pdf, status: OrderStatus.APPROVED }
        : order
    ));
  };

  const handleWhatsAppShare = (order: Order) => {
    const phone = "9612221233";
    let type = 'PUCC';
    if (order.id.startsWith('DL')) type = 'DL';
    else if (order.id.startsWith('RC')) type = 'RC';
    else if (order.id.startsWith('INS')) type = 'INSURANCE';
    else if (order.id.startsWith('ONL')) type = 'ONLINE_SERVICES';

    const message = `*NEW ${type} Application Received*%0A%0A` +
      `*ID:* ${order.id}%0A` +
      `*Owner:* ${order.ownerName}%0A` +
      (order.dob ? `*DOB:* ${order.dob}%0A` : '') +
      `*Ref No:* ${order.vehicleNumber}%0A` +
      `*Category:* ${order.vehicleType}%0A` +
      `*Status:* ${order.status}%0A` +
      `*Date:* ${order.createdAt}%0A%0A` +
      `_Please process this application in the Digital World Cyber- Retail WebSpace Portal._`;
    
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message.replace(/%0A/g, '\n'))}`, '_blank');
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="animate-in fade-in slide-in-from-left-4 duration-500">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Active Applications</h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest">real-time compliance management</p>
        </div>
        <div className="flex flex-col gap-3 w-full md:w-auto animate-in fade-in slide-in-from-right-4 duration-500">
          <button
            type="button"
            onClick={() => {
              setLastCreatedOrder(null);
              setActiveFormType('ONLINE_SERVICES');
            }}
            className="flex items-center justify-center space-x-2 bg-rose-600 hover:bg-rose-700 text-white px-6 py-3.5 rounded-2xl font-bold shadow-lg transition-all active:scale-95 group text-center cursor-pointer"
          >
            <span className="text-xs uppercase tracking-wide font-montserrat font-bold">
              Online RC/ DL/ PAN & Lost PAN Find and Voter to Mobile Linking
            </span>
          </button>

          <button
            onClick={() => {
              setLastCreatedOrder(null);
              setActiveFormType('PUCC');
            }}
            className="flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all active:scale-95 group"
          >
            <span className="text-xs uppercase tracking-widest">PUCC- New Application</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-black text-slate-900 dark:text-white mb-4 uppercase tracking-widest">Payment Gateway</h3>
            <div className="flex flex-col items-center">
              <div className="bg-white p-3 rounded-2xl shadow-inner border border-slate-100 mb-4">
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=8837384515@okbizaxis%26pn=PUCC%20Express%26cu=INR" 
                  alt="Payment QR Code" 
                  className="w-48 h-48 object-contain"
                />
              </div>
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Standard UPI ID</p>
              <p className="text-xs font-mono font-bold text-slate-900 dark:text-emerald-400 bg-slate-50 dark:bg-slate-800/50 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 select-all">
                8837384515@okbizaxis
              </p>
            </div>
          </div>
        </div>

        {/* Main Orders List */}
        <div className="lg:col-span-2">
          {orders.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2rem] p-16 text-center">
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight">no active records</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest">system ledger is currently empty</p>
            </div>
          ) : (
            <OrderList 
              orders={orders} 
              onUpdateStatus={updateOrderStatus} 
            />
          )}
        </div>
      </div>

      {/* Modal logic */}
      {(activeFormType !== null || lastCreatedOrder) && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setActiveFormType(null);
              setLastCreatedOrder(null);
            }
          }}
        >
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden border dark:border-slate-800">
            <div className="p-8">
              {lastCreatedOrder ? (
                <div className="text-center space-y-6">
                  <div className="bg-emerald-100 dark:bg-emerald-900/30 p-4 rounded-full inline-block mx-auto">
                    <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">request logged</h3>
                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={() => handleWhatsAppShare(lastCreatedOrder)}
                      className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl shadow-xl transition-all uppercase tracking-widest text-xs"
                    >
                      Share with Admin
                    </button>
                    <button 
                      onClick={() => setLastCreatedOrder(null)}
                      className="text-xs font-black uppercase text-slate-400 hover:text-slate-900 tracking-widest"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              ) : (
                <OrderForm 
                  onSubmit={handlePlaceOrder} 
                  applicationType={activeFormType!} 
                  onClose={() => setActiveFormType(null)} 
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
