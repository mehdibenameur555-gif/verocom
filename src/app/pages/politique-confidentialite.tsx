import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PolitiqueConfidentialite() {
  const [content, setContent] = useState<string>("Politique de Confidentialité");
  const router = useRouter();

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("politique-confidentialite-content") : null;
    if (saved) {
      setTimeout(() => setContent(saved), 0);
    }
  }, []);

  return (
    <div className="prose max-w-none">
      <button
        className="mb-4 px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
        onClick={() => router.push("/pages/politique-confidentialite-edit")}
      >
        تعديل الصفحة
      </button>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}