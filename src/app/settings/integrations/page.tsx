"use client";

import { useState } from "react";
import {
  Zap,
  Link2,
  BarChart3,
  Mail,
  MessageCircle,
  Grid3x3,
  BookOpen,
  Shield,
  CheckCircle,
  X,
  ExternalLink,
  Eye,
  EyeOff,
} from "lucide-react";


interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  bgColor: string;
  connected: boolean;
  fields?: { id: string; label: string; type: "text" | "password"; placeholder: string }[];
  docsUrl?: string;
}

const integrations: Integration[] = [
  {
    id: "google-sheets",
    name: "Google Sheets",
    description: "Synchronisez vos commandes et clients avec Google Sheets",
    icon: Grid3x3,
    color: "text-green-600",
    bgColor: "bg-green-50",
    connected: false,
    fields: [
      {
        id: "sheet-id",
        label: "Google Sheet ID",
        type: "text",
        placeholder: "Entrez l'ID de votre feuille (ex: 1BxiMVs0XRA5nFMoon9PNkToQefjFjrKv)",
      },
      {
        id: "sheet-email",
        label: "Email associé",
        type: "text",
        placeholder: "Entrez votre email Google",
      },
    ],
    docsUrl: "https://developers.google.com/sheets/api",
  },
  {
    id: "facebook-pixel",
    name: "Facebook Pixel",
    description: "Suivez les conversions et optimisez vos publicités",
    icon: BarChart3,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    connected: false,
    fields: [
      {
        id: "pixel-id",
        label: "Facebook Pixel ID",
        type: "text",
        placeholder: "Entrez votre Pixel ID (ex: 123456789)",
      },
      {
        id: "access-token",
        label: "Access Token",
        type: "password",
        placeholder: "Entrez votre Access Token",
      },
    ],
    docsUrl: "https://developers.facebook.com/docs/facebook-pixel",
  },
  {
    id: "email-smtp",
    name: "Email SMTP",
    description: "Envoyez des e-mails transactionnels à vos clients",
    icon: Mail,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    connected: false,
    fields: [
      {
        id: "smtp-server",
        label: "Serveur SMTP",
        type: "text",
        placeholder: "Ex: smtp.gmail.com",
      },
      {
        id: "smtp-port",
        label: "Port",
        type: "text",
        placeholder: "Ex: 587 ou 465",
      },
      {
        id: "email",
        label: "Email",
        type: "text",
        placeholder: "Votre adresse email",
      },
      {
        id: "smtp-password",
        label: "Mot de passe",
        type: "password",
        placeholder: "Votre mot de passe ou App Password",
      },
    ],
    docsUrl: "https://support.google.com/mail/answer/185833",
  },
  {
    id: "google-analytics",
    name: "Google Analytics",
    description: "Suivez le comportement des visiteurs et les conversions",
    icon: BarChart3,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    connected: false,
    fields: [
      {
        id: "ga-id",
        label: "Google Analytics ID (GA4)",
        type: "text",
        placeholder: "Entrez votre ID (ex: G-XXXXXXXXXX)",
      },
      {
        id: "ga-email",
        label: "Email Google",
        type: "text",
        placeholder: "Votre email Google",
      },
    ],
    docsUrl: "https://support.google.com/analytics/answer/1008080",
  },
  {
    id: "whatsapp-business",
    name: "WhatsApp Business",
    description: "Envoyez des notifications de commande via WhatsApp",
    icon: MessageCircle,
    color: "text-green-600",
    bgColor: "bg-green-50",
    connected: false,
    fields: [
      {
        id: "whatsapp-phone",
        label: "Numéro de téléphone",
        type: "text",
        placeholder: "Ex: +216 55 400 120",
      },
      {
        id: "whatsapp-token",
        label: "API Access Token",
        type: "password",
        placeholder: "Entrez votre Access Token WhatsApp",
      },
      {
        id: "whatsapp-business-id",
        label: "Business Account ID",
        type: "text",
        placeholder: "Entrez votre Business Account ID",
      },
    ],
    docsUrl: "https://www.whatsapp.com/business/api",
  },
  {
    id: "zapier",
    name: "Zapier",
    description: "Connectez-vous avec plus de 5000 applications via Zapier",
    icon: Zap,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    connected: false,
    fields: [
      {
        id: "zapier-key",
        label: "Zapier API Key",
        type: "password",
        placeholder: "Entrez votre clé API Zapier",
      },
      {
        id: "zapier-webhook",
        label: "Webhook URL",
        type: "text",
        placeholder: "Entrez l'URL du webhook Zapier",
      },
    ],
    docsUrl: "https://zapier.com/help/create/basics/learn-key-concepts-in-zapier",
  },
];

export default function IntegrationsPage() {
  const [integrationsList, setIntegrationsList] = useState(integrations);
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});

  const connectedCount = integrationsList.filter((i) => i.connected).length;
  const totalCount = integrationsList.length;

  const currentIntegration = integrationsList.find(
    (i) => i.id === selectedIntegration
  );

  const handleInputChange = (fieldId: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const handleConnect = (id: string) => {
    const integration = integrationsList.find((i) => i.id === id);
    if (integration?.fields) {
      setSelectedIntegration(id);
      setFormData({});
    } else {
      toggleIntegration(id);
    }
  };

  const handleSaveIntegration = () => {
    if (selectedIntegration) {
      setIntegrationsList((prev) =>
        prev.map((integration) =>
          integration.id === selectedIntegration
            ? { ...integration, connected: true }
            : integration
        )
      );
      setSelectedIntegration(null);
      setFormData({});
    }
  };

  const toggleIntegration = (id: string) => {
    setIntegrationsList((prev) =>
      prev.map((integration) =>
        integration.id === id
          ? { ...integration, connected: !integration.connected }
          : integration
      )
    );
  };

  const togglePasswordVisibility = (fieldId: string) => {
    setShowPassword((prev) => ({
      ...prev,
      [fieldId]: !prev[fieldId],
    }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-100 rounded-lg">
            <Zap className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h1 className="text-5xl font-bold text-gray-900">Intégrations</h1>
            <p className="text-gray-600">
              Connectez votre boutique avec des services et applications externes
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold text-green-600">
          <CheckCircle className="w-5 h-5" />
          {connectedCount} Connecté{connectedCount !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Stats Card */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-4 text-white">
        <div className="flex items-center gap-3 mb-3">
          <Link2 className="w-7 h-7" />
          <div>
            <h2 className="text-base font-bold">Intégrations</h2>
            <p className="text-blue-100 text-sm">
              {connectedCount} / {totalCount} Connecté
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-blue-100 text-xs">Total des factures</p>
            <p className="text-xl font-bold">{totalCount}</p>
          </div>
          <div>
            <p className="text-blue-100 text-xs">Actif</p>
            <p className="text-xl font-bold">{connectedCount}</p>
          </div>
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Zap className="w-6 h-6 text-orange-500" />
          <h2 className="text-2xl font-bold text-gray-900">Intégrations</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrationsList.map((integration) => {
            const Icon = integration.icon;
            return (
              <div
                key={integration.id}
                className={`rounded-lg border-2 p-6 transition-all ${
                  integration.connected
                    ? "border-blue-200 bg-blue-50"
                    : `border-gray-200 ${integration.bgColor}`
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Icon className={`w-8 h-8 ${integration.color}`} />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">
                      {integration.name}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                  {integration.description}
                </p>

                <button
                  onClick={() => handleConnect(integration.id)}
                  className="w-full py-2 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all flex items-center justify-center gap-2"
                >


                  {integration.connected ? "Connecté" : "Connecter"}
                </button>

                {integration.connected && (
                  <div className="mt-3 flex items-center gap-2 text-green-600 text-sm font-semibold">
                    <CheckCircle className="w-4 h-4" />
                    Connecté
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Documentation Section */}
      <div className="border-t pt-8">
        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-gray-900 mb-1">Documentation</h3>
            <p className="text-sm text-gray-600 mb-2">
              Entrez l'ID de votre feuille de calcul Google. Vous pouvez le trouver dans l'URL de votre feuille de calcul.
            </p>
            <a
              href="#"
              className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
            >
              Voir la documentation →
            </a>
          </div>
        </div>
      </div>

      {/* Integration Modal */}
      {selectedIntegration && currentIntegration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                {currentIntegration.icon && (
                  <currentIntegration.icon className={`w-6 h-6 ${currentIntegration.color}`} />
                )}
                <h2 className="text-xl font-bold text-gray-900">
                  {currentIntegration.name}
                </h2>
              </div>
              <button
                onClick={() => setSelectedIntegration(null)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Form Fields */}
              {currentIntegration.fields?.map((field) => (
                <div key={field.id}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {field.label}
                  </label>
                  <div className="relative">
                    <input
                      type={
                        field.type === "password"
                          ? showPassword[field.id]
                            ? "text"
                            : "password"
                          : field.type
                      }
                      placeholder={field.placeholder}
                      value={formData[field.id] || ""}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                    {field.type === "password" && (
                      <button
                        onClick={() => togglePasswordVisibility(field.id)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword[field.id] ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {/* Documentation Link */}
              {currentIntegration.docsUrl && (
                <a
                  href={currentIntegration.docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-semibold"
                >
                  <ExternalLink className="w-4 h-4" />
                  Voir la documentation
                </a>
              )}

              {/* Meta-specific info for Facebook Pixel */}
              {selectedIntegration === "facebook-pixel" && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                  <h4 className="font-semibold text-gray-900">Comment obtenir vos identifiants ?</h4>
                  <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
                    <li>Accédez à <a href="https://www.facebook.com/business" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Facebook Business</a></li>
                    <li>Allez dans "Évènements" &gt; "Data Sources"</li>
                    <li>Copiez votre Pixel ID</li>
                    <li>Générez un Access Token dans vos paramètres d'application</li>
                  </ol>
                </div>
              )}

              {/* Google Sheets info */}
              {selectedIntegration === "google-sheets" && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-2">
                  <h4 className="font-semibold text-gray-900">Comment obtenir votre Sheet ID ?</h4>
                  <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
                    <li>Créez un <a href="https://sheets.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Sheet</a></li>
                    <li>L'ID se trouve dans l'URL entre /d/ et /edit</li>
                    <li>Partagez le sheet avec votre email de service Google</li>
                  </ol>
                </div>
              )}

              {/* Email SMTP info */}
              {selectedIntegration === "email-smtp" && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 space-y-2">
                  <h4 className="font-semibold text-gray-900">Paramètres SMTP courants</h4>
                  <div className="text-sm text-gray-700 space-y-2">
                    <p><strong>Gmail :</strong> smtp.gmail.com:587</p>
                    <p><strong>Outlook :</strong> smtp-mail.outlook.com:587</p>
                    <p><strong>Note :</strong> Utilisez un App Password pour Gmail plutôt que votre mot de passe principal</p>
                  </div>
                </div>
              )}

              {/* Google Analytics info */}
              {selectedIntegration === "google-analytics" && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 space-y-2">
                  <h4 className="font-semibold text-gray-900">Comment obtenir votre ID GA4 ?</h4>
                  <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
                    <li>Accédez à <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Analytics</a></li>
                    <li>Sélectionnez votre propriété GA4</li>
                    <li>L'ID commence par "G-"</li>
                  </ol>
                </div>
              )}

              {/* WhatsApp Business info */}
              {selectedIntegration === "whatsapp-business" && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-2">
                  <h4 className="font-semibold text-gray-900">Comment obtenir vos identifiants WhatsApp ?</h4>
                  <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
                    <li>Accédez à <a href="https://www.facebook.com/business/tools/whatsapp-business-api" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">WhatsApp Business API</a></li>
                    <li>Générez un Access Token depuis votre compte Business</li>
                    <li>Copiez votre Business Account ID</li>
                  </ol>
                </div>
              )}

              {/* Zapier info */}
              {selectedIntegration === "zapier" && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 space-y-2">
                  <h4 className="font-semibold text-gray-900">Comment obtenir votre API Key Zapier ?</h4>
                  <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
                    <li>Accédez à <a href="https://zapier.com/app/dashboard" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Zapier Dashboard</a></li>
                    <li>Allez dans "Settings" &gt; "API"</li>
                    <li>Générez une nouvelle clé API</li>
                  </ol>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setSelectedIntegration(null)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleSaveIntegration}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg font-semibold text-white hover:from-blue-700 hover:to-blue-800 transition-all"
              >
                Connecter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}