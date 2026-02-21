import { DemoSidebar } from "@/components/portal/demo-sidebar";
import { AIChatbot } from "@/components/portal/ai-chatbot";

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex h-screen">
        <DemoSidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
        </main>
      </div>
      <AIChatbot />
    </>
  );
}
