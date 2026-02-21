"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const initialMessages: Message[] = [
  {
    role: "assistant",
    content:
      "Hi! I'm your analytics assistant. I can help explain any metrics you see on your dashboard. What would you like to know?",
  },
];

// Simple responses based on keywords
function getResponse(question: string): string {
  const q = question.toLowerCase();

  if (q.includes("roas") || q.includes("return on ad spend")) {
    return "ROAS (Return on Ad Spend) measures revenue generated per dollar spent on advertising. Your current ROAS of 4.1x means for every $1 spent on ads, you're generating $4.10 in revenue. Industry average is around 2.5-3x, so you're performing excellently!";
  }

  if (q.includes("cpl") || q.includes("cost per lead")) {
    return "CPL (Cost Per Lead) is the average cost to acquire one lead through your campaigns. Your current CPL of $21.54 is excellent! It's calculated by dividing total ad spend by number of leads. We've generated 143 leads over 2 months at this rate.";
  }

  if (q.includes("impressions")) {
    return "Impressions represent how many times your ads were displayed to users. High impressions with low clicks might indicate we need to refresh creative or adjust targeting.";
  }

  if (q.includes("clicks") || q.includes("ctr")) {
    return "CTR (Click-Through Rate) measures engagement with your ads. It's calculated as clicks divided by impressions. Your CTR helps us understand how compelling your ad creative is to your target audience.";
  }

  if (q.includes("conversion")) {
    return "Conversions track when someone completes a desired action - like filling out a form or making a purchase. Your conversion rate shows what percentage of visitors take that action.";
  }

  if (q.includes("spend") || q.includes("budget")) {
    return "Your monthly ad spend is the total amount invested in paid advertising across all platforms. This is separate from your management fee and goes directly to ad platforms like Meta and Google.";
  }

  if (q.includes("campaign")) {
    return "Your campaigns are organized by objective and platform. Active campaigns are currently running and spending budget. Paused campaigns are on hold but can be reactivated. Check the Campaigns page for detailed performance breakdowns.";
  }

  if (q.includes("deliverable")) {
    return "Deliverables are assets and reports created for your account - including creative designs, performance reports, and strategy documents. Visit the Deliverables page to download or view them.";
  }

  if (q.includes("projection") || q.includes("forecast")) {
    return "Projections are estimates based on your current performance and industry benchmarks. They help you plan budgets and set expectations. Visit ROI & Projections for detailed forecasting.";
  }

  return "I can help explain metrics like ROAS, CPL, CTR, conversions, ad spend, campaigns, deliverables, and projections. What specific metric or section would you like me to explain?";
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = getResponse(input);
      const assistantMessage: Message = { role: "assistant", content: response };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 animate-pulse hover:animate-none"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 left-4 z-50 flex h-[70dvh] max-h-[500px] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl sm:left-auto sm:w-[380px]">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-border bg-card px-4 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Analytics Assistant</h3>
              <p className="text-xs text-muted-foreground">
                Ask about your metrics
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, i) => (
              <div
                key={i}
                className={`flex gap-3 ${
                  message.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {message.role === "user" ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </div>
                <div
                  className={`max-w-[260px] rounded-2xl px-4 py-2.5 text-sm ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="rounded-2xl bg-muted px-4 py-2.5">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:0.1s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:0.2s]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about your metrics..."
                className="flex-1 rounded-xl border border-border bg-muted/50 px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <Button
                onClick={handleSend}
                size="icon"
                className="h-10 w-10 rounded-xl"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
