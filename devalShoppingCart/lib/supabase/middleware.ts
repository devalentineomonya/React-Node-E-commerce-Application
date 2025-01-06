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

  // Determine if the current path requires authentication
  const isProtectedRoute = PROTECTED_ROUTES.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (!user && isProtectedRoute) {
    // User is not authenticated and accessing a protected route
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/auth/sign-in';

    // Store the intended path in a cookie instead of query params
    supabaseResponse.cookies.set('next_url', request.nextUrl.pathname, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });

    return NextResponse.redirect(redirectUrl);
  }

  // Return the Supabase response with properly handled cookies
  return supabaseResponse;
}
