import { ICategory } from '@/interface';

interface ListCategories {
  categories: ICategory[];
  selectCategory: string;
  handleSelectCategory: (id: string) => void;
}
const ListCategories = ({
  categories,
  selectCategory,
  handleSelectCategory,
}: ListCategories) => {
  return (
    <div className="flex gap-3 p-3 flex-wrap pr-4">
      {categories.map((item, key) => (
        <div
          key={key}
          onClick={() => handleSelectCategory(item.id || '')}
          className={`flex h-8 shrink-0 items-center cursor-pointer justify-center gap-x-2 rounded-xl pl-4 pr-4 ${selectCategory === item.id ? 'bg-[#7c9dce]' : 'bg-[#f0f2f5]'}`}
        >
          <p className="text-[#111418] text-sm font-medium leading-normal">
            {item.categoryName}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ListCategories;
