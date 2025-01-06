import { Hono } from "hono";
import { createClient } from "@/lib/supabase/server";

const authCallbackRouter = new Hono().get("/google", async (c) => {
  const code = c.req.query("code");
  const next = c.req.query("next") ?? "/";
  const url = new URL(c.req.url);
  const forwardedHost = c.req.header("x-forwarded-host");
  const origin = forwardedHost
    ? `https://${forwardedHost}`
    : `${url.protocol}//${url.host}`;

  if (code) {
    try {
      const supabase = await createClient();

      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) {
        console.error("Error exchanging code for session:", error);
        return c.redirect(`${origin}/auth/auth-code-error`);
      }

      // Determine the redirect URL based on environment
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        return c.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return c.redirect(`https://${forwardedHost}${next}`);
      } else {
        return c.redirect(`${origin}${next}`);
      }
    } catch (err) {
      console.error("Error handling Google OAuth callback:", err);
      return c.redirect(`${origin}/auth/auth-code-error`);
    }
  }

  return c.redirect(`${origin}/auth/auth-code-error`);
});

export default authCallbackRouter;
