import React from "react";

export default function Banner({ title, subtitle, image }: { title: string; subtitle?: string; image?: string }) {
  return (
    <section className="w-full bg-[#0a355d] flex flex-col md:flex-row items-center justify-between p-8 rounded-xl mb-8">
      <div className="flex-1 mb-4 md:mb-0">
        <h2 className="text-3xl font-bold mb-2 text-white">{title}</h2>
        {subtitle && <p className="text-lg text-blue-100 mb-2">{subtitle}</p>}
      </div>
      {image && <img src={image} alt="Bannière" className="h-32 md:h-40 rounded-lg shadow" />}
    </section>
  );
}
