import logoHero from '../Img/Bannermusicwebfinal.jpg';

export default function Hero() {
  
  // Función opcional por si el scroll nativo de HTML falla con React Router
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("Collection");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="Home"
      className="relative w-full h-screen overflow-hidden"
    >
      {/* IMAGEN CON ZOOM INFINITO DESDE INDEX.CSS */}
      <img
        src={logoHero}
        alt="Banner Music"
        className="absolute inset-0 w-full h-full object-cover animate-slow-zoom"
      />

      {/* OVERLAY OSCURO */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* BOTÓN MÁS ABAJO Y PEQUEÑO */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 px-4 w-auto">
        <a
          href="#Collection"
          onClick={handleScroll}
          className="
            block
            px-5 py-2.5
            text-[10px] sm:text-xs md:text-sm
            uppercase tracking-[0.3em]
            font-bold
            text-white
            border border-purple-500
            bg-black/40 backdrop-blur-md
            rounded-md
            text-center
            whitespace-nowrap
            cursor-pointer
            
            /* Animación suave de respiración en el botón */
            transition-all duration-500 ease-out
            animate-pulse hover:animate-none
            
            /* Efectos Hover */
            hover:bg-purple-600
            hover:border-purple-600
            hover:shadow-[0_0_25px_rgba(168,85,247,0.8)]
            hover:scale-105
            
            /* Efecto Click */
            active:scale-95
          "
        >
          Ver Colección
        </a>
      </div>
    </section>
  );
}







