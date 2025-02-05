import {
  Cpu,
  Shirt,
  Package,
  BookOpen,
  HousePlug,
  Volleyball,
} from 'lucide-react';

export const API_URL = process.env.NEXT_PUBLIC_API_DOMAIN;
export const APP_DOMAIN = process.env.APP_DOMAIN;

export const categoryIcons: { [key: string]: JSX.Element } = {
  Electronics: <Cpu size={24} />,
  Books: <BookOpen size={24} />,
  Fashion: <Shirt size={24} />,
  'Home & Kitchen': <HousePlug size={24} />,
  'Sports & Outdoors': <Volleyball size={24} />,
  Others: <Package size={24} />,
};
