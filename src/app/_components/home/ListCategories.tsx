import { ICategory } from "@/interface";

interface ListCategories{
    categories: ICategory[]
}
const ListCategories = ({categories}:ListCategories) =>{
    return (
      <div className="flex gap-3 p-3 flex-wrap pr-4">
        {categories.map((item, key) => (
          <div
            key={key}
            className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#f0f2f5] pl-4 pr-4"
          >
            <p className="text-[#111418] text-sm font-medium leading-normal">
              {item.categoryName}
            </p>
          </div>
        ))}
      </div>
    );
}

export default ListCategories;