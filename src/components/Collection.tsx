import { useContext, useRef, useState } from "react"; // Importa hooks: useContext (datos globales), useRef (referencia a etiquetas), useState (memoria local).
import { CartContext } from "../context/CartContext"; // Importa la conexión con el carrito de compras global.

// ============================
// VIDEOS (Carga de archivos multimedia locales)
// ============================
import videoNoPerfec from "../Videos/No_perfec.mp4";
import videoRage from "../Videos/Rage_2026.mp4";
import videoZarpasos from "../Videos/Zarpasos.mp4";

// ============================
// IMÁGENES (Carga de archivos multimedia locales)
// ============================
import No_perfec1 from "../Img/Cuadradas/No_perfec1.jpg";
import No_perfec2 from "../Img/Cuadradas/No_perfec2.jpg";
import No_perfec3 from "../Img/Cuadradas/No_perfec3.jpg";
import Rage_20261 from "../Img/Cuadradas/Rage_20261.jpg";
import Rage_20262 from "../Img/Cuadradas/Rage_20262.jpg";
import Zarpasos1 from "../Img/Cuadradas/Zarpasos1.jpg";
import Zarpasos2 from "../Img/Cuadradas/Zarpasos2.jpg";
import Zarpasos3 from "../Img/Cuadradas/Zarpasos3.jpg";
import Clasba from "../Img/Camisas/Clasba.png";
import Clasba1 from "../Img/Camisas/Clasba1.png";
import Clasne from "../Img/Camisas/Clasne.png";
import Clasne1 from "../Img/Camisas/Clasne1.png";

// ============================
// INTERFACE PRODUCT
// ============================
// Define la estructura obligatoria que debe tener el objeto "Product" para evitar errores de datos.
interface Product {
  id: number;
  name: string;
  price: number;
  media: string[]; // Array que puede contener rutas de videos o imágenes.
  description: string;
  whiteImage?: string; // Ruta de imagen opcional para la versión en blanco.
  blackImage?: string; // Ruta de imagen opcional para la versión en negro.
}

// ============================
// PRODUCT CARD (TARJETA)
// ============================
// Componente que recibe un producto y la función para añadirlo al carrito.
function ProductCard({ product, addToCart }: { product: Product, addToCart: (p: any) => void }) {

  const videoRef = useRef<HTMLVideoElement>(null); // Referencia directa para controlar el elemento <video> en el DOM.
  const [currentIndex, setCurrentIndex] = useState(0); // Estado para saber qué imagen/video del carrusel se está mostrando.
  const [showModal, setShowModal] = useState(false); // Estado para abrir (true) o cerrar (false) la ventana de detalles.
  const [selectedSize, setSelectedSize] = useState<string | null>(null); // Almacena la talla que el usuario selecciona.
  const [selectedColor, setSelectedColor] = useState<string | null>("Blanco"); // Almacena el color seleccionado (Blanco por defecto).

  const sizes = ["S", "M", "L", "XL"]; // Lista fija de tallas disponibles para mostrar botones.

  // Booleano: Verifica si el producto tiene imágenes blanco/negro para activar opciones de color.
  const isClassicCore = product.whiteImage && product.blackImage;

  // Función para mover el carrusel a la derecha.
  const nextSlide = () => {
    if (product.media.length > 0) {
      // Usa el residuo (%) para volver al inicio del array al llegar al final.
      setCurrentIndex((prev) => (prev + 1) % product.media.length);
    }
  };

  // Función para mover el carrusel a la izquierda.
  const prevSlide = () => {
    if (product.media.length > 0) {
      // Si está en el inicio, salta al último elemento, si no, resta 1 al índice.
      setCurrentIndex((prev) =>
        prev === 0 ? product.media.length - 1 : prev - 1
      );
    }
  };

  const currentMedia = product.media[currentIndex]; // Obtiene la ruta del archivo visual actual (foto o video).
  const isVideo = currentMedia?.toLowerCase().endsWith(".mp4"); // Detecta si el archivo actual es un video por su extensión.

  return (
    <>
      {/* ================= CARD (Contenedor visual con estilos CSS) ================= */}
      <div className="bg-neutral-900/40 backdrop-blur-sm p-6 rounded-3xl border border-purple-500/10 hover:border-purple-500/40 transition-all group shadow-2xl overflow-hidden w-full max-w-[320px] h-full flex flex-col justify-between">

        <div>
          {/* ================= MEDIA (Espacio donde se ve la foto o video) ================= */}
          <div className="relative h-64 bg-black rounded-2xl mb-6 overflow-hidden border border-white/5 flex items-center justify-center">

            {/* Renderizado condicional: Prioriza Classic Core, luego Video, luego Imagen normal */}
            {isClassicCore ? (
              <img
                src={product.whiteImage}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            ) : isVideo ? (
              <video
                key={currentMedia}
                ref={videoRef}
                src={currentMedia}
                loop
                muted
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={currentMedia}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            )}

            {/* Botones de navegación: Solo aparecen si el producto tiene varias imágenes/videos */}
            {product.media.length > 0 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevSlide(); }} // e.stopPropagation evita que se abran otros eventos al clicar.
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-purple-500 text-white w-10 h-10 rounded-full text-2xl"
                >‹</button>

                <button
                  onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-purple-500 text-white w-10 h-10 rounded-full text-2xl"
                >›</button>
              </>
            )}
          </div>

          {/* Bloque de texto para el Nombre y Precio */}
          <div className="px-2 text-white text-center">
            <h4 className="text-xl font-bold mb-2 uppercase italic">
              {product.name}
            </h4>
            <p className="text-purple-400 text-lg mb-6 font-bold">
              ${product.price}
            </p>
          </div>
        </div>

        {/* Botón que activa el modal de detalles y selección de compra */}
        <button
          onClick={() => setShowModal(true)}
          className="w-full bg-purple-500 hover:bg-purple-400 text-black font-black py-3 rounded-xl"
        >
          Seleccionar
        </button>
      </div>

      {/* ================= MODAL (Ventana emergente de compra) ================= */}
      {showModal && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 p-4">
          <div className="bg-neutral-950 border border-purple-500/20 p-8 rounded-3xl max-w-lg w-full relative">

            {/* Botón para cerrar el modal y resetear las selecciones previas */}
            <button
              onClick={() => {
                setShowModal(false);
                setSelectedSize(null);
                setSelectedColor("Blanco");
              }}
              className="absolute top-4 left-4 text-white text-xs bg-white/10 px-3 py-1 rounded-lg"
            >
              ← Regresar
            </button>

            {/* Imagen que cambia dinámicamente según el color que el usuario elija en el modal */}
            {isClassicCore && (
              <div className="w-full h-64 mb-6 rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center">
                <img
                  src={
                    selectedColor === "Negro"
                      ? product.blackImage
                      : product.whiteImage
                  }
                  className="w-full h-full object-contain transition-all"
                />
              </div>
            )}

            {/* Título informativo dentro del modal */}
            <h2 className="text-3xl font-black text-purple-400 mb-4 uppercase text-center mt-2">
              {product.name}
            </h2>

            {/* Descripción detallada del producto */}
            <p className="text-gray-300 mb-6 text-sm text-center">
              {product.description}
            </p>

            {/* Selector de color: Solo aparece si el producto tiene variantes de color */}
            {isClassicCore && (
              <div className="flex justify-center gap-3 mb-6">
                {["Blanco", "Negro"].map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-lg font-bold ${
                      selectedColor === color
                        ? "bg-purple-500 text-black scale-110"
                        : "border border-white/20 text-white"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            )}

            {/* Selector de tallas: Genera un botón por cada talla del array 'sizes' */}
            <div className="flex justify-center gap-3 mb-8">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 rounded-lg font-bold ${
                    selectedSize === size
                      ? "bg-purple-500 text-black scale-110"
                      : "border border-white/20 text-white"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Botón Agregar: Se desactiva (disabled) si no se ha seleccionado talla o color */}
            <button
              disabled={Boolean(!selectedSize || (isClassicCore && !selectedColor))}
              onClick={() => {
                addToCart({ // Crea el objeto final con la variante elegida y lo envía al carrito global.
                  ...product,
                  size: selectedSize,
                  color: isClassicCore ? selectedColor : undefined
                });
                setShowModal(false); // Cierra el modal tras añadir con éxito.
                setSelectedSize(null); // Resetea la talla para la siguiente compra.
                setSelectedColor("Blanco"); // Resetea el color.
              }}
              className={`w-full py-4 rounded-xl font-black ${
                selectedSize
                  ? "bg-purple-500 text-black"
                  : "bg-gray-800 text-gray-500"
              }`}
            >
              Añadir al Carrito
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// ============================
// COLLECTION (SECCIÓN PRINCIPAL DE LA PÁGINA)
// ============================
export default function Collection() {

  const { addToCart } = useContext(CartContext); // Obtiene la función "addToCart" desde el contexto global para usarla en las tarjetas.
  const [activeCollection, setActiveCollection] = useState(0); // Estado para saber cuál de las colecciones (pestañas) está activa.

  // Lista de todas las colecciones con sus respectivos nombres y arrays de productos.
  const collections = [
    {
      title: "Classic Core",
      products: [
        {
          id: 1,
          name: "Core Edition",
          price: 20,
          media: [],
          whiteImage: Clasba,
          blackImage: Clasne,
          description: "Camisa Oversize 100% Algodón. Una prenda esencial que combina simplicidad y carácter. Esta camiseta blanca de corte clásico destaca por su diseño limpio y versátil, ideal para cualquier ocasión. En el pecho, incorpora un logo discreto en tono morado con forma de pantera estilizada, símbolo de fuerza, elegancia y actitud."
        },
        {
          id: 2,
          name: "Signature Edition",
          price: 20,
          media: [],
          whiteImage: Clasba1,
          blackImage: Clasne1,
          description: "Camisa Oversize 100% Algodón. Una prenda esencial que combina simplicidad y carácter. Esta camiseta blanca de corte clásico destaca por su diseño limpio y versátil, ideal para cualquier ocasión. En el pecho, incorpora un logo discreto en tono morado con forma de pantera estilizada, símbolo de fuerza, elegancia y actitud."
        }
      ]
    },
    {
      title: "The Neón Jungle Colecction",
      products: [
        {
          id: 5,
          name: "No Perfect Edition",
          price: 20,
          media: [videoNoPerfec, No_perfec1, No_perfec2, No_perfec3],
          description: "Esta camisa oversize de algodón 100% fusiona la energía del graffiti urbano con un mensaje contundente: 'No perfecto, soy auténtico', rematado con el logo en la espalda para quienes comprenden que la perfección es una ilusión, pero la autenticidad es poder. Más que una prenda, es una postura ante la vida diseñada para quienes no solo visten una frase, sino que habitan su propia verdad con estilo y comodidad"
        },
        {
          id: 6,
          name: "Rage 2026 Premium",
          price: 20,
          media: [videoRage, Rage_20261, Rage_20262],
          description: "Esta camisa oversize de algodón 100% redefine el estilo urbano al combinar un minimalismo impecable en el frente con un impacto visual total en la espalda, donde una imponente pantera ruge entre detalles gráficos futuristas que evocan energía, instinto y poder. Diseñada específicamente para destacar en la calle, esta prenda trasciende la moda convencional para convertirse en una declaración de pura actitud para quienes buscan dominar el entorno urbano con presencia y carácter."
        },
        {
          id: 7,
          name: "Zarpazos Beast",
          price: 20,
          media: [videoZarpasos,Zarpasos1, Zarpasos2, Zarpasos3],
          description: "Esta pieza oversize de algodón 100% captura el momento exacto antes del ataque, utilizando un fondo azul oscuro profundo para simbolizar el enfoque absoluto mientras zarpazos en tonos eléctricos atraviesan la prenda como pura energía en movimiento. Con detalles gráficos en las mangas que refuerzan el símbolo eléctrico futurista de la marca y marcas que se expanden con fuerza en la espalda como una firma salvaje, esta camisa está diseñada para quienes buscan una presencia imponente que no pase desapercibida."
        }
      ]
    },
    {
      title: "Proximamente",
      products: []
    }
  ];

  // Filtra los productos que se van a dibujar según la pestaña activa seleccionada por el usuario.
  const currentProducts = collections[activeCollection].products;

  return (
    <section id="Collection" className="py-24 px-6 bg-black">

      {/* Bloque del Título de la sección */}
      <div className="text-center mb-12">
        <h3 className="text-5xl font-black text-purple-400 uppercase italic">
          Nuestra Colección
        </h3>
      </div>

      {/* Menú de Botones (Tabs): Al clicar uno, cambia el estado activeCollection */}
      <div className="flex justify-center gap-4 mb-12 flex-wrap">
        {collections.map((col, index) => (
          <button
            key={index}
            onClick={() => setActiveCollection(index)}
            className={`px-8 py-2 rounded-full font-bold ${
              activeCollection === index
                ? "bg-purple-500 text-black"
                : "border border-purple-500/30 text-purple-400"
            }`}
          >
            {col.title}
          </button>
        ))}
      </div>

      {/* GRID DINÁMICO: Renderiza los productos seleccionados o el mensaje de "Próximamente" */}
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-10">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 w-full py-20">
            Próximamente...
          </p>
        )}
      </div>

    </section>
  );
}