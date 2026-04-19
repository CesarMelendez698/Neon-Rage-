import { useEffect } from "react" // Importa el hook para ejecutar efectos (acciones) cuando algo cambia.
import { useLocation } from "react-router-dom" // Importa el hook que detecta la URL actual del navegador.

export default function ScrollToHash() {
  // Extrae el "hash" de la URL (por ejemplo: si la URL es /#Contact, el hash es "#Contact").
  const { hash } = useLocation()

  useEffect(() => {
    // Si existe un hash en la URL actual...
    if (hash) {
      // Busca en el documento el elemento (ID) que coincida con el nombre del hash (quitándole el símbolo "#").
      const element = document.getElementById(hash.replace("#", ""))
      
      // Si el elemento existe en la página...
      if (element) {
        // Ordena al navegador desplazarse hasta ese elemento de forma suave (animada).
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [hash]) // Este efecto se vuelve a ejecutar cada vez que el hash en la URL cambia.

  // Este componente no renderiza nada visualmente, solo ejecuta la lógica de scroll.
  return null
}