import { motion } from "framer-motion";

export default function TypingIndicator({ name }) {
  const dotVariants = {
    animate: (i) => ({
      y: [0, -5, 0],
      transition: {
        repeat: Infinity,
        duration: 0.8,
        delay: i * 0.15,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <div className="flex items-end mb-2 px-4">
      <div className="bg-[#F2DEC7] text-[#6B6D43] rounded-2xl rounded-tl-sm px-4 py-2 max-w-xs text-xs italic flex items-center gap-2">
        <span className="font-medium">{name} is typing</span>
        <span className="flex items-end gap-0.5 pb-0.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              custom={i}
              variants={dotVariants}
              animate="animate"
              className="inline-block w-1.5 h-1.5 rounded-full bg-[#6B6D43]"
            />
          ))}
        </span>
      </div>
    </div>
  );
}
