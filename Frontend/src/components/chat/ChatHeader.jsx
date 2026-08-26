import { FiArrowLeft, FiMoreVertical } from "react-icons/fi";
import OnlineStatus from "./OnlineStatus";

export default function ChatHeader({
  isOnline,
  lastSeen,
  onBack,
  title = "Elegant Eats",
  subtitle,
}) {
  return (
    <div className="flex items-center justify-between bg-[#6B6D43] text-white h-16 sm:h-20 px-4 sm:px-6 flex-shrink-0">
      {/* Left: back + avatar + info */}
      <div className="flex items-center gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className="text-white/80 hover:text-white transition mr-1"
            aria-label="Go back"
          >
            <FiArrowLeft className="w-5 h-5" />
          </button>
        )}

        {/* Avatar circle */}
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#99B4AA] flex items-center justify-center text-xl select-none">
          👩‍🍳
        </div>

        {/* Title + status */}
        <div className="flex flex-col">
          <span className="font-bold text-sm sm:text-base leading-tight">
            {title}
          </span>
          <span className="mt-0.5">
            {subtitle ?? <OnlineStatus isOnline={isOnline} lastSeen={lastSeen} />}
          </span>
        </div>
      </div>

      {/* Right: more icon */}
      <button
        className="text-white/70 hover:text-white transition"
        aria-label="More options"
      >
        <FiMoreVertical className="w-5 h-5" />
      </button>
    </div>
  );
}
