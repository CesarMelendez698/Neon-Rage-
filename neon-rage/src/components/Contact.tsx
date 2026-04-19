export default function Contact() {
  // Función que se ejecuta cuando el usuario hace clic en el botón de enviar
  const handleEmailClick = (e: React.FormEvent) => {
    e.preventDefault(); // Evita que la página se recargue al enviar el formulario
    
    const email = "neon.rage2026122@gmail.com"; // Tu dirección de correo destino
    const subject = encodeURIComponent("CONSULTA - NEON RAGE"); // Define el asunto y lo codifica para URL
    const body = encodeURIComponent("Hola Neon Rage,\n\nEscribo para solicitar información sobre..."); // Define el cuerpo del mensaje
    
    // Cambia la ubicación del navegador para abrir la app de correo predeterminada con los datos de arriba
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="Contact"
      className="bg-black text-white py-24 px-6 text-center relative overflow-hidden" // Fondo negro, texto blanco, espaciado y corta lo que sobresalga
    >
      {/* Línea decorativa superior con degradado púrpura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Título principal con estilos neón y sombra púrpura */}
        <h3 className="text-5xl font-black text-purple-400 mb-4 uppercase tracking-tighter italic drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]">
          Contacto <span className="text-white">Directo</span>
        </h3>
        
        {/* Subtítulo decorativo tipo terminal/monoespaciado */}
        <p className="text-gray-500 mb-12 font-mono text-xs uppercase tracking-[0.3em]">
          Estableciendo comunicacion...
        </p>

        {/* Formulario que activa la función handleEmailClick al enviarse */}
        <form onSubmit={handleEmailClick} className="max-w-xl mx-auto flex flex-col gap-5 group">
          
          {/* Contenedor de inputs en cuadrícula (2 columnas en escritorio, 1 en móvil) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              type="text"
              required
              placeholder="NOMBRE"
              className="bg-neutral-900/50 border border-purple-500/20 rounded-2xl px-5 py-4 focus:outline-none focus:border-purple-500 focus:bg-neutral-900 transition-all font-mono text-xs placeholder:text-gray-700"
            />

            <input
              type="email"
              required
              placeholder="E-MAIL"
              className="bg-neutral-900/50 border border-purple-500/20 rounded-2xl px-5 py-4 focus:outline-none focus:border-purple-500 focus:bg-neutral-900 transition-all font-mono text-xs placeholder:text-gray-700"
            />
          </div>

          {/* Área de texto para el mensaje largo */}
          <textarea
            required
            placeholder="ESCRIBE TU MENSAJE AQUÍ..."
            rows={5}
            className="bg-neutral-900/50 border border-purple-500/20 rounded-2xl px-5 py-4 focus:outline-none focus:border-purple-500 focus:bg-neutral-900 transition-all font-mono text-xs placeholder:text-gray-700 resize-none"
          ></textarea>

          {/* Botón de envío con efectos de escala, hover y brillo púrpura */}
          <button 
            type="submit"
            className="relative overflow-hidden bg-purple-500 hover:bg-purple-400 text-black px-8 py-4 rounded-2xl font-black transition-all active:scale-95 shadow-[0_0_30px_rgba(168,85,247,0.2)] uppercase text-xs tracking-[0.2em] group"
          >
            <span className="relative z-10">Enviar</span>
            {/* Efecto visual de cortina al pasar el mouse por el botón */}
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
        </form>

        {/* Información de contacto adicional debajo del formulario */}
        <div className="mt-16 flex flex-col md:flex-row justify-center gap-12 text-[10px] font-mono text-gray-600 uppercase tracking-widest">
            {/* Bloque de Email oficial */}
            <div className="flex flex-col gap-1">
              <span className="text-purple-500/50">Canal Oficial</span>
              <span className="text-white">neon.rage2026122@gmail.com</span>
            </div>
            {/* Bloque de Horarios */}
            <div className="flex flex-col gap-1">
              <span className="text-purple-500/50">Disponibilidad</span>
              <span className="text-white">de 7:00 AM a 10:00 PM</span>
            </div>
        </div>
      </div>
    </section>
  );
}