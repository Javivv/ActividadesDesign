import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "./paginas/Inicio";
import Explorar from "./paginas/Explorar";
import DetalleJuego from "./paginas/DetalleJuego";
import MostrarBusqueda from "./paginas/MostrarBusqueda";
import MostrarDesarrollador from "./paginas/MostrarDesarrollador";
import Favoritos from "./paginas/Favoritos";
import Header from "./Componentes/Header";
import Footer from "./Componentes/Footer";
import Desarrolladores from "./paginas/Desarrolladores";
import Events from "./paginas/Events";
import MisEventos from "./paginas/MisEventos";
import EventoQR from "./paginas/EventoQR";
import Tags from "./paginas/Tags";



const App = () => {
    return (
        <Router>
            <Header />
            <main className="container mx-auto p-4">
                <Routes>
                    <Route path="/" element={<Inicio/>} />
                    <Route path="/explorar" element={<Explorar/>} />
                    <Route path="/juego/:id" element={<DetalleJuego/>} />
                    <Route path="/search/:query" element={<MostrarBusqueda/>} />
                    <Route path="/publisher/:id" element={<MostrarDesarrollador/>} />
                    <Route path="/publishers" element={<Desarrolladores/>} />
                    <Route path="/publisher/search/:query" element={<Desarrolladores/>} />
                    <Route path="/favoritos" element={<Favoritos/>} />
                    <Route path="/eventos" element={<Events />} />
                    <Route path="/mis-eventos" element={<MisEventos />} />
                    <Route path="/event/:eventId" element={<EventoQR />} />
                    <Route path="/search/tags/:tagId" element={<Tags />} />


                </Routes>
            </main>
            <Footer />
        </Router>
    );
};

export default App;
