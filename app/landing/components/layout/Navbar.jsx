import logoImage from '../../assets/images/logo-vendra.svg';

export default function Navbar() {
  return (
<nav className="bg-dls-header text-gray-900 py-4 shadow">
  <div className="container mx-auto flex justify-between items-center">
    
    {/* Logo + eslogan */}
    <div className="flex items-center space-x-4">
      <img
        src="assets/images/logo-vendra.svg"
        alt="Logo Vendra"
        className="h-14 w-auto drop-shadow-lg rounded-xl"
      />
      <div>
        <h1 className="text-lg md:text-xl font-bold">Vendra</h1>
        <p className="italic text-sm">Vende sin esfuerzo. Nosotros hacemos el resto</p>
      </div>
    </div>

    {/* Menú de navegación */}
    <div>
      <ul className="flex space-x-6 text-sm font-medium">
        <li><a href="#servicios" className="hover:underline">Servicios</a></li>
        <li><a href="#solicitar-demo" className="hover:underline">Solicitar Demo</a></li>
        <li><a href="#contacto" className="hover:underline">Contacto</a></li>
      </ul>
    </div>

  </div>
</nav>
  );
}