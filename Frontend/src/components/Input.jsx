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
      bg-[#FDF4D2]/60
      border
      border-gray-200
      focus:border-[#A290B7]
      focus:outline-none
      text-[#946D6D]
      placeholder-gray-400
      transition
      "
    />
  );
}