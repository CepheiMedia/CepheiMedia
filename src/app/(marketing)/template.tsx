"use client";

export default function MarketingTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="animate-in fade-in duration-500 ease-out">
      {children}
    </div>
  );
}
