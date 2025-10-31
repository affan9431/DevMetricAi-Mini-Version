import PriceCard from "../component/PriceCard";

const priceData = [
  {
    title: "One Shot",
    subtitle: "Perfect for testing the waters or last-minute prep.",
    price: 10,
    subscriptionType: "interview",
    priceCardDetail: [
      "1 coding + interview round session",
      "Real-time feedback from out AI",
      "Session recording for review",
      "Custom questions based on your tech stack",
      "One-time mock, perfect for last-minute prep",
    ],
  },
  {
    title: "Grind Mode",
    subtitle: "For devs in the grind — practice 'til you perfect it.",
    price: 30,
    subscriptionType: "month",
    priceCardDetail: [
      "Unlimited coding + interview rounds for 30 days",
      "Access to multiple mock formats (DSA, etc)",
      "Feedback + tips after every session",
      "Practice with different coding question",
      "Track your improvement with session summaries",
    ],
  },
  {
    title: "Legend Mode",
    subtitle: "Long-term plan for long-term growth.",
    price: 40,
    subscriptionType: "year",
    priceCardDetail: [
      "Unlimited coding + interview rounds for 1 year",
      "Exclusive sessions",
      "Monthly performance reports & roadmap guidance",
      "Mentorship & other benifits included",
      "VIP access to live events & private Q&A",
    ],
  },
];

function Pricing() {
  return (
    <section className="bg-[#010301] dark:bg-[##010301]">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Designed for developers & students preparing for tech interviews
          </h2>
          <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
            Whether you're prepping for your first job or leveling up for FAANG,
            our mock interview platform gives you coding rounds, technical
            interviews, and real-time feedback — everything you need to crack
            your next opportunity with confidence.
          </p>
        </div>
        <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
          {priceData.map((item, index) => (
            <PriceCard priceData={item} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;
