import React, { useState } from 'react';
import { VehicleType, Order, PUCCFile } from '../types';
import { ApplicationType } from './Dashboard';

interface OrderFormProps {
  onSubmit: (order: Omit<Order, 'id' | 'status' | 'createdAt'>) => void;
  applicationType: ApplicationType;
  onClose?: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ onSubmit, applicationType, onClose }) => {
  const [vehicleType, setVehicleType] = useState<VehicleType>(VehicleType.TWO_WHEELER);
  const [vehicleImage, setVehicleImage] = useState<PUCCFile | undefined>();
  const [documentPdf, setDocumentPdf] = useState<PUCCFile | undefined>();

  const isOnlineServices = applicationType === 'ONLINE_SERVICES';
  const isSimplifiedForm = applicationType === 'DL' || applicationType === 'RC' || applicationType === 'INSURANCE' || isOnlineServices;
  const isPUCC = applicationType === 'PUCC';
  const isInsurance = applicationType === 'INSURANCE';
  const isDL = applicationType === 'DL';
  const isRC = applicationType === 'RC';
  const showSupportPdf = !isSimplifiedForm && !isPUCC;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (file: PUCCFile) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setter({
          name: file.name,
          type: file.type,
          data: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isInsurance) {
      window.open('https://www.pbpartners.com/', '_blank');
    }

    onSubmit({
      ownerName: isInsurance ? 'Insurance Inquiry' : 
                 (isDL ? 'DL Service Request' : 
                 (isRC ? 'RC Service Request' : 
                 (isOnlineServices ? 'Online RC/DL/PAN Request' :
                 (isPUCC ? 'PUCC Service Request' : 'Standard Request')))),
      vehicleNumber: isInsurance ? 'SERVICE-INS' : 
                     (isDL ? 'SERVICE-DL' : 
                     (isRC ? 'SERVICE-RC' : 
                     (isOnlineServices ? 'SERVICE-ONLINE' :
                     (isPUCC ? 'SERVICE-PUCC' : 'SERVICE-GEN')))),
      dob: undefined,
      vehicleType,
      vehicleImage,
      documentPdf
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* High-Visibility Action for DL/RC/ONLINE_SERVICES */}
      {(isDL || isRC || isOnlineServices) && (
        <div className="p-6 bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-400 dark:border-amber-600 rounded-[2.5rem] animate-in zoom-in-95 duration-500 shadow-xl ring-8 ring-amber-400/5">
          <div className="flex items-start space-x-4">
            <div className="bg-amber-600 p-3 rounded-2xl text-white shadow-lg animate-bounce">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <p className="text-[10px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-1">
                  {isOnlineServices ? 'Online Verification & Linking' : 'Authorization Required'}
                </p>
                <h4 className="text-xl font-black text-amber-900 dark:text-amber-100 leading-tight lowercase">click here & confirm application</h4>
                <p className="text-xs text-amber-700/80 dark:text-amber-300/80 mt-2 font-medium">
                  {isOnlineServices
                    ? 'Online RC/ DL/ PAN retrieval, lost PAN find, and voter mobile linking require secure authorization and confirmation.'
                    : 'Digital copy retrieval requires secure authorization and service fee confirmation.'}
                </p>
              </div>
              
              <a 
                href="https://form.jotform.com/260033033975452" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center w-full bg-amber-600 hover:bg-amber-700 text-white px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-amber-600/20"
              >
                <span className="relative z-10 flex items-center lowercase font-montserrat">
                  click here & confirm application
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </span>
                <span className="absolute inset-0 rounded-2xl bg-amber-600 animate-pulse group-hover:hidden opacity-50"></span>
              </a>

              {isOnlineServices && (
                <div className="pt-3 border-t border-amber-300/60 dark:border-amber-700/40 space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-wider text-amber-800 dark:text-amber-300">
                    Quick Access Application Portals:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <a
                      href="https://form.jotform.com/260033033975452"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-[11px] font-bold text-center hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>RC-Pdf / Voter to Mobile Link</span>
                      <svg className="w-3.5 h-3.5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                    <a
                      href="https://form.jotform.com/260033033975452"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-[11px] font-bold text-center hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>DL-Pdf / PAN Find Portal</span>
                      <svg className="w-3.5 h-3.5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {!isSimplifiedForm && (
        <>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-tighter">service category</label>
            <div className="grid grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => setVehicleType(VehicleType.TWO_WHEELER)}
                className={`py-4 px-2 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${vehicleType === VehicleType.TWO_WHEELER ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400' : 'border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
              >
                <span className="text-2xl">🏍️</span>
                <span className="font-black text-[10px] uppercase">2 wheeler</span>
              </button>
              <button
                type="button"
                onClick={() => setVehicleType(VehicleType.THREE_WHEELER)}
                className={`py-4 px-2 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${vehicleType === VehicleType.THREE_WHEELER ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400' : 'border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
              >
                <span className="text-2xl">🛺</span>
                <span className="font-black text-[10px] uppercase">3 wheeler</span>
              </button>
              <button
                type="button"
                onClick={() => setVehicleType(VehicleType.FOUR_WHEELER)}
                className={`py-4 px-2 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${vehicleType === VehicleType.FOUR_WHEELER ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400' : 'border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
              >
                <span className="text-2xl">🚗</span>
                <span className="font-black text-[10px] uppercase">4 wheeler</span>
              </button>
            </div>
          </div>

          <div className={`grid grid-cols-1 ${showSupportPdf ? 'md:grid-cols-2' : ''} gap-6`}>
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 text-center leading-relaxed font-montserrat lowercase">
                  click <span className="text-rose-600 dark:text-rose-500 font-bold underline decoration-1">Submit PUCC Request</span> option to process
                </label>
              </div>
              <div className="relative group h-fit">
                {!isPUCC && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, setVehicleImage)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                )}
                <div className={`flex flex-col items-center justify-center min-h-[128px] border-2 border-dashed rounded-2xl text-center transition-all overflow-hidden p-4 ${vehicleImage ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 group-hover:border-emerald-300'}`}>
                  {vehicleImage ? (
                    <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
                      <div className="bg-emerald-600 p-3 rounded-full mb-3 shadow-lg shadow-emerald-500/20">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span className="text-xs font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">photo encrypted & saved</span>
                    </div>
                  ) : (
                    <>
                      {isPUCC && (
                        <div className="w-full p-5 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl shadow-md">
                          <div className="flex flex-col items-center space-y-4">
                            <div className="bg-rose-600 p-2.5 rounded-xl text-white shadow-md shadow-rose-600/30">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <div className="text-center">
                              <h4 className="text-sm font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight">official pucc application form</h4>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Direct submission via authorized digital certificate portal</p>
                            </div>
                            <a 
                              href="https://form.jotform.com/260033522251442" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="group relative flex items-center justify-center w-full bg-rose-600 hover:bg-rose-700 text-white px-5 py-4 rounded-xl font-black font-montserrat text-sm uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-rose-600/30"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span className="relative z-10 flex items-center gap-2">
                                <span>Submit PUCC Request</span>
                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </span>
                            </a>
                          </div>
                        </div>
                      )}
                      {!isPUCC && (
                        <span className="text-xs text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest">
                          click to upload vehicle photo
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {showSupportPdf && (
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-tighter">compliance document (pdf)</label>
                <div className="relative group h-32">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileUpload(e, setDocumentPdf)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className={`flex flex-col items-center justify-center h-full border-2 border-dashed rounded-2xl text-center transition-all ${documentPdf ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/10' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 group-hover:border-indigo-300'}`}>
                    {documentPdf ? (
                      <div className="flex flex-col items-center">
                        <div className="bg-indigo-600 p-2 rounded-xl text-white mb-2 shadow-md">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        </div>
                        <span className="text-[10px] text-indigo-700 dark:text-indigo-400 font-black uppercase tracking-widest truncate w-full px-4">
                          file attached successfully
                        </span>
                      </div>
                    ) : (
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest">
                        select verification file
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* For PUCC and Online Services, bottom submit button is removed as requested */}
      {!isPUCC && !isOnlineServices ? (
        <div className="space-y-3">
          <button
            type="submit"
            className="w-full py-5 bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-[0.2em] text-sm rounded-2xl shadow-2xl transition-all active:scale-[0.98]"
          >
            {isInsurance 
              ? 'access insurance portal' 
              : (isDL || isRC) 
                ? 'submit request' 
                : `submit ${applicationType} request`}
          </button>
          {onClose && (
            <div className="text-center">
              <button
                type="button"
                onClick={onClose}
                className="text-xs font-black uppercase text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 tracking-widest py-2 px-4 rounded-xl transition-colors"
              >
                Close Window
              </button>
            </div>
          )}
        </div>
      ) : isOnlineServices ? (
        <div className="pt-2 flex flex-col items-center gap-3">
          <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium text-center">
            Click the <strong className="text-amber-600 dark:text-amber-400">click here & confirm application</strong> button above to complete your request.
          </p>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-black uppercase text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 tracking-widest py-2 px-4 rounded-xl transition-colors"
            >
              Close Window
            </button>
          )}
        </div>
      ) : (
        <div className="pt-2 flex flex-col items-center gap-3">
          <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium text-center">
            Click the <strong className="text-rose-600 dark:text-rose-400">Submit PUCC Request</strong> button above to open and complete your application.
          </p>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-black uppercase text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 tracking-widest py-2 px-4 rounded-xl transition-colors"
            >
              Close Window
            </button>
          )}
        </div>
      )}
    </form>
  );
};

export default OrderForm;