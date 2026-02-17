'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { useUserStore } from '../store/userStore';

// ==============================================================
// AUTH CONTEXT – Single source of truth for session state
// ==============================================================

interface AuthContextType {
    session: Session | null;
    user: User | null;
    loading: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    session: null,
    user: null,
    loading: true,
    signOut: async () => { },
});

export const useAuth = () => useContext(AuthContext);

// ==============================================================
// AUTH PROVIDER – Bridges Supabase session ↔ Zustand store
// ==============================================================

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const {
        setProfile,
        updateProfile,
        resetAuth,
        setAddresses,
        setFamilyMembers,
        setAuthenticated,
        isAuthenticated,
    } = useUserStore();

    useEffect(() => {
        // 1. Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) {
                syncUserData(session.user);
            } else {
                setLoading(false);
            }
        });

        // 2. Listen for auth state changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);

            if (session?.user) {
                await syncUserData(session.user);
            } else {
                if (isAuthenticated) {
                    resetAuth();
                }
            }
            setLoading(false);
        });

        return () => subscription.unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ==============================================================
    // SYNC USER DATA – Fetches profile, addresses, family from Supabase
    // Maps DB snake_case → Store camelCase
    // ==============================================================
    const syncUserData = async (authUser: User) => {
        try {
            // A. Fetch Profile
            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', authUser.id)
                .single();

            if (profile && !profileError) {
                // DB columns:  full_name, phone, email, gender, date_of_birth, blood_group,
                //              height, weight, avatar_url, emergency_contact
                // Store keys:  name, phone, email, gender, dob, bloodGroup,
                //              height, weight, image

                setProfile({
                    id: profile.id,
                    name: profile.full_name || authUser.user_metadata?.full_name || '',
                    phone: profile.phone || authUser.phone || '',
                    email: profile.email || authUser.email || '',
                    gender: profile.gender || '',
                    dob: profile.date_of_birth || '',
                    bloodGroup: profile.blood_group || '',
                    height: profile.height?.toString() || '',
                    weight: profile.weight?.toString() || '',
                    image: profile.avatar_url || authUser.user_metadata?.avatar_url || '',
                });

            } else {
                // Profile might not exist yet (trigger may still be running)
                // Set basic info from auth user metadata
                setProfile({
                    id: authUser.id,
                    name: authUser.user_metadata?.full_name || '',
                    phone: authUser.phone || '',
                    email: authUser.email || '',
                    gender: '',
                    dob: '',
                    bloodGroup: '',
                    height: '',
                    weight: '',
                    image: authUser.user_metadata?.avatar_url || '',
                });
            }

            // B. Fetch Addresses
            const { data: addresses } = await supabase
                .from('addresses')
                .select('*')
                .eq('profile_id', authUser.id);

            if (addresses && addresses.length > 0) {
                setAddresses(
                    addresses.map((addr) => ({
                        id: addr.id,
                        tag: addr.tag as 'Home' | 'Office' | 'Other',
                        line1: addr.line_1 || '',
                        line2: addr.line_2 || '',
                        city: '', // city_id FK → resolved on client if needed
                        pincode: addr.pincode || '',
                        isDefault: addr.is_default || false,
                    }))
                );
            }

            // C. Fetch Family Members
            const { data: family } = await supabase
                .from('family_members')
                .select('*')
                .eq('profile_id', authUser.id);

            if (family && family.length > 0) {
                setFamilyMembers(
                    family.map((f) => ({
                        id: f.id,
                        name: f.name || '',
                        relation: f.relation || '',
                        age: f.age?.toString() || '',
                        gender: f.gender || 'Other',
                    }))
                );
            }
        } catch (error) {
            console.error('[AuthProvider] Error syncing user data:', error);
        }
    };

    // ==============================================================
    // SIGN OUT – Clears BOTH Supabase session AND Zustand store
    // ==============================================================
    const signOut = async () => {
        await supabase.auth.signOut();
        resetAuth();
    };

    return (
        <AuthContext.Provider value={{ session, user, loading, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};
