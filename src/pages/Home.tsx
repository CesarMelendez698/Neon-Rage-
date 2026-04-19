// ============================
// IMPORTACIÓN DE SECCIONES
// ============================
// Se importan cada uno de los componentes modulares que forman la Landing Page.
import Hero from "../components/Hero"         // Sección de bienvenida (Video y Logo).
import About from "../components/About"       // Sección informativa sobre la marca.
import Collection from "../components/Collection" // Catálogo de productos y carrusel.
import Contact from "../components/Contact"   // Formulario y datos de contacto por Email.
import Footer from "../components/Footer"     // Pie de página con redes sociales y créditos.

export default function Home() {
  return (
    // La etiqueta <main> es semántica, indica que este es el contenido principal de la ruta.
    <main>
      {/* Cada componente se renderiza en el orden en que quieres que aparezcan 
        al hacer scroll de arriba hacia abajo. 
      */}
      
      <Hero />         {/* Aparece primero al cargar la web */}
      
      <About />        {/* Aparece al bajar un poco */}
      
      <Collection />   {/* Sección de compras */}
      
      <Contact />      {/* Sección de comunicación */}
      
      <Footer />       {/* Cierre de la página */}
      
    </main>
  )
}