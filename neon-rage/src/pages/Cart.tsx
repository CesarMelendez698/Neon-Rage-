import { useContext } from "react"; // Hook para acceder a los datos globales.
import { CartContext } from "../context/CartContext"; // Importa el contexto que contiene los productos elegidos.
import { Link } from "react-router-dom"; // Componente para navegar entre páginas.

export default function Cart() {

  // Extrae las funciones y datos necesarios del carrito global.
  const { cart, removeFromCart, increaseQty, decreaseQty } = useContext(CartContext);

  // ============================
  // CÁLCULOS PRO
  // ============================
  // reduce recorre el carrito y suma el (precio * cantidad) de cada item empezando desde 0.
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const envio = 0; // Configurado como gratis.
  const total = subtotal + envio;

  // ============================
  // WHATSAPP PRO
  // ============================
  // Función para generar el mensaje automático y redirigir al chat.
  const handleCheckout = () => {

    const telefono = "50362092893"; // Tu número de WhatsApp.

    // Crea una lista de texto legible recorriendo cada producto del carrito.
    const listaProductos = cart
      .map((item) =>
        `• ${item.name}\n` +
        `   Talla: ${item.size || "N/A"}\n` +
        `${item.color ? `   Color: ${item.color}\n` : ""}` +
        `   Cantidad: ${item.quantity}\n` +
        `   Subtotal: $${item.price * item.quantity}\n`
      )
      .join("\n");

    // Construye el mensaje final codificado para que WhatsApp lo entienda correctamente.
    const mensaje = encodeURIComponent(
      `⚡ *PEDIDO NEON RAGE*\n\n` +
      `${listaProductos}\n` +
      `----------------------\n` +
      `Subtotal: $${subtotal}\n` +
      `Envío: GRATIS\n` +
      `TOTAL: $${total}\n\n` +
      `Quiero finalizar mi compra`
    );

    // Abre una nueva pestaña con el enlace directo al chat con el mensaje ya escrito.
    window.open(`https://wa.me/${telefono}?text=${mensaje}`, "_blank");
  };

  return (
    // Contenedor principal con padding superior para no quedar debajo de la Navbar fija.
    <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto min-h-screen">

      {/* ================= TÍTULO ================= */}
      <h2 className="text-4xl font-black text-purple-400 mb-10 uppercase tracking-tighter italic">
        Tu pedido <span className="text-white">({cart.length})</span>
      </h2>

      {/* Grid de 3 columnas: 2 para productos y 1 para el resumen de pago en pantallas grandes. */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* ================= SECCIÓN IZQUIERDA: PRODUCTOS ================= */}
        <div className="lg:col-span-2 space-y-4">

          {/* Si el carrito está vacío, muestra un mensaje decorativo y enlace a la tienda. */}
          {cart.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-purple-500/20 rounded-3xl">
              <p className="text-gray-500 mb-6 font-medium">
                El sistema no detecta artículos en tu carrito.
              </p>

              <Link 
                to="/#Collection"
                className="bg-purple-500/10 text-purple-400 px-6 py-2 rounded-full border border-purple-500/20 hover:bg-purple-500 hover:text-black transition-all font-bold uppercase text-xs"
              >
                Ir a la colección
              </Link>
            </div>

          ) : (
            // Si hay productos, mapea el array para crear una tarjeta por cada item.
            cart.map((item) => (

              <div 
                key={item.cartId}
                className="flex items-center justify-between bg-neutral-900/30 backdrop-blur-sm p-6 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-all group"
              >

                <div>
                  <h3 className="font-bold text-lg uppercase italic group-hover:text-purple-300 transition-colors">
                    {item.name}
                  </h3>

                  {/* Detalles de Talla y Color del producto. */}
                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    <span className="text-[10px] bg-purple-500/20 text-purple-400 border border-purple-500/30 px-2 py-0.5 rounded font-black tracking-widest">
                      TALLA: {item.size || "N/A"}
                    </span>

                    {item.color && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-black tracking-widest border ${
                          item.color === "Negro"
                            ? "bg-black text-white border-white/20"
                            : "bg-white text-black border-black/20"
                        }`}
                      >
                        COLOR: {item.color}
                      </span>
                    )}

                    <p className="text-gray-400 font-mono font-bold">
                      ${item.price}
                    </p>
                  </div>

                  {/* 🔥 CONTROLES DE CANTIDAD (Aumentar / Disminuir unidades) */}
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => decreaseQty(item.cartId)}
                      className="w-8 h-8 bg-neutral-800 hover:bg-purple-500 text-white rounded"
                    >
                      -
                    </button>

                    <span className="text-white font-bold text-sm">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQty(item.cartId)}
                      className="w-8 h-8 bg-neutral-800 hover:bg-purple-500 text-white rounded"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* ❌ BOTÓN ELIMINAR: Quita el item específico del carrito. */}
                <button 
                  onClick={() => removeFromCart(item.cartId)}
                  className="text-gray-600 hover:text-red-500 text-[10px] font-black uppercase tracking-[0.2em] transition-colors"
                >
                  [ ELIMINAR ]
                </button>

              </div>
            ))
          )}
        </div>

        {/* ================= SECCIÓN DERECHA: RESUMEN DE COMPRA ================= */}
        <div className="lg:col-span-1">
          {/* Contenedor sticky que se queda pegado al hacer scroll. */}
          <div className="bg-neutral-900/80 backdrop-blur-md p-8 rounded-3xl border border-purple-500/20 sticky top-32 shadow-2xl">

            <h3 className="text-xl font-black mb-6 border-b border-white/5 pb-4 italic tracking-tighter uppercase">
              Orden de Compra
            </h3>

            {/* Desglose de precios. */}
            <div className="space-y-4 mb-8 font-medium">
              <div className="flex justify-between text-gray-400 text-sm">
                <span>SUBTOTAL</span>
                <span className="text-white">${subtotal}</span>
              </div>

              <div className="flex justify-between text-gray-400 text-sm">
                <span>ENVÍO</span>
                <span className="text-green-400 font-bold tracking-widest text-[10px]">
                  GRATIS
                </span>
              </div>

              <div className="h-px bg-purple-500/20 my-4"></div>

              <div className="flex justify-between text-2xl font-black italic">
                <span>TOTAL</span>
                <span className="text-purple-400">
                  ${total}
                </span>
              </div>
            </div>

            {/* Botón de Checkout: Se deshabilita si el carrito está vacío. */}
            <button 
              disabled={cart.length === 0}
              onClick={handleCheckout}
              className="w-full bg-purple-500 hover:bg-purple-400 disabled:bg-neutral-800 disabled:text-gray-600 text-black font-black py-4 rounded-xl transition-all active:scale-95 uppercase tracking-widest text-sm flex items-center justify-center gap-2"
            >
              <span>Finalizar en WhatsApp</span>
              <span className="text-xl">→</span>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}