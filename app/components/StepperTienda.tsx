"use client";

type Props = {
  step: 1 | 2 | 3;
};

export default function Stepper({ step }: Props) {
  const steps = [
    { label: "Carrito" },
    { label: "Datos" },
    { label: "Confirmar" },
  ];

  return (
    <div className="flex items-center justify-between mb-6 text-sm font-medium">
      {steps.map((s, index) => {
        const current = index + 1;

        const isCompleted = current < step;
        const isActive = current === step;

        return (
          <div key={index} className="flex items-center w-full">
            
            {/* Paso */}
            <div className="flex items-center gap-2">
              
              {/* Icono */}
              <div
                className={`w-5 h-5 flex items-center justify-center rounded-full text-xs ${
                  isCompleted
                    ? "bg-green-600 text-white"
                    : isActive
                    ? "border-2 border-green-600 text-green-600"
                    : "border border-gray-300 text-gray-400"
                }`}
              >
                {isCompleted ? " ✔" : current}
              </div>

              {/* Texto */}
              <span
                className={`${
                  isCompleted || isActive
                    ? "text-green-600"
                    : "text-green-600"
                }`}
              >
                {s.label}
              </span>
            </div>

            {/* Línea */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-px mx-2 bg-gray-300" />
            )}
          </div>
        );
      })}
    </div>
  );
}
