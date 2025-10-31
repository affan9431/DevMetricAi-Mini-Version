import { Link } from "react-router-dom";

const courseData = [
  {
    title: "System Design Masterclass",
    content: [
      {
        title:
          "→ A deep dive into system design concepts for FAANG interviews.",
        text: "Enroll Now",
        link: "https://www.youtube.com/watch?v=SqcXvc3ZmRU&list=PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX",
      },
    ],
  },
  {
    title: "Data Structures & Algorithms Bootcamp",
    content: [
      {
        title: "→ Master problem-solving skills with real-world examples.",
        text: "Enroll Now",
        link: "https://www.youtube.com/watch?v=rZ41y93P2Qo&list=PL9gnSGHSqcnr_DxHsP7AW9ftq0AtAyYqJ",
      },
    ],
  },
];

function Course() {
  return (
    <div>
      {courseData.map((item, index) => {
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

export default Course;
