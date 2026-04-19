import { Link } from "react-router-dom" // Importa el componente para navegación entre rutas.
import { useContext, useState } from "react" // Importa hooks para estado y consumo de contexto.
import { CartContext } from "../context/CartContext" // Importa el contexto global del carrito.

export default function Navbar() {
  const { cart } = useContext(CartContext); // Extrae la lista de productos del carrito para mostrar el contador.
  const [isOpen, setIsOpen] = useState(false); // Estado para abrir o cerrar el menú en dispositivos móviles.

  const toggleMenu = () => setIsOpen(!isOpen); // Función para alternar el estado del menú (abierto/cerrado).

  return (
    <>
      {/* ANIMACIÓN CSS: Estilos inyectados para el efecto de línea de escaneo (cyberpunk) */}
      <style>
        {`
          @keyframes scanline {
            0% { transform: translateY(-100vh); }
            100% { transform: translateY(100vh); }
          }
          .animate-scan {
            animation: scanline 4s linear infinite;
          }
        `}
      </style>

      {/* NAV: Contenedor principal fijado arriba con desenfoque de fondo */}
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-xl z-50 border-b border-purple-500/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          
          {/* LOGO: Enlace que redirige al inicio con estilos de brillo neón */}
          <Link 
            to="/#Home" 
            className="text-2xl font-black text-purple-400 tracking-tighter italic drop-shadow-[0_0_8px_rgba(168,85,247,0.5)] whitespace-nowrap z-[60]"
          >
            NEON RAGE
          </Link>
          
          {/* BOTÓN HAMBURGUESA: Solo visible en móviles (lg:hidden) */}
          <button 
            onClick={toggleMenu}
            className="lg:hidden p-2 text-purple-400 focus:outline-none z-[60] relative"
            aria-label="Menu"
          >
            {/* Icono animado: Cambia de 3 líneas a una "X" según el estado de isOpen */}
            <div className="w-6 h-5 flex flex-col justify-between items-end">
              <span className={`h-0.5 bg-purple-400 transition-all duration-300 ${isOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`}></span>
              <span className={`h-0.5 bg-purple-400 transition-all duration-300 ${isOpen ? 'opacity-0' : 'w-4'}`}></span>
              <span className={`h-0.5 bg-purple-400 transition-all duration-300 ${isOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-5'}`}></span>
            </div>
          </button>

          {/* MENÚ DESPLEGABLE: Pantalla completa en móvil, estático en escritorio */}
          <div className={`
            fixed inset-0 w-full h-screen bg-black transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] z-50 overflow-hidden
            ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0 lg:static lg:h-auto lg:bg-transparent'}
          `}>
            
            {/* EFECTOS VISUALES (MÓVIL): Gradientes y rejillas decorativas que solo aparecen al abrir el menú en celular */}
            <div className="lg:hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#2e1065_0%,_#000000_70%)] opacity-40"></div>
              {/* Línea de escaneo animada */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-purple-500/40 blur-[2px] animate-scan shadow-[0_0_20px_#a855f7]"></div>
              {/* Rejilla (grid) de fondo Cyberpunk */}
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[linear-gradient(rgba(168,85,247,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.1)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
            </div>

            {/* LISTA DE ENLACES: Mapeo de los items de navegación */}
            <ul className="relative z-10 h-full flex flex-col lg:flex-row items-center justify-center lg:justify-end gap-10 lg:gap-8 font-mono">
              {[
                { name: 'Inicio', path: '/#Home' },
                { name: 'Nosotros', path: '/#About' },
                { name: 'Colección', path: '/#Collection' },
                { name: 'Contacto', path: '/#Contact' }
              ].map((item) => (
                <li key={item.name} className="overflow-hidden">
                  <Link 
                    to={item.path} 
                    onClick={() => setIsOpen(false)} // Cierra el menú móvil al hacer clic en un enlace.
                    className="text-3xl lg:text-[11px] uppercase font-black lg:font-bold text-white lg:text-gray-400 hover:text-purple-400 transition-all tracking-[0.2em] group flex items-center gap-4"
                  >
                    {/* Indicador ">" que solo aparece al pasar el mouse en móvil */}
                    <span className="text-purple-500 text-sm lg:hidden opacity-0 group-hover:opacity-100 transition-opacity tracking-widest">
                      {">"}
                    </span>
                    {item.name}
                  </Link>
                </li>
              ))}
              
              {/* BOTÓN DEL CARRITO */}
              <li className="mt-6 lg:mt-0">
                <Link 
                  to="/cart" 
                  onClick={() => setIsOpen(false)}
                  className="relative bg-purple-600 hover:bg-purple-500 text-white lg:text-black lg:bg-purple-400 px-10 lg:px-4 py-4 lg:py-2 rounded-full lg:rounded-lg font-black transition-all flex items-center gap-3 shadow-[0_0_20px_rgba(168,85,247,0.3)] active:scale-95"
                >
                  <span className="text-xl lg:text-sm">🛒</span> 
                  <span className="uppercase text-sm tracking-widest">Carrito</span>
                  
                  {/* CONTADOR DEL CARRITO: Solo aparece si hay productos en el carrito */}
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-black animate-pulse lg:animate-none">
                      {cart.length}
                    </span>
                  )}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}