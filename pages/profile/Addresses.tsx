
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore, UIAddress } from '../../store/userStore';
import { useAuth } from '../../components/AuthProvider';

export default function Addresses() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addresses, addAddress, removeAddress, setDefaultAddress, fetchAddresses, loading } = useUserStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newAddress, setNewAddress] = useState<Partial<UIAddress>>({
    tag: 'Home',
    city: 'Kurnool',
    isDefault: false
  });

  // Fetch addresses on mount
  useEffect(() => {
    if (user?.id) {
      fetchAddresses();
    }
  }, [user?.id, fetchAddresses]);

  const handleSave = async () => {
    if (newAddress.line1 && newAddress.pincode) {
      setSaving(true);
      try {
        await addAddress({
          tag: newAddress.tag as any,
          line1: newAddress.line1 || '',
          line2: newAddress.line2 || '',
          city: newAddress.city || 'Kurnool',
          pincode: newAddress.pincode || '',
          isDefault: addresses.length === 0
        });
        setShowAddForm(false);
        setNewAddress({ tag: 'Home', city: 'Kurnool', isDefault: false });
      } catch (error) {
        console.error('Error saving address:', error);
        alert('Failed to save address. Please try again.');
      } finally {
        setSaving(false);
      }
    } else {
      alert('Please fill House No. and Pincode');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await removeAddress(id);
    } catch (error) {
      console.error('Error deleting address:', error);
      alert('Failed to delete address. Please try again.');
    }
  };

  const handleSetDefault = async (id: string) => {
    try {
      await setDefaultAddress(id);
    } catch (error) {
      console.error('Error setting default address:', error);
    }
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-bg-light dark:bg-bg-dark pb-20 animate-pulse">
        <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-4 py-4 flex items-center justify-between">
          <div className="size-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="w-10"></div>
        </header>
        <div className="p-5 space-y-4">
          {[1, 2].map(i => (
            <div key={i} className="h-32 rounded-2xl bg-gray-200 dark:bg-gray-700"></div>
          ))}
        </div>
      </div>
    );
  }

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
        {addresses.length === 0 && !showAddForm && (
          <div className="text-center py-12">
            <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">location_off</span>
            <p className="text-gray-500">No addresses saved yet</p>
          </div>
        )}

        {addresses.map((addr) => (
          <div key={addr.id} className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 relative group animate-slide-up">
            <div className="flex justify-between items-start mb-3">
              <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${addr.tag === 'Home' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30' : addr.tag === 'Office' ? 'bg-purple-50 text-purple-600 dark:bg-purple-900/30' : 'bg-gray-50 text-gray-600 dark:bg-gray-700'}`}>
                {addr.tag}
              </span>
              <div className="flex gap-1">
                {!addr.isDefault && (
                  <button
                    onClick={() => handleSetDefault(addr.id)}
                    className="p-2 text-gray-400 hover:text-green-500 transition-colors"
                    title="Set as default"
                  >
                    <span className="material-symbols-outlined text-lg">check_circle</span>
                  </button>
                )}
                <button className="p-2 text-gray-400 hover:text-primary transition-colors"><span className="material-symbols-outlined text-lg">edit</span></button>
                <button onClick={() => handleDelete(addr.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><span className="material-symbols-outlined text-lg">delete</span></button>
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
                    onClick={() => setNewAddress({ ...newAddress, tag: tag as any })}
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
                    onChange={e => setNewAddress({ ...newAddress, line1: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Street & Area</label>
                  <input
                    placeholder="e.g. Park Road, Kurnool"
                    className="w-full h-12 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-primary outline-none transition-all"
                    value={newAddress.line2 || ''}
                    onChange={e => setNewAddress({ ...newAddress, line2: e.target.value })}
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
                      onChange={e => setNewAddress({ ...newAddress, pincode: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 h-14 rounded-2xl bg-primary text-white font-black uppercase tracking-widest shadow-lg shadow-primary/30 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {saving && <span className="material-symbols-outlined animate-spin">sync</span>}
                  {saving ? 'Saving...' : 'Save Address'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
