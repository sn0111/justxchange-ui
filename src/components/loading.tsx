// components/Loading.tsx (Client Component)
'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import LoaderComponent from './LoaderComponent';

const Loading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Trigger loading state when route or search params change
  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Simulate loading delay

    return () => clearTimeout(timer); // Clean up the timeout
  }, [pathname, searchParams]);

  return <>{isLoading && <LoaderComponent />}</>;
};

export default Loading;
