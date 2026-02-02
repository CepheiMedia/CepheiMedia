import { IntakeForm } from "@/components/marketing/intake-form";

export default function ContactPage() {
  return (
    <div>
      <div className="mx-auto max-w-7xl px-6 pt-24">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Let&apos;s Talk
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Tell us about your business and goals. We&apos;ll put together a
            plan and get back to you within 24 hours.
          </p>
        </div>
      </div>
      <IntakeForm />
    </div>
  );
}
