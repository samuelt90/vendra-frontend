import React from 'react';

const ProcessSteps = ({ steps }) => {
  return (
    <section className="bg-dls-section text-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">¿Cómo funciona?</h2>
        <div className="space-y-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row ${
                index % 2 !== 0 ? 'md:flex-row-reverse' : ''
              } items-center gap-2`}
            >
              {/* Texto */}
              <div className="md:w-[43%]">
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </div>

              {/* Imagen */}
              <div className="md:w-[43%] flex justify-center">
                <img
                  src={step.image}
                  alt={`Paso ${index + 1}`}
                  className="w-56 h-56 object-contain rounded-2xl shadow-xl"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;