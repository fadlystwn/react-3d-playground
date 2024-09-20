
const Navbar = () => {
    return (
      <nav className="fixed top-0 left-0 w-full flex items-center justify-between p-10 z-10">
        {/* Logo with margin on the right */}
        <div className="text-white text-3xl font-bold mr-auto">
          WEB3
        </div>
  
        {/* Futuristic Button with margin on the left */}
        <button className="ml-auto px-6 py-2 bg-white text-gray-700 uppercase tracking-wide transition-all duration-300 hover:text-white hover:bg-gray-400 rounded-full relative overflow-hidden">
          Contact Us
      
        </button>

      </nav>
    );
  }
  export default Navbar