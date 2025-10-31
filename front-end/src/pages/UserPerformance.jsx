import Charts from "../component/Charts";

function UserPerformance() {
  return (
    <div>
      <div className="p-8 flex flex-col gap-2">
        <h1 className="sm:text-[30px] md:text-4xl font-bold">
          Analyze & Improve Your Interview Performance
        </h1>
        <p className="italic font-light">
          Gain insights into your strengths and weaknesses with AI-driven
          analytics.
        </p>
      </div>
      <div className="p-8">
        <h1 className="text-2xl font-bold">
          Your Interview Progress at a Glance
        </h1>
        <Charts />
      </div>
    </div>
  );
}

export default UserPerformance;
