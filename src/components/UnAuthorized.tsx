'use client';
import React, { useEffect } from 'react';
import { UserX } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';

const UnauthorizedPage = () => {
  const router = useRouter();
  const { authenticationToken } = useAuth();
  useEffect(() => {
    if (!authenticationToken) {
      router.replace('/welcome');
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticationToken]);

  return (
    <div className="flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full text-center bg-white rounded-xl shadow-lg border border-gray-200 p-8 relative overflow-hidden">
        {/* Decorative Top Border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-slate-600" />

        {/* Icon */}
        <div className="mb-8">
          <div className="inline-block p-6 bg-red-50 rounded-full">
            <UserX className="w-24 h-24 text-red-500" strokeWidth={1.5} />
          </div>
        </div>

        {/* Content */}
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">Sorry!</h1>
        <p className="text-gray-600 mb-6">
          You are not authorized to access this page. Please check your login
          credentials or contact the administrator for access.
        </p>

        {/* Logout Button */}
        <div className="flex justify-center">
          <button
            onClick={() => router.replace('/home')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
