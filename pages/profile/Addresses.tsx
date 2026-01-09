
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore, Address } from '../../store/userStore';

export default function Addresses() {
  const navigate = useNavigate();
  const { addresses, addAddress, removeAddress } = useUserStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState<Partial<Address>>({
    tag: 'Home',
    city: 'Kurnool',
    isDefault: false
  });

  const handleSave = () => {
    if (newAddress.line1 && newAddress.pincode) {
      addAddress({
        id: Date.now().toString(),
        tag: newAddress.tag as any,
        line1: newAddress.line1 || '',
        line2: newAddress.line2 || '',
        city: newAddress.city || 'Kurnool',
        pincode: newAddress.pincode || '',
        isDefault: addresses.length === 0
      });
      setShowAddForm(false);
      setNewAddress({ tag: 'Home', city: 'Kurnool', isDefault: false });
    } else {
      alert('Please fill House No. and Pincode');
    }
  };

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-slate-900 dark:text-white pb-20 font-sans animate-fade-in">
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 px-4 py-4 flex items-center justify-between shadow-sm">
        <button 
          onClick={() => navigate(-1)}
          className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <span className="material-symbols-outlined text-[26px]">arrow_back</span>
        </button>
        <h1 className="text-lg font-black tracking-tight uppercase">Saved Addresses</h1>
        <div className="w-10"></div>
      </header>

      <main className="p-5 flex flex-col gap-5 max-w-2xl mx-auto">
        {addresses.map((addr) => (
          <div key={addr.id} className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 relative group animate-slide-up">
            <div className="flex justify-between items-start mb-3">
              <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${addr.tag === 'Home' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30' : 'bg-purple-50 text-purple-600 dark:bg-purple-900/30'}`}>
                {addr.tag}
              </span>
              <div className="flex gap-1">
                 <button className="p-2 text-gray-400 hover:text-primary transition-colors"><span className="material-symbols-outlined text-lg">edit</span></button>
                 <button onClick={() => removeAddress(addr.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><span className="material-symbols-outlined text-lg">delete</span></button>
              </div>
            </div>
            <h3 className="font-bold text-base mb-1">{addr.line1}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{addr.line2}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-bold mt-1 uppercase tracking-tight">{addr.city} • {addr.pincode}</p>
            
            {addr.isDefault && (
               <div className="mt-4 flex items-center gap-1.5 text-green-600 dark:text-green-400 text-[10px] font-black uppercase tracking-widest">
                  <span className="material-symbols-outlined text-[14px] filled">check_circle</span>
                  PRIMARY DELIVERY ADDRESS
               </div>
            )}
          </div>
        ))}

        {!showAddForm ? (
          <button 
            onClick={() => setShowAddForm(true)}
            className="w-full py-5 rounded-2xl border-2 border-dashed border-primary/30 text-primary font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-primary/5 transition-all active:scale-95 mt-2"
          >
            <span className="material-symbols-outlined text-xl">add_location_alt</span>
            Add New Address
          </button>
        ) : (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-xl border border-primary/20 animate-slide-up">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-black text-lg uppercase tracking-tight">New Address</h3>
              <button onClick={() => setShowAddForm(false)} className="text-gray-400"><span className="material-symbols-outlined">close</span></button>
            </div>
            <div className="flex flex-col gap-4">
               <div className="flex gap-2 p-1 bg-gray-50 dark:bg-gray-900 rounded-xl">
                 {['Home', 'Office', 'Other'].map(tag => (
                   <button 
                    key={tag}
                    onClick={() => setNewAddress({...newAddress, tag: tag as any})}
                    className={`flex-1 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${newAddress.tag === tag ? 'bg-primary text-white shadow-md' : 'text-gray-400'}`}
                   >
                     {tag}
                   </button>
                 ))}
               </div>
               <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Flat / House No.</label>
                    <input 
                      placeholder="e.g. Flat 402, Block A" 
                      className="w-full h-12 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-primary outline-none transition-all"
                      value={newAddress.line1 || ''}
                      onChange={e => setNewAddress({...newAddress, line1: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Street & Area</label>
                    <input 
                      placeholder="e.g. Park Road, Kurnool" 
                      className="w-full h-12 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-primary outline-none transition-all"
                      value={newAddress.line2 || ''}
                      onChange={e => setNewAddress({...newAddress, line2: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">City</label>
                      <input 
                        className="w-full h-12 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 font-bold"
                        value={newAddress.city || 'Kurnool'}
                        readOnly
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Pincode</label>
                      <input 
                        placeholder="518002" 
                        type="number"
                        className="w-full h-12 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-primary outline-none transition-all font-bold"
                        value={newAddress.pincode || ''}
                        onChange={e => setNewAddress({...newAddress, pincode: e.target.value})}
                      />
                    </div>
                  </div>
               </div>
               <div className="flex gap-3 mt-4">
                 <button onClick={handleSave} className="flex-1 h-14 rounded-2xl bg-primary text-white font-black uppercase tracking-widest shadow-lg shadow-primary/30 active:scale-[0.98] transition-all">Save Address</button>
               </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
