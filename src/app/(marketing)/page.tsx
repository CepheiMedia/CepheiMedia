import { Hero } from "@/components/marketing/hero";
import { ProofStrip } from "@/components/marketing/proof-strip";
import { BrandArchitecture } from "@/components/marketing/brand-architecture";
import { Differentiators } from "@/components/marketing/differentiators";
import { PortalTeaser } from "@/components/marketing/portal-teaser";
import { IntakeForm } from "@/components/marketing/intake-form";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandArchitecture />
      <ProofStrip />
      <Differentiators />
      <PortalTeaser />
      <IntakeForm />
    </>
  );
}
