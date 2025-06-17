'use client';

import { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F2F0EA] via-[#DDD0C8] to-[#265767] dark:from-[#2d2d2d] dark:via-[#1a1a1a] dark:to-[#265767]">
      <div className="max-w-md w-full space-y-8 p-8 bg-white/80 dark:bg-black/80 backdrop-blur-lg rounded-2xl shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#265767] dark:text-[#DDD0C8]">
            Login to Your Account
          </h2>
          <p className="mt-2 text-center text-sm text-[#265767]/80 dark:text-[#DDD0C8]/80">
            Or{" "}
            <a
              href="/auth/register"
              className="font-medium text-[#265767] dark:text-[#DDD0C8] hover:underline"
            >
              create a new account
            </a>
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
