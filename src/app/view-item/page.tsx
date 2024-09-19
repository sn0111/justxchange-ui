import Link from "next/link";

export default function ViewItem(){
    return <div className="px-40 flex flex-1 justify-center py-5">
    <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
      <div className="flex flex-wrap gap-2 p-4">
        <a className="text-[#49719c] text-base font-medium leading-normal" href="#">Home</a>
        <span className="text-[#49719c] text-base font-medium leading-normal">/</span>
        <a className="text-[#49719c] text-base font-medium leading-normal" href="#">Campus Bazaar</a>
        <span className="text-[#49719c] text-base font-medium leading-normal">/</span>
        <span className="text-[#0d141c] text-base font-medium leading-normal">Listings</span>
      </div>
      <div className="pb-3">
        <div className="flex border-b border-[#cedbe8] px-4 gap-8">
          <a className="flex flex-col items-center justify-center border-b-[3px] border-b-[#2589f4] text-[#0d141c] pb-[13px] pt-4" href="#">
            <p className="text-[#0d141c] text-sm font-bold leading-normal tracking-[0.015em]">For Sale</p>
          </a>
          <a className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#49719c] pb-[13px] pt-4" href="#">
            <p className="text-[#49719c] text-sm font-bold leading-normal tracking-[0.015em]">Wanted</p>
          </a>
          <a className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#49719c] pb-[13px] pt-4" href="#">
            <p className="text-[#49719c] text-sm font-bold leading-normal tracking-[0.015em]">Saved</p>
          </a>
        </div>
      </div>
      <h2 className="text-[#0d141c] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Dorm Bedding Set</h2>
      <div className="flex w-full grow bg-slate-50 @container p-4">
        <div className="w-full gap-1 overflow-hidden bg-slate-50 @[480px]:gap-2 aspect-[3/2] rounded-xl grid grid-cols-[2fr_1fr_1fr]">
          <div
            className="w-full bg-center bg-no-repeat bg-cover aspect-auto rounded-none row-span-2"
            style={{backgroundImage: 'url("https://cdn.usegalileo.ai/sdxl10/4a713503-117e-408d-9a46-776b9f579d68.png");'}}
          ></div>
          <div
            className="w-full bg-center bg-no-repeat bg-cover aspect-auto rounded-none col-span-2"
            style={{backgroundImage: 'url("https://cdn.usegalileo.ai/sdxl10/94775630-cf50-4317-88fb-3726f0bcf951.png");'}}
          ></div>
          <div
            className="w-full bg-center bg-no-repeat bg-cover aspect-auto rounded-none col-span-2"
            style={{backgroundImage: 'url("https://cdn.usegalileo.ai/sdxl10/1bf92a27-2460-4465-8f8f-bc5c39c07cf5.png");'}}
          ></div>
        </div>
      </div>
      <h1 className="text-[#0d141c] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 text-left pb-3 pt-5">Dorm Bedding Set</h1>
      <p className="text-[#0d141c] text-base font-normal leading-normal pb-3 pt-1 px-4">Brand new, never used. Twin XL comforter, sheet set, and pillow case.</p>
      <div className="p-4 grid grid-cols-2">
        <div className="flex flex-col gap-1 border-t border-solid border-t-[#cedbe8] py-4 pr-2">
          <p className="text-[#49719c] text-sm font-normal leading-normal">Price</p>
          <p className="text-[#0d141c] text-sm font-normal leading-normal">$50</p>
        </div>
        <div className="flex flex-col gap-1 border-t border-solid border-t-[#cedbe8] py-4 pl-2">
          <p className="text-[#49719c] text-sm font-normal leading-normal">Condition</p>
          <p className="text-[#0d141c] text-sm font-normal leading-normal">New</p>
        </div>
        <div className="flex flex-col gap-1 border-t border-solid border-t-[#cedbe8] py-4 pr-2">
          <p className="text-[#49719c] text-sm font-normal leading-normal">Brand</p>
          <p className="text-[#0d141c] text-sm font-normal leading-normal">Pottery Barn</p>
        </div>
        <div className="flex flex-col gap-1 border-t border-solid border-t-[#cedbe8] py-4 pl-2">
          <p className="text-[#49719c] text-sm font-normal leading-normal">Size</p>
          <p className="text-[#0d141c] text-sm font-normal leading-normal">Twin XL</p>
        </div>
        <div className="flex flex-col gap-1 border-t border-solid border-t-[#cedbe8] py-4 pr-2 col-span-2 pr-[50%]">
          <p className="text-[#49719c] text-sm font-normal leading-normal">Color</p>
          <p className="text-[#0d141c] text-sm font-normal leading-normal">Gray</p>
        </div>
      </div>
      <div className="flex items-center gap-4 bg-slate-50 px-4 min-h-14 justify-between">
        <div className="flex items-center gap-4">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-10 w-fit"
            style={{backgroundImage: 'url("https://cdn.usegalileo.ai/stability/d7346a7c-e147-4fe0-a4d5-3a030d2d74bf.png");'}}
          ></div>
          <p className="text-[#0d141c] text-base font-normal leading-normal flex-1 truncate">View seller&apos;s profile</p>
        </div>
        <div className="shrink-0">
          <div className="text-[#0d141c] flex size-7 items-center justify-center" data-icon="CaretRight" data-size="24px" data-weight="regular">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="flex px-4 py-3 justify-end">
        <div className="px-3">
          <button
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#e7edf4] text-[#0d141c] gap-2 pl-4 text-sm font-bold leading-normal tracking-[0.015em]"
            >
            <div className="text-[#0d141c]" data-icon="Flag" data-size="20px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                <path
                  d="M34.76,42A8,8,0,0,0,32,48V216a8,8,0,0,0,16,0V171.77c26.79-21.16,49.87-9.75,76.45,3.41,16.4,8.11,34.06,16.85,53,16.85,13.93,0,28.54-4.75,43.82-18a8,8,0,0,0,2.76-6V48A8,8,0,0,0,210.76,42c-28,24.23-51.72,12.49-79.21-1.12C103.07,26.76,70.78,10.79,34.76,42ZM208,164.25c-26.79,21.16-49.87,9.74-76.45-3.41-25-12.35-52.81-26.13-83.55-8.4V51.79c26.79-21.16,49.87-9.75,76.45,3.4,25,12.35,52.82,26.13,83.55,8.4Z"
                ></path>
              </svg>
            </div>
            <span className="truncate">Report</span>
          </button>
        </div>
        <div className="px-3">
          <button
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#e7edf4] text-[#0d141c] gap-2 pl-4 text-sm font-bold leading-normal tracking-[0.015em]"
          >
            <div className="text-[#0d141c]" data-icon="Bookmark" data-size="20px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                <path
                  d="M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Zm0,16V161.57l-51.77-32.35a8,8,0,0,0-8.48,0L72,161.56V48ZM132.23,177.22a8,8,0,0,0-8.48,0L72,209.57V180.43l56-35,56,35v29.14Z"
                ></path>
              </svg>
            </div>
            <span className="truncate">Save</span>
          </button>
        </div>
        <div className="pl-3">
          <Link
          href="/chat"
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#2589f4] text-slate-50 gap-2 pl-4 text-sm font-bold leading-normal tracking-[0.015em]"
          >
            <div className="text-slate-50" data-icon="ChatCircle" data-size="20px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                <path
                  d="M128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216,52.47,178.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Z"
                ></path>
              </svg>
            </div>
            <span className="truncate">Message</span>
          </Link>
        </div>
      </div>
      {/* <div className="flex px-4 py-3 justify-end">
        <button
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#e7edf4] text-[#0d141c] gap-2 pl-4 text-sm font-bold leading-normal tracking-[0.015em]"
        >
          <div className="text-[#0d141c]" data-icon="Bookmark" data-size="20px" data-weight="regular">
            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
              <path
                d="M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Zm0,16V161.57l-51.77-32.35a8,8,0,0,0-8.48,0L72,161.56V48ZM132.23,177.22a8,8,0,0,0-8.48,0L72,209.57V180.43l56-35,56,35v29.14Z"
              ></path>
            </svg>
          </div>
          <span className="truncate">Save</span>
        </button>
      </div>
      <div className="flex px-4 py-3 justify-end">
        <button
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-transparent text-[#0d141c] gap-2 pl-4 text-sm font-bold leading-normal tracking-[0.015em]"
        >
          <div className="text-[#0d141c]" data-icon="Flag" data-size="20px" data-weight="regular">
            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
              <path
                d="M34.76,42A8,8,0,0,0,32,48V216a8,8,0,0,0,16,0V171.77c26.79-21.16,49.87-9.75,76.45,3.41,16.4,8.11,34.06,16.85,53,16.85,13.93,0,28.54-4.75,43.82-18a8,8,0,0,0,2.76-6V48A8,8,0,0,0,210.76,42c-28,24.23-51.72,12.49-79.21-1.12C103.07,26.76,70.78,10.79,34.76,42ZM208,164.25c-26.79,21.16-49.87,9.74-76.45-3.41-25-12.35-52.81-26.13-83.55-8.4V51.79c26.79-21.16,49.87-9.75,76.45,3.4,25,12.35,52.82,26.13,83.55,8.4Z"
              ></path>
            </svg>
          </div>
          <span className="truncate">Report</span>
        </button>
      </div> */}
    </div>
  </div>
}