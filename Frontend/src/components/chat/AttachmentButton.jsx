import { useRef, useState } from "react";
import { FiPaperclip } from "react-icons/fi";

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

export default function AttachmentButton({ onFileSelect }) {
  const inputRef = useRef(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setError("");
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > MAX_SIZE_BYTES) {
      setError("File too large. Max 5MB.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      onFileSelect({ dataUrl: reader.result, type: file.type });
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="text-[#946D6D] hover:text-[#CF7D65] transition p-1"
        title="Attach image"
      >
        <FiPaperclip className="w-5 h-5" />
      </button>
      {error && (
        <div className="absolute bottom-8 left-0 bg-rose-50 border border-rose-200 text-rose-600 text-xs rounded-xl px-3 py-1.5 whitespace-nowrap z-10">
          {error}
        </div>
      )}
    </div>
  );
}
