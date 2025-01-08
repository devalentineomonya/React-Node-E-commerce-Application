import { Hono } from "hono";
import { getCookie, deleteCookie } from "hono/cookie";

import { zValidator } from "@hono/zod-validator";
import {
  signInSchema,
  signUpSchema,
  confirmOtpSchema,
  forgotPasswordSchema,
  newPasswordSchema,
} from "@/lib/validation/schemas";
import { createClient } from "@/lib/supabase/server";

// Routes
const authRouter = new Hono()
  .post("/sign-up", zValidator("json", signUpSchema), async (c) => {
    const body = c.req.valid("json");
    const { email, password, firstName, lastName } = body;

    const nextUrl = getCookie(c, "next_url");

    if (nextUrl) {
      deleteCookie(c, "next_url");
    }
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { firstName, lastName },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/confirm-otp`,
      },
    });

    if (error) {
      console.log(error);
      return c.json({ success: false, message: error.message }, 400);
    }

    return c.json({ success: true, message: "User added successfully", data });
  })
  .post("/sign-in", zValidator("json", signInSchema), async (c) => {
    const { email, password } = c.req.valid("json");

    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return c.json({ success: false, message: error.message }, 400);
    }

    return c.json({ success: true, message: "Sign in successful", data });
  })
  .post("/confirm-otp", zValidator("json", confirmOtpSchema), async (c) => {
    const { otp } = c.req.valid("json");

    const supabase = await createClient();
    const email = (await supabase.auth.getUser()).data.user?.email;
    if (!email) {
      return c.json(
        { success: false, message: "User not found. Try logging in again" },
        400
      );
    }
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "email",
    });
    if (error) {
      return c.json({ success: false, message: error.message }, 400);
    }

    return c.json({ success: true, message: "OTP confirmed", data });
  })
  .post("/resend-otp", async (c) => {
    const supabase = await createClient();
    const email = (await supabase.auth.getUser()).data.user?.email;
    if (!email) {
      return c.json(
        { success: false, message: "User not found. Try logging in again" },
        400
      );
    }
    const { error } = await supabase.auth.resend({
      type: "signup",
      email: "email@example.com",
      options: {
        emailRedirectTo: "https://example.com/welcome",
      },
    });
    if (error) {
      return c.json({ success: false, message: error.message }, 400);
    }
    return c.json({ success: true, message: "OTP resent" });
  })
  .post(
    "/forget-password",
    zValidator("json", forgotPasswordSchema),
    async (c) => {
      const { email } = c.req.valid("json");

      const supabase = await createClient();
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "https://example.com/new-password",
      });

      if (error) {
        return c.json({ success: false, message: error.message }, 400);
      }

      return c.json({
        success: true,
        message: "Password reset email sent",
        data,
      });
    }
  )
  .put("/new-password", zValidator("json", newPasswordSchema), async (c) => {
    const { email, newPassword } = c.req.valid("json");

    const supabase = await createClient();
    const { data, error } = await supabase.auth.updateUser({
      email,
      password: newPassword,
    });

    if (error) {
      return c.json({ success: false, message: error.message }, 400);
    }

    return c.json({
      success: true,
      message: "Password updated successfully",
      data,
    });
  })
  .get("/sign-in-with-google", async (c) => {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL!}/api/callback/google`,
      },
    });
    if (error) {
      return c.json({ success: false, message: error.message }, 400);
    }
    if (data.url) {
      return c.redirect(data.url);
    }
  });

export default authRouter;
