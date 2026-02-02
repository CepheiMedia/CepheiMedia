"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";

const budgetOptions = [
  { value: "starter", label: "Starter", range: "Under $3K/mo" },
  { value: "growth", label: "Growth", range: "$3K – $10K/mo" },
  { value: "scale", label: "Scale", range: "$10K+/mo" },
];

const serviceOptions = [
  { value: "dtm", label: "DTM — Growth Marketing" },
  { value: "ddm", label: "DDM — Brand & Design" },
  { value: "both", label: "Both DTM + DDM" },
];

export function IntakeForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    services: "",
    budget: "",
    details: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const totalSteps = 4;

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const next = () => setStep((s) => Math.min(s + 1, totalSteps));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = () => {
    // Will be wired to Server Action in Phase 0C
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="contact-form" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card">
            <Check className="h-5 w-5" />
          </div>
          <h2 className="mt-4 text-2xl font-semibold">We&apos;ll be in touch.</h2>
          <p className="mt-2 text-muted-foreground">
            Thanks for reaching out. We&apos;ll review your info and get back to
            you within 24 hours.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact-form" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mx-auto max-w-lg">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Let&apos;s Talk
          </h2>
          <p className="mt-3 text-muted-foreground">
            Tell us about your project and we&apos;ll build a plan.
          </p>
        </div>

        {/* Progress bar */}
        <div className="mt-8 flex gap-1">
          {Array.from({ length: totalSteps + 1 }).map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i <= step ? "bg-foreground" : "bg-muted"
              }`}
            />
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-border/60 bg-card/50 p-8">
          {/* Step 0: Contact Info */}
          {step === 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold">Contact Information</h3>
              <input
                type="text"
                placeholder="Full name"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <input
                type="tel"
                placeholder="Phone (optional)"
                value={formData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <input
                type="text"
                placeholder="Company"
                value={formData.company}
                onChange={(e) => updateField("company", e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
          )}

          {/* Step 1: Services */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-semibold">What services do you need?</h3>
              <div className="space-y-2">
                {serviceOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => updateField("services", opt.value)}
                    className={`w-full rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
                      formData.services === opt.value
                        ? "border-foreground bg-foreground/5"
                        : "border-border bg-background hover:border-muted-foreground"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Budget */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-semibold">Monthly budget range</h3>
              <div className="space-y-2">
                {budgetOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => updateField("budget", opt.value)}
                    className={`w-full rounded-lg border px-4 py-3 text-left transition-colors ${
                      formData.budget === opt.value
                        ? "border-foreground bg-foreground/5"
                        : "border-border bg-background hover:border-muted-foreground"
                    }`}
                  >
                    <div className="text-sm font-medium">{opt.label}</div>
                    <div className="text-xs text-muted-foreground">
                      {opt.range}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Goals */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-semibold">Goals & timeline</h3>
              <textarea
                placeholder="What are you trying to achieve? Any timeline or constraints?"
                value={formData.details}
                onChange={(e) => updateField("details", e.target.value)}
                rows={5}
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="font-semibold">Review & Submit</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Name:</span>{" "}
                  {formData.name || "—"}
                </div>
                <div>
                  <span className="text-muted-foreground">Email:</span>{" "}
                  {formData.email || "—"}
                </div>
                <div>
                  <span className="text-muted-foreground">Company:</span>{" "}
                  {formData.company || "—"}
                </div>
                <div>
                  <span className="text-muted-foreground">Services:</span>{" "}
                  {serviceOptions.find((o) => o.value === formData.services)
                    ?.label || "—"}
                </div>
                <div>
                  <span className="text-muted-foreground">Budget:</span>{" "}
                  {budgetOptions.find((o) => o.value === formData.budget)
                    ?.label || "—"}
                </div>
                {formData.details && (
                  <div>
                    <span className="text-muted-foreground">Details:</span>{" "}
                    {formData.details}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-6 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={prev}
              disabled={step === 0}
              className="gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            {step < totalSteps ? (
              <Button onClick={next} className="gap-1">
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="gap-1">
                Submit
                <Check className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
