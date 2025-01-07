import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { PROTECTED_ROUTES } from '../constants';

export async function updateSession(request: NextRequest) {
  const supabaseResponse = NextResponse.next({
    request,
  });

  // Create Supabase client with cookies integration
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // Ensure user session retrieval (mandatory for auth persistence)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const emailVerified = user?.user_metadata?.email_verified ?? false;

  // If user is logged in and tries to access any `/auth/*` path, redirect to home
  if (user && emailVerified && pathname.startsWith('/auth/')) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/';
    return NextResponse.redirect(redirectUrl);
  }

  // If the user is not verified and not already on `/auth/confirm-otp`, redirect them
  if (user && !emailVerified && pathname !== '/auth/confirm-otp') {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/auth/confirm-otp';
    return NextResponse.redirect(redirectUrl);
  }

  // Allow access to `/auth/confirm-otp` only if the email is not verified
  if (pathname === '/auth/confirm-otp' && (!user || emailVerified)) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/';
    return NextResponse.redirect(redirectUrl);
  }

  // Determine if the current path requires authentication
  const isProtectedRoute = PROTECTED_ROUTES.some((path) =>
    pathname.startsWith(path)
  );

  // If user is not logged in and accessing a protected route, redirect to sign-in
  if (!user && isProtectedRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/auth/sign-in';

    // Store the intended path in a cookie instead of query params
    supabaseResponse.cookies.set('next_url', pathname, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });

    return NextResponse.redirect(redirectUrl);
  }

  // Return the Supabase response with properly handled cookies
  return supabaseResponse;
}
