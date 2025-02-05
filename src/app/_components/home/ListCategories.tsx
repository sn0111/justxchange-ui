import Button from '@/components/Button';
import { ICategory } from '@/interface';
import { categoryIcons } from '@/lib/constants';

interface ListCategories {
  categories: ICategory[];
  handleSelectCategory: (id: string) => void;
}
const ListCategories = ({
  categories,
  handleSelectCategory,
}: ListCategories) => {
  console.log(categories);
  return (
    <div className="flex gap-3 p-3 flex-wrap pr-4">
      {categories.map((item, key) => (
        // <div
        //   key={key}
        //   onClick={() => handleSelectCategory(item.id || '')}
        //   className={`flex h-10 shrink-0 items-center cursor-pointer justify-center gap-2 rounded-lg pl-3 pr-3 border transition-colors duration-200 ${
        //     selectCategory === item.id
        //       ? 'bg-blue-500 border-blue-500 text-white'
        //       : 'bg-white border-gray-300 text-gray-800 hover:bg-gray-100'
        //   }`}
        // >
        //   {/* Icon */}
        //   <span className="w-5 h-5">{categoryIcons[item.categoryName]}</span>
        //   {/* Category Name */}
        //   <p className="text-sm font-medium">{item.categoryName}</p>
        // </div>
        <Button
          key={key}
          iconPlacement="left"
          variant="default"
          borderRadius="roundedXl"
          icon={categoryIcons[item.categoryName]}
          onClick={() => handleSelectCategory(item.id || '')}
        >
          {item.categoryName}
        </Button>
      ))}
    </div>
  );
};

export default ListCategories;
