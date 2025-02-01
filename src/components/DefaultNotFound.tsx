import React from 'react';
import imageSrc from '../public/images/404_page.png'
interface DefaultNotFoundProps {
  text: string;
  textSize?: string;
  containerHeight?: string;
  containerWidth?: string;
  textColor?: string;
}

const DefaultNotFound=({
  text = '',
  textSize = 'text-xl', // Default text size
  textColor = 'text-gray-800', // Default text color
}: DefaultNotFoundProps) => {
  return (
    <div className={`justify-center relative flex items-center p-2`}>
    <div
      className={` h-72 w-72  bg-cover bg-center rounded-lg`}
      style={{ backgroundImage: `url(${imageSrc.src})` }}
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
