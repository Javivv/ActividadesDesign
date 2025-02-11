import { Link } from "react-router-dom";

const Encabezado = () => {
    return (
        <header className="bg-blue-600 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">Explora Juegos</h1>
                <nav>
                    <ul className="flex gap-4">
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/explorar">Explorar</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Encabezado;
