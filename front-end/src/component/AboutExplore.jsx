
function AboutExplore() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between w-full px-4 md:px-10 lg:px-[2.5vw] mt-20 gap-10">
      {/* Left Section */}
      <div className="flex flex-col gap-6 w-full lg:w-1/2 items-center">
        <div className="flex flex-col gap-5 items-center lg:items-start text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold w-full lg:w-[33vw]">
            Built by NeuralForge – Pioneering the Future of AI
          </h1>
          <p className="w-full lg:w-[33vw]">
            DevMetricAI is proudly developed by NeuralForge, a company dedicated
            to pushing the boundaries of AI innovation. Our vision is to build
            next-generation AI products that enhance efficiency, intelligence,
            and automation across industries.
          </p>
          <p className="w-full lg:w-[33vw]">
            This is just the beginning. DevMetricAI is the first of many
            cutting-edge AI solutions we are bringing to the world.
          </p>
          <button className="bg-white text-[#152F56] font-semibold w-48 h-12 p-2 rounded-[50px] relative lg:left-[-0.5vw]">
            Explore NeuralForge
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-[30vw] flex justify-center">
        <img
          src="/images/nueralforge.avif"
          className="w-full h-auto max-w-md"
          alt="Futuristic AI robot"
        />
      </div>
    </div>
  );
}

export default AboutExplore;
