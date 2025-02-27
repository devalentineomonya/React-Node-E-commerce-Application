"use client"
import React from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
const page = () => {
  const supabase = createClient();
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
    } else {
      console.log("Signed out successfully");
    }
  };
  return (
    <div>
      Welcome to dashboard
      <Link href="/">Home</Link>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default page;
