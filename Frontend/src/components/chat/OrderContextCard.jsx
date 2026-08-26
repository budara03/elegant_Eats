import { Link } from "react-router-dom";

const STATUS_COLORS = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-green-100 text-green-700",
  processing: "bg-blue-100 text-blue-700",
  delivered: "bg-[#99B4AA]/30 text-[#6B6D43]",
  cancelled: "bg-rose-100 text-rose-700",
};

export default function OrderContextCard({ order }) {
  if (!order) return null;

  const { id, name, price, status } = order;
  const statusClass =
    STATUS_COLORS[status?.toLowerCase()] || "bg-gray-100 text-gray-600";

  return (
    <div className="bg-[#FDF4D2] border border-[#E1B8A2] rounded-2xl p-3 mx-4 mt-3 flex-shrink-0">
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="text-xs font-bold text-[#6B6D43] truncate">
            Order #{id ? `EMC-${id}` : "—"}
          </span>
          <span className="text-xs text-[#946D6D] truncate">{name}</span>
          {price !== undefined && (
            <span className="text-xs font-semibold text-[#6B6D43]">
              Rs. {Number(price).toLocaleString("en-PK")}
            </span>
          )}
        </div>
        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
          <span className={`text-xs font-semibold rounded-full px-2 py-0.5 ${statusClass}`}>
            {status || "—"}
          </span>
          {id && (
            <Link
              to={`/orders/${id}`}
              className="text-xs text-[#CF7D65] hover:underline font-medium"
            >
              View Order →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
