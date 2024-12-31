'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RedirectToHome() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/home'); // Redirect to /home
  }, [router]);

  return <div>loading...</div>; // Render nothing while redirecting
}
