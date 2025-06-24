'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axiosInstance from '@/app/api/axiosInstance';
import { RegisterData } from '@/types/auth';



export default function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<RegisterData>({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await axiosInstance.post('/register', formData);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        router.push('/auth/login');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#CA9DFA] via-[#ABA7FE] to-[#91ADFF] px-4 sm:px-6 lg:px-8 transition-all duration-300">
      <div className="max-w-md w-full space-y-6 sm:space-y-8 p-6 lg:p-8 bg-gradient-to-br from-[#9470e8] via-[#9352e8] to-[#812edf] rounded-3xl shadow-xl transition-all duration-300">
        <h2 className="text-center h-24-120 md:h-28-120 lg:h-36-120 font-bold text-[#89b6da] transition-all duration-300">
          🎶 Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 transition-all duration-300">
          {error && (
            <div className="bg-red-100 text-red-600 p-2 sm:p-3 P-14 md:P-16 rounded-xl shadow">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 transition-all duration-300">
            <div>
              <label htmlFor="firstName" className="block P-14 md:P-16 font-medium text-white transition-all duration-300">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 block w-full px-2 text-[#505050] sm:px-3 py-2 P-12 md:P-14 bg-white border border-gray-600 rounded-xl shadow-sm focus:outline-none focus:border-transparent transition-all duration-300"
                placeholder="Enter your first name"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block P-14 md:P-16 font-medium text-white transition-all duration-300">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 block w-full px-2 text-[#505050] sm:px-3 py-2 P-12 md:P-14 bg-white border border-gray-600 rounded-xl shadow-sm focus:outline-none focus:border-transparent transition-all duration-300"
                placeholder="Enter your last name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block P-14 md:P-16 font-medium text-white transition-all duration-300">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-2 text-[#505050] sm:px-3 py-2 P-12 md:P-14 bg-white border border-gray-600 rounded-xl shadow-sm focus:outline-none focus:border-transparent transition-all duration-300"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block P-14 md:P-16 font-medium text-white transition-all duration-300">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-2 text-[#505050] sm:px-3 py-2 P-12 md:P-14 bg-white border border-gray-600 rounded-xl shadow-sm focus:outline-none focus:border-transparent transition-all duration-300"
              placeholder="Enter your password"
            />
          </div>

          <div className='flex flex-col gap-2 sm:gap-3 transition-all duration-300'>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-xl shadow-md P-16 md:P-18 font-medium text-white bg-gradient-to-tl from-[#CA9DFA] via-[#ABA7FE] to-[#91ADFF] hover:bg-gradient-to-tl hover:from-[#c490fc] hover:via-[#938ef8] hover:to-[#7b9af8] transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
            <div className='flex items-center justify-center'>
              <p className='P-12 md:P-14 text-[#dee2e9] transition-all duration-300'>Already have an Account? <Link href={'/auth/login'} className='P-12 md:P-14 border-b'>Sign In</Link></p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
