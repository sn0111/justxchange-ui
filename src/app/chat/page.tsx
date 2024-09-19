"use client"
import { useState } from 'react';

export default function Chat1() {
  const [showDetails, setShowDetails] = useState(false);

  // Function to toggle the details view
  const toggleDetails = () => setShowDetails(!showDetails);

  return (
    <div className="flex flex-col h-screen">
      {/* Chat List Details on Top */}
      {showDetails && (
        <div className="fixed top-0 left-0 w-full bg-white shadow-md z-10 p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14"
                style={{
                  backgroundImage:
                    'url("https://cdn.usegalileo.ai/stability/35d90491-b61f-45a6-adb3-7656162f05ba.png");',
                }}
              ></div>
              <div className="flex flex-col">
                <p className="text-[#141C24] text-base font-medium">
                  Biology Textbook
                </p>
                <p className="text-[#3F5374] text-sm font-normal">
                  Hey, I&apos;m interested in the textbook. Can you do $40?
                </p>
              </div>
            </div>
            <button
              onClick={toggleDetails}
              className="text-[#3F5374] text-lg font-bold"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Chat List Section */}
      <div className="flex flex-row gap-2 p-4 overflow-x-auto">
        {/* Chat List Item - Only Icons */}
        <div
          className="w-16 flex-shrink-0 cursor-pointer"
          onClick={toggleDetails}
        >
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg w-14 h-14"
            style={{
              backgroundImage:
                'url("https://cdn.usegalileo.ai/stability/35d90491-b61f-45a6-adb3-7656162f05ba.png");',
            }}
          ></div>
        </div>

        {/* Repeat for more items */}
      </div>

      {/* Chat Content Section */}
      <div className="flex-1 overflow-y-auto mt-16 p-4">
        {/* Chat Header */}
        <div className="flex flex-wrap justify-between gap-3 mb-4">
          <p className="text-[#141C24] tracking-light text-[32px] font-bold leading-tight min-w-72">
            Negotiate details for Biology Textbook
          </p>
        </div>

        {/* Chat Messages */}
        <div className="flex flex-col gap-4">
          <div className="flex items-end gap-3">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10"
              style={{
                backgroundImage:
                  'url("https://cdn.usegalileo.ai/stability/1a46c76c-ecaa-48af-aa38-ecb4bcc99d2d.png");',
              }}
            ></div>
            <div className="bg-[#E4E9F1] rounded-xl px-4 py-2 max-w-[60%]">
              <p className="text-[#3F5374] text-[13px]">Siqi Chen</p>
              <p>Hey, I&apos;m interested in the textbook. Can you do $40?</p>
            </div>
          </div>

          <div className="flex items-end gap-3 justify-end">
            <div className="bg-[#F4C753] rounded-xl px-4 py-2 max-w-[60%]">
              <p className="text-[#3F5374] text-[13px] text-right">
                Diane Smith
              </p>
              <p>Hi, I can do $45. It&apos;s brand new and I never used it.</p>
            </div>
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10"
              style={{
                backgroundImage:
                  'url("https://cdn.usegalileo.ai/sdxl10/559d5a52-d216-481a-bf44-a4a16128965d.png");',
              }}
            ></div>
          </div>
        </div>

        {/* Chat Input */}
        <div className="flex items-center gap-3 border-t border-[#E4E9F1] py-3">
          <input
            type="text"
            placeholder="Type a message"
            className="flex-1 bg-[#E4E9F1] px-4 py-2 rounded-xl focus:outline-none"
          />
          <button className="bg-[#F4C753] text-[#141C24] px-4 py-2 rounded-xl">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
