import { Link } from "react-router-dom";

const videoData = [
  {
    title: "How to Answer Behavioral Questions Effectively",
    content: [
      {
        title: "→ A step-by-step guide to crafting structured responses.",
        text: "Watch Now",
        link: "https://www.youtube.com/watch?v=IV30jAw7dxA",
      },
    ],
  },
  {
    title: "Cracking the Coding Interview: Live Mock Session",
    content: [
      {
        title: "→ Watch an expert go through a real coding interview.",
        text: "Watch Now",
        link: "https://www.youtube.com/watch?v=fQW6-2yfsBY",
      },
    ],
  },
];

function Video() {
  return (
    <div>
      {videoData.map((item, index) => {
        return (
          <div key={index}>
            <h1 className="text-xl font-bold mb-2 mt-5">{item.title}</h1>
            <div>
              {item.content.map((item, index) => {
                return (
                  <>
                    <div className="mt-5 flex flex-col gap-3">
                      <h1 className="">{item.title}</h1>
                      <Link to={item.link}>
                        <p className="text-[#1509F6]">{item.text}</p>
                      </Link>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Video;
