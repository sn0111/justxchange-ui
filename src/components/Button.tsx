import React from 'react';
import { SyncLoader } from 'react-spinners';

interface ButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'default2';
  size?: 'sm' | 'md' | 'lg' | 'default';
  borderRadius?: 'rounded' | 'squared' | 'roundedXl';
  icon?: React.ReactNode;
  isLoading?: boolean;
  loaderSize?: number;
  iconPlacement?: 'left' | 'right';
  iconClassName?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className = '',
  variant = 'default',
  size = 'md',
  borderRadius = 'rounded',
  isLoading,
  icon,
  iconPlacement = 'right',
  loaderSize = 8,
  iconClassName = `${iconPlacement === 'left' ? 'mr-2' : 'ml-2 group-hover:translate-x-1 transition-transform'}`,
  ...props
}) => {
  const baseClasses =
    'text-white px-6 py-2 font-medium shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 hover:animate-gradient-x flex items-center group';

  const variantClasses = {
    default: 'bg-gradiant-theme',
    default2: 'bg-gradiant-theme-btn',
  };

  const sizeClasses = {
    default: 'px-[0.5rem] py-2',
    sm: 'px-4 py-1 text-sm',
    md: 'px-6 py-2',
    lg: 'px-8 py-3 text-lg',
  };

  const borderRadiusClasses = {
    rounded: 'rounded-full',
    squared: 'rounded-lg',
    roundedXl: 'rounded-xl',
  };

  const hoverClasses = children ? 'hover:scale-105' : 'hover:-translate-y-1';

  return (
    <button
      disabled={isLoading}
      onClick={onClick}
      className={`
       ${baseClasses}
       ${variantClasses[variant]}
       ${sizeClasses[size]}
       ${borderRadiusClasses[borderRadius]}
       ${hoverClasses}
       ${className}
     `}
      {...props}
    >
      {isLoading ? (
        <SyncLoader size={loaderSize} color="#14a1ff" />
      ) : (
        <>
          {iconPlacement === 'left' && icon && (
            <span
              className={`${children ? iconClassName : ''} flex items-center`}
            >
              {icon}
            </span>
          )}
          {children}
          {iconPlacement === 'right' && icon && (
            <span
              className={`${children ? iconClassName : ''}   flex items-center`}
            >
              {icon}
            </span>
          )}
        </>
      )}
    </button>
  );
};

export default Button;
