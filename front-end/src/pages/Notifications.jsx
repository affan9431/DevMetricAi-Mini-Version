import JobListings from "../component/JobListings";

function Notifications() {
  return (
    <div>
      <div className="p-8 flex flex-col gap-2.5">
        <h1 className="sm:text-[50px] md:text-4xl font-bold">
          Interview Updates & Opportunities Just for You
        </h1>
        <p className="italic font-light">
          Get the latest interview opportunities and updates tailored to your
          field. Stay prepared and never miss an important chance!
        </p>
      </div>
      <div className="p-8">
        <JobListings />
      </div>
    </div>
  );
}

export default Notifications;
