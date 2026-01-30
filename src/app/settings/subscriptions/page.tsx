"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { useLocaleStore } from "@/lib/locale";


export default function SubscriptionsPage() {
  const { locale } = useLocaleStore();
  const isRTL = locale === "ar";
  const textAlign = isRTL ? "text-right" : "text-left";

  const [currentPlan, setCurrentPlan] = useState("starter");
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      id: "starter",
      name: "Starter",
      monthlyPrice: "29",
      annualPrice: "278",
      currency: "TND",
      description: "Parfait pour les petites boutiques",
      features: [
        { name: "Jusqu'à 100 produits", included: true },
        { name: "Gestion des commandes", included: true },
        { name: "Rapport de base", included: true },
        { name: "Support par email", included: true },
        { name: "Intégrations avancées", included: false },
        { name: "API personnalisée", included: false },
        { name: "Compte administrateur illimité", included: false },
        { name: "Support prioritaire", included: false },
      ],
    },
    {
      id: "professional",
      name: "Professional",
      monthlyPrice: "79",
      annualPrice: "758",
      currency: "TND",
      description: "Pour les boutiques en croissance",
      features: [
        { name: "Jusqu'à 1000 produits", included: true },
        { name: "Gestion des commandes", included: true },
        { name: "Rapport avancée", included: true },
        { name: "Support par email et chat", included: true },
        { name: "Intégrations avancées", included: true },
        { name: "API personnalisée", included: false },
        { name: "Compte administrateur illimité", included: false },
        { name: "Support prioritaire", included: false },
      ],
    },
    {
      id: "premium",
      name: "Premium",
      monthlyPrice: "199",
      annualPrice: "1912",
      currency: "TND",
      description: "Pour les grandes entreprises",
      features: [
        { name: "Produits illimités", included: true },
        { name: "Gestion des commandes", included: true },
        { name: "Rapport en temps réel", included: true },
        { name: "Support 24/7", included: true },
        { name: "Intégrations avancées", included: true },
        { name: "API personnalisée", included: true },
        { name: "Compte administrateur illimité", included: true },
        { name: "Support prioritaire", included: true },
      ],
    },
  ];

  return (
    <div className="space-y-8 text-base">
      {/* Header */}
      <div>
        <h1 className="text-5xl font-bold text-gray-900">Plans et tarification</h1>
        <p className="text-gray-600 mt-2 text-lg">Choisissez le plan qui convient le mieux à votre boutique</p>
      </div>

      {/* Billing Toggle */}
      <div className="flex items-center justify-center gap-4">
        <span className={`text-base font-medium ${!isAnnual ? "text-gray-900" : "text-gray-500"}`}>Facturation mensuelle</span>

        <span className={`text-base font-medium ${isAnnual ? "text-gray-900" : "text-gray-500"}`}>Facturation annuelle (20% de réduction)</span>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isActive = currentPlan === plan.id;
          const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
          const billing = isAnnual ? "par an" : "par mois";

          return (
            <div
              key={plan.id}
              className={`relative rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105 ${
                isActive ? "ring-2 ring-blue-600" : ""
              }`}
            >
              {/* Badge */}
              {isActive && (
                <div className="bg-blue-100 text-blue-700 px-4 py-2 text-center text-sm font-semibold rounded-b-lg">
                  Plan: {plan.name}
                </div>
              )}

              {/* Plan Content */}
              <div className="bg-white p-6 space-y-6">
                {/* Plan Name */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{plan.name}</h2>
                  <p className="text-sm text-gray-500 mt-1">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="border-y border-gray-200 py-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-gray-900">{price}</span>
                    <span className="text-gray-600">{plan.currency}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{billing}</p>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => setCurrentPlan(plan.id)}
                  disabled={isActive}
                  className={`w-full py-2 rounded-lg font-semibold transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white hover:bg-blue-700 cursor-default"
                      : "border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:bg-gray-50"
                  }`}
                >
                  {isActive ? "Plan actuel" : "Choisir ce plan"}
                </button>

                {/* Features List */}
                <div className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={`text-sm ${feature.included ? "text-gray-900 font-medium" : "text-gray-400"}`}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* FAQ Section */}
      <div className="mt-12 bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Questions fréquemment posées</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Puis-je changer de plan à tout moment?</h3>
            <p className="text-gray-600">Oui, vous pouvez upgrader ou downgrade votre plan à tout moment. Les changements prendront effet immédiatement.</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Qu'est-ce qui est inclus dans le support?</h3>
            <p className="text-gray-600">Le support par email est inclus dans tous les plans. Les plans Professional et Premium incluent également le support par chat et téléphone.</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Y a-t-il une période d'essai gratuite?</h3>
            <p className="text-gray-600">Oui, vous pouvez essayer n'importe quel plan gratuitement pendant 14 jours. Aucune carte de crédit requise.</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Que se passe-t-il si j'annule mon abonnement?</h3>
            <p className="text-gray-600">Vous pouvez annuler à tout moment. Vos données resteront accessibles pendant 30 jours avant suppression.</p>
          </div>
        </div>
      </div>

      {/* Current Plan Details */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-bold text-gray-900 mb-4">Détails de votre abonnement actuel</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Plan actuel</p>
            <p className="text-lg font-bold text-gray-900 capitalize">{plans.find(p => p.id === currentPlan)?.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Prochaine facturation</p>
            <p className="text-lg font-bold text-gray-900">25 février 2026</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Montant{isAnnual ? " annuel" : " mensuel"}</p>
            <p className="text-lg font-bold text-gray-900">{isAnnual ? plans.find(p => p.id === currentPlan)?.annualPrice : plans.find(p => p.id === currentPlan)?.monthlyPrice} TND</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Statut</p>
            <p className="text-lg font-bold text-green-600">Actif</p>
          </div>
        </div>
        <button className="mt-4 text-blue-600 hover:text-blue-700 font-semibold text-sm">
          Gérer l'abonnement →
        </button>
      </div>
    </div>
  );
}
