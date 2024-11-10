import { ICategory } from '@/interface';

interface ListCategories {
  categories: ICategory[];
  selectCategory: number;
  handleSelectCategory: (id: number) => void;
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
          onClick={() => handleSelectCategory(item.categoryId || 0)}
          className={`flex h-8 shrink-0 items-center cursor-pointer justify-center gap-x-2 rounded-xl pl-4 pr-4 ${selectCategory === item.categoryId ? 'bg-[#7c9dce]' : 'bg-[#f0f2f5]'}`}
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
