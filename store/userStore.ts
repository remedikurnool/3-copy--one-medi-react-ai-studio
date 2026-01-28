import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase, signOut as supabaseSignOut, type Profile, type Address, type FamilyMember } from '../lib/supabase';

// Extended profile for frontend use (with additional computed/display fields)
export interface UIUserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  gender: 'Male' | 'Female' | 'Other' | '';
  dob: string;
  bloodGroup: string;
  avatarUrl: string;
}

// Local address format (compatible with existing UI)
export interface UIAddress {
  id: string;
  tag: 'Home' | 'Office' | 'Other';
  line1: string;
  line2: string;
  city: string;
  pincode: string;
  isDefault: boolean;
}

// Local family member format
export interface UIFamilyMember {
  id: string;
  name: string;
  relation: string;
  age: string;
  gender: 'Male' | 'Female' | 'Other';
}

interface UserState {
  isAuthenticated: boolean;
  userId: string | null;
  profile: UIUserProfile;
  addresses: UIAddress[];
  familyMembers: UIFamilyMember[];
  loading: boolean;
  defaultAddress: UIAddress | undefined;

  // Actions
  setUser: (userId: string, profile: Profile | null) => void;
  clearUser: () => void;
  logout: () => Promise<void>;

  // Profile actions
  updateProfile: (updates: Partial<UIUserProfile>) => Promise<void>;
  refreshProfile: () => Promise<void>;

  // Address actions
  fetchAddresses: () => Promise<void>;
  addAddress: (address: Omit<UIAddress, 'id'>) => Promise<void>;
  removeAddress: (id: string) => Promise<void>;
  setDefaultAddress: (id: string) => Promise<void>;

  // Family member actions
  fetchFamilyMembers: () => Promise<void>;
  addFamilyMember: (member: Omit<UIFamilyMember, 'id'>) => Promise<void>;
  removeFamilyMember: (id: string) => Promise<void>;
}

const EMPTY_PROFILE: UIUserProfile = {
  id: '',
  name: 'Guest User',
  phone: '',
  email: '',
  gender: '',
  dob: '',
  bloodGroup: '',
  avatarUrl: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
};

// Convert database profile to UI format
const toUIProfile = (profile: Profile | null): UIUserProfile => {
  if (!profile) return EMPTY_PROFILE;

  return {
    id: profile.id,
    name: profile.full_name || 'User',
    phone: profile.phone || '',
    email: profile.email || '',
    gender: (profile.gender as UIUserProfile['gender']) || '',
    dob: profile.date_of_birth || '',
    bloodGroup: profile.blood_group || '',
    avatarUrl: profile.avatar_url || 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
  };
};

// Convert database address to UI format
const toUIAddress = (addr: Address): UIAddress => ({
  id: addr.id,
  tag: (addr.tag as UIAddress['tag']) || 'Other',
  line1: addr.line_1,
  line2: addr.line_2 || '',
  city: 'Kurnool', // TODO: fetch city name from cities table
  pincode: addr.pincode || '',
  isDefault: addr.is_default || false,
});

// Convert database family member to UI format
const toUIFamilyMember = (member: FamilyMember): UIFamilyMember => ({
  id: member.id,
  name: member.name,
  relation: member.relation || '',
  age: member.age?.toString() || '',
  gender: (member.gender as UIFamilyMember['gender']) || 'Male',
});

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      userId: null,
      profile: EMPTY_PROFILE,
      addresses: [],
      familyMembers: [],
      loading: false,
      get defaultAddress() {
        return get().addresses.find(a => a.isDefault) || get().addresses[0];
      },

      setUser: (userId, profile) => set({
        isAuthenticated: true,
        userId,
        profile: toUIProfile(profile),
      }),

      clearUser: () => set({
        isAuthenticated: false,
        userId: null,
        profile: EMPTY_PROFILE,
        addresses: [],
        familyMembers: [],
      }),

      logout: async () => {
        try {
          await supabaseSignOut();
        } catch (error) {
          console.error('Logout error:', error);
        }
        get().clearUser();
      },

      updateProfile: async (updates) => {
        const { userId } = get();
        if (!userId) return;

        try {
          const dbUpdates: Partial<Profile> = {};
          if (updates.name) dbUpdates.full_name = updates.name;
          if (updates.email) dbUpdates.email = updates.email;
          if (updates.gender) dbUpdates.gender = updates.gender;
          if (updates.dob) dbUpdates.date_of_birth = updates.dob;
          if (updates.bloodGroup) dbUpdates.blood_group = updates.bloodGroup;
          if (updates.avatarUrl) dbUpdates.avatar_url = updates.avatarUrl;

          const { error } = await supabase
            .from('profiles')
            .update(dbUpdates)
            .eq('id', userId);

          if (error) throw error;

          // Update local state
          set((state) => ({
            profile: { ...state.profile, ...updates },
          }));
        } catch (error) {
          console.error('Error updating profile:', error);
          throw error;
        }
      },

      refreshProfile: async () => {
        const { userId } = get();
        if (!userId) return;

        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

          if (error) throw error;
          set({ profile: toUIProfile(data) });
        } catch (error) {
          console.error('Error refreshing profile:', error);
        }
      },

      fetchAddresses: async () => {
        const { userId } = get();
        if (!userId) return;

        try {
          const { data, error } = await supabase
            .from('addresses')
            .select('*')
            .eq('profile_id', userId)
            .order('is_default', { ascending: false });

          if (error) throw error;
          set({ addresses: (data || []).map(toUIAddress) });
        } catch (error) {
          console.error('Error fetching addresses:', error);
        }
      },

      addAddress: async (address) => {
        const { userId } = get();
        if (!userId) return;

        try {
          const { data, error } = await supabase
            .from('addresses')
            .insert({
              profile_id: userId,
              tag: address.tag,
              line_1: address.line1,
              line_2: address.line2,
              pincode: address.pincode,
              is_default: address.isDefault,
            })
            .select()
            .single();

          if (error) throw error;

          set((state) => ({
            addresses: [...state.addresses, toUIAddress(data)],
          }));
        } catch (error) {
          console.error('Error adding address:', error);
          throw error;
        }
      },

      removeAddress: async (id) => {
        const { userId } = get();
        if (!userId) return;

        try {
          const { error } = await supabase
            .from('addresses')
            .delete()
            .eq('id', id)
            .eq('profile_id', userId);

          if (error) throw error;

          set((state) => ({
            addresses: state.addresses.filter(a => a.id !== id),
          }));
        } catch (error) {
          console.error('Error removing address:', error);
          throw error;
        }
      },

      setDefaultAddress: async (id) => {
        const { userId, addresses } = get();
        if (!userId) return;

        try {
          // First, unset all defaults
          await supabase
            .from('addresses')
            .update({ is_default: false })
            .eq('profile_id', userId);

          // Then set the new default
          const { error } = await supabase
            .from('addresses')
            .update({ is_default: true })
            .eq('id', id);

          if (error) throw error;

          set({
            addresses: addresses.map(a => ({
              ...a,
              isDefault: a.id === id,
            })),
          });
        } catch (error) {
          console.error('Error setting default address:', error);
          throw error;
        }
      },

      fetchFamilyMembers: async () => {
        const { userId } = get();
        if (!userId) return;

        try {
          const { data, error } = await supabase
            .from('family_members')
            .select('*')
            .eq('owner_id', userId)
            .order('created_at', { ascending: true });

          if (error) throw error;
          set({ familyMembers: (data || []).map(toUIFamilyMember) });
        } catch (error) {
          console.error('Error fetching family members:', error);
        }
      },

      addFamilyMember: async (member) => {
        const { userId } = get();
        if (!userId) return;

        try {
          const { data, error } = await supabase
            .from('family_members')
            .insert({
              owner_id: userId,
              name: member.name,
              relation: member.relation,
              age: parseInt(member.age) || null,
              gender: member.gender,
            })
            .select()
            .single();

          if (error) throw error;

          set((state) => ({
            familyMembers: [...state.familyMembers, toUIFamilyMember(data)],
          }));
        } catch (error) {
          console.error('Error adding family member:', error);
          throw error;
        }
      },

      removeFamilyMember: async (id) => {
        const { userId } = get();
        if (!userId) return;

        try {
          const { error } = await supabase
            .from('family_members')
            .delete()
            .eq('id', id)
            .eq('owner_id', userId);

          if (error) throw error;

          set((state) => ({
            familyMembers: state.familyMembers.filter(f => f.id !== id),
          }));
        } catch (error) {
          console.error('Error removing family member:', error);
          throw error;
        }
      },
    }),
    {
      name: 'one-medi-user',
      partialize: (state) => ({
        // Only persist these fields
        isAuthenticated: state.isAuthenticated,
        userId: state.userId,
        profile: state.profile,
      }),
    }
  )
);
