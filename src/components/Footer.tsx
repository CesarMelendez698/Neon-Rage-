import logoNeon from "../Img/logo.png"; // Importa la imagen del logo principal.
import iconInsta from "../Img/Logo_Instagram.png"; // Importa el icono de Instagram.
import iconWA from "../Img/Logo_Whatsaap.png"; // Importa el icono de WhatsApp (respetando tu nombre de archivo original).

export default function Footer() {
  return (
    // Etiqueta semántica de pie de página con fondo negro, borde superior púrpura tenue y relleno vertical.
    <footer className="bg-neutral-950 border-t border-purple-500/20 py-10 px-6 mt-auto">
      
      {/* Contenedor principal: Centrado, con ancho máximo y cambia a columna en móviles (flex-col md:flex-row). */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* LADO IZQUIERDO: LOGO Y COPYRIGHT */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          {/* Renderiza el logo con un filtro de sombra (glow) púrpura. */}
          <img 
            src={logoNeon} 
            alt="Neon Rage Logo" 
            className="h-9 w-auto filter drop-shadow-[0_0_8px_rgba(168,85,247,0.3)]"
          />
          {/* Texto de derechos reservados con fuente monoespaciada y estilo minimalista. */}
          <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-gray-600">
            © 2026 Neon Rage. Todos los derechos reservados.
          </p>
        </div>

        {/* REDES SOCIALES SELECCIONADAS (Contenedor de enlaces) */}
        <div className="flex items-center gap-10">
          
          {/* Enlace a Instagram: target="_blank" abre en pestaña nueva y rel="..." protege la seguridad del sitio. */}
          <a 
            href="https://www.instagram.com/neon.rage_?igsh=MWl1am0zMXhiOWxxOQ==" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group transition-all duration-300 flex flex-col items-center gap-2"
          >
            {/* Icono de Instagram: Inicia tenue (opacity-40) y se ilumina con sombra rosa al pasar el mouse. */}
            <img 
              src={iconInsta} 
              alt="Instagram" 
              className="w-6 h-6 object-contain opacity-40 group-hover:opacity-100 group-hover:drop-shadow-[0_0_10px_#E1306C] transition-all" 
            />
            {/* Etiqueta de texto pequeña debajo del icono que cambia a púrpura en hover. */}
            <span className="text-[8px] text-gray-700 group-hover:text-purple-400 font-bold tracking-tighter uppercase transition-colors">Instagram</span>
          </a>
          
          {/* Enlace a WhatsApp: Usa el API wa.me con tu número de teléfono. */}
          <a 
            href="https://wa.me/50362092893" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group transition-all duration-300 flex flex-col items-center gap-2"
          >
            {/* Icono de WhatsApp: Se ilumina con sombra verde (glow) característica de la marca en hover. */}
            <img 
              src={iconWA} 
              alt="WhatsApp" 
              className="w-6 h-6 object-contain opacity-40 group-hover:opacity-100 group-hover:drop-shadow-[0_0_10px_#25D366] transition-all" 
            />
            {/* Etiqueta de texto que cambia a verde neón al pasar el mouse. */}
            <span className="text-[8px] text-gray-700 group-hover:text-green-400 font-bold tracking-tighter uppercase transition-colors">whatsapp</span>
          </a>
        </div>

      </div>
    </footer>
  );
}