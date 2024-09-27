'use client';

import { useRouter } from 'next/navigation';
import {
  FiTable,
  FiMonitor,
  FiBook,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';

export default function Search() {
  const router = useRouter();

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
                <h1 className="text-[#0d141c] text-base font-medium leading-normal">Listings</h1>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-[#e7edf4]">
                    <FiTable className="text-[#0d141c]" size={24} />
                    <p className="text-[#0d141c] text-sm font-medium leading-normal">All Listings</p>
                  </div>
                  <div className="flex items-center gap-3 px-3 py-2">
                    <FiMonitor className="text-[#0d141c]" size={24} />
                    <p className="text-[#0d141c] text-sm font-medium leading-normal">Electronics</p>
                  </div>
                  <div className="flex items-center gap-3 px-3 py-2">
                    <FiBook className="text-[#0d141c]" size={24} />
                    <p className="text-[#0d141c] text-sm font-medium leading-normal">Books</p>
                  </div>
                </div>
              </div>
              <button
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#2589f4] text-slate-50 text-sm font-bold leading-normal tracking-[0.015em]"
              >
                <span className="truncate">New Listing</span>
              </button>
            </div>
          </div>
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="px-4 py-3">
              <label className="flex flex-col min-w-40 h-12 w-full">
                <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                  <div
                    className="text-[#49719c] flex border-none bg-[#e7edf4] items-center justify-center pl-4 rounded-l-xl border-r-0"
                  >
                    <FiSearch size={24} />
                  </div>
                  <input
                    placeholder="Search by item name, description, etc."
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0d141c] focus:outline-0 focus:ring-0 border-none bg-[#e7edf4] focus:border-none h-full placeholder:text-[#49719c] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                    value=""
                  />
                </div>
              </label>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 p-4">
              {[
                { name: 'Intro to Computer Science', price: '$50', rating: '4.3/5', img: 'https://cdn.usegalileo.ai/stability/6d1e9cb7-c3ba-4408-a046-b8beb221216a.png' },
                { name: 'The Great Gatsby', price: '$10', rating: '4.5/5', img: 'https://cdn.usegalileo.ai/stability/e668574b-8197-47bf-8e2e-432981896e6a.png' },
                { name: 'Hamlet', price: '$8', rating: '4.2/5', img: 'https://cdn.usegalileo.ai/sdxl10/796fe706-860d-4630-9e58-921dcfb2dde5.png' },
                { name: 'Organic Chemistry', price: '$70', rating: '4.6/5', img: 'https://cdn.usegalileo.ai/sdxl10/63d44c89-ade7-482f-903f-eefe662e58e2.png' },
                { name: 'The Elements of Style', price: '$6', rating: '4.3/5', img: 'https://cdn.usegalileo.ai/sdxl10/280d8187-53ab-46c9-b4a1-367ed2149a93.png' },
                { name: 'The Odyssey', price: '$12', rating: '4.5/5', img: 'https://cdn.usegalileo.ai/sdxl10/befc5121-1000-4637-ba2e-246f853f23e4.png' },
                { name: 'A Tale of Two Cities', price: '$7', rating: '4.1/5', img: 'https://cdn.usegalileo.ai/sdxl10/54438da4-ed97-4444-961e-d1e1d9f2753b.png' },
                { name: 'The Catcher in the Rye', price: '$15', rating: '4.4/5', img: 'https://cdn.usegalileo.ai/stability/dae7aec8-a52f-453f-b1cb-85eccb346c7d.png' },
              ].map((item) => (
                <div key={item.name} className="flex flex-col gap-3 pb-3">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl cursor-pointer"
                    style={{ backgroundImage: `url("${item.img}")` }}
                    onClick={()=>router.push("/view-item")}
                  ></div>
                  <div>
                    <p className="text-[#111418] text-base font-medium leading-normal">{item.name}</p>
                    <p className="text-[#60758a] text-sm font-normal leading-normal">{item.price}</p>
                    <p className="text-[#60758a] text-sm font-normal leading-normal">{item.rating}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              <div className="flex flex-col gap-3 pb-3">
                <div
                  className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                  style={{backgroundImage: 'url("https://cdn.usegalileo.ai/stability/2302ba91-f14e-484e-8126-23b7f56033ac.png");'}}
                ></div>
                <div>
                  <p className="text-[#0d141c] text-base font-medium leading-normal">Macbook Pro 2018</p>
                  <p className="text-[#49719c] text-sm font-normal leading-normal">$650</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 pb-3">
                <div
                  className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                  style={{backgroundImage: 'url("https://cdn.usegalileo.ai/stability/45aeba59-78a9-4076-bf70-b2d62e7198ba.png");'}}
                ></div>
                <div>
                  <p className="text-[#0d141c] text-base font-medium leading-normal">Calculus Textbook</p>
                  <p className="text-[#49719c] text-sm font-normal leading-normal">$30</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 pb-3">
                <div
                  className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                  style={{backgroundImage: 'url("https://cdn.usegalileo.ai/stability/1968e1f2-ab6e-440c-b203-62fe2ba1ddf2.png");'}}
                ></div>
                <div>
                  <p className="text-[#0d141c] text-base font-medium leading-normal">IKEA Desk</p>
                  <p className="text-[#49719c] text-sm font-normal leading-normal">$100</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 pb-3">
                <div
                  className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                  style={{backgroundImage: 'url("https://cdn.usegalileo.ai/stability/105a4fff-0aef-4fd2-8c3e-6688c1c17d06.png");'}}
                ></div>
                <div>
                  <p className="text-[#0d141c] text-base font-medium leading-normal">Nike Air Max</p>
                  <p className="text-[#49719c] text-sm font-normal leading-normal">$80</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 pb-3">
                <div
                  className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                  style={{backgroundImage: 'url("https://cdn.usegalileo.ai/stability/9570fd33-ca3d-4ee4-910f-129ec5b36625.png");'}}
                ></div>
                <div>
                  <p className="text-[#0d141c] text-base font-medium leading-normal">iPhone X</p>
                  <p className="text-[#49719c] text-sm font-normal leading-normal">$450</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 pb-3">
                <div
                  className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                  style={{backgroundImage: 'url("https://cdn.usegalileo.ai/sdxl10/e20020d3-642d-4c42-b141-375016517c7a.png");'}}
                ></div>
                <div>
                  <p className="text-[#0d141c] text-base font-medium leading-normal">Vintage Band T-shirt</p>
                  <p className="text-[#49719c] text-sm font-normal leading-normal">$25</p>
                </div>
              </div>
            </div> */}
            <div className="flex items-center justify-center p-4">
              <a href="#" className="flex size-10 items-center justify-center">
                <FiChevronLeft className="text-[#0d141c]" size={18} />
              </a>
              <a
                className="text-sm font-bold leading-normal tracking-[0.015em] flex size-10 items-center justify-center text-[#0d141c] rounded-full bg-[#e7edf4]"
                href="#"
              >
                1
              </a>
              {/* Add similar pagination buttons as needed */}
              <a href="#" className="flex size-10 items-center justify-center">
                <FiChevronRight className="text-[#0d141c]" size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// export default function Search(){
//     return <div className="relative flex size-full min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden" style={{fontFamily: 'Plus Jakarta Sans", "Noto Sans", sans-serif;'}}>
//     <div className="layout-container flex h-full grow flex-col">
//       <div className="gap-1 px-6 flex flex-1 justify-center py-5">
//         <div className="hidden md:flex layout-content-container flex-col w-80">
//           <div className="flex h-full min-h-[700px] flex-col justify-between bg-slate-50 p-4">
//             <div className="flex flex-col gap-4">
//               <h1 className="text-[#0d141c] text-base font-medium leading-normal">Listings</h1>
//               <div className="flex flex-col gap-2">
//                 <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-[#e7edf4]">
//                   <div className="text-[#0d141c]" data-icon="Table" data-size="24px" data-weight="fill">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
//                       <path
//                         d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM40,112H80v32H40Zm56,0H216v32H96ZM40,160H80v32H40Zm176,32H96V160H216v32Z"
//                       ></path>
//                     </svg>
//                   </div>
//                   <p className="text-[#0d141c] text-sm font-medium leading-normal">All Listings</p>
//                 </div>
//                 <div className="flex items-center gap-3 px-3 py-2">
//                   <div className="text-[#0d141c]" data-icon="Laptop" data-size="24px" data-weight="regular">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
//                       <path
//                         d="M232,168h-8V72a24,24,0,0,0-24-24H56A24,24,0,0,0,32,72v96H24a8,8,0,0,0-8,8v16a24,24,0,0,0,24,24H216a24,24,0,0,0,24-24V176A8,8,0,0,0,232,168ZM48,72a8,8,0,0,1,8-8H200a8,8,0,0,1,8,8v96H48ZM224,192a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8v-8H224ZM152,88a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16h32A8,8,0,0,1,152,88Z"
//                       ></path>
//                     </svg>
//                   </div>
//                   <p className="text-[#0d141c] text-sm font-medium leading-normal">Electronics</p>
//                 </div>
//                 <div className="flex items-center gap-3 px-3 py-2">
//                   <div className="text-[#0d141c]" data-icon="Book" data-size="24px" data-weight="regular">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
//                       <path
//                         d="M208,24H72A32,32,0,0,0,40,56V224a8,8,0,0,0,8,8H192a8,8,0,0,0,0-16H56a16,16,0,0,1,16-16H208a8,8,0,0,0,8-8V32A8,8,0,0,0,208,24Zm-8,160H72a31.82,31.82,0,0,0-16,4.29V56A16,16,0,0,1,72,40H200Z"
//                       ></path>
//                     </svg>
//                   </div>
//                   <p className="text-[#0d141c] text-sm font-medium leading-normal">Books</p>
//                 </div>
//                 <div className="flex items-center gap-3 px-3 py-2">
//                   <div className="text-[#0d141c]" data-icon="Chair" data-size="24px" data-weight="regular">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
//                       <path
//                         d="M208,136H176V104h16a16,16,0,0,0,16-16V40a16,16,0,0,0-16-16H64A16,16,0,0,0,48,40V88a16,16,0,0,0,16,16H80v32H48a16,16,0,0,0-16,16v16a16,16,0,0,0,16,16h8v40a8,8,0,0,0,16,0V184H184v40a8,8,0,0,0,16,0V184h8a16,16,0,0,0,16-16V152A16,16,0,0,0,208,136ZM64,40H192V88H64Zm32,64h64v32H96Zm112,64H48V152H208v16Z"
//                       ></path>
//                     </svg>
//                   </div>
//                   <p className="text-[#0d141c] text-sm font-medium leading-normal">Furniture</p>
//                 </div>
//                 <div className="flex items-center gap-3 px-3 py-2">
//                   <div className="text-[#0d141c]" data-icon="TShirt" data-size="24px" data-weight="regular">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
//                       <path
//                         d="M247.59,61.22,195.83,33A8,8,0,0,0,192,32H160a8,8,0,0,0-8,8,24,24,0,0,1-48,0,8,8,0,0,0-8-8H64a8,8,0,0,0-3.84,1L8.41,61.22A15.76,15.76,0,0,0,1.82,82.48l19.27,36.81A16.37,16.37,0,0,0,35.67,128H56v80a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16V128h20.34a16.37,16.37,0,0,0,14.58-8.71l19.27-36.81A15.76,15.76,0,0,0,247.59,61.22ZM35.67,112a.62.62,0,0,1-.41-.13L16.09,75.26,56,53.48V112ZM184,208H72V48h16.8a40,40,0,0,0,78.38,0H184Zm36.75-96.14a.55.55,0,0,1-.41.14H200V53.48l39.92,21.78Z"
//                       ></path>
//                     </svg>
//                   </div>
//                   <p className="text-[#0d141c] text-sm font-medium leading-normal">Clothing</p>
//                 </div>
//               </div>
//             </div>
//             <button
//               className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#2589f4] text-slate-50 text-sm font-bold leading-normal tracking-[0.015em]"
//             >
//               <span className="truncate">New Listing</span>
//             </button>
//           </div>
//         </div>
//         <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
//           <div className="px-4 py-3">
//             <label className="flex flex-col min-w-40 h-12 w-full">
//               <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
//                 <div
//                   className="text-[#49719c] flex border-none bg-[#e7edf4] items-center justify-center pl-4 rounded-l-xl border-r-0"
//                   data-icon="MagnifyingGlass"
//                   data-size="24px"
//                   data-weight="regular"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
//                     <path
//                       d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
//                     ></path>
//                   </svg>
//                 </div>
//                 <input
//                   placeholder="Search by item name, description, etc."
//                   className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0d141c] focus:outline-0 focus:ring-0 border-none bg-[#e7edf4] focus:border-none h-full placeholder:text-[#49719c] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
//                   value=""
//                 />
//               </div>
//             </label>
//           </div>
//           <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
//             <div className="flex flex-col gap-3 pb-3">
//               <div
//                 className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
//                 style={{backgroundImage: 'url("https://cdn.usegalileo.ai/stability/2302ba91-f14e-484e-8126-23b7f56033ac.png");'}}
//               ></div>
//               <div>
//                 <p className="text-[#0d141c] text-base font-medium leading-normal">Macbook Pro 2018</p>
//                 <p className="text-[#49719c] text-sm font-normal leading-normal">$650</p>
//               </div>
//             </div>
//             <div className="flex flex-col gap-3 pb-3">
//               <div
//                 className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
//                 style={{backgroundImage: 'url("https://cdn.usegalileo.ai/stability/45aeba59-78a9-4076-bf70-b2d62e7198ba.png");'}}
//               ></div>
//               <div>
//                 <p className="text-[#0d141c] text-base font-medium leading-normal">Calculus Textbook</p>
//                 <p className="text-[#49719c] text-sm font-normal leading-normal">$30</p>
//               </div>
//             </div>
//             <div className="flex flex-col gap-3 pb-3">
//               <div
//                 className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
//                 style={{backgroundImage: 'url("https://cdn.usegalileo.ai/stability/1968e1f2-ab6e-440c-b203-62fe2ba1ddf2.png");'}}
//               ></div>
//               <div>
//                 <p className="text-[#0d141c] text-base font-medium leading-normal">IKEA Desk</p>
//                 <p className="text-[#49719c] text-sm font-normal leading-normal">$100</p>
//               </div>
//             </div>
//             <div className="flex flex-col gap-3 pb-3">
//               <div
//                 className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
//                 style={{backgroundImage: 'url("https://cdn.usegalileo.ai/stability/105a4fff-0aef-4fd2-8c3e-6688c1c17d06.png");'}}
//               ></div>
//               <div>
//                 <p className="text-[#0d141c] text-base font-medium leading-normal">Nike Air Max</p>
//                 <p className="text-[#49719c] text-sm font-normal leading-normal">$80</p>
//               </div>
//             </div>
//             <div className="flex flex-col gap-3 pb-3">
//               <div
//                 className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
//                 style={{backgroundImage: 'url("https://cdn.usegalileo.ai/stability/9570fd33-ca3d-4ee4-910f-129ec5b36625.png");'}}
//               ></div>
//               <div>
//                 <p className="text-[#0d141c] text-base font-medium leading-normal">iPhone X</p>
//                 <p className="text-[#49719c] text-sm font-normal leading-normal">$450</p>
//               </div>
//             </div>
//             <div className="flex flex-col gap-3 pb-3">
//               <div
//                 className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
//                 style={{backgroundImage: 'url("https://cdn.usegalileo.ai/sdxl10/e20020d3-642d-4c42-b141-375016517c7a.png");'}}
//               ></div>
//               <div>
//                 <p className="text-[#0d141c] text-base font-medium leading-normal">Vintage Band T-shirt</p>
//                 <p className="text-[#49719c] text-sm font-normal leading-normal">$25</p>
//               </div>
//             </div>
//           </div>
//           <div className="flex items-center justify-center p-4">
//             <a href="#" className="flex size-10 items-center justify-center">
//               <div className="text-[#0d141c]" data-icon="CaretLeft" data-size="18px" data-weight="regular">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256">
//                   <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
//                 </svg>
//               </div>
//             </a>
//             <a className="text-sm font-bold leading-normal tracking-[0.015em] flex size-10 items-center justify-center text-[#0d141c] rounded-full bg-[#e7edf4]" href="#">1</a>
//             <a className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#0d141c] rounded-full" href="#">2</a>
//             <a className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#0d141c] rounded-full" href="#">3</a>
//             <a className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#0d141c] rounded-full" href="#">4</a>
//             <a className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#0d141c] rounded-full" href="#">5</a>
//             <a className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#0d141c] rounded-full" href="#">6</a>
//             <a className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#0d141c] rounded-full" href="#">7</a>
//             <a href="#" className="flex size-10 items-center justify-center">
//               <div className="text-[#0d141c]" data-icon="CaretRight" data-size="18px" data-weight="regular">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256">
//                   <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
//                 </svg>
//               </div>
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//     </div>
// }