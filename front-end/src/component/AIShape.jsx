
function AIShape({ src }) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="relative w-60 h-60">
        {/* Background Image */}
        <img
          src={src}
          alt="AI Cube"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay Shape */}
        <div className="absolute inset-0 flex justify-center items-center">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <clipPath id="flowerClip" clipPathUnits="objectBoundingBox">
                <path
                  d="M 0.5 0.2
                     C 0.7 -0.1, 1.1 -0.1, 1.3 0.2
                     C 1.6 0.5, 1.3 0.9, 1 1
                     C 0.7 1.1, 0.3 1.1, 0.2 0.8
                     C -0.1 0.5, 0.2 0.2, 0.5 0.2"
                />
              </clipPath>
            </defs>
            <rect
              width="200"
              height="200"
              className="fill-current text-black"
              clipPath="url(#flowerClip)"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default AIShape;
