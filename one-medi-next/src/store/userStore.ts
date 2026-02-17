
import { create } from 'zustand';

// ==============================================================
// INTERFACES
// ==============================================================

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
  id?: string;
  name: string;
  phone: string;
  email: string;
  gender: 'Male' | 'Female' | 'Other' | '';
  dob: string;
  bloodGroup: string;
  height: string;
  weight: string;
  image: string;
}

// ==============================================================
// DEFAULT EMPTY STATE — No mock data. No fallback.
// Profile is populated ONLY by AuthProvider.syncUserData()
// ==============================================================
const EMPTY_PROFILE: UserProfile = {
  id: '',
  name: '',
  phone: '',
  email: '',
  gender: '',
  dob: '',
  bloodGroup: '',
  height: '',
  weight: '',
  image: '',
};

// ==============================================================
// STORE INTERFACE — No login/googleLogin mock methods
// ==============================================================
interface UserState {
  isAuthenticated: boolean;
  profile: UserProfile;
  addresses: Address[];
  familyMembers: FamilyMember[];

  // Auth state is managed by AuthProvider + Supabase only
  setAuthenticated: (status: boolean) => void;
  setProfile: (profile: UserProfile) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  resetAuth: () => void;

  // Address management
  addAddress: (address: Address) => void;
  setAddresses: (addresses: Address[]) => void;
  removeAddress: (id: string) => void;

  // Family member management
  addFamilyMember: (member: FamilyMember) => void;
  setFamilyMembers: (members: FamilyMember[]) => void;
  removeFamilyMember: (id: string) => void;
}

// ==============================================================
// STORE — No persist for auth state. Session is in Supabase cookies.
// ==============================================================
export const useUserStore = create<UserState>()((set) => ({
  isAuthenticated: false,
  profile: EMPTY_PROFILE,
  addresses: [],
  familyMembers: [],

  setAuthenticated: (status) => set({ isAuthenticated: status }),

  setProfile: (profile) => set({ profile, isAuthenticated: true }),

  updateProfile: (updates) =>
    set((state) => ({
      profile: { ...state.profile, ...updates },
    })),

  resetAuth: () =>
    set({
      isAuthenticated: false,
      profile: EMPTY_PROFILE,
      addresses: [],
      familyMembers: [],
    }),

  addAddress: (address) =>
    set((state) => ({
      addresses: [...state.addresses.filter((a) => a.id !== address.id), address],
    })),
  setAddresses: (addresses) => set({ addresses }),
  removeAddress: (id) =>
    set((state) => ({
      addresses: state.addresses.filter((a) => a.id !== id),
    })),

  addFamilyMember: (member) =>
    set((state) => ({
      familyMembers: [...state.familyMembers.filter((f) => f.id !== member.id), member],
    })),
  setFamilyMembers: (members) => set({ familyMembers: members }),
  removeFamilyMember: (id) =>
    set((state) => ({
      familyMembers: state.familyMembers.filter((f) => f.id !== id),
    })),
}));
