export default function Features({ title, problemas = [], soluciones = [] }: any) {
  return (
    <section className="bg-dls-section text-white py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
        {/* Columna de Problemas */}
        <div>
          <h3 className="text-3xl md:text-4xl font-bold mb-10 text-white">{title}</h3>
          <p className="text-white/85 mb-6 text-base">¿Te suena familiar alguno de estos problemas?</p>
          <div className="space-y-4">
            
            {problemas.map((item: any, idx: number) => (
           <div
           key={idx}
          className="flex items-center gap-4 bg-[#27364c] text-white rounded-xl px-6 py-4 shadow-md transition-transform duration-200 hover:scale-105 hover:shadow-lg cursor-pointer"
           >
           {item.icono} 
           <span>{item.texto}</span>
           </div>
            ))}
          </div>
        </div>

        {/* Columna de Soluciones */}
        <div>
          <h3 className="text-3xl md:text-4xl font-bold mb-10 text-white">¿Qué hacemos diferente?</h3>
          <p className="text-white/85 mb-6 text-base">Así es como Vendra lo soluciona por tí:</p>
          <div className="space-y-4 text-white/80 text-base leading-relaxed">
           
            {soluciones.map((item: any, idx:number) => (
             
              <div
           key={idx}
          className="flex items-center gap-4 bg-[#27364c] text-white rounded-xl px-6 py-4 shadow-md transition-transform duration-200 hover:scale-105 hover:shadow-lg cursor-pointer"
           >
           {item.icono} 
           <span>{item.texto}</span>
           </div>

            ))}
          </div>
        </div>
      </div>
    </section>
  );
}