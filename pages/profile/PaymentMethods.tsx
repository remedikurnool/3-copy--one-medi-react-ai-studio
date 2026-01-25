
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PaymentMethods() {
  const navigate = useNavigate();
  const [cards, setCards] = useState([
      { id: 1, type: 'HDFC BANK', number: '4242', holder: 'SIVA KUMAR', exp: '12/25', isPrimary: true },
      { id: 2, type: 'SBI Debit Card', number: '8832', holder: 'SIVA KUMAR', exp: '09/24', isPrimary: false }
  ]);
  const [upis, setUpis] = useState([
      { id: 1, provider: 'PhonePe', id_val: 'siva@ybl' },
      { id: 2, provider: 'Google Pay', id_val: 'siva@okaxis' }
  ]);

  const [showAddCard, setShowAddCard] = useState(false);
  const [showAddUpi, setShowAddUpi] = useState(false);
  
  // Dummy Form States
  const [newCard, setNewCard] = useState({ number: '', holder: '', exp: '' });
  const [newUpi, setNewUpi] = useState('');

  const handleAddCard = () => {
      if(newCard.number) {
          setCards([...cards, { 
              id: Date.now(), 
              type: 'New Card', 
              number: newCard.number.slice(-4), 
              holder: newCard.holder || 'USER', 
              exp: newCard.exp || '12/30', 
              isPrimary: false 
          }]);
          setShowAddCard(false);
          setNewCard({ number: '', holder: '', exp: '' });
      }
  };

  const handleAddUpi = () => {
      if(newUpi) {
          setUpis([...upis, { id: Date.now(), provider: 'UPI', id_val: newUpi }]);
          setShowAddUpi(false);
          setNewUpi('');
      }
  };

  const removeCard = (id: number) => {
      setCards(cards.filter(c => c.id !== id));
  };

  const removeUpi = (id: number) => {
      setUpis(upis.filter(u => u.id !== id));
  };

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-slate-900 dark:text-white pb-10 font-sans">
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold">Payment Methods</h1>
        <div className="w-10"></div>
      </header>

      <main className="p-4 flex flex-col gap-6">
        {/* Saved Cards */}
        <section>
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Saved Cards</h2>
          <div className="flex flex-col gap-3">
             {cards.map(card => (
                 card.isPrimary ? (
                    <div key={card.id} className="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-5 rounded-2xl shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-3 opacity-20">
                        <span className="material-symbols-outlined text-6xl">credit_card</span>
                        </div>
                        <div className="flex justify-between items-center mb-6">
                        <span className="font-bold tracking-widest">{card.type}</span>
                        <span className="text-xs bg-white/20 px-2 py-0.5 rounded">Primary</span>
                        </div>
                        <p className="font-mono text-xl tracking-widest mb-4">•••• •••• •••• {card.number}</p>
                        <div className="flex justify-between items-end">
                        <div>
                            <p className="text-[10px] text-gray-300 uppercase">Card Holder</p>
                            <p className="font-medium text-sm">{card.holder}</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-300 uppercase">Expires</p>
                            <p className="font-medium text-sm">{card.exp}</p>
                        </div>
                        <div className="flex gap-2">
                            <div className="size-6 bg-red-500/80 rounded-full"></div>
                            <div className="size-6 bg-yellow-500/80 rounded-full -ml-4"></div>
                        </div>
                        </div>
                    </div>
                 ) : (
                    <div key={card.id} className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 flex items-center gap-4">
                        <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-[8px] font-bold tracking-widest italic">VISA</div>
                        <div className="flex-1">
                        <p className="font-bold text-sm">{card.type}</p>
                        <p className="text-xs text-gray-500">•••• {card.number}</p>
                        </div>
                        <button onClick={() => removeCard(card.id)} className="text-gray-400 hover:text-red-500"><span className="material-symbols-outlined">delete</span></button>
                    </div>
                 )
             ))}
          </div>
          
          {!showAddCard ? (
            <button onClick={() => setShowAddCard(true)} className="w-full mt-3 py-3 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 text-gray-500 font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <span className="material-symbols-outlined text-lg">add_card</span>
                Add New Card
            </button>
          ) : (
            <div className="mt-3 bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 animate-in fade-in">
                <input placeholder="Card Number" className="w-full p-2 mb-2 rounded border dark:bg-gray-900 dark:border-gray-600" value={newCard.number} onChange={e => setNewCard({...newCard, number: e.target.value})} />
                <div className="flex gap-2 mb-2">
                    <input placeholder="MM/YY" className="w-1/2 p-2 rounded border dark:bg-gray-900 dark:border-gray-600" value={newCard.exp} onChange={e => setNewCard({...newCard, exp: e.target.value})} />
                    <input placeholder="CVV" className="w-1/2 p-2 rounded border dark:bg-gray-900 dark:border-gray-600" />
                </div>
                <input placeholder="Card Holder Name" className="w-full p-2 mb-3 rounded border dark:bg-gray-900 dark:border-gray-600" value={newCard.holder} onChange={e => setNewCard({...newCard, holder: e.target.value})} />
                <div className="flex gap-2">
                    <button onClick={() => setShowAddCard(false)} className="flex-1 py-2 text-xs font-bold text-gray-500">Cancel</button>
                    <button onClick={handleAddCard} className="flex-1 py-2 bg-primary text-white rounded text-xs font-bold">Save</button>
                </div>
            </div>
          )}
        </section>

        {/* UPI */}
        <section>
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">UPI & Wallets</h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700 overflow-hidden">
             {upis.map(upi => (
                <div key={upi.id} className="p-4 flex items-center gap-4">
                    <div className="size-10 rounded-full bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600">
                    <span className="material-symbols-outlined">smartphone</span>
                    </div>
                    <div className="flex-1">
                    <p className="font-bold text-sm">{upi.provider}</p>
                    <p className="text-xs text-gray-500">{upi.id_val}</p>
                    </div>
                    <button onClick={() => removeUpi(upi.id)} className="text-gray-400 hover:text-red-500"><span className="material-symbols-outlined">delete</span></button>
                </div>
             ))}
          </div>
          
          {!showAddUpi ? (
            <button onClick={() => setShowAddUpi(true)} className="w-full mt-3 py-3 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 text-gray-500 font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <span className="material-symbols-outlined text-lg">add</span>
                Add New UPI ID
            </button>
          ) : (
            <div className="mt-3 bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 animate-in fade-in flex gap-2">
                <input placeholder="example@upi" className="flex-1 p-2 rounded border dark:bg-gray-900 dark:border-gray-600" value={newUpi} onChange={e => setNewUpi(e.target.value)} />
                <button onClick={handleAddUpi} className="bg-primary text-white px-4 rounded font-bold text-sm">Add</button>
                <button onClick={() => setShowAddUpi(false)} className="text-gray-500 px-2">
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
