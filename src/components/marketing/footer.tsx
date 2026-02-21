import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  services: [
    { href: "/services/dtm", label: "DTM — Growth Marketing" },
    { href: "/services/ddm", label: "DDM — Brand & Design" },
    { href: "/services/dpm", label: "DPM — Artist Growth" },
    { href: "/services", label: "All Services" },
  ],
  company: [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  portal: [
    { href: "/login", label: "Client Login" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="mx-auto max-w-[1600px] px-6 py-16 lg:px-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/">
              <Image
                src="/images/cephei-logo.png"
                alt="Cephei Media"
                width={120}
                height={34}
                className="h-8 w-auto"
              />
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Analytics-first growth partner. Performance marketing and premium
              design, backed by full visibility.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-3 text-sm font-semibold">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-3 text-sm font-semibold">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Portal */}
          <div>
            <h4 className="mb-3 text-sm font-semibold">Portal</h4>
            <ul className="space-y-2">
              {footerLinks.portal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-border/40" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Cephei Media. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="mailto:alan@cepheimedia.com"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              alan@cepheimedia.com
            </a>
            {/* Instagram Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/cepheimedia"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-pink-400"
                title="@cepheimedia"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                <span>@cepheimedia</span>
              </a>
              <a
                href="https://www.instagram.com/cepheimediapromotions"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-pink-400"
                title="@cepheimediapromotions"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                <span>@cepheimediapromotions</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
