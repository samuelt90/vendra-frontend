"use client";
import { useAparta } from "@/app/aparta/context/ApartaContext";
import { useState, useEffect } from "react"; // 
import { useRouter, useParams } from "next/navigation";
import Stepper from "../components/Stepper";
import FaqFloatingButton from "../components/FaqFloatingButton";
import ConfirmationSplash from "../components/ConfirmationSplash";
import PostWhatsappSummary from "../components/PostWhatsappSummary";

type SubmittedOrder = {
  items: any[];
  total: number;
  form: {
    nombre: string;
    tel: string;
    direccion: string;
    entrega: string;
    pago: string;
  };
};


export default function CheckoutPage() {
  const { items, clear } = useAparta();
  const router = useRouter();
  const params = useParams<{ alias: string }>();
  const alias = params.alias;

  const [form, setForm] = useState({
    nombre: "",
    tel: "",
    direccion: "",
    entrega: "",
    pago: "",
  });

  const [phone, setPhone] = useState(""); 
  const [store, setStore] = useState<any>(null);
  const [showConfirmationSplash, setShowConfirmationSplash] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<SubmittedOrder | null>(null);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  
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

  
  useEffect(() => {
    const fetchStore = async () => {
      try {
       const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/aparta-stores?filters[slug][$eq]=${params.alias}`
      );

      const json = await res.json();
      const store = json.data?.[0];

      if (store) {
        setStore(store);
        setPhone(store.whatsapp);
      }
            } catch (err) {
              console.error(err);
            }
          };

    fetchStore();
  }, [params.alias]);

const generarMensaje = () => {
  let mensaje = " Nuevo pedido recibido\n\n";

  items.forEach((item) => {
    mensaje += `Producto:\n`;
    mensaje += `• ${item.Text}\n`;
    mensaje += `  Cantidad: 1\n`;
    mensaje += `  Subtotal: Q${item.price}\n\n`;
  });

  mensaje += ` Total: Q${total}\n\n`;

  mensaje += " Datos del cliente\n";
  mensaje += `Nombre: ${form.nombre}\n`;
  mensaje += `Teléfono: ${form.tel}\n`;
  mensaje += `Dirección:\n${form.direccion}\n\n`;

  mensaje += ` Entrega: ${form.entrega}\n`;
  mensaje += ` Pago: ${form.pago}\n`;

  return mensaje;
};

const enviarWhatsApp = () => {
  if (!isValid) return;

  const mensaje = generarMensaje();
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(mensaje)}`;

  window.open(url, "_blank");

  setShowConfirmationSplash(true);
  setSubmittedOrder({
  items: [...items],
  total,
  form: { ...form },
  });
  clear();

  
};

  const currentStep: 2 | 3 = isValid ? 3 : 2;

  const confirmationImageUrl =
  store?.confirmation_image?.formats?.large?.url ||
  store?.confirmation_image?.url ||
  null;
    if (showConfirmationSplash) {
      return (
        <ConfirmationSplash
          storeName={store?.name || "la tienda"}
          confirmationImageUrl={confirmationImageUrl}
          onViewSummary={() => {
          setShowConfirmationSplash(false);
          setShowOrderSummary(true);
        }}
          onContinueShopping={() => {
            router.push(`/aparta/${alias}`);
          }}
        />
      );
    }
if (showOrderSummary && submittedOrder) {
  return (
    <PostWhatsappSummary
      order={submittedOrder}
      storeName={store?.name || "la tienda"}
      storeWhatsapp={phone}
      onContinueShopping={() => router.push(`/aparta/${alias}`)}
    />
  );
}

  return (
    <main className="max-w-md mx-auto p-4">
      <Stepper step={currentStep} />
      <div className="bg-white rounded-2xl shadow-md p-5">
        <h1 className="text-xl font-semibold text-center mb-1">
          Completar pedido
        </h1>

        <p className="text-center text-gray-500 text-sm mb-6">
          Completa tus datos para que la tienda pueda confirmar y coordinar tu pedido por whatsapp
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

        <div className="mt-5 rounded-2xl border border-green-100 bg-green-50 px-4 py-3">
        <p className="text-sm leading-relaxed text-green-800">
          Tus datos serán utilizados únicamente para confirmar y coordinar tu pedido.
        </p>
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
      <FaqFloatingButton/>
    </main>
  );
}
