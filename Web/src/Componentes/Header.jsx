import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header flex shadow-md py-4 px-6 bg-white font-sans min-h-[70px] tracking-wide relative z-50">
      <div className="flex items-center justify-between w-full max-w-screen-xl mx-auto">
        <h1 className="text-2xl font-bold text-[#007bff]">TODOJUEGOS</h1>

        <nav>
          <ul className="flex gap-x-6">
            {[
              { to: "/", label: "Home" },
              { to: "/explorar", label: "Explorar" },
              // { to: "/feature", label: "Feature" },
              // { to: "/blog", label: "Blog" },
              // { to: "/about", label: "About" },
              // { to: "/contact", label: "Contact" },
            ].map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-black hover:text-[#007bff] font-medium transition"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button className="bg-[#007bff] hover:bg-[#0056b3] px-5 py-2 rounded-full text-white text-sm font-semibold flex items-center gap-2 shadow-md transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-5 h-5 fill-white"
          >
            <circle cx="10" cy="7" r="6" />
            <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" />
          </svg>
          Login
        </button>
      </div>
    </header>
  );
};

export default Header;
