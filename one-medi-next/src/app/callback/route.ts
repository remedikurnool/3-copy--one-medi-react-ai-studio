import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

// ==============================================================
// OAUTH CALLBACK ROUTE
// Handles the redirect from Google/GitHub/etc.
// Exchanges the auth code for a session and redirects to home.
// ==============================================================

export async function GET(request: NextRequest) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    const next = searchParams.get('next') ?? '/';

    if (code) {
        const supabase = await createClient();
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error) {
            return NextResponse.redirect(`${origin}${next}`);
        }
    }

    // If there's no code or an error, redirect to login with error
    return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}
