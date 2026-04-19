import { Routes, Route } from "react-router-dom"; // Importa los componentes necesarios para manejar la navegación entre páginas.
import Home from "./pages/Home"; // La página principal de la tienda.
import Cart from "./pages/Cart"; // La página del carrito de compras.
import Navbar from "./components/Navbar"; // La barra de navegación superior.
import ScrollToHash from "./components/ScrollToHash"; // El ayudante que maneja los saltos a secciones (#Collection, #Contact, etc.).
import BackgroundParticles from "./components/BackgroundParticles"; // El efecto visual de fondo de partículas.
import { CartProvider } from "./context/CartContext"; // El proveedor que permite que toda la app comparta los datos del carrito.

export default function App() {
  return (
    // Envolvemos toda la aplicación con <CartProvider> para que cualquier componente (Navbar, Cart, Home) 
    // pueda acceder a las funciones de agregar o quitar productos.
    <CartProvider>
      
      {/* Contenedor principal: Fondo negro, mínimo de altura de pantalla completa y posición relativa para las capas. */}
      <div className="bg-black min-h-screen relative text-white">
        
        {/* Capa de fondo: Las partículas viven detrás de todo el contenido. */}
        <BackgroundParticles />
        
        {/* Contenedor de contenido: z-10 asegura que el texto y botones queden POR ENCIMA de las partículas de fondo. */}
        <div className="relative z-10">
          
          {/* Navbar: Siempre presente en la parte superior. */}
          <Navbar />
          
          {/* Lógica de Scroll: Escucha cambios en la URL para mover la pantalla a la sección correspondiente. */}
          <ScrollToHash />
          
          {/* Definición de Rutas: Aquí decides qué componente mostrar según la dirección en el navegador. */}
          <Routes>
            {/* Si la ruta es "/" (inicio), carga el componente Home. */}
            <Route path="/" element={<Home />} />
            
            {/* Si la ruta es "/cart", carga la página del carrito. */}
            <Route path="/cart" element={<Cart />} />
          </Routes>
          
        </div>
      </div>
    </CartProvider>
  );
}