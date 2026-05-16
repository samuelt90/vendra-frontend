"use client";

import { useEffect, useState } from "react";
import { Search, Radio } from "lucide-react";

const mockProducts = [
  {
    codigo: "P-101",
    nombre: "Playera Nike Dri-Fit",
    tipo: "Playera",
    talla: "M",
    estadoPrenda: "Casi nuevo",
    precio: 79,
    disponible: true,
  },
  {
    codigo: "P-102",
    nombre: "Pants adidas Tiro",
    tipo: "Pants",
    talla: "L",
    estadoPrenda: "Buen estado",
    precio: 110,
    disponible: true,
  },
  {
    codigo: "P-103",
    nombre: "Short Under Armour",
    tipo: "Short",
    talla: "M",
    estadoPrenda: "Casi nuevo",
    precio: 85,
    disponible: false,
  },
];

export default function LiveSellingDemo() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<(typeof mockProducts)[0] | null>(null);
  const [searched, setSearched] = useState(false);
  const [reserved, setReserved] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(300);
  const [buyerName, setBuyerName] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [buyerLocation, setBuyerLocation] = useState("");  
  const [confirmed, setConfirmed] = useState(false);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (!reserved) return;
    if (secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [reserved, secondsLeft]);

  const handleSearch = () => {
    const found = mockProducts.find(
      (product) => product.codigo.toLowerCase() === code.trim().toLowerCase()
    );

    setResult(found || null);
    setSearched(true);
    setReserved(false);
    setSecondsLeft(300);
    setConfirmed(false);
    setBuyerName("");
    setBuyerPhone("");
    setBuyerLocation("");
  };


  return (
    <main className="min-h-screen bg-white px-4 py-6">
      <div className="mx-auto max-w-md">

        {/* HEADER */}
        <div className="mb-8 text-center">
          <div className="mb-2 flex items-center justify-center gap-2 text-green-600">
            <Radio className="h-5 w-5" />
            <span className="text-sm font-semibold uppercase tracking-wide">
              Live Selling
            </span>
          </div>

          <h1 className="text-3xl font-bold text-gray-950">
            Refit
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Ingresa el código que Astrid menciona en el live.
          </p>
        </div>

        {/* BUSCADOR */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-semibold text-gray-900">
            Código de prenda
          </label>

          <div className="flex gap-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-sm">
            <div className="flex flex-1 items-center gap-2 px-2">
              <Search className="h-5 w-5 text-gray-400" />

              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Ej. P-101"
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>

            <button
              type="button"
              onClick={handleSearch}
              className="rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white"
            >
              Buscar
            </button>
          </div>
        </div>

        {/* RESULTADO */}
        {searched && !result && (
          <div className="rounded-2xl border border-orange-200 bg-orange-50 p-4">
            <p className="font-semibold text-orange-800">
              No encontramos ese código
            </p>
            <p className="mt-1 text-sm text-orange-700">
              Revisa el código mencionado en el live e intenta de nuevo.
            </p>
          </div>
        )}

        {result && (
          <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
            <div
              className={`mb-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                result.disponible
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {result.disponible ? "Disponible" : "Ya fue apartada"}
            </div>

            <h2 className="text-xl font-bold text-gray-950">
              {result.nombre}
            </h2>

            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Código</span>
                <span className="font-semibold text-gray-900">{result.codigo}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Tipo</span>
                <span className="font-semibold text-gray-900">{result.tipo}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Talla</span>
                <span className="font-semibold text-gray-900">{result.talla}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Estado</span>
                <span className="font-semibold text-gray-900">{result.estadoPrenda}</span>
              </div>

              <div className="flex justify-between border-t border-gray-100 pt-3">
                <span className="text-gray-500">Precio</span>
                <span className="font-bold text-green-700">Q{result.precio}</span>
              </div>
            </div>

                {result.disponible ? (
                reserved ? (
                <>
                    <div className="mt-5 rounded-2xl border border-green-200 bg-green-50 p-4">
                    <p className="font-semibold text-green-800">
                        ¡Prenda apartada!
                    </p>

                    <p className="mt-1 text-sm text-green-700">
                        Tienes 5 minutos para completar tus datos y confirmar por WhatsApp.
                    </p>

                    <div className="mt-4 rounded-xl bg-white px-4 py-3 text-center">
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                        Tiempo para confirmar
                        </p>

                        <p className="mt-1 text-2xl font-bold text-green-700">
                        {formatTime(secondsLeft)}
                        </p>
                    </div>
                    </div>

                    <div className="mt-5 space-y-3">
                    <h3 className="text-base font-bold text-gray-900">
                        Completa tus datos para confirmar
                    </h3>

                    <input
                        value={buyerName}
                        onChange={(e) => setBuyerName(e.target.value)}
                        placeholder="Nombre completo"
                        className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500"
                    />

                    <input
                        value={buyerPhone}
                        onChange={(e) => setBuyerPhone(e.target.value)}
                        placeholder="Número de WhatsApp"
                        className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500"
                    />

                    <input
                        value={buyerLocation}
                        onChange={(e) => setBuyerLocation(e.target.value)}
                        placeholder="Municipio o zona de entrega"
                        className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500"
                    />
                    {buyerName && buyerPhone && buyerLocation && !confirmed && (
                    <button
                        type="button"
                        onClick={() => setConfirmed(true)}
                        className="w-full rounded-2xl bg-green-600 px-4 py-4 text-sm font-semibold text-white"
                    >
                        Confirmar pedido
                    </button>
                    )}

                    {confirmed && (
                    <div className="rounded-2xl border border-green-200 bg-green-50 p-4">
                        <p className="font-semibold text-green-800">
                        ¡Pedido confirmado!
                        </p>

                        <p className="mt-1 text-sm text-green-700">
                        Gracias por tu compra. Astrid recibirá los datos de tu pedido para coordinar la entrega.
                        </p>
                    </div>
                    )}

                    </div>
                </>
                ) : (

                    <button
                    type="button"
                    onClick={() => {
                        setReserved(true);
                        setSecondsLeft(300);
                    }}
                    className="mt-5 w-full rounded-2xl bg-green-600 px-4 py-4 text-sm font-semibold text-white"
                    >
                    Apartar esta prenda
                    </button>
                )
                ) : (
              <p className="mt-5 rounded-2xl bg-gray-50 p-4 text-sm text-gray-600">
                Esta prenda ya fue apartada. Puedes intentar con otro código del live.
              </p>
            )}
          </div>
        )}

      </div>
    </main>
  );
}
