import AIShape from "./AIShape";

const mission = [
  {
    image: "/images/Exclude.png",
    text: "At DevMetricAI, we are revolutionizing the hiring process by combining AI-powered real-time interviews with intelligent resume analysis. Our mission is to make recruitment faster, smarter, and unbiased by allowing candidates to simply upload their resumes and let AI handle the rest.",
  },
  {
    image: "/images/Exclude1.png",
    text: "With advanced AI-driven interviews, we assess skills, communication, and problem-solving abilities in real-time, ensuring companies find the right talent efficiently while eliminating bias.",
  },
];
const story = [
  {
    image: "/images/Exclude2.png",
    text: "Hiring should be efficient, unbiased, and seamless, but traditional recruitment processes are often time-consuming, inconsistent, and prone to bias. We saw a gap—a need for a faster, smarter, and fairer way to assess candidates. That’s why we created DevMetricAI.",
  },
  {
    image: "/images/Exclude3.png",
    text: "With DevMetricAI, candidates simply upload their resume, and our AI-powered system conducts real-time interviews, evaluating skills, communication, and problem-solving instantly. No scheduling conflicts, no delays—just efficient, data-driven hiring that saves time for both recruiters and candidates.",
  },
];

function AboutMission() {
  return (
    <div className="px-4 md:px-10 lg:px-32 py-10 space-y-16">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-10">
          Our Mission – Why DevMetricAI Exists
        </h1>
        <div className="space-y-12">
          {mission.map((item, index) => (
            <div key={index}>
              <div
                className={`flex flex-col ${
                  index % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"
                } items-center gap-5 md:justify-around`}
              >
                <img src={item.image} alt="" className="w-52 md:w-auto" />
                <p className="w-full md:w-[30vw] text-center md:text-left">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-10">
          Our Story – The Evolution of DevMetricAI
        </h1>
        <div className="space-y-12">
          {story.map((item, index) => (
            <div key={index}>
              <div
                className={`flex flex-col ${
                  index % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"
                } items-center gap-5 md:justify-around`}
              >
                <img src={item.image} alt="" className="w-52 md:w-auto" />
                <p className="w-full md:w-[30vw] text-center md:text-left">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AboutMission;
