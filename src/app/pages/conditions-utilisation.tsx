import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ConditionsUtilisation() {
  const [content, setContent] = useState<string>("Conditions d'utilisation");
  const router = useRouter();

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("conditions-utilisation-content") : null;
    if (saved) {
      setTimeout(() => setContent(saved), 0);
    }
  }, []);

  return (
    <div className="prose max-w-none">
      <button
        className="mb-4 px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
        onClick={() => router.push("/pages/conditions-utilisation-edit")}
      >
        تعديل الصفحة
      </button>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}