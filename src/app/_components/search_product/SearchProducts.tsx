import Pagination from '@/components/Pagination';
import { ICategory, IProduct, ISuggesions } from '@/interface';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import {
  FiMonitor,
  FiSearch,
  FiTable,
} from 'react-icons/fi';

interface ISearchProducts {
  router: AppRouterInstance;
  categories: ICategory[];
  products: IProduct[];
  selectCategory: string;
  getProductsByCategory:(categoryUuid: string, searchQuery: string, condition: string, filter: boolean)=>void;
  selectPage: (pageNumber: number) => void;
  selectedPage: number;
  query: string;
  setQuery: (query:string)=>void;
  handleKeyDown:(e: React.KeyboardEvent)=>void;
  loading: boolean;
  activeIndex: number;
  setActiveIndex: (index:number)=>void;
  suggestions: ISuggesions[];
  setSuggestions: (suggestions: ISuggesions[])=>void;
  productsCount: number;
}
const SearchProducts = ({ router, categories, products, selectCategory,  getProductsByCategory, selectPage, selectedPage, query, setQuery, handleKeyDown, loading, activeIndex, setActiveIndex, suggestions, setSuggestions, productsCount }: ISearchProducts) => {



  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Plus Jakarta Sans, Noto Sans, sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col md:p-6">
        <div className="gap-1 flex flex-1 justify-center ">
          <div className="hidden md:flex layout-content-container flex-col w-80">
            <div className="flex h-full min-h-[700px] flex-col justify-between bg-slate-50 p-4">
              <div className="flex flex-col gap-4">
                <h1 className="text-[#0d141c] text-base font-medium leading-normal">
                  Choose Category
                </h1>
                <div className="flex flex-col gap-2">
                  <div onClick={()=>getProductsByCategory('', '' ,'', false)} className={`flex items-center gap-3 px-3 py-2 rounded-xl hover:cursor-pointer hover:bg-[#e7edf4] ${selectCategory==='' && 'bg-[#e7edf4]'}`}>
                    <FiTable className="text-[#0d141c]" size={24} />
                    <p className="text-[#0d141c] text-sm font-medium leading-normal">
                      All Listings
                    </p>
                  </div>
                  {categories.map((item)=><div onClick={()=>getProductsByCategory(item.id, '', '', true)} key={item.id} className={`flex items-center gap-3 px-3 py-2 rounded-xl hover:cursor-pointer hover:bg-[#e7edf4] ${selectCategory===item.id && 'bg-[#e7edf4]'}`}>
                    <FiMonitor className="text-[#0d141c]" size={24} />
                    <p className="text-[#0d141c] text-sm font-medium leading-normal">
                      {item.categoryName}
                    </p>
                  </div>)}
                </div>
              </div>
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#2589f4] text-slate-50 text-sm font-bold leading-normal tracking-[0.015em]">
                <span className="truncate">New Listing</span>
              </button>
            </div>
          </div>
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* <div className="px-4 py-3">
              <label className="flex flex-col min-w-40 h-12 w-full">
                <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                  <div className="text-[#49719c] flex border-none bg-[#e7edf4] items-center justify-center pl-4 rounded-l-xl border-r-0">
                    <FiSearch size={24} />
                  </div>
                  <input
                    placeholder="Search by item name, description, etc."
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0d141c] focus:outline-0 focus:ring-0 border-none bg-[#e7edf4] focus:border-none h-full placeholder:text-[#49719c] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                    // value=""
                  />
                </div>
              </label>
            </div> */}
            <div className="px-4 py-3 relative">
              <label className="flex flex-col min-w-40 h-12 w-full">
                <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                  <div className="text-[#49719c] flex border-none bg-[#e7edf4] items-center justify-center pl-4 rounded-l-xl border-r-0">
                    <FiSearch size={24} />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by item name, description, etc."
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0d141c] focus:outline-0 focus:ring-0 border-none bg-[#e7edf4] focus:border-none h-full placeholder:text-[#49719c] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </label>

              {/* Suggestions Dropdown */}
              {query.trim() && (
                <div
                  className="absolute w-full bg-white shadow-lg rounded-xl mt-1 z-10 max-h-60 overflow-y-auto border border-gray-300"
                >
                  {loading ? (
                    <div className="px-4 py-2 text-center text-gray-500">Loading...</div>
                  ) : suggestions.length > 0 ? (
                    suggestions.map((suggestion, index) => (
                      <div
                        key={suggestion.id}
                        className={`px-4 py-2 text-sm cursor-pointer ${
                          activeIndex === index
                            ? 'bg-[#e7edf4] text-[#49719c]'
                            : 'hover:bg-[#f4f6f9] text-[#0d141c]'
                        }`}
                        onClick={() => {
                          setActiveIndex(index)
                          setQuery(suggestion.productName);
                          setSuggestions([]);
                          getProductsByCategory('', suggestion.productName, '', true)
                        }}
                        onMouseEnter={() => setActiveIndex(index)}
                      >
                        {suggestion.productName}
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-center text-gray-500">No suggestions found.</div>
                  )}
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 p-4 min-h-[73vh] overflow-y-scroll">
              {products.map((item) => (
                <div key={item.id} className="flex flex-col gap-3 pb-3">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl cursor-pointer"
                    style={{ backgroundImage: `url("${item.images[0]}")` }}
                    onClick={() => router.push(`/view?productId=${item.id}`)}
                  ></div>
                  <div>
                    <p className="text-[#111418] text-base font-medium leading-normal">
                      {item.productName}
                    </p>
                    <p className="text-[#60758a] text-sm font-normal leading-normal">
                      {item.amount}
                    </p>
                    <p className="text-[#60758a] text-sm font-normal leading-normal">
                      {item.condition}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-3">
              {Math.ceil(productsCount / 10) > 0 && (
                <Pagination
                  count={Math.ceil(productsCount / 10)}
                  selectPage={selectPage}
                  selectedPage={selectedPage}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchProducts;
