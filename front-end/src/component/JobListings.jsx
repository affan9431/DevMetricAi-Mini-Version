import { CiLocationOn } from "react-icons/ci";

const jobListings = [
  {
    title: "Full Stack Web Developer",
    company: "Wipro",
    location: "Mumbai",
    salary: "₹ 35000/month",
  },
  {
    title: "Front End Developer",
    company: "Meta",
    location: "London",
    salary: "₹ 70000/month",
  },
  {
    title: "React Developer",
    company: "Swiggy",
    location: "Bangalore",
    salary: "₹ 30000/month",
  },
  {
    title: "Back End Developer",
    company: "Amazon",
    location: "Tokyo",
    salary: "₹ 75000/month",
  },
];

function JobCard({ job }) {
  return (
    <div className="border border-[#152F56] p-4 w-full h-full flex flex-col justify-between rounded-md shadow-lg bg-[#0f1b2b]">
      <div>
        <h2 className="text-white font-semibold text-lg">{job.title}</h2>
        <p className="text-gray-400 text-sm">{job.company}</p>
      </div>
      <div className="border-t border-[#152F56] pt-2 mt-2">
        <p className="text-gray-300 flex items-center text-sm gap-1">
          <CiLocationOn /> {job.location}
        </p>
        <p className="text-gray-300 text-sm">{job.salary}</p>
      </div>
      <a
        href="#"
        className="text-blue-400 hover:underline text-sm self-end mt-2"
      >
        Apply Now
      </a>
    </div>
  );
}

function JobListings() {
  return (
    <div className="bg-black min-h-screen py-10 px-4 sm:px-8">
      <h1 className="text-white text-2xl sm:text-3xl font-bold mb-6">
        Latest Job Listings
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {jobListings.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
      </div>
    </div>
  );
}

export default JobListings;
