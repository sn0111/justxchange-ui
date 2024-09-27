"use client"
import { useState, useEffect } from 'react';

// Hook to get window size
function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useEffect(() => {
    const handleResize = () => setSize([window.innerWidth, window.innerHeight]);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return size;
}

export default function Chat() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [width] = useWindowSize();

  // Update expanded state based on screen size
  useEffect(() => {
    setIsExpanded(width >= 1024); // Expands at lg breakpoint (1024px)
  }, [width]);

  return (
    <div className="flex flex-col lg:flex-row gap-1 px-6 py-5 h-screen">
      {/* Chat List Section */}
      <div
        className={`flex ${
          isExpanded ? 'flex-col w-64' : 'flex-row w-full overflow-x-auto flex-nowrap'
        } gap-4 lg:w-80 transition-width duration-300`}
      >
        {/* Chat Item 1 */}
        <div
          className={`flex items-center gap-4 bg-[#F8F9FB] px-4 min-h-[72px] py-2 hover:bg-[#E4E9F1] cursor-pointer ${
            isExpanded ? '' : 'justify-center'
          }`}
        >
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14"
            style={{
              backgroundImage:
                'url("https://cdn.usegalileo.ai/stability/35d90491-b61f-45a6-adb3-7656162f05ba.png");',
            }}
          ></div>
          {isExpanded && (
            <div className="flex flex-col justify-center">
              <p className="text-[#141C24] text-base font-medium leading-normal line-clamp-1">
                Biology Textbook
              </p>
              <p className="text-[#3F5374] text-sm font-normal leading-normal line-clamp-2">
                Hey, I&apos;m interested in the textbook. Can you do $40?
              </p>
            </div>
          )}
        </div>

        {/* Chat Item 2 */}
        <div
          className={`flex items-center gap-4 bg-[#F8F9FB] px-4 min-h-[72px] py-2 hover:bg-[#E4E9F1] cursor-pointer ${
            isExpanded ? '' : 'justify-center'
          }`}
        >
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14"
            style={{
              backgroundImage:
                'url("https://cdn.usegalileo.ai/stability/18a47b3d-9cae-45be-83c9-0cfa9502e7fa.png");',
            }}
          ></div>
          {isExpanded && (
            <div className="flex flex-col justify-center">
              <p className="text-[#141C24] text-base font-medium leading-normal line-clamp-1">
                Chemistry Textbook
              </p>
              <p className="text-[#3F5374] text-sm font-normal leading-normal line-clamp-2">
                Hi, I can do $45. It&apos;s brand new and never used.
              </p>
            </div>
          )}
        </div>

        {/* Chat Item 3 */}
        <div
          className={`flex items-center gap-4 bg-[#F8F9FB] px-4 min-h-[72px] py-2 hover:bg-[#E4E9F1] cursor-pointer ${
            isExpanded ? '' : 'justify-center'
          }`}
        >
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14"
            style={{
              backgroundImage:
                'url("https://cdn.usegalileo.ai/stability/d61c8f93-923e-4a48-982d-e0c934d75a97.png");',
            }}
          ></div>
          {isExpanded && (
            <div className="flex flex-col justify-center">
              <p className="text-[#141C24] text-base font-medium leading-normal line-clamp-1">
                Math Textbook
              </p>
              <p className="text-[#3F5374] text-sm font-normal leading-normal line-clamp-2">
                Ok, let&apos;s do $45. How do we proceed from here?
              </p>
            </div>
          )}
        </div>

        {/* Add more chat items similarly as needed */}
      </div>

      {/* Chat Content Section */}
      <div className="flex flex-1 flex-col">
        {/* Chat Header */}
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="text-[#141C24] tracking-light text-[32px] font-bold leading-tight min-w-72">
            Negotiate details for Biology Textbook
          </p>
        </div>

        {/* Chat Messages */}
        <div className="flex flex-1 flex-col overflow-y-auto">
          <div className="flex items-end gap-3 p-4">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0"
              style={{
                backgroundImage:
                  'url("https://cdn.usegalileo.ai/stability/1a46c76c-ecaa-48af-aa38-ecb4bcc99d2d.png");',
              }}
            ></div>
            <div className="flex flex-1 flex-col gap-1 items-start">
              <p className="text-[#3F5374] text-[13px] font-normal leading-normal max-w-[360px]">
                Siqi Chen
              </p>
              <p className="text-base font-normal leading-normal flex max-w-[360px] rounded-xl px-4 py-3 bg-[#E4E9F1] text-[#141C24]">
                Hey, I&apos;m interested in the textbook. Can you do $40?
              </p>
            </div>
          </div>

          <div className="flex items-end gap-3 p-4 justify-end">
            <div className="flex flex-1 flex-col gap-1 items-end">
              <p className="text-[#3F5374] text-[13px] font-normal leading-normal max-w-[360px] text-right">
                Diane Smith
              </p>
              <p className="text-base font-normal leading-normal flex max-w-[360px] rounded-xl px-4 py-3 bg-[#F4C753] text-[#141C24]">
                Hi, I can do $45. It&apos;s brand new and I never used it.
              </p>
            </div>
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0"
              style={{
                backgroundImage:
                  'url("https://cdn.usegalileo.ai/sdxl10/559d5a52-d216-481a-bf44-a4a16128965d.png");',
              }}
            ></div>
          </div>
        </div>

        {/* Chat Input */}
        <div className="flex items-center px-4 py-3 gap-3 border-t border-[#E4E9F1]">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 shrink-0"
            style={{
              backgroundImage:
                'url("https://cdn.usegalileo.ai/stability/3667371a-9186-4b73-9d33-9f37593c2eaf.png");',
            }}
          ></div>
          <label className="flex flex-1">
            <input
              placeholder="Type a message"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#141C24] focus:outline-0 focus:ring-0 border-none bg-[#E4E9F1] placeholder:text-[#3F5374] px-4 h-12"
            />
            <button className="ml-3 min-w-[84px] h-8 px-4 bg-[#F4C753] text-[#141C24] text-sm font-medium rounded-xl">
              Send
            </button>
          </label>
        </div>
      </div>
    </div>
  );
}

// import { useState } from 'react';

// export default function Chat() {
//   const [showDetails, setShowDetails] = useState(false);

//   // Function to toggle the details view
//   const toggleDetails = () => setShowDetails(!showDetails);

//   return (
//     <div className="flex flex-col h-screen">
//       {/* Chat List Details on Top */}
//       {showDetails && (
//         <div className="fixed top-0 left-0 w-full bg-white shadow-md z-10 p-4">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center gap-4">
//               <div
//                 className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14"
//                 style={{
//                   backgroundImage:
//                     'url("https://cdn.usegalileo.ai/stability/35d90491-b61f-45a6-adb3-7656162f05ba.png");',
//                 }}
//               ></div>
//               <div className="flex flex-col">
//                 <p className="text-[#141C24] text-base font-medium">
//                   Biology Textbook
//                 </p>
//                 <p className="text-[#3F5374] text-sm font-normal">
//                   Hey, I&apos;m interested in the textbook. Can you do $40?
//                 </p>
//               </div>
//             </div>
//             <button
//               onClick={toggleDetails}
//               className="text-[#3F5374] text-lg font-bold"
//             >
//               ×
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Chat List Section */}
//       <div className="flex flex-row gap-2 p-4 overflow-x-auto">
//         {/* Chat List Item - Only Icons */}
//         <div
//           className="w-16 flex-shrink-0 cursor-pointer"
//           onClick={toggleDetails}
//         >
//           <div
//             className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg w-14 h-14"
//             style={{
//               backgroundImage:
//                 'url("https://cdn.usegalileo.ai/stability/35d90491-b61f-45a6-adb3-7656162f05ba.png");',
//             }}
//           ></div>
//         </div>

//         {/* Repeat for more items */}
//       </div>

//       {/* Chat Content Section */}
//       <div className="flex-1 overflow-y-auto mt-16 p-4">
//         {/* Chat Header */}
//         <div className="flex flex-wrap justify-between gap-3 mb-4">
//           <p className="text-[#141C24] tracking-light text-[32px] font-bold leading-tight min-w-72">
//             Negotiate details for Biology Textbook
//           </p>
//         </div>

//         {/* Chat Messages */}
//         <div className="flex flex-col gap-4">
//           <div className="flex items-end gap-3">
//             <div
//               className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10"
//               style={{
//                 backgroundImage:
//                   'url("https://cdn.usegalileo.ai/stability/1a46c76c-ecaa-48af-aa38-ecb4bcc99d2d.png");',
//               }}
//             ></div>
//             <div className="bg-[#E4E9F1] rounded-xl px-4 py-2 max-w-[60%]">
//               <p className="text-[#3F5374] text-[13px]">Siqi Chen</p>
//               <p>Hey, I&apos;m interested in the textbook. Can you do $40?</p>
//             </div>
//           </div>

//           <div className="flex items-end gap-3 justify-end">
//             <div className="bg-[#F4C753] rounded-xl px-4 py-2 max-w-[60%]">
//               <p className="text-[#3F5374] text-[13px] text-right">
//                 Diane Smith
//               </p>
//               <p>Hi, I can do $45. It&apos;s brand new and I never used it.</p>
//             </div>
//             <div
//               className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10"
//               style={{
//                 backgroundImage:
//                   'url("https://cdn.usegalileo.ai/sdxl10/559d5a52-d216-481a-bf44-a4a16128965d.png");',
//               }}
//             ></div>
//           </div>
//         </div>

//         {/* Chat Input */}
//         <div className="flex items-center gap-3 border-t border-[#E4E9F1] py-3">
//           <input
//             type="text"
//             placeholder="Type a message"
//             className="flex-1 bg-[#E4E9F1] px-4 py-2 rounded-xl focus:outline-none"
//           />
//           <button className="bg-[#F4C753] text-[#141C24] px-4 py-2 rounded-xl">
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
