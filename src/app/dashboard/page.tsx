"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CheckCircle, ChevronRight, Package, Shirt, Home, Tag } from "lucide-react";
import { useAdminImagesStore } from "@/lib/adminImages";

type SetupStep = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  link: string;
};

export default function DashboardPage() {
  const slots = useAdminImagesStore((s) => s.slots);
  const confirmed = useAdminImagesStore((s) => s.confirmed);
  const labels = useMemo(() => ["Bloc 1", "Bloc 2"], []);

  const [steps, setSteps] = useState<SetupStep[]>([
    {
      id: 1,
      title: "Inscription réussie",
      description: "Création de votre environnement",
      completed: true,
      link: "/boutique/domain",
    },
    {
      id: 2,
      title: "Ajouter vos informations",
      description: "Logo, adresse, réseaux sociaux, livraisons.. etc",
      completed: false,
      link: "/settings/general",
    },
    {
      id: 3,
      title: "Ajouter des produits",
      description: "Ajouter un nouveau produit dans votre catalogue",
      completed: false,
      link: "/products/new",
    },
    {
      id: 4,
      title: "Personnaliser le design de votre boutique",
      description: "Ajouter des sections personnalisée à votre boutique",
      completed: false,
      link: "/boutique/theme-customize",
    },
    {
      id: 5,
      title: "Activer votre boutique en ligne",
      description: "Lier votre boutique à votre compte Facebook et Instagram",
      completed: false,
      link: "/settings/integrations",
    },
    {
      id: 6,
      title: "Ajouter votre première commande",
      description: "Ajouter une nouvelle commande pour un client sur le système",
      completed: false,
      link: "/orders",
    },
    {
      id: 7,
      title: "Ajouter votre nom de domaine",
      description: "Choisir un nom de domaine personnalisé à votre boutique",
      completed: false,
      link: "/boutique/domain",
    },
  ]);

  const completedCount = steps.filter((s) => s.completed).length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  const toggleStep = (id: number) => {
    setSteps((prev) =>
      prev.map((step) =>
        step.id === id ? { ...step, completed: !step.completed } : step
      )
    );
  };

  return (
    <div className="min-h-[60vh] space-y-8 text-base">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {labels.map((label, idx) => (
          <div
            key={label}
            className="bg-white rounded-lg overflow-hidden text-gray-600"
          >
            {slots[idx] && confirmed[idx] ? (
              slots[idx]?.startsWith("data:video") ? (
                <video
                  src={slots[idx] || ""}
                  controls
                  className="w-full h-48 md:h-56 object-cover"
                />
              ) : (
                <img
                  src={slots[idx] || ""}
                  alt={`${label} preview`}
                  className="w-full h-48 md:h-56 object-cover"
                />
              )
            ) : (
              <div className="w-full h-48 md:h-56 flex items-center justify-center text-center text-sm font-semibold text-gray-400 px-3">
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Setup Checklist */}
      <section className="bg-white rounded-lg shadow md:w-full">
        <div className="p-6 flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold text-gray-900">⚙️ Configurer ma boutique en ligne</span>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <div className="flex justify-between text-lg font-semibold text-gray-800 mb-3">
              <span>Progression</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-blue-600 h-4 rounded-full transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="space-y-3">
            {steps.map((step) => (
              <div
                key={step.id}
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center font-bold text-lg text-gray-800 bg-gray-100 rounded">
                  {step.id}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-lg font-semibold text-gray-900">{step.title}</div>
                  <div className="text-base text-gray-600 line-clamp-1">{step.description}</div>
                </div>

                {step.completed ? (
                  <CheckCircle className="w-8 h-8 text-emerald-600 flex-shrink-0" />
                ) : (
                  <Link
                    href={step.link}
                    className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 hover:bg-blue-100 transition flex-shrink-0"
                  >
                    <ChevronRight className="w-6 h-6 text-blue-600" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
