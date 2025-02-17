import React from 'react';

interface BadgeProps {
  condition: string;
}

const BadgeComponent: React.FC<BadgeProps> = ({ condition }) => {
  const badgeStyles: Record<BadgeProps['condition'], string> = {
    New: 'bg-gradient-to-r from-green-400/20 to-green-700/20 border-green-500/30',
    'Like New':
      'bg-gradient-to-r from-emerald-500/20 to-teal-700/20 border-teal-600/30',
    Used: 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-purple-500/30',
    'Heavily Used':
      'bg-gradient-to-r from-red-600/20 to-rose-800/20 border-red-700/30',
    Default:
      'bg-gradient-to-r from-gray-400/20 to-gray-600/20 border-gray-500/30',
  };

  return (
    <span
      className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-full ${
        badgeStyles[condition] || badgeStyles['Default']
      } text-white text-[10px] sm:text-xs font-medium border-[2px]`}
    >
      {condition}
    </span>
  );
};

export default BadgeComponent;
