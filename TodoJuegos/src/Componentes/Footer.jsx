const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-6 mt-10 text-center">
        <div className="container mx-auto">
          <p className="text-lg font-semibold">TodoJuegos &copy; {new Date().getFullYear()}</p>
          <p className="text-sm mt-2">Explora y descubre los mejores videojuegos con nosotros.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="#" className="hover:text-gray-400">Términos y Condiciones</a>
            <a href="#" className="hover:text-gray-400">Política de Privacidad</a>
            <a href="#" className="hover:text-gray-400">Contacto</a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  