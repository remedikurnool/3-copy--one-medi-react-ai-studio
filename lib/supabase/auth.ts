import { supabase } from './client';

/**
 * Send OTP to phone number for authentication
 */
export const signInWithOTP = async (phone: string) => {
    // Format phone with country code if not present
    const formattedPhone = phone.startsWith('+91') ? phone : `+91${phone}`;

    const { data, error } = await supabase.auth.signInWithOtp({
        phone: formattedPhone,
    });

    if (error) throw error;
    return data;
};

/**
 * Verify OTP and complete sign in
 */
export const verifyOTP = async (phone: string, token: string) => {
    const formattedPhone = phone.startsWith('+91') ? phone : `+91${phone}`;

    const { data, error } = await supabase.auth.verifyOtp({
        phone: formattedPhone,
        token,
        type: 'sms',
    });

    if (error) throw error;
    return data;
};

/**
 * Sign in with Google OAuth
 */
export const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: window.location.origin,
        },
    });

    if (error) throw error;
    return data;
};

/**
 * Sign out the current user
 */
export const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
};

/**
 * Get current authenticated user
 */
export const getUser = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
};

/**
 * Listen for auth state changes
 */
export const onAuthStateChange = (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback);
};

/**
 * Create or update user profile after authentication
 */
export const ensureProfile = async (userId: string, phone?: string) => {
    // Check if profile exists
    const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', userId)
        .single();

    if (!existingProfile) {
        // Create new profile
        const { data, error } = await supabase
            .from('profiles')
            .insert({
                id: userId,
                phone: phone,
            })
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    return existingProfile;
};
