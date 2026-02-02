import { Hero } from "@/components/marketing/hero";
import { ProofStrip } from "@/components/marketing/proof-strip";
import { ServicePillars } from "@/components/marketing/service-pillars";
import { Differentiators } from "@/components/marketing/differentiators";
import { CaseStudies } from "@/components/marketing/case-study-card";
import { ProcessSteps } from "@/components/marketing/process-steps";
import { PortalTeaser } from "@/components/marketing/portal-teaser";
import { IntakeForm } from "@/components/marketing/intake-form";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <ServicePillars />
      <Differentiators />
      <CaseStudies />
      <ProcessSteps />
      <PortalTeaser />
      <IntakeForm />
    </>
  );
}
