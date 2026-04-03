import { useState } from "react";
import Button from "../ui/Button";

export default function CTASection({ title, subtitle, buttonText }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Formulario enviado:\n${JSON.stringify(formData, null, 2)}`);
  };

  return (
    <section className="bg-dls-section py-16 px-4 text-white">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-2">{title}</h2>
        <p className="text-gray-300 mb-6">{subtitle}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            className="w-full p-3 rounded bg-[#27364c] text-white border border-gray-600"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            className="w-full p-3 rounded bg-[#27364c] text-white border border-gray-600"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="whatsapp"
            placeholder="WhatsApp"
            className="w-full p-3 rounded bg-[#27364c] text-white border border-gray-600"
            onChange={handleChange}
            required
          />

          <Button type="submit" icon="download" text={buttonText || "Quiero participar"} />
        </form>
      </div>
    </section>
  );
}