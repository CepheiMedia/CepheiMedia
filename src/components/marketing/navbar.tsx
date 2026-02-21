"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "Agency" },
  { href: "/contact", label: "Let's Talk" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const authHref = user ? "/app" : "/login";
  const authLabel = user ? "Dashboard" : "Client Login";

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl shadow-sm"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      {/* Accent glow border */}
      {scrolled && (
        <div
          className="absolute inset-x-0 bottom-0 h-px"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.4) 20%, rgba(6,182,212,0.5) 50%, rgba(59,130,246,0.4) 80%, transparent)",
          }}
        />
      )}
      <div className="mx-auto flex h-20 max-w-[1600px] items-center px-6 lg:px-12">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/cephei-logo-transparent.png"
            alt="Cephei Media"
            width={140}
            height={40}
            className="h-16 md:h-20 w-auto"
            priority
          />
        </Link>

        {/* Desktop Nav - centered */}
        <nav className="hidden items-center gap-6 md:flex ml-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side: CTA + Client Login */}
        <div className="hidden items-center gap-2 md:flex ml-auto">
          <Link href={authHref}>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              {authLabel}
            </Button>
          </Link>
          <a href="https://calendly.com/alan-cepheimedia/30min" target="_blank" rel="noopener noreferrer">
            <Button size="sm">Book a Call</Button>
          </a>
        </div>

        {/* Mobile menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="ml-auto md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 flex flex-col">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav className="flex flex-1 flex-col items-center justify-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-xl font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 flex w-full flex-col items-center gap-3 border-t border-border pt-6">
                <Link href={authHref} onClick={() => setOpen(false)}>
                  <Button variant="ghost" className="text-muted-foreground">
                    {authLabel}
                  </Button>
                </Link>
                <a href="https://calendly.com/alan-cepheimedia/30min" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
                  <Button>Book a Call</Button>
                </a>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
