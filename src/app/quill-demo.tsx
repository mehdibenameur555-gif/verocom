import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function QuillDemo() {
  const [value, setValue] = useState("");
  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Quill Editor تجربة</h2>
      <div className="bg-white border rounded shadow p-4">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          placeholder="اكتب هنا ..."
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image"],
              [{ align: [] }],
              ["clean"]
            ]
          }}
          style={{ minHeight: 180 }}
        />
      </div>
      <div className="mt-6">
        <h3 className="font-bold mb-2">المحتوى الناتج (HTML):</h3>
        <div className="border rounded bg-gray-50 p-3 text-xs whitespace-pre-wrap">
          {value}
        </div>
      </div>
    </div>
  );
}
