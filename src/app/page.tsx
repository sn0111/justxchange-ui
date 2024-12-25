'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function RedirectToHome() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/home'); // Redirect to /home
  }, [router]);

  return null; // Render nothing while redirecting
}
