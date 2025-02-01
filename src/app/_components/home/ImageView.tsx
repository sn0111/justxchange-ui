import iconImage from '../../../public/images/home.jpg';
const ImageView = () => {
  return (
    <div className="@container">
      <div className="p-4">
        <div
          className="flex min-h-[300px] md:min-h-[480px] flex-col gap-4 md:gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 rounded-xl items-start justify-end px-4 pb-8 @[480px]:pb-10 @[480px]:px-10"
          style={{
            backgroundImage:
              `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("${iconImage.src}")`,
          }}
        >
          <div className="flex flex-col gap-2 text-left">
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-[-0.033em]">
              Welcome to JustXchange
            </h1>
            <h2 className="text-white text-base md:text-lg font-normal leading-normal">
              Buy, sell, and exchange anything on your campus
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageView;
