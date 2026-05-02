export function XPBadge({ amount }: { amount: number | string }) {
  return (
    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/20">
      +{amount} XP
    </div>
  );
}