'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFFBF0] via-[#FFE8F0] to-[#E4F1FF] dark:from-[#2A2A2A] dark:via-[#2F2F2F] dark:to-[#3C3C3C] px-4">
      <div className="max-w-md w-full space-y-8 p-8 bg-white/90 dark:bg-[#2F2F2F]/80 backdrop-blur-md rounded-3xl shadow-xl">
        <h2 className="text-center text-3xl font-bold text-[#FF6B6B] dark:text-[#FDCBCA]">
          🎶 Create Your Account
        </h2>

        <form className="space-y-6">
          {error && (
            <div className="bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-200 p-3 rounded-xl text-sm shadow">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-[#333] dark:text-[#DDD0C8]">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 bg-[#FFF0F3] dark:bg-[#393939] border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFA69E] dark:focus:ring-[#FDCBCA] focus:border-transparent"
                placeholder="Enter your first name"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-[#333] dark:text-[#DDD0C8]">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 bg-[#FFF0F3] dark:bg-[#393939] border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFA69E] dark:focus:ring-[#FDCBCA] focus:border-transparent"
                placeholder="Enter your last name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#333] dark:text-[#DDD0C8]">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1 block w-full px-3 py-2 bg-[#FFF0F3] dark:bg-[#393939] border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFA69E] dark:focus:ring-[#FDCBCA] focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#333] dark:text-[#DDD0C8]">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="mt-1 block w-full px-3 py-2 bg-[#FFF0F3] dark:bg-[#393939] border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFA69E] dark:focus:ring-[#FDCBCA] focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-xl shadow-md text-sm font-medium text-white bg-[#FFA69E] hover:bg-[#F67D75] dark:bg-[#FDCBCA] dark:hover:bg-[#FBA4A0] transition-all duration-200"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
