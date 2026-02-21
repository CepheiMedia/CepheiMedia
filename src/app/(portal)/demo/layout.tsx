import { DemoShell } from "@/components/portal/demo-shell";
import { AIChatbot } from "@/components/portal/ai-chatbot";

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DemoShell>{children}</DemoShell>
      <AIChatbot />
    </>
  );
}
