export default function Chat(){
    return <div className="gap-1 px-6 flex flex-1 justify-center py-5">
    <div className="layout-content-container flex flex-col w-80">
      <div className="flex items-center gap-4 bg-[#F8F9FB] px-4 min-h-[72px] py-2 justify-between">
        <div className="flex items-center gap-4">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14"
            style={{backgroundImage: 'url("https://cdn.usegalileo.ai/stability/35d90491-b61f-45a6-adb3-7656162f05ba.png");'}}
          ></div>
          <div className="flex flex-col justify-center">
            <p className="text-[#141C24] text-base font-medium leading-normal line-clamp-1">Biology Textbook</p>
            <p className="text-[#3F5374] text-sm font-normal leading-normal line-clamp-2">Hey, I'm interested in the textbook. Can you do $40?</p>
          </div>
        </div>
        <div className="shrink-0"><p className="text-[#3F5374] text-sm font-normal leading-normal">5:30pm</p></div>
      </div>
      <div className="flex items-center gap-4 bg-[#F8F9FB] px-4 min-h-[72px] py-2 justify-between">
        <div className="flex items-center gap-4">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14"
            style={{backgroundImage: 'url("https://cdn.usegalileo.ai/stability/18a47b3d-9cae-45be-83c9-0cfa9502e7fa.png");'}}
          ></div>
          <div className="flex flex-col justify-center">
            <p className="text-[#141C24] text-base font-medium leading-normal line-clamp-1">Biology Textbook</p>
            <p className="text-[#3F5374] text-sm font-normal leading-normal line-clamp-2">Hi, I can do $45. It's brand new and I never used it.</p>
          </div>
        </div>
        <div className="shrink-0"><p className="text-[#3F5374] text-sm font-normal leading-normal">5:35pm</p></div>
      </div>
      <div className="flex items-center gap-4 bg-[#F8F9FB] px-4 min-h-[72px] py-2 justify-between">
        <div className="flex items-center gap-4">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14"
            style={{backgroundImage: 'url("https://cdn.usegalileo.ai/stability/d61c8f93-923e-4a48-982d-e0c934d75a97.png");'}}
          ></div>
          <div className="flex flex-col justify-center">
            <p className="text-[#141C24] text-base font-medium leading-normal line-clamp-1">Biology Textbook</p>
            <p className="text-[#3F5374] text-sm font-normal leading-normal line-clamp-2">Ok, let's do $45. How do we proceed from here?</p>
          </div>
        </div>
        <div className="shrink-0"><p className="text-[#3F5374] text-sm font-normal leading-normal">5:40pm</p></div>
      </div>
      <div className="flex items-center px-4 py-3 gap-3 @container">
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 shrink-0"
          style={{backgroundImage: 'url("https://cdn.usegalileo.ai/stability/3667371a-9186-4b73-9d33-9f37593c2eaf.png");'}}
        ></div>
        <label className="flex flex-col min-w-40 h-12 flex-1">
          <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
            <input
              placeholder="Type a message"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#141C24] focus:outline-0 focus:ring-0 border-none bg-[#E4E9F1] focus:border-none h-full placeholder:text-[#3F5374] px-4 rounded-r-none border-r-0 pr-2 text-base font-normal leading-normal"
              value=""
            />
            <div className="flex border-none bg-[#E4E9F1] items-center justify-center pr-4 rounded-r-xl border-l-0 !pr-2">
              <div className="flex items-center gap-4 justify-end">
                <div className="flex items-center gap-1">
                  <button className="flex items-center justify-center p-1.5">
                    <div className="text-[#3F5374]" data-icon="Image" data-size="20px" data-weight="regular">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                        <path
                          d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V158.75l-26.07-26.06a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L40,149.37V56ZM40,172l52-52,80,80H40Zm176,28H194.63l-36-36,20-20L216,181.38V200ZM144,100a12,12,0,1,1,12,12A12,12,0,0,1,144,100Z"
                        ></path>
                      </svg>
                    </div>
                  </button>
                </div>
                <button
                  className="min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#F4C753] text-[#141C24] text-sm font-medium leading-normal hidden @[480px]:block"
                >
                  <span className="truncate">Send</span>
                </button>
              </div>
            </div>
          </div>
        </label>
      </div>
    </div>
    <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <p className="text-[#141C24] tracking-light text-[32px] font-bold leading-tight min-w-72">Negotiate details for Biology Textbook</p>
      </div>
      <div className="flex items-end gap-3 p-4">
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0"
          style={{backgroundImage: 'url("https://cdn.usegalileo.ai/stability/1a46c76c-ecaa-48af-aa38-ecb4bcc99d2d.png");'}}
        ></div>
        <div className="flex flex-1 flex-col gap-1 items-start">
          <p className="text-[#3F5374] text-[13px] font-normal leading-normal max-w-[360px]">Siqi Chen</p>
          <p className="text-base font-normal leading-normal flex max-w-[360px] rounded-xl px-4 py-3 bg-[#E4E9F1] text-[#141C24]">
            Hey, I'm interested in the textbook. Can you do $40?
          </p>
        </div>
      </div>
      <div className="flex items-end gap-3 p-4 justify-end">
        <div className="flex flex-1 flex-col gap-1 items-end">
          <p className="text-[#3F5374] text-[13px] font-normal leading-normal max-w-[360px] text-right">Diane Smith</p>
          <p className="text-base font-normal leading-normal flex max-w-[360px] rounded-xl px-4 py-3 bg-[#F4C753] text-[#141C24]">
            Hi, I can do $45. It's brand new and I never used it.
          </p>
        </div>
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0"
          style={{backgroundImage: 'url("https://cdn.usegalileo.ai/sdxl10/559d5a52-d216-481a-bf44-a4a16128965d.png");'}}
        ></div>
      </div>
      <div className="flex items-end gap-3 p-4">
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0"
          style={{backgroundImage: 'url("https://cdn.usegalileo.ai/stability/43571f3c-a5a7-43ee-ad40-553a12d3494f.png");'}}
        ></div>
        <div className="flex flex-1 flex-col gap-1 items-start">
          <p className="text-[#3F5374] text-[13px] font-normal leading-normal max-w-[360px]">Siqi Chen</p>
          <p className="text-base font-normal leading-normal flex max-w-[360px] rounded-xl px-4 py-3 bg-[#E4E9F1] text-[#141C24]">
            Ok, let's do $45. How do we proceed from here?
          </p>
        </div>
      </div>
    </div>
  </div>

}