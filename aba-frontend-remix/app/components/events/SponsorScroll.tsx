const sponsorsImages = [
  "/abm-logo-long-black.png",
  "/abm-logo-long-black.png",
  "/abm-logo-long-black.png",
  "/abm-logo-long-black.png",
];

const SponsorScroll = () => {
  const allImages = [...sponsorsImages, ...sponsorsImages];
  return (
    <div className="relative w-full overflow-hidden h-40">
      <div className="flex animate-scroll gap-12 sm:gap-20 md:gap-32">
        {allImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="Sponsor Logo"
            className="w-[280px] h-[150px] object-contain"
          />
        ))}
      </div>
    </div>
  );
};

export default SponsorScroll;
