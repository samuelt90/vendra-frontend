type ImportadoraStatusBadgeProps = {
  label: string;
};

export default function ImportadoraStatusBadge({
  label,
}: ImportadoraStatusBadgeProps) {
  return (
    <span className="rounded-full border border-[#9fb8a8]/25 bg-[#9fb8a8]/10 px-2.5 py-1 text-[10px] font-semibold text-[#9fb8a8]">
      {label}
    </span>
  );
}