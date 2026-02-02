const metrics = [
  { value: "50+", label: "Systems Deployed" },
  { value: "2.4x", label: "Avg. Performance Lift" },
  { value: "92%", label: "Client Retention" },
  { value: "100%", label: "Portal Visibility" },
];

export function ProofStrip() {
  return (
    <section className="border-y border-border/40 bg-card/30">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="text-center">
              <div className="text-3xl font-bold tabular-nums md:text-4xl">
                {metric.value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
