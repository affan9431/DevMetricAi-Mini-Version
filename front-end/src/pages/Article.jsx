import { Link } from "react-router-dom";

const articleData = [
  {
    title: "Top 10 Tips for Technical Interviews",
    content: [
      {
        title: "→ Learn the key strategies to ace your coding interview.",
        text: "Read More",
        link: "https://shecancode.io/top-10-technical-interview-tips/"
      },
    ],
  },
  {
    title: "Common Mistakes in AI Interviews",
    content: [
      {
        title: "→ Avoid pitfalls and improve your answers with expert advice.",
        text: "Read More",
        link: "https://www.eklavvya.com/blog/avoid-mistakes-ai-interviews/"
      },
    ],
  },
];

function Article() {
  return (
    <div>
      {articleData.map((item, index) => {
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

export default Article;
