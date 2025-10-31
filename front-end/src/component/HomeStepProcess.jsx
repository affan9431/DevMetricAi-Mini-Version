import { motion } from "framer-motion";

const steps = [
  { id: 1, title: "Step 1", description: "Upload Your Resume" },
  {
    id: 2,
    title: "Step 2",
    description: "AI analyzes your resume & extracts information",
  },
  {
    id: 3,
    title: "Step 3",
    description:
      "AI produced high-level coding questions comparable to those encountered at FAANG companies",
  },
  {
    id: 4,
    title: "Step 4",
    description: "AI starts asking personalized questions",
  },
  {
    id: 5,
    title: "Step 5",
    description: "You answer in real-time & get feedback",
  },
];

function StepProcess() {
  return (
    <section className="px-4 sm:px-6 lg:px-12 py-16 text-white">
      <h1 className="text-3xl sm:text-4xl lg:text-[3rem] font-bold text-center">
        How It Works
      </h1>

      <div className="relative mt-20 flex flex-col gap-20">
        {/* Center Vertical Line - only desktop */}
        <div className="hidden lg:block absolute left-1/2 top-0 h-full w-[2px] bg-[#0C1A31] -translate-x-1/2 z-0"></div>

        {steps.map((step, index) => {
          const isLeft = index % 2 === 0;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative flex flex-col lg:flex-row items-center w-full"
            >
              {/* Left side (desktop only) */}
              <div
                className={`hidden lg:flex w-1/2 justify-end ${
                  isLeft ? "pr-10" : "invisible"
                }`}
              >
                {isLeft && (
                  <div className="border border-[#173460] p-6 rounded-lg bg-[#0C1A31]/30 backdrop-blur-md shadow-md w-80">
                    <h2 className="text-xl font-bold">{step.title}</h2>
                    <p className="text-sm text-gray-400 mt-2">
                      {step.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Dot on center line - desktop only */}
              <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 bg-[#0C1A31] border-4 border-white w-6 h-6 rounded-full z-10"></div>

              {/* Right side or mobile stacked */}
              <div
                className={`w-full lg:w-1/2 flex justify-start ${
                  isLeft ? "lg:hidden" : "pl-10"
                }`}
              >
                <div className="border border-[#173460] p-6 rounded-lg bg-[#0C1A31]/30 backdrop-blur-md shadow-md w-full sm:w-4/5 lg:w-80">
                  <h2 className="text-xl font-bold">{step.title}</h2>
                  <p className="text-sm text-gray-400 mt-2">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default StepProcess;
