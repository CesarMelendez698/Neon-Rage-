import React, { useState } from 'react';

export default function Contact() {
  const [status, setStatus] = useState<"IDLE" | "SENDING" | "SUCCESS" | "ERROR">("IDLE");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("SENDING");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mjgjralw", { // REEMPLAZA CON TU ID
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus("SUCCESS");
        form.reset();
      } else {
        setStatus("ERROR");
      }
    } catch (error) {
      setStatus("ERROR");
    }
  };

  return (
    <section id="Contact" className="bg-black text-white py-24 px-6 text-center relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <h3 className="text-5xl font-black text-purple-400 mb-4 uppercase tracking-tighter italic drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]">
          Contacto <span className="text-white">Directo</span>
        </h3>
        
        <p className="text-gray-500 mb-12 font-mono text-xs uppercase tracking-[0.3em]">
          {status === "SUCCESS" ? "MENSAJE ENVIADO CON ÉXITO" : "Estableciendo comunicación..."}
        </p>

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto flex flex-col gap-5 group">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              name="nombre" // IMPORTANTE: Agregado name
              type="text"
              required
              placeholder="NOMBRE"
              className="bg-neutral-900/50 border border-purple-500/20 rounded-2xl px-5 py-4 focus:outline-none focus:border-purple-500 focus:bg-neutral-900 transition-all font-mono text-xs placeholder:text-gray-700"
            />

            <input
              name="email" // IMPORTANTE: Agregado name
              type="email"
              required
              placeholder="E-MAIL"
              className="bg-neutral-900/50 border border-purple-500/20 rounded-2xl px-5 py-4 focus:outline-none focus:border-purple-500 focus:bg-neutral-900 transition-all font-mono text-xs placeholder:text-gray-700"
            />
          </div>

          <textarea
            name="mensaje" // IMPORTANTE: Agregado name
            required
            placeholder="ESCRIBE TU MENSAJE AQUÍ..."
            rows={5}
            className="bg-neutral-900/50 border border-purple-500/20 rounded-2xl px-5 py-4 focus:outline-none focus:border-purple-500 focus:bg-neutral-900 transition-all font-mono text-xs placeholder:text-gray-700 resize-none"
          ></textarea>

          <button 
            type="submit"
            disabled={status === "SENDING"}
            className="relative overflow-hidden bg-purple-500 hover:bg-purple-400 text-black px-8 py-4 rounded-2xl font-black transition-all active:scale-95 shadow-[0_0_30px_rgba(168,85,247,0.2)] uppercase text-xs tracking-[0.2em] group disabled:opacity-50"
          >
            <span className="relative z-10">
              {status === "SENDING" ? "ENVIANDO..." : "Enviar"}
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
          
          {status === "ERROR" && <p className="text-red-500 font-mono text-[10px]">Error al enviar. Intenta de nuevo.</p>}
        </form>

        <div className="mt-16 flex flex-col md:flex-row justify-center gap-12 text-[10px] font-mono text-gray-600 uppercase tracking-widest">
            <div className="flex flex-col gap-1">
              <span className="text-purple-500/50">Canal Oficial</span>
              <span className="text-white">neon.rage2026122@gmail.com</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-purple-500/50">Disponibilidad</span>
              <span className="text-white">de 7:00 AM a 10:00 PM</span>
            </div>
        </div>
      </div>
    </section>
  );
}