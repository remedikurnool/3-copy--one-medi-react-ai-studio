
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppLanguage } from '../types';

export interface Address {
  id: string;
  tag: 'Home' | 'Office' | 'Other';
  line1: string;
  line2: string;
  city: string;
  pincode: string;
  isDefault: boolean;
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  age: string;
  gender: 'Male' | 'Female' | 'Other';
}

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  bloodGroup: string;
  height: string;
  weight: string;
  image: string;
  isPlusMember?: boolean;
}

interface UserState {
  isAuthenticated: boolean;
  profile: UserProfile;
  addresses: Address[];
  familyMembers: FamilyMember[];
  language: AppLanguage;
  
  login: (phone: string) => void;
  logout: () => void;
  googleLogin: () => void;
  setLanguage: (lang: AppLanguage) => void;
  toggleMembership: () => void;
  
  updateProfile: (profile: Partial<UserProfile>) => void;
  addAddress: (address: Address) => void;
  removeAddress: (id: string) => void;
  addFamilyMember: (member: FamilyMember) => void;
  removeFamilyMember: (id: string) => void;
}

const MOCK_USER: UserProfile = {
  name: 'Siva Kumar',
  phone: '+91 98765 43210',
  email: 'siva.kumar@gmail.com',
  gender: 'Male',
  dob: '1995-08-15',
  bloodGroup: 'O+',
  height: '175',
  weight: '72',
  image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
  isPlusMember: false
};

const EMPTY_USER: UserProfile = {
  name: 'Guest User',
  phone: '',
  email: '',
  gender: 'Male',
  dob: '',
  bloodGroup: '',
  height: '',
  weight: '',
  image: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
  isPlusMember: false
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      profile: EMPTY_USER,
      addresses: [],
      familyMembers: [],
      language: 'en',

      login: (phone) => set({
        isAuthenticated: true,
        profile: { ...MOCK_USER, phone: `+91 ${phone}` },
        addresses: [
          {
            id: 'addr1',
            tag: 'Home',
            line1: 'Flat 402, Sai Residency',
            line2: 'M.G. Road, Near Govt Hospital',
            city: 'Kurnool',
            pincode: '518002',
            isDefault: true
          }
        ]
      }),

      googleLogin: () => set({
        isAuthenticated: true,
        profile: MOCK_USER,
        addresses: [
          {
            id: 'addr1',
            tag: 'Home',
            line1: 'Flat 402, Sai Residency',
            line2: 'M.G. Road, Near Govt Hospital',
            city: 'Kurnool',
            pincode: '518002',
            isDefault: true
          }
        ]
      }),

      logout: () => set({
        isAuthenticated: false,
        profile: EMPTY_USER,
        addresses: [],
        familyMembers: []
      }),

      setLanguage: (lang) => set({ language: lang }),
      toggleMembership: () => set((state) => ({ 
        profile: { ...state.profile, isPlusMember: !state.profile.isPlusMember } 
      })),

      updateProfile: (updates) => set((state) => ({
        profile: { ...state.profile, ...updates }
      })),
      addAddress: (address) => set((state) => ({
        addresses: [...state.addresses, address]
      })),
      removeAddress: (id) => set((state) => ({
        addresses: state.addresses.filter(a => a.id !== id)
      })),
      addFamilyMember: (member) => set((state) => ({
        familyMembers: [...state.familyMembers, member]
      })),
      removeFamilyMember: (id) => set((state) => ({
        familyMembers: state.familyMembers.filter(f => f.id !== id)
      })),
    }),
    {
      name: 'one-medi-user',
    }
  )
);
