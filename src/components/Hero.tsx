import { useEffect, useState } from 'react'; // Importa hooks para manejar efectos secundarios y estados locales.

// 1. Importación de recursos (Videos y Logo)
import videoPC from '../Videos/Ondas NEON.mp4'; // Video de alta resolución para escritorio.
import videoMovil from '../Videos/Ondas NEON movil.mp4'; // Video optimizado (vertical/ligero) para móviles.
import logoHero from '../Img/LogoCompleto.png'; // Imagen del logo principal.

export default function Hero() {
  // Define un estado para almacenar la ruta del video que se debe reproducir.
  const [videoSrc, setVideoSrc] = useState(videoPC);

  useEffect(() => {
    // Función que evalúa el ancho de la pantalla para decidir qué video cargar.
    const handleResize = () => {
      // Si el ancho es menor a 768px (móviles/tablets pequeñas), usa el video de móvil.
      if (window.innerWidth < 768) {
        setVideoSrc(videoMovil);
      } else {
        // Si es mayor, usa el video de PC.
        setVideoSrc(videoPC);
      }
    };

    handleResize(); // Ejecuta la función al cargar el componente por primera vez.
    window.addEventListener('resize', handleResize); // Escucha cambios de tamaño en la ventana.
    
    // Limpieza: elimina el escuchador cuando el componente se destruye para ahorrar memoria.
    return () => window.removeEventListener('resize', handleResize);
  }, []); // El array vacío indica que este efecto solo se monta una vez.

  return (
    <section 
      id="Home" 
      // Configuración visual: ocupa toda la pantalla (min-h-screen), centra contenido y oculta desbordamientos.
      className="relative min-h-screen w-full flex flex-col items-center justify-center text-center px-6 overflow-hidden text-white"
    >
      
      {/* CAPA 0: VIDEO DE FONDO */}
      <video
        key={videoSrc} // La prop 'key' fuerza al navegador a recargar el elemento cuando el video cambia.
        autoPlay // Se reproduce solo al cargar.
        loop // Se repite infinitamente.
        muted // Obligatorio para que el autoPlay funcione en la mayoría de navegadores.
        playsInline // Evita que se abra en pantalla completa automáticamente en iPhones.
        // Estilos: posición absoluta, cubre todo el fondo y tiene una opacidad baja para no opacar el logo.
        className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-30"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* CAPA 1: RESPLANDOR AMBIENTAL (GLOW) */}
      {/* Círculo púrpura con desenfoque extremo (blur) para dar profundidad y efecto neón. */}
      <div className="absolute w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-purple-600/20 blur-[120px] rounded-full z-10 animate-pulse"></div>

      {/* CAPA 2: CONTENIDO PRINCIPAL (LOGO) */}
      <div className="relative z-20 flex flex-col items-center w-full">
        <img 
          src={logoHero} 
          alt="LogoCompleto" 
          /* ESTILOS DINÁMICOS DEL LOGO:
            - w-[70%] a xl:w-[750px]: escala el tamaño del logo según el dispositivo (Responsive).
            - max-w-[90vw]: asegura que el logo nunca se salga de los bordes laterales.
            - drop-shadow: crea un brillo neón púrpura alrededor de la imagen.
            - animate-float: aplica una animación de flotación (definida probablemente en tu CSS).
            - transition-all: suaviza los cambios de tamaño si se redimensiona la pantalla.
          */
          className="
            w-[70%] sm:w-80 md:w-[450px] lg:w-[600px] xl:w-[750px] 
            max-w-[90vw] h-auto 
            mb-8 
            drop-shadow-[0_0_50px_rgba(168,85,247,0.6)] 
            animate-float 
            transition-all duration-700 ease-in-out
          "
        />
      </div>
    </section>
  );
}