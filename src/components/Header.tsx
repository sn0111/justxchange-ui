export const Header = ()=>{
    return <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f5] px-4 py-3 lg:px-10">
    <div className="flex items-center gap-4 text-[#111418]">
      <div className="size-4">
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
      <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] lg:text-xl">
        Campus Bazaar
      </h2>
    </div>
  
    <div className="flex items-center gap-4 flex-1 justify-end">
      <div className="hidden sm:flex w-full max-w-xs">
        <label className="flex w-full h-10">
          <div className="flex items-center bg-[#f0f2f5] rounded-l-xl pl-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
              <path
                d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
              ></path>
            </svg>
          </div>
          <input
            placeholder="Search"
            className="form-input w-full border-none bg-[#f0f2f5] rounded-r-xl pl-2 text-base font-normal leading-normal"
          />
        </label>
      </div>
  
      <button className="relative cursor-pointer bg-[#f0f2f5] rounded-xl p-2.5 text-[#111418] focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
          <path
            d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"
          ></path>
        </svg>
      </button>
  
      {/* <div className="hidden sm:block"> */}
        <div
          className="bg-center bg-no-repeat bg-cover rounded-full size-10"
          style={{ backgroundImage: 'url("https://cdn.usegalileo.ai/stability/53f32576-ee49-4a32-b27b-333a59b5d4c8.png")' }}
        ></div>
      {/* </div> */}
    </div>
  </header>
  
}