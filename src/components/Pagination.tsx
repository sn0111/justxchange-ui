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
                className={`w-8 h-8 flex items-center justify-center rounded border ${selectedPage == index + 1 ? 'border-purple-500 bg-purple-100 text-purple-600 font-semibold' : 'border-gray-300 hover:bg-gray-100'}`}
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
              className={`w-8 h-8 flex items-center justify-center rounded border ${selectedPage == index + 1 ? 'border-purple-500 bg-purple-100 text-purple-600 font-semibold' : 'border-gray-300 hover:bg-gray-100'}`}
              onClick={() => selectPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

        {/* Page Numbers */}
        {/* <button className="w-8 h-8 flex items-center justify-center rounded border border-purple-500 bg-purple-100 text-purple-600 font-semibold">
          1
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 hover:bg-gray-100">
          2
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 hover:bg-gray-100">
          3
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 hover:bg-gray-100">
          4
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 hover:bg-gray-100">
          5
        </button> */}

        {/* Ellipsis */}
        {/* <span className="w-8 h-8 flex items-center justify-center text-gray-400">
          ...
        </span> */}

        {/* Last Page */}
        {/* <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 hover:bg-gray-100">
          10
        </button> */}

        {/* Right Arrow */}
        <button
          onClick={() => selectedPage < count && selectPage(selectedPage + 1)}
          className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 text-gray-500 hover:bg-gray-100"
        >
          &gt;
        </button>
      </div>

      {/* Rows per page */}
      {/* <div className="flex items-center gap-2">
        <span className="text-gray-600 text-sm">Show:</span>
        <select
          className="border border-gray-300 rounded px-2 py-1 text-sm focus:ring focus:ring-purple-300"
          defaultValue="10"
        >
          <option value="5">5 rows</option>
          <option value="10">10 rows</option>
          <option value="20">20 rows</option>
          <option value="50">50 rows</option>
        </select>
      </div> */}

      {/* Go to Page */}
      {/* <div className="flex items-center gap-2">
        <span className="text-gray-600 text-sm">Go to</span>
        <input
          type="text"
          placeholder=" "
          className="border border-gray-300 rounded px-2 py-1 text-sm w-12 focus:ring focus:ring-purple-300"
        />
      </div> */}
    </div>
  );
};

export default Pagination;
