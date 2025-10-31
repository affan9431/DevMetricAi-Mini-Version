import InterviewTable from "../component/InterviewTable";

function PreviousInterview() {
  return (
    <div>
      <div className="p-8 flex flex-col gap-2">
        <h1 className="text-4xl font-bold">Previous Interviews</h1>
        <p className="italic font-light">
          Review your past AI-driven interviews and track your progress over
          time
        </p>
      </div>
      <InterviewTable />
    </div>
  );
}

export default PreviousInterview;
