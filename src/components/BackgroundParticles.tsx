// Importamos hooks de React (useEffect para efectos, useMemo para optimizar y useState para el estado)
import { useEffect, useMemo, useState } from "react";
// Importamos el componente principal y la función de inicialización de la librería de partículas
import Particles, { initParticlesEngine } from "@tsparticles/react";
// Importamos los tipos (solo para TypeScript) para asegurar que la configuración sea válida
import { type ISourceOptions } from "@tsparticles/engine";
// Importamos una versión ligera (slim) del motor para que la web cargue más rápido
import { loadSlim } from "@tsparticles/slim";

export default function BackgroundParticles() {
  // Estado para saber si el motor de partículas ya está listo
  const [init, setInit] = useState(false);

  // Este efecto se ejecuta solo una vez al montar el componente
  useEffect(() => {
    // Inicializa el motor de partículas cargando los módulos necesarios
    initParticlesEngine(async (engine) => {
      // Cargamos el paquete "slim", que incluye lo básico (movimiento, formas, etc.)
      await loadSlim(engine);
    }).then(() => {
      // Una vez terminado, marcamos el estado como 'true'
      setInit(true);
    });
  }, []);

  // useMemo guarda la configuración para que no se recalcule en cada renderizado (optimiza rendimiento)
  const options: ISourceOptions = useMemo(() => ({
    fullScreen: { 
      enable: true,      // El fondo de partículas ocupará toda la pantalla
      zIndex: 9999       // Se coloca por encima de otros elementos (cuidado con esto)
    },
    fpsLimit: 120,       // Límite de cuadros por segundo para que se vea fluido
    interactivity: {
      events: {
        onHover: { 
          enable: true,   // Habilita interacción cuando pasas el ratón
          mode: "grab"    // Modo "atrapar": las partículas se conectan al cursor
        },
      },
      modes: {
        grab: { 
          distance: 200,          // Radio de alcance del cursor
          links: { opacity: 0.6 } // Opacidad de las líneas que se crean al cursor
        },
      },
    },
    particles: {
      color: { value: "#a855f7" }, // Define el color de los puntos (Púrpura)
      links: {
        color: "#a855f7",     // Color de las líneas que unen los puntos
        distance: 180,        // Distancia máxima para que dos puntos se conecten
        enable: true,         // Dibuja líneas entre puntos cercanos
        opacity: 0.4,         // Transparencia de las líneas
        width: 3,             // Grosor de las líneas (estilo cable neón)
      },
      move: {
        enable: true,         // Permite que las partículas se muevan
        speed: 1.5,           // Velocidad del movimiento
        direction: "none",    // Dirección aleatoria
        outModes: { default: "out" }, // Cuando salen de pantalla, reaparecen
      },
      number: {
        density: { enable: true, area: 800 }, // Ajusta la cantidad según el tamaño de pantalla
        value: 50,            // Intentará mantener 50 partículas visibles
      },
      opacity: {
        value: { min: 0.3, max: 0.7 }, // Algunas partículas brillan más que otras
      },
      shape: { type: "circle" }, // La forma de la partícula es un círculo
      size: { 
        value: { min: 4, max: 8 }, // Tamaño aleatorio entre 4 y 8 píxeles
        animation: {
          enable: true,       // El tamaño cambia con el tiempo (efecto latido)
          speed: 3,           // Velocidad del cambio de tamaño
          sync: false         // Cada partícula late a su propio ritmo
        }
      },
    },
    detectRetina: true, // Mejora la calidad visual en pantallas de alta resolución
  }), []);

  // Si el motor no se ha inicializado todavía, no renderizamos nada
  if (!init) return null;

  return (
    // Componente que dibuja el canvas con las partículas
    <Particles 
      id="tsparticles" 
      options={options} 
      // 'pointer-events-none': Crucial para que puedas hacer clic en botones que estén debajo del fondo
      className="pointer-events-none" 
    />
  );
}