export function StatPill({ icon, text }: { icon: React.ReactNode | string; text: string }) {
  return (
    <div className="flex items-center gap-2 bg-[rgba(255,255,255,0.05)] px-4 py-2 rounded-full border border-[rgba(255,255,255,0.05)] shadow-sm">
      {typeof icon === "string" ? (
        <span className="text-base">{icon}</span>
      ) : icon}
      <span className="text-white text-sm font-semibold tracking-wide">{text}</span>
    </div>
  );
}