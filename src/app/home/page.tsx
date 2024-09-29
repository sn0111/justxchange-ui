export default function Home() {
  return (
    <>
      <div className="@container">
        <div className="p-4">
          <div
            className="flex min-h-[300px] md:min-h-[480px] flex-col gap-4 md:gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 rounded-xl items-start justify-end px-4 pb-8 @[480px]:pb-10 @[480px]:px-10"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://cdn.usegalileo.ai/stability/22039637-33a8-415f-be27-ff86dc025603.png");',
            }}
          >
            <div className="flex flex-col gap-2 text-left">
              <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-[-0.033em]">
                Welcome to Campus Bazaar
              </h1>
              <h2 className="text-white text-base md:text-lg font-normal leading-normal">
                Buy, sell, and exchange anything on your campus
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 p-3 flex-wrap pr-4">
        {[
          'Books',
          'Shirts',
          'Lab Equipment',
          'Furniture',
          'Art Supplies',
          'More...',
        ].map((item) => (
          <div
            key={item}
            className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#f0f2f5] pl-4 pr-4"
          >
            <p className="text-[#111418] text-sm font-medium leading-normal">
              {item}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 p-4">
        {[
          {
            name: 'Intro to Computer Science',
            price: '$50',
            rating: '4.3/5',
            img: 'https://cdn.usegalileo.ai/stability/6d1e9cb7-c3ba-4408-a046-b8beb221216a.png',
          },
          {
            name: 'The Great Gatsby',
            price: '$10',
            rating: '4.5/5',
            img: 'https://cdn.usegalileo.ai/stability/e668574b-8197-47bf-8e2e-432981896e6a.png',
          },
          {
            name: 'Hamlet',
            price: '$8',
            rating: '4.2/5',
            img: 'https://cdn.usegalileo.ai/sdxl10/796fe706-860d-4630-9e58-921dcfb2dde5.png',
          },
          {
            name: 'Organic Chemistry',
            price: '$70',
            rating: '4.6/5',
            img: 'https://cdn.usegalileo.ai/sdxl10/63d44c89-ade7-482f-903f-eefe662e58e2.png',
          },
          {
            name: 'The Elements of Style',
            price: '$6',
            rating: '4.3/5',
            img: 'https://cdn.usegalileo.ai/sdxl10/280d8187-53ab-46c9-b4a1-367ed2149a93.png',
          },
          {
            name: 'The Odyssey',
            price: '$12',
            rating: '4.5/5',
            img: 'https://cdn.usegalileo.ai/sdxl10/befc5121-1000-4637-ba2e-246f853f23e4.png',
          },
          {
            name: 'A Tale of Two Cities',
            price: '$7',
            rating: '4.1/5',
            img: 'https://cdn.usegalileo.ai/sdxl10/54438da4-ed97-4444-961e-d1e1d9f2753b.png',
          },
          {
            name: 'The Catcher in the Rye',
            price: '$15',
            rating: '4.4/5',
            img: 'https://cdn.usegalileo.ai/stability/dae7aec8-a52f-453f-b1cb-85eccb346c7d.png',
          },
        ].map((item) => (
          <div key={item.name} className="flex flex-col gap-3 pb-3">
            <div
              className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
              style={{ backgroundImage: `url("${item.img}")` }}
            ></div>
            <div>
              <p className="text-[#111418] text-base font-medium leading-normal">
                {item.name}
              </p>
              <p className="text-[#60758a] text-sm font-normal leading-normal">
                {item.price}
              </p>
              <p className="text-[#60758a] text-sm font-normal leading-normal">
                {item.rating}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
