function Spinner({message}) {
  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-4">
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-white rounded-full animate-bounce1"></div>
        <div className="w-4 h-4 bg-purple-400 rounded-full animate-bounce2"></div>
        <div className="w-4 h-4 bg-gray-400 rounded-full animate-bounce3"></div>
      </div>
      <p className="text-white text-xl">{message}</p>
    </div>
  );
}

export default Spinner;
