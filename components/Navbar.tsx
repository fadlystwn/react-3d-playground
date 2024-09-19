
const Navbar = () => {
    return (
      <nav className="fixed top-0 left-0 w-full flex items-center justify-between p-6 z-10">
        {/* Logo with margin on the right */}
        <div className="text-white text-2xl font-bold mr-auto">
          WEB3
        </div>
  
        {/* Futuristic Button with margin on the left */}
        <button className="ml-auto px-6 py-2 border-2 border-green-400 text-green-400 uppercase tracking-wide transition-all duration-300 hover:text-black hover:bg-green-400 relative overflow-hidden">
          Contact Us
          <span className="absolute inset-0 bg-green-400 opacity-20 scale-x-0 transform origin-right transition-transform duration-300 hover:scale-x-100"></span>
        </button>
      </nav>
    );
  }
  export default Navbar