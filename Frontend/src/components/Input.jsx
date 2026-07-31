export default function Input({ placeholder, type }) {

  return (
    <input
      type={type}
      placeholder={placeholder}
      className="
      w-full
      px-5
      py-3
      rounded-xl
      bg-[#FBEFEF]
      border
      border-transparent
      focus:border-[#C5B3D3]
      focus:outline-none
      text-[#5A4055]
      placeholder-gray-400
      transition
      "
    />
  );
}