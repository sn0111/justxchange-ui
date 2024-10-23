import React from 'react';
import Loader from 'react-js-loader';

const LoaderComponent: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <Loader
        type="bubble-scale"
        bgColor={'#00BFFF'}
        title={'Loading...'}
        size={50}
      />
    </div>
  );
};

export default LoaderComponent;
