export default function StatCard({ label, description, children }) {
  return (
    <div className="bg-[#12141a] h-40 border border-[#222533] rounded-2xl p-5 shadow-xl flex flex-col justify-between">
      <div className="text-xs font-mono font-semibold text-gray-400 uppercase tracking-wider mb-2">
        {label}
      </div>
      {children}
      {description && (
        <p className="text-[11px] text-gray-400 font-mono mt-1">
          {description}
        </p>
      )}
    </div>
  );
}