import React from "react";

export default function Testimonials({ testimonials }: { testimonials: { name: string; message: string }[] }) {
  return (
    <section className="mb-8">
      <h3 className="text-2xl font-bold mb-4 text-blue-900">Témoignages</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((t, idx) => (
          <div key={idx} className="bg-white border rounded-lg p-6 shadow">
            <p className="mb-2 text-gray-700">"{t.message}"</p>
            <div className="text-right text-blue-700 font-bold">- {t.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
