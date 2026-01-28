"use client";
import { useState } from "react";

export default function AssistantDemo() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [step, setStep] = useState<"search" | "result" | "form">("search");
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [ShowDemoMessage, setShowDemoMessage] = useState (false);

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setOpen(true)}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          padding: "12px 16px",
          borderRadius: 999,
          backgroundColor: "#111",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          zIndex: 1000,
        }}
      >
        Asistente de compras
      </button>

      {/* Panel */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
            zIndex: 1001,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "75%",
              backgroundColor: "#fff",
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              padding: 16,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header */}
            <div
              style={{
                borderBottom: "1px solid #e5e5e5",
                paddingBottom: 8,
                marginBottom: 12,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <strong>Asistente de compras</strong>
                <div style={{ fontSize: 12, color: "#666" }}>
                 
                  
                  <br />
                  <p> </p>💡​💡​Demostración del flujo de compra con asistente Vendra
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: 18,
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>

            {/* PASO 1: BUSCADOR */}
            {step === "search" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #ddd",
                    borderRadius: 999,
                    padding: "10px 14px",
                    gap: 8,
                  }}
                >
                  <span style={{ fontSize: 16, opacity: 0.6 }}>🔍</span>
                  <input
                    type="text"
                    placeholder="Escribe el producto o código"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={{
                      border: "none",
                      outline: "none",
                      flex: 1,
                      fontSize: 14,
                    }}
                  />
                </div>

                <div style={{ fontSize: 12, color: "#666" }}>
                  <div style={{ marginBottom: 4 }}>
                    Datos para usar en esta demostración:
                  </div>
                  <ul style={{ paddingLeft: 16, margin: 0 }}>
                    <li>Toyota Corolla 2015</li>
                    <li>Código: 00231</li>
                  </ul>
                </div>

                {error && (
                  <div style={{ fontSize: 12, color: "#b00020" }}>
                    {error}
                  </div>
                )}

                <button
                  onClick={() => {
                    const value = query.trim().toLowerCase();
                    if (value === "toyota corolla 2015" || value === "00231") {
                      setError("");
                      setStep("result");
                    } else {
                      setError("Esta es una demostración. Usa el ejemplo disponible.");
                    }
                  }}
                  style={{
                    marginTop: "auto",
                    padding: 12,
                    borderRadius: 12,
                    border: "none",
                    background: "#129e90",
                    color: "#fff",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Buscar
                </button>
              </div>
            )}

            {/* PASO 2: RESULTADO */}
            {step === "result" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
                <div
                  style={{
                    border: "1px solid #eee",
                    borderRadius: 12,
                    padding: 16,
                  }}
                >
                  <strong>Toyota Corolla 2015</strong>
                  <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
                    Código: 00231
                  </div>

                  <ul style={{ marginTop: 12, paddingLeft: 16 }}>
                    <li>Transmisión automática</li>
                    <li>Motor 1.8L</li>
                    <li>Color blanco</li>
                    <li>Disponible</li>
                  </ul>
                </div>

                <button
                  onClick={() => setStep("form")}
                  style={{
                    padding: 12,
                    borderRadius: 12,
                    border: "none",
                    background: "#129e90",
                    color: "#fff",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Confirmar compra
                </button>

                <button
                  onClick={() => {
                    setStep("search");
                    setQuery("");
                    setError("");
                  }}
                  style={{
                    padding: 12,
                    borderRadius: 12,
                    border: "1px solid #ddd",
                    background: "#fff",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Volver
                </button>
              </div>
            )}

            {/* PASO 3: FORMULARIO */}
            {step === "form" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
                <input
                  placeholder="Nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ padding: 12, borderRadius: 8, border: "1px solid #ddd" }}
                />
                <input
                  placeholder="Teléfono"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ padding: 12, borderRadius: 8, border: "1px solid #ddd" }}
                />
                <input
                  placeholder="Dirección"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  style={{ padding: 12, borderRadius: 8, border: "1px solid #ddd" }}
                />

                    <button
                    onClick={() => setShowDemoMessage(true)}
                    style={{
                        marginTop: "auto",
                        padding: 12,
                        borderRadius: 12,
                        border: "none",
                        background: "#129e90",
                        color: "#fff",
                        fontWeight: 700,
                        cursor: "pointer",
                    }}
                    >
                    Preparar mensaje para WhatsApp
                    </button>

                    {ShowDemoMessage && (
                    <div
                        style={{
                        marginTop: 12,
                        fontSize: 13,
                        color: "#555",
                        textAlign: "center",
                        lineHeight: 1.4,
                        }}
                    >
                        Este es un ejemplo del flujo de compra.  
                        En la versión instalada para tu negocio, el mensaje se envía automáticamente a WhatsApp del vendedor  con la información del cliente y producto(S) selecionado(S).
                    </div>
                    )}

                <button
                  onClick={() => setStep("result")}
                  style={{
                    padding: 12,
                    borderRadius: 12,
                    border: "1px solid #ddd",
                    background: "#fff",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Volver
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
