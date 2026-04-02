"use client";
import { useAparta } from "@/app/aparta/context/ApartaContext";
import { useState, useEffect } from "react"; // 👈 agregado
import { useRouter, useParams } from "next/navigation";

export default function CheckoutPage() {
  const { items, clear } = useAparta();
  const router = useRouter();
  const params = useParams<{ alias: string }>();

  const [form, setForm] = useState({
    nombre: "",
    tel: "",
    direccion: "",
    entrega: "",
    pago: "",
  });

  const [phone, setPhone] = useState(""); // 👈 agregado

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isValid =
    form.nombre.trim() !== "" &&
    form.tel.trim() !== "" &&
    form.direccion.trim() !== "" &&
    form.entrega !== "" &&
    form.pago !== "";

  const total = items.reduce((acc, item) => acc + item.price, 0);

  // 👇 agregado
  useEffect(() => {
    const fetchStore = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/aparta-stores?filters[slug][$eq]=${params.alias}`
        );

        const json = await res.json();

        const store = json.data?.[0];

        if (store) {
          setPhone(store.whatsapp);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchStore();
  }, [params.alias]);

  const generarMensaje = () => {
    let mensaje = "Hola, quiero comprar:\n\n";

    items.forEach((item) => {
      mensaje += `Producto: ${item.Text}\n`;
      mensaje += `Cantidad: 1\n`;
      mensaje += `Precio unitario: Q${item.price}\n`;
      mensaje += `Subtotal: Q${item.price}\n\n`;
    });

    mensaje += `Total: Q${total}\n\n`;

    mensaje += "— Datos de envío —\n";
    mensaje += `Nombre: ${form.nombre}\n`;
    mensaje += `Tel: ${form.tel}\n`;
    mensaje += `Dirección: ${form.direccion}\n`;
    mensaje += `Entrega: ${form.entrega}\n`;
    mensaje += `Pago: ${form.pago}\n`;

    return mensaje;
  };

  const enviarWhatsApp = () => {
    if (!isValid) return;

    const mensaje = generarMensaje();

    // 👇 modificado (usa phone)
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");

    clear();
  };

  return (
    <main className="max-w-md mx-auto p-4">
      <div className="bg-white rounded-2xl shadow-md p-5">
        <h1 className="text-xl font-semibold text-center mb-1">
          Completar pedido
        </h1>

        <p className="text-center text-gray-500 text-sm mb-6">
          Ingresa tus datos para confirmar por WhatsApp.
        </p>

        {/* RESUMEN */}
        <div className="flex justify-between mb-6">
          <p className="text-gray-500">Productos</p>
          <p>{items.length}</p>
        </div>

        <div className="flex justify-between mb-6">
          <p className="text-gray-500">Total</p>
          <p className="font-bold">Q{total}</p>
        </div>

        {/* FORM */}
        <div className="space-y-4">
          <input
            name="nombre"
            placeholder="Nombre completo"
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />

          <input
            name="tel"
            placeholder="Teléfono"
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />

          <input
            name="direccion"
            placeholder="Dirección"
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Tipo de entrega</p>
              <select
                name="entrega"
                onChange={handleChange}
                className="w-full border rounded-xl p-3 bg-white"
              >
                <option value="">Seleccionar</option>
                <option value="Envío a domicilio">Envío a domicilio</option>
                <option value="Recoger en tienda">Recoger en tienda</option>
              </select>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">
                Método de pago
              </p>
              <select
                name="pago"
                onChange={handleChange}
                className="w-full border rounded-xl p-3 bg-white"
              >
                <option value="">Seleccionar</option>
                <option value="Contraentrega">Contraentrega</option>
                <option value="Depósito">Depósito</option>
              </select>
            </div>
          </div>
        </div>

        {/* BOTÓN */}
        <button
          onClick={enviarWhatsApp}
          disabled={!isValid}
          className={`w-full py-4 rounded-2xl mt-6 font-semibold transition ${
            isValid
              ? "bg-green-600 text-white"
              : "bg-gray-300 text-gray-500"
          }`}
        >
          Confirmar pedido por WhatsApp
        </button>

        {/* VOLVER */}
        <button
          onClick={() => router.push(`/aparta/${params.alias}/cart`)}
          className="w-full text-center mt-3 text-sm text-gray-500"
        >
          ← Volver al carrito
        </button>
      </div>
    </main>
  );
}
