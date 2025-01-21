import React from 'react';

interface DefaultNotFoundProps {
  imageSrc: string;
  text: string;
  textSize?: string;
  containerHeight?: string;
  containerWidth?: string;
  textColor?: string;
}

const DefaultNotFound=({
  imageSrc ='https://justxchange-1.s3.ap-south-1.amazonaws.com/uploads/1735562621067_default.png',
  text = '',
  textSize = 'text-xl', // Default text size
  textColor = 'text-gray-800', // Default text color
}: DefaultNotFoundProps) => {
  return (
    <div className={`justify-center relative flex items-center p-2`}>
    <div
      className={` h-72 w-72  bg-cover bg-center rounded-lg`}
      style={{ backgroundImage: `url(${imageSrc})` }}
    >
      
    </div>
    <div
        className={`absolute bottom-2 flex items-center justify-center`}
      >
        <span className={`${textSize} ${textColor} font-bold`}>
          {text}
        </span>
      </div>
    </div>
  );
};

export default DefaultNotFound;
