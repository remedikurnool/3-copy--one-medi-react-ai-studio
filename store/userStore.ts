import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
}

interface UserState {
  profile: UserProfile;
  addresses: Address[];
  familyMembers: FamilyMember[];
  updateProfile: (profile: Partial<UserProfile>) => void;
  addAddress: (address: Address) => void;
  removeAddress: (id: string) => void;
  addFamilyMember: (member: FamilyMember) => void;
  removeFamilyMember: (id: string) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      profile: {
        name: 'Siva Kumar',
        phone: '+91 98765 43210',
        email: 'siva.kumar@gmail.com',
        gender: 'Male',
        dob: '1995-08-15',
        bloodGroup: 'O+',
        height: '175',
        weight: '72',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
      },
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
      ],
      familyMembers: [
        {
          id: 'fam1',
          name: 'Ramesh (Father)',
          relation: 'Father',
          age: '62',
          gender: 'Male'
        }
      ],
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