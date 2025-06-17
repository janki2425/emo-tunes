'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);


  return (
    <form className="mt-8 space-y-6">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 p-3 rounded-md text-sm">
          {error}
        </div>
      )}
      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#265767] dark:text-[#DDD0C8]">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="mt-1 block w-full px-3 py-2 bg-[#F2F0EA] dark:bg-[#1a1a1a] border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#265767] dark:focus:ring-[#DDD0C8] focus:border-transparent"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-[#265767] dark:text-[#DDD0C8]">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="mt-1 block w-full px-3 py-2 bg-[#F2F0EA] dark:bg-[#1a1a1a] border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#265767] dark:focus:ring-[#DDD0C8] focus:border-transparent"
            placeholder="Enter your password"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#265767] dark:bg-[#DDD0C8] dark:text-[#265767] hover:bg-[#1a3d4a] dark:hover:bg-[#c4b5a9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#265767] dark:focus:ring-[#DDD0C8] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Sign in
        </button>
      </div>
    </form>
  );
}
