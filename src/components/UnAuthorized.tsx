'use client';
import React from 'react';
import { Shield, X, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';

const UnauthorizedPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full text-center bg-white rounded-xl shadow-lg border border-gray-200 p-8 relative overflow-hidden">
        {/* Decorative Top Border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-slate-600" />

        {/* Illustration Container */}
        <div className="relative w-48 h-48 mx-auto mb-8">
          {/* Background Circle */}
          <div className="absolute inset-0 bg-blue-100 rounded-full" />

          {/* Computer Icon */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <div className="w-32 h-24 bg-blue-500 rounded-lg relative">
              <div className="absolute -top-8 right-4">
                <div className="relative">
                  {/* Person */}
                  <div className="w-12 h-16 bg-coral-500 rounded-lg" />
                </div>
              </div>
            </div>
          </div>

          {/* Shield with X Symbol */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <Shield className="w-16 h-16 text-red-500" strokeWidth={2} />
              <div className="absolute inset-0 flex items-center justify-center">
                <X className="w-8 h-8 text-white" strokeWidth={3} />
              </div>
            </div>
          </div>

          {/* Gears */}
          <div className="absolute top-4 right-8">
            <Settings className="w-8 h-8 text-gray-400 animate-spin-slow" />
          </div>
          <div className="absolute top-8 right-16">
            <Settings className="w-6 h-6 text-gray-300 animate-spin-slow" />
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
