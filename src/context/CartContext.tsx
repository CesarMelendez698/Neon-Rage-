import { createContext, useState, useEffect } from "react"; // Hooks para crear el contexto, manejar el estado y efectos secundarios.
import type { ReactNode } from "react"; // Importa el tipo para los componentes hijos que envolverá el Provider.

// ============================
// INTERFAZ DEL PRODUCTO EN CARRITO
// ============================
// Define cómo luce un producto una vez que ya está dentro del carrito.
interface CartItem {
  id: number;
  name: string;
  price: number;
  size?: string;
  color?: string;

  cartId: number;     // Identificador único para cada entrada (permite tener el mismo producto pero en diferente talla).
  quantity: number;   // Cuántas unidades de este mismo item hay.
}

// ============================
// CONTEXTO (Definición de tipos)
// ============================
// Define qué funciones y datos estarán disponibles para toda la aplicación.
interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "cartId" | "quantity">) => void; // Omit excluye cartId y quantity porque se generan automáticamente.
  removeFromCart: (cartId: number) => void;
  increaseQty: (cartId: number) => void;
  decreaseQty: (cartId: number) => void;
}

// ============================
// CREACIÓN CONTEXTO
// ============================
// Se inicializa el contexto con valores vacíos por defecto.
export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  increaseQty: () => {},
  decreaseQty: () => {}
});

// ============================
// PROVIDER (El componente que envuelve la App)
// ============================
export function CartProvider({ children }: { children: ReactNode }) {

  // 🔥 CARRITO CON LOCALSTORAGE: Al iniciar, intenta cargar los datos guardados en el navegador.
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("cart"); // Busca la clave "cart" en el almacenamiento local.
    return saved ? JSON.parse(saved) : []; // Si existe lo convierte en objeto, si no, devuelve un array vacío.
  });

  // 🔄 GUARDADO AUTOMÁTICO: Cada vez que el estado 'cart' cambia, se guarda en el LocalStorage.
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ============================
  // AGREGAR PRODUCTO
  // ============================
  function addToCart(item: Omit<CartItem, "cartId" | "quantity">) {

    // 🔥 Busca si ya existe un producto con el mismo ID, talla y color.
    const existing = cart.find(p =>
      p.id === item.id &&
      p.size === item.size &&
      p.color === item.color
    );

    if (existing) {
      // ✅ Si ya existe, recorre el carrito y suma 1 a la cantidad del item coincidente.
      setCart(prev =>
        prev.map(p =>
          p.cartId === existing.cartId
            ? { ...p, quantity: p.quantity + 1 }
            : p
        )
      );
    } else {
      // ✅ Si es nuevo, crea un objeto con un cartId único basado en el tiempo actual.
      const newItem: CartItem = {
        ...item,
        cartId: Date.now(),
        quantity: 1
      };

      setCart(prev => [...prev, newItem]); // Agrega el nuevo producto al final del array.
    }
  }

  // ============================
  // ELIMINAR
  // ============================
  function removeFromCart(cartId: number) {
    // Filtra el array para excluir el producto que coincida con el cartId recibido.
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  }

  // ============================
  // AUMENTAR CANTIDAD
  // ============================
  function increaseQty(cartId: number) {
    // Busca el item y le suma 1 a su propiedad quantity.
    setCart(prev =>
      prev.map(item =>
        item.cartId === cartId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  // ============================
  // DISMINUIR CANTIDAD
  // ============================
  function decreaseQty(cartId: number) {
    // Busca el item y resta 1, pero asegura que el mínimo sea siempre 1.
    setCart(prev =>
      prev.map(item =>
        item.cartId === cartId
          ? {
              ...item,
              quantity: item.quantity > 1 ? item.quantity - 1 : 1
            }
          : item
      )
    );
  }

  return (
    // Proveedor que envuelve a los componentes hijos y les da acceso a los datos y funciones.
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty
      }}
    >
      {children}
    </CartContext.Provider>
  );
}