import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, onAuthStateChange, ensureProfile, type Profile } from '../lib/supabase';

interface AuthContextType {
    user: User | null;
    profile: Profile | null;
    session: Session | null;
    loading: boolean;
    isAuthenticated: boolean;
    refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    profile: null,
    session: null,
    loading: true,
    isAuthenticated: false,
    refreshProfile: async () => { },
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch user profile from database
    const fetchProfile = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (error) {
                // If profile doesn't exist, create one
                if (error.code === 'PGRST116') {
                    await ensureProfile(userId, user?.phone);
                    // Fetch again after creating
                    const { data: newProfile } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('id', userId)
                        .single();
                    setProfile(newProfile);
                } else {
                    console.error('Error fetching profile:', error);
                }
            } else {
                setProfile(data);
            }
        } catch (err) {
            console.error('Error in fetchProfile:', err);
        }
    };

    const refreshProfile = async () => {
        if (user?.id) {
            await fetchProfile(user.id);
        }
    };

    useEffect(() => {
        // Get initial session
        const initializeAuth = async () => {
            try {
                const { data: { session: initialSession } } = await supabase.auth.getSession();

                if (initialSession) {
                    setSession(initialSession);
                    setUser(initialSession.user);
                    await fetchProfile(initialSession.user.id);
                }
            } catch (error) {
                console.error('Error initializing auth:', error);
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();

        // Listen for auth changes
        const { data: { subscription } } = onAuthStateChange(async (event, newSession) => {
            console.log('Auth state changed:', event);

            setSession(newSession);
            setUser(newSession?.user ?? null);

            if (newSession?.user) {
                await fetchProfile(newSession.user.id);
            } else {
                setProfile(null);
            }

            if (event === 'SIGNED_OUT') {
                setProfile(null);
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const value: AuthContextType = {
        user,
        profile,
        session,
        loading,
        isAuthenticated: !!user,
        refreshProfile,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
