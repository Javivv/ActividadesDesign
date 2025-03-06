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
              { to: "/publishers", label: "Publishers" },
              { to: "/eventos", label: "Eventos" },
              { to: "/favoritos", label: "Mis favoritos" },
              { to: "/mis-eventos", label: "Mis Eventos" },
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
            <path d="M12 2a6 6 0 0 1 6 6c0 3.31-2.69 6-6 6s-6-2.69-6-6a6 6 0 0 1 6-6zm0 14c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z" />
          </svg>
          Javier
      </button>


      </div>
    </header>
  );
};

export default Header;
