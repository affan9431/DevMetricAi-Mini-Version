
function Footer() {
  return (
    <div className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-20">
      {/* Subscription Section */}
      <div className="flex flex-col sm:flex-row sm:justify-end gap-4 mt-8 mb-6">
        <input
          type="text"
          placeholder="Enter your email address here"
          className="bg-white text-[#173460] p-2 w-full sm:w-64 rounded outline-none"
        />
        <button className="bg-white text-[#152F56] font-semibold w-full sm:w-40 p-2 rounded cursor-pointer hover:bg-gray-100 transition">
          Subscribe
        </button>
      </div>

      {/* Divider */}
      <div className="w-full max-w-[80vw] h-[1px] bg-[#173460] mx-auto my-6"></div>

      {/* Links Section */}
      <div className="flex flex-col sm:flex-row justify-center gap-12 mb-6 text-center sm:text-left">
        <div>
          <h1 className="text-xl font-bold mb-2">Platform</h1>
          <div className="space-y-1 text-gray-300">
            <p className="cursor-pointer hover:text-white transition">
              Plans & Pricing
            </p>
            <p className="cursor-pointer hover:text-white transition">
              Features
            </p>
            <p className="cursor-pointer hover:text-white transition">
              Integrations
            </p>
          </div>
        </div>
        <div>
          <h1 className="text-xl font-bold mb-2">Company</h1>
          <div className="space-y-1 text-gray-300">
            <p className="cursor-pointer hover:text-white transition">
              About Us
            </p>
            <p className="cursor-pointer hover:text-white transition">
              Contact Us
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full max-w-[80vw] h-[1px] bg-[#173460] mx-auto my-6"></div>

      {/* Bottom Section */}
      <div className="flex flex-col items-center gap-6 mb-8">
        <div className="w-72 h-28 border border-[#173460] rounded-xl bg-[url('/images/footer.avif')] bg-cover bg-center"></div>
        <div className="text-center text-gray-400 text-sm leading-relaxed max-w-md">
          <p>© 2025 by DevMetricAI. Powered and secured by NeuralForge</p>
          <p>Forging the Future of AI.</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
