
const reveiewData = [
  {
    userProfile: "/images/sarah.avif",
    userName: "Sarah",
    review:
      "DevMetricAI made my interview preparation effortless! The AI-generated questions felt just like a real interview. Highly recommend!",
  },
  {
    userProfile: "/images/james.avif",
    userName: "James",
    review:
      "An amazing software that helped me identify my weak points before the actual interview. The interactive AI responses are a game-changer!",
  },
  {
    userProfile: "/images/diana.avif",
    userName: "Diana",
    review:
      "I was nervous about job interviews, but DevMetricAI gave me the confidence I needed. The personalized questions were spot on!",
  },
];
function HomeReview() {
  return (
    <section className="mt-8">
      <div>
        <h1 className="text-[1.7rem] md:text-[3rem] font-bold md:pl-36 text-center md:text-left">Echoes of Success</h1>
      </div>
      <div className="flex justify-around mt-8 flex-wrap md:gap-0 gap-11">
        {reveiewData.map((item, index) => {
          return (
            <div className="flex flex-col items-center gap-2" key={index}>
              <img
                src={item.userProfile}
                className="w-56 h-56 rounded-[50%]"
                alt={item.userName}
              />
              <h1 className="text-2xl font-bold">{item.userName}</h1>
              <p className="w-[79vw] md:w-[20vw] text-right">{item.review}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default HomeReview;
