export default function OnlineStatus({ isOnline, lastSeen }) {
  const formatLastSeen = (timestamp) => {
    if (!timestamp) return "";
    const now = new Date();
    const seen = new Date(timestamp);
    const diffMs = now - seen;
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  if (isOnline) {
    return (
      <span className="flex items-center gap-1 text-xs text-green-600">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
        Online
      </span>
    );
  }

  if (lastSeen) {
    return (
      <span className="text-xs text-[#946D6D]">
        Last seen {formatLastSeen(lastSeen)}
      </span>
    );
  }

  return (
    <span className="flex items-center gap-1 text-xs text-gray-400">
      <span className="inline-flex rounded-full h-2 w-2 bg-gray-300" />
      Offline
    </span>
  );
}
