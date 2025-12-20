"use client";

import { useState } from "react";

type CheckoutFormProps = {
  store: {
    name: string;
    whatsapp: string;
  };
  product: {
    Text: string;
    code?: string;
    price: number;
  };
};

export default function CheckoutForm({ store, product }: CheckoutFormProps) {
  const [cantidad, setCantidad] = useState(1);
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [entrega, setEntrega] = useState("domicilio");
  const [pago, setPago] = useState("contraentrega");

  const subtotal = product.price * cantidad;
  const total = subtotal; // por ahora igual, luego puedes sumar envío

  const handleConfirmar = () => {
    const lineas = [
      "Hola, quiero comprar:",
      "",
      `Tienda: ${((store as any)?.slug ?? (store as any)?.attributes?.slug ?? store.name)}`,
      `Producto: ${product.Text}`,
      product.code ? `Código: ${product.code}` : "",
      `Cantidad: ${cantidad}`,
      `Precio unitario: Q${product.price}`,
      `Subtotal: Q${subtotal}`,
      `Total: Q${total}`,
      "",
      "— Datos de envío —",
      nombre ? `Nombre: ${nombre}` : "",
      telefono ? `Tel: ${telefono}` : "",
      direccion ? `Dirección: ${direccion}` : "",
      `Entrega: ${
        entrega === "domicilio" ? "Envío a domicilio" : "Recoger en tienda"
      }`,
      `Pago: ${
        pago === "contraentrega" ? "Contraentrega" : "Depósito/Transferencia"
      }`,
    ].filter(Boolean); // quita líneas vacías

    const mensaje = lineas.join("\n");

    const url = `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(
      mensaje
    )}`;

    window.open(url, "_blank");
  };

  return (
    <div className="mt-4 space-y-4 border-t pt-4">
      <h2 className="text-lg font-semibold">Completar pedido</h2>

      {/* Cantidad */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-700">Cantidad:</span>
        <div className="flex items-center border rounded-lg overflow-hidden">
          <button
            type="button"
            className="px-3 py-1 text-sm"
            onClick={() => setCantidad((c) => Math.max(1, c - 1))}
          >
            -
          </button>
          <span className="px-4 text-sm">{cantidad}</span>
          <button
            type="button"
            className="px-3 py-1 text-sm"
            onClick={() => setCantidad((c) => c + 1)}
          >
            +
          </button>
        </div>
      </div>

      {/* Datos del cliente */}
      <div className="space-y-2">
        <div>
          <label className="block text-sm text-gray-700">
            Nombre completo
          </label>
          <input
            className="mt-1 w-full border rounded-lg px-3 py-1.5 text-sm"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Samuel Torres"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700">Teléfono</label>
          <input
            className="mt-1 w-full border rounded-lg px-3 py-1.5 text-sm"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="Ej: 4397xxxx"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700">Dirección</label>
          <textarea
            className="mt-1 w-full border rounded-lg px-3 py-1.5 text-sm"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            placeholder="Zona, colonia, referencia…"
            rows={2}
          />
        </div>
      </div>

      {/* Entrega y pago */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm text-gray-700">
            Tipo de entrega
          </label>
          <select
            className="mt-1 w-full border rounded-lg px-3 py-1.5 text-sm"
            value={entrega}
            onChange={(e) => setEntrega(e.target.value)}
          >
            <option value="domicilio">Envío a domicilio</option>
            <option value="tienda">Recoger en tienda</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-700">
            Método de pago
          </label>
          <select
            className="mt-1 w-full border rounded-lg px-3 py-1.5 text-sm"
            value={pago}
            onChange={(e) => setPago(e.target.value)}
          >
            <option value="contraentrega">Contraentrega</option>
            <option value="deposito">Depósito / Transferencia</option>
          </select>
        </div>
      </div>

      {/* Totales */}
      <div className="border rounded-lg px-3 py-2 text-sm text-gray-800 bg-gray-50">
        <p>Precio unitario: Q{product.price}</p>
        <p>Cantidad: {cantidad}</p>
        <p className="font-semibold mt-1">Total: Q{total}</p>
      </div>

      {/* Confirmar */}
      <button
        type="button"
        onClick={handleConfirmar}
        className="w-full py-2.5 rounded-lg bg-green-500 text-white font-medium text-sm hover:bg-green-600 transition"
      >
        Confirmar pedido por WhatsApp
      </button>
    </div>
  );
}
