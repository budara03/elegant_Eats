import React, { useRef, useState } from "react";
import { FiUploadCloud, FiImage, FiTrash2, FiCheck } from "react-icons/fi";

export default function ImageUpload({ image, onImageChange }) {
  const fileInputRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setErrorMsg("");

    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      setErrorMsg("Please upload a valid JPG, PNG, or WebP image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg("Image size exceeds 5MB limit. Please choose a smaller photo.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      onImageChange(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    onImageChange(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-3">
      <div>
        <label className="text-sm font-bold text-[#6B6D43] flex items-center gap-1.5">
          <FiImage className="w-4 h-4 text-[#CF7D65]" />
          Upload Inspiration Image (Optional)
        </label>
        <p className="text-[11px] text-gray-500 mt-0.5">
          Have a Pinterest or Instagram reference? Share it with our cake designers.
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {!image ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-[#E1B8A2] hover:border-[#CF7D65] rounded-2xl p-6 text-center bg-[#FDF4D2]/20 hover:bg-[#FDF4D2]/40 transition cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-full bg-[#F2DEC7] text-[#CF7D65] flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition">
            <FiUploadCloud className="w-6 h-6" />
          </div>
          <p className="text-xs font-bold text-[#6B6D43]">
            Click to upload your dream cake reference
          </p>
          <span className="text-[10px] text-gray-400 block mt-1">
            JPG, PNG, or WebP up to 5MB
          </span>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-[#FDF4D2]/40 border border-[#946D6D]/15 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={image}
              alt="Inspiration reference"
              className="w-14 h-14 rounded-xl object-cover shadow-sm border border-white"
            />
            <div>
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                <FiCheck className="w-3.5 h-3.5 stroke-[3]" />
                Inspiration Attached
              </span>
              <span className="text-[10px] text-gray-500 block">
                Reference photo will be shared with the head chef
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRemove}
            className="p-2.5 rounded-xl text-rose-500 hover:bg-rose-50 transition border border-rose-200 cursor-pointer"
            title="Remove Image"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      )}

      {errorMsg && (
        <p className="text-xs text-rose-600 font-semibold">{errorMsg}</p>
      )}
    </div>
  );
}
