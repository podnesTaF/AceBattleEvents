const OtherPlatforms = () => {
  return (
    <section className="m-8 bg-gray-100 p-4 sm:p-10 flex flex-col sm:flex-row justify-between">
      <div className="mr-5 w-full sm:w-1/2">
        <h3 className="text-2xl font-semibold mb-5">Ace Battle Websites</h3>
        <p className="text-sm">
          You can find additional ace battle websites to dive deeper into the
          idea of our organization. “Ace Battle Bet” - betting website for our
          competitions. You can analyse results there and get more acquainted
          with professional teams. “ABA” - website to explore our organization
          and past results
        </p>
      </div>
      <div className="flex w-full mt-5 sm:mt-0 sm:w-1/2 flex-col justify-around items-center">
        <img src="/abb-logo.png" alt="abb" className="w-64 mb-5" />
        <img src="/aba-logo.png" alt="abb" className="w-64" />
      </div>
    </section>
  );
};

export default OtherPlatforms;
