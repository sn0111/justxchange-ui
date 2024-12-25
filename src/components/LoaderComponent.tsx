import React from 'react';
// import Loader from 'react-js-loader';

const LoaderComponent: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-30 z-50">
      {/* <Loader
        type="bubble-ping"
        bgColor={'#000'}
        title={'Loading'}
        size={100}
      /> */}
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
};

export default LoaderComponent;
