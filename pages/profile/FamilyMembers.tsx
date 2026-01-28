import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore, UIFamilyMember } from '../../store/userStore';
import { useAuth } from '../../components/AuthProvider';

export default function FamilyMembers() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { familyMembers, addFamilyMember, removeFamilyMember, fetchFamilyMembers, loading } = useUserStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newMember, setNewMember] = useState<Partial<UIFamilyMember>>({
    gender: 'Male',
    relation: 'Other'
  });

  // Fetch family members on mount
  useEffect(() => {
    if (user?.id) {
      fetchFamilyMembers();
    }
  }, [user?.id, fetchFamilyMembers]);

  const handleSave = async () => {
    if (newMember.name && newMember.age) {
      setSaving(true);
      try {
        await addFamilyMember({
          name: newMember.name || '',
          relation: newMember.relation || 'Other',
          age: newMember.age || '',
          gender: newMember.gender as any
        });
        setShowAddForm(false);
        setNewMember({ gender: 'Male', relation: 'Other' });
      } catch (error) {
        console.error('Error saving family member:', error);
        alert('Failed to save family member. Please try again.');
      } finally {
        setSaving(false);
      }
    } else {
      alert('Please fill Name and Age');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await removeFamilyMember(id);
    } catch (error) {
      console.error('Error deleting family member:', error);
      alert('Failed to delete family member. Please try again.');
    }
  };

  const relations = ['Father', 'Mother', 'Spouse', 'Child', 'Sibling', 'Other'];

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-bg-light dark:bg-bg-dark pb-10 animate-pulse">
        <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center justify-between">
          <div className="size-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="w-10"></div>
        </header>
        <div className="p-4 space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-20 rounded-2xl bg-gray-200 dark:bg-gray-700"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-slate-900 dark:text-white pb-10 font-sans">
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold">Family Members</h1>
        <div className="w-10"></div>
      </header>

      <main className="p-4 flex flex-col gap-4">
        {/* Empty State */}
        {familyMembers.length === 0 && !showAddForm && (
          <div className="text-center py-12">
            <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">group_off</span>
            <p className="text-gray-500">No family members added yet</p>
          </div>
        )}

        {/* Members List */}
        {familyMembers.map((member) => (
          <div key={member.id} className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
            <div className={`size-14 rounded-full flex items-center justify-center text-xl shrink-0 ${member.gender === 'Female' ? 'bg-pink-100 text-pink-600' : 'bg-blue-100 text-blue-600'}`}>
              <span className="material-symbols-outlined">{member.gender === 'Female' ? 'face_3' : 'face'}</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-base">{member.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{member.relation} • {member.age} Years</p>
            </div>
            <button onClick={() => handleDelete(member.id)} className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20">
              <span className="material-symbols-outlined">delete</span>
            </button>
          </div>
        ))}

        {/* Add New Button */}
        {!showAddForm ? (
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full py-4 rounded-2xl border-2 border-dashed border-primary/40 text-primary font-bold flex items-center justify-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
          >
            <span className="material-symbols-outlined">person_add</span>
            Add Family Member
          </button>
        ) : (
          <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 animate-in fade-in slide-in-from-bottom-4">
            <h3 className="font-bold text-lg mb-4">Add Member</h3>
            <div className="flex flex-col gap-3">
              <input
                placeholder="Full Name"
                className="w-full h-12 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
                value={newMember.name || ''}
                onChange={e => setNewMember({ ...newMember, name: e.target.value })}
              />
              <div className="flex gap-3">
                <select
                  className="flex-1 h-12 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
                  value={newMember.relation}
                  onChange={e => setNewMember({ ...newMember, relation: e.target.value })}
                >
                  {relations.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                <input
                  placeholder="Age"
                  type="number"
                  className="w-24 h-12 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
                  value={newMember.age || ''}
                  onChange={e => setNewMember({ ...newMember, age: e.target.value })}
                />
              </div>
              <div className="flex gap-2 bg-gray-50 dark:bg-gray-900 p-1 rounded-xl border border-gray-200 dark:border-gray-700">
                {['Male', 'Female'].map(g => (
                  <button
                    key={g}
                    onClick={() => setNewMember({ ...newMember, gender: g as any })}
                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${newMember.gender === g ? 'bg-white dark:bg-gray-800 shadow-sm text-primary' : 'text-gray-500'}`}
                  >
                    {g}
                  </button>
                ))}
              </div>
              <div className="flex gap-3 mt-2">
                <button onClick={() => setShowAddForm(false)} className="flex-1 h-12 rounded-xl font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700">Cancel</button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 h-12 rounded-xl bg-primary text-white font-bold shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {saving && <span className="material-symbols-outlined animate-spin text-base">sync</span>}
                  {saving ? 'Adding...' : 'Add Member'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}