// ============================
// IMPORTS
// ============================
import { useContext, useRef, useState } from "react";
import { CartContext } from "../context/CartContext";

// ============================
// VIDEOS
// ============================
import videoNoPerfec from "../Videos/No_perfec.mp4";
import videoRage from "../Videos/Rage_2026.mp4";
import videoZarpasos from "../Videos/Zarpasos.mp4";

// ============================
// IMÁGENES
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

import Banner from "../Img/BannerColecction2.jpg";

// ============================
// INTERFACE PRODUCT
// ============================
interface Product {
  id: number;
  name: string;
  price?: number;
  media: string[];
  description?: string;
  whiteImage?: string;
  blackImage?: string;
}

// ============================
// PRODUCT CARD
// ============================
function ProductCard({
  product,
  addToCart,
}: {
  product: Product;
  addToCart: (p: any) => void;
}) {

  const videoRef = useRef<HTMLVideoElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [showModal, setShowModal] = useState(false);

  const [selectedSize, setSelectedSize] =
    useState<string | null>(null);

  const [selectedColor, setSelectedColor] =
    useState<string | null>("Blanco");

  const sizes = ["S", "M", "L", "XL"];

  const isClassicCore =
    product.whiteImage && product.blackImage;

  // ============================
  // CARRUSEL
  // ============================
  const nextSlide = () => {
    if (product.media.length > 0) {
      setCurrentIndex(
        (prev) => (prev + 1) % product.media.length
      );
    }
  };

  const prevSlide = () => {
    if (product.media.length > 0) {
      setCurrentIndex((prev) =>
        prev === 0
          ? product.media.length - 1
          : prev - 1
      );
    }
  };

  const currentMedia = product.media[currentIndex];

  const isVideo =
    currentMedia?.toLowerCase().endsWith(".mp4");

  return (
    <>
      {/* ================= CARD ================= */}
      <div className="bg-neutral-900/40 backdrop-blur-sm p-6 rounded-3xl border border-purple-500/10 hover:border-purple-500/40 transition-all group shadow-2xl overflow-hidden w-full max-w-[320px] h-full flex flex-col justify-between">

        <div>

          {/* ================= MEDIA ================= */}
          <div className="relative h-64 bg-black rounded-2xl mb-6 overflow-hidden border border-white/5 flex items-center justify-center">

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

            {/* BOTONES */}
            {product.media.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevSlide();
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-purple-500 text-white w-10 h-10 rounded-full text-2xl"
                >
                  ‹
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextSlide();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-purple-500 text-white w-10 h-10 rounded-full text-2xl"
                >
                  ›
                </button>
              </>
            )}
          </div>

          {/* TEXTO */}
          <div className="px-2 text-white text-center">

            <h4 className="text-xl font-bold mb-2 uppercase italic">
              {product.name}
            </h4>

            {product.price && (
              <p className="text-purple-400 text-lg mb-6 font-bold">
                ${product.price}
              </p>
            )}
          </div>
        </div>

        {/* BOTÓN */}
        <button
          onClick={() => setShowModal(true)}
          className="w-full bg-purple-500 hover:bg-purple-400 text-black font-black py-3 rounded-xl"
        >
          Seleccionar
        </button>
      </div>

      {/* ================= MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 p-4">

          <div className="bg-neutral-950 border border-purple-500/20 p-8 rounded-3xl max-w-lg w-full relative">

            {/* REGRESAR */}
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

            {/* IMAGEN */}
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

            {/* TÍTULO */}
            <h2 className="text-3xl font-black text-purple-400 mb-4 uppercase text-center mt-2">
              {product.name}
            </h2>

            {/* DESCRIPCIÓN */}
            <p className="text-gray-300 mb-6 text-sm text-center">
              {product.description}
            </p>

            {/* COLORES */}
            {isClassicCore && (
              <div className="flex justify-center gap-3 mb-6">

                {["Blanco", "Negro"].map((color) => (
                  <button
                    key={color}
                    onClick={() =>
                      setSelectedColor(color)
                    }
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

            {/* TALLAS */}
            <div className="flex justify-center gap-3 mb-8">

              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() =>
                    setSelectedSize(size)
                  }
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

            {/* AÑADIR */}
            <button
              disabled={Boolean(
                !selectedSize ||
                (isClassicCore && !selectedColor)
              )}
              onClick={() => {

                addToCart({
                  ...product,
                  size: selectedSize,
                  color: isClassicCore
                    ? selectedColor
                    : undefined,
                });

                setShowModal(false);

                setSelectedSize(null);

                setSelectedColor("Blanco");
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
// COLLECTION
// ============================
export default function Collection() {

  const { addToCart } = useContext(CartContext);

  // ============================
  // INICIA EN PROXIMAMENTE
  // ============================
  const [activeCollection, setActiveCollection] =
    useState(2);

  // ============================
  // COLECCIONES
  // ============================
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

          description:
            "Camisa Oversize 100% Algodón.",
        },

        {
          id: 2,
          name: "Signature Edition",
          price: 20,
          media: [],
          whiteImage: Clasba1,
          blackImage: Clasne1,

          description:
            "Camisa Oversize 100% Algodón.",
        },
      ],
    },

    {
      title: "The Neón Jungle Colecction",

      products: [
        {
          id: 5,
          name: "No Perfect Edition",
          price: 20,

          media: [
            videoNoPerfec,
            No_perfec1,
            No_perfec2,
            No_perfec3,
          ],

          description:
            "Diseño urbano con esencia auténtica.",
        },

        {
          id: 6,
          name: "Rage 2026 Premium",
          price: 20,

          media: [
            videoRage,
            Rage_20261,
            Rage_20262,
          ],

          description:
            "Minimalismo frontal con impacto visual.",
        },

        {
          id: 7,
          name: "Zarpazos Beast",
          price: 20,

          media: [
            videoZarpasos,
            Zarpasos1,
            Zarpasos2,
            Zarpasos3,
          ],

          description:
            "Energía salvaje y presencia dominante.",
        },
      ],
    },

    {
      title: "Proximamente",

      products: [
        {
          id: 8,
          name: "Proximamente",
          media: [Banner],
        },
      ],
    },
  ];

  const currentProducts =
    collections[activeCollection].products;

  return (
    <section
      id="Collection"
      className="py-24 px-6 bg-black"
    >

      {/* TÍTULO */}
      <div className="text-center mb-12">

        <h3 className="text-5xl font-black text-purple-400 uppercase italic">
          Nuestra Colección
        </h3>
      </div>

      {/* BOTONES */}
      <div className="flex justify-center gap-4 mb-12 flex-wrap">

        {collections.map((col, index) => (
          <button
            key={index}
            onClick={() =>
              setActiveCollection(index)
            }
            className={`px-8 py-2 rounded-full font-bold transition-all ${
              activeCollection === index
                ? "bg-purple-500 text-black"
                : "border border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
            }`}
          >
            {col.title}
          </button>
        ))}
      </div>

      {/* PRODUCTOS */}
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-10">

        {collections[activeCollection].title ===
        "Proximamente" ? (

          <div className="w-full flex justify-center">

            <img
              src={Banner}
              alt="Próximamente"
              className="w-full max-w-6xl rounded-3xl shadow-2xl object-cover border border-purple-500/20"
            />
          </div>

        ) : currentProducts.length > 0 ? (

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