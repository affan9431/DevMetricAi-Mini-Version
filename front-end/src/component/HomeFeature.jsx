import { IoMdTime } from "react-icons/io";
import { MdRecordVoiceOver } from "react-icons/md";
import { PiFileMagnifyingGlassBold } from "react-icons/pi";
import { MdOutlineRateReview } from "react-icons/md";
import { motion, useScroll } from "motion/react";

const feature = [
  {
    icon: <IoMdTime />,
    text: "Real-time AI Interview",
  },
  {
    icon: <MdRecordVoiceOver />,
    text: "Voice Interaction",
  },
  {
    icon: <PiFileMagnifyingGlassBold />,
    text: "Resume Insights",
  },
  {
    icon: <MdOutlineRateReview />,
    text: "Save & Review Answers",
  },
];

function HomeFeature() {
  const { scrollY } = useScroll();
  return (
    <section className="mt-5">
      <div className="pl-36">
        <h1 className="text-[1.7rem] md:text-[3rem] font-bold">Our Feature</h1>
        <p className="w-[35vw] md:w-[25vw] font-light italic">
          AI Meets Your Resume – Unlock Smarter Interview Prep!
        </p>
      </div>
      <div className="flex justify-evenly items-center mt-7 flex-wrap">
        {feature.map((item, index) => {
          return (
            <motion.div
              initial={{
                opacity: 0,
              }}
              whileInView={{
                opacity: 1,
              }}
              transition={{
                duration: 1,
                delay: 0.3,
              }}
              key={index}
              className="p-3"
            >
              <div className="border border-[#173460] w-44 h-44 p-6 flex flex-col items-center gap-6 rounded-[8px]">
                <div className="text-4xl">{item.icon}</div>
                <div className="text-center">{item.text}</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default HomeFeature;
