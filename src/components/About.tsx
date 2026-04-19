// Definición de la función del componente 'About' y exportación por defecto para usarlo en otras partes de la app
export default function About() {
  return (
    // Etapa contenedora de la sección con un ID para navegación (anclas)
    // 'relative': permite posicionar elementos internos de forma absoluta si fuera necesario
    // 'py-24 px-6': añade relleno (padding) vertical de 24 (96px) y horizontal de 6 (24px)
    // 'text-center': centra todo el contenido de texto dentro de la sección
    <section
      id="About"
      className="relative py-24 px-6 text-center"
    >
      {/* Título principal de la sección */}
      {/* 'text-4xl': tamaño de fuente grande | 'font-bold': texto en negrita */}
      {/* 'text-purple-400': color morado claro | 'mb-8': margen inferior para separar del párrafo */}
      {/* 'drop-shadow': crea un efecto de resplandor (glow) de color púrpura alrededor de las letras */}
      <h3 className="text-4xl font-bold text-purple-400 mb-8 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
        Sobre Nosotros
      </h3>

      {/* Párrafo descriptivo con limitación de ancho */}
      {/* 'max-w-3xl': limita el ancho máximo para que sea fácil de leer en pantallas anchas */}
      {/* 'mx-auto': centra el bloque del párrafo horizontalmente */}
      {/* 'text-gray-300': color de texto gris suave | 'leading-relaxed': aumenta el interlineado (espacio entre líneas) */}
      {/* 'text-lg': tamaño de fuente ligeramente más grande que el estándar */}
      <p className="max-w-3xl mx-auto text-gray-300 leading-relaxed text-lg">
        El Rugido del Neón Black Pantherwave es una fusión entre lo salvaje y lo retrofuturista, 
        donde la pantera símbolo de fuerza y elegancia se convierte en un ícono eléctrico. 
        Este universo Synthwave late con luces magenta y circuitos felinos.
      </p>
    </section>
  )
}