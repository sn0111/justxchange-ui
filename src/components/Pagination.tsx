import React from 'react';

interface IPagination {
  count: number;
  selectedPage: number;
  selectPage: (pageNumber: number) => void;
}

const Pagination = ({ count, selectedPage = 1, selectPage }: IPagination) => {
  return (
    <div className="flex items-center justify-center p-4 bg-white shadow-md rounded-lg">
      {/* Pagination Controls */}
      <div className="flex items-center gap-2">
        {/* Left Arrow */}
        <button
          className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
          onClick={() => selectedPage > 1 && selectPage(selectedPage - 1)}
        >
          &lt;
        </button>
        {count > 3 && (
          <>
            {Array.from({ length: 3 }).map((_, index) => (
              <button
                key={index}
                className={`w-8 h-8 flex items-center justify-center rounded border ${selectedPage == index + 1 ? 'border-blue-500 bg-blue-100 text-blue-600 font-semibold' : 'border-gray-300 hover:bg-gray-100'}`}
                onClick={() => selectPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            {/* Ellipsis */}
            <span className="w-8 h-8 flex items-center justify-center text-gray-400">
              ...
            </span>

            {/* Last Page */}
            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 hover:bg-gray-100">
              {count}
            </button>
          </>
        )}
        {count < 4 &&
          Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              className={`w-8 h-8 flex items-center justify-center rounded border ${selectedPage == index + 1 ? 'border-blue-500 bg-blue-100 text-blue-600 font-semibold' : 'border-gray-300 hover:bg-gray-100'}`}
              onClick={() => selectPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

        <button
          onClick={() => selectedPage < count && selectPage(selectedPage + 1)}
          className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 text-gray-500 hover:bg-gray-100"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
