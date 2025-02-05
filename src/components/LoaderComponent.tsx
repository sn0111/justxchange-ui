import React from 'react';
import { PulseLoader } from 'react-spinners';

const LoaderComponent: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-10 z-50">
      <PulseLoader color="#0060a1" />
    </div>
  );
};

export default LoaderComponent;
