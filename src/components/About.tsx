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
        NEON RAGE nace de la vibrante energía nocturna y el destello de las luces, consolidándose como una marca para quienes viven con intensidad, determinación y sin miedo a destacar. Al fusionar lo urbano con lo eléctrico, la marca crea prendas que proyectan fuerza, carácter e identidad auténtica, transformando el acto de vestir en una declaración de presencia absoluta. Con diseños creados para dejar huella a través de la actitud y la seguridad, cada pieza asegura un estilo que nunca pasa desapercibido, demostrando que NEON RAGE es, en esencia, actitud convertida en identidad.
      </p>
    </section>
  )
}