"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function LoginButton() {
  return (
    <Button
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="bg-white text-gray-900 hover:bg-gray-100"
    >
      Sign in with Google
    </Button>
  );
}