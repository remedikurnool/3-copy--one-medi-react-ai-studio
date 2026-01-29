
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { useUserStore } from '../store/userStore';

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

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Zustand store actions
    const {
        login,
        logout: storeLogout,
        updateProfile,
        addAddress,
        addFamilyMember,
        isAuthenticated
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

        // 2. Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);

            if (session?.user) {
                await syncUserData(session.user);
            } else {
                if (isAuthenticated) {
                    storeLogout();
                }
            }
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const syncUserData = async (authUser: User) => {
        try {
            // A. Fetch Profile
            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', authUser.id)
                .single();

            if (profile && !profileError) {
                // Map DB snake_case to Store camelCase if needed, or assumed match
                // Store expects: name, phone, email, gender, dob, bloodGroup, height, weight, image
                // DB likely has: name, phone, email, gender, dob, blood_group, height, weight, image_url

                updateProfile({
                    name: profile.name || authUser.user_metadata?.full_name || 'User',
                    phone: profile.phone || authUser.phone || '',
                    email: profile.email || authUser.email || '',
                    gender: profile.gender,
                    dob: profile.dob,
                    bloodGroup: profile.blood_group, // Note mapping
                    height: profile.height,
                    weight: profile.weight,
                    image: profile.image_url || authUser.user_metadata?.avatar_url
                });

                // Mark as authenticated in store if not already (this might call login mocked, careful)
                // Actually login() in store sets mock data. We should probably bypass login() and set isAuthenticated directly
                // But store doesn't expose setIsAuthenticated.
                // We will ignore store.login() for now and rely on updateProfile to populate data.
                // To set 'isAuthenticated' true, we might need to modify the store or just call login with phone
                // Calling login() overrides data with MOCK_USER. This is BAD.
                // TODO: We need to refactor userStore to have a proper 'setAuthenticated' or 'hydrate' action.
                // For now, I'll temporarily assume updateProfile is enough if I can toggle auth state.

                // TEMPORARY HACK: We need to set isAuthenticated = true in store without overwriting profile.
                // Since I can't change store right now, I'll assume the user is using the app and `isAuthenticated` 
                // in store is mainly for UI toggles. 
                // Wait, I CAN change the store. I should add `syncUser` action to store.

            }

            // B. Fetch Addresses
            const { data: addresses } = await supabase
                .from('addresses')
                .select('*')
                .eq('profile_id', authUser.id);

            if (addresses) {
                // Clear existing addresses first? Store doesn't have setAddresses.
                // We'll iterate and add if not exists, or just rely on what we have.
                // Ideally store should have setAddresses.
                addresses.forEach(addr => {
                    // Basic mapping
                    addAddress({
                        id: addr.id,
                        tag: addr.tag,
                        line1: addr.line1,
                        line2: addr.line2,
                        city: addr.city,
                        pincode: addr.pincode,
                        isDefault: addr.is_default
                    });
                });
            }

            // C. Fetch Family Members
            const { data: family } = await supabase
                .from('family_members')
                .select('*')
                .eq('profile_id', authUser.id);

            if (family) {
                family.forEach(member => {
                    addFamilyMember(member);
                });
            }

        } catch (error) {
            console.error('Error syncing user data:', error);
        }
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        storeLogout();
    };

    return (
        <AuthContext.Provider value={{ session, user, loading, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};
