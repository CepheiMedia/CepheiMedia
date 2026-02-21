"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Palette,
  PenTool,
  Globe,
  Camera,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";

const services = [
  {
    icon: Palette,
    title: "Branding Systems",
    desc: "Complete brand identity design — logo, typography, color systems, brand guidelines, and asset libraries built for consistency at scale.",
  },
  {
    icon: Camera,
    title: "Social & Content Design",
    desc: "Templated content systems for social media, email, and marketing collateral that maintain brand consistency while enabling rapid production.",
  },
  {
    icon: Globe,
    title: "Web Design & Landing Pages",
    desc: "Conversion-optimized web design and landing pages that align brand aesthetics with performance marketing goals.",
  },
  {
    icon: PenTool,
    title: "Creative Direction",
    desc: "Strategic creative oversight across campaigns, content, and brand touchpoints — ensuring everything looks and feels cohesive.",
  },
];

const deliverables = [
  "Brand identity & guidelines",
  "Logo suite & variations",
  "Social media template systems",
  "Web design & development",
  "Landing page design",
  "Content design systems",
  "Creative direction & art direction",
  "Video & photo production",
];

// All Portfolio Projects
const portfolioProjects = [
  {
    id: "scalla",
    client: "The Scalla",
    handle: "@TheScalla",
    category: "Content + Social",
    partner: "hausofbh",
    description: "Full content creation and social media management package including photography, reels, and strategic posting schedule.",
    type: "image",
    media: "/images/portfolio/hausofbh-9-1.png",
    allImages: ["/images/portfolio/hausofbh-9-1.png", "/images/portfolio/hausofbh-9-2.png"],
  },
  {
    id: "tennis-media-day",
    client: "Sports Production",
    handle: "Media Day",
    category: "Behind the Scenes",
    partner: "digitalwave",
    description: "Behind-the-scenes coverage of a professional tennis media day, capturing the energy and preparation of athletes.",
    type: "video",
    media: "/videos/portfolio/tennis-media-day-bts.mp4",
    allImages: [],
  },
  {
    id: "soco",
    client: "Soco",
    handle: "@Soco_____",
    category: "Content + Social",
    partner: "hausofbh",
    description: "Content creation and social media management with brand-aligned visuals and engagement strategy.",
    type: "image",
    media: "/images/portfolio/hausofbh-10-1.png",
    allImages: ["/images/portfolio/hausofbh-10-1.png", "/images/portfolio/hausofbh-10-2.png", "/images/portfolio/hausofbh-11-1.png"],
  },
  {
    id: "thehugh",
    client: "The Hugh",
    handle: "@TheHugh",
    category: "Content + Social",
    partner: "hausofbh",
    description: "Comprehensive content creation and social media management with on-site photography and reel production.",
    type: "image",
    media: "/images/portfolio/hausofbh-12-1.png",
    allImages: ["/images/portfolio/hausofbh-12-1.png", "/images/portfolio/hausofbh-12-2.png", "/images/portfolio/hausofbh-13-1.png"],
  },
  {
    id: "bluscarpa",
    client: "Blu Scarpa",
    handle: "@BluScarpa",
    category: "Full Management",
    partner: "hausofbh",
    description: "Complete social media transformation including content creation, brand vision, and full account management.",
    type: "image",
    media: "/images/portfolio/hausofbh-14-1.png",
    allImages: ["/images/portfolio/hausofbh-14-1.png", "/images/portfolio/hausofbh-14-2.png", "/images/portfolio/hausofbh-15-1.png"],
  },
  {
    id: "cepheimedia",
    client: "Cephei Media",
    handle: "@CepheiMedia",
    category: "Branding",
    partner: "hausofbh",
    description: "Flyer curation and full rebranding package with cohesive visual identity across all marketing materials.",
    type: "image",
    media: "/images/portfolio/hausofbh-16-3.png",
    allImages: ["/images/portfolio/hausofbh-16-3.png", "/images/portfolio/hausofbh-16-4.png", "/images/portfolio/hausofbh-16-5.png"],
  },
  {
    id: "cognilly",
    client: "Cognilly",
    handle: "@Cognilly",
    category: "Branding",
    partner: "hausofbh",
    description: "Brand identity refinement and flyer curation for consistent, professional marketing presence.",
    type: "image",
    media: "/images/portfolio/hausofbh-17-1.png",
    allImages: ["/images/portfolio/hausofbh-17-1.png", "/images/portfolio/hausofbh-17-2.png"],
  },
];

type Project = typeof portfolioProjects[number];

export default function DDMPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProject && selectedProject.allImages.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === selectedProject.allImages.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject && selectedProject.allImages.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProject.allImages.length - 1 : prev - 1
      );
    }
  };

  return (
    <div>
      {/* Video Hero */}
      <section className="relative overflow-hidden">
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/ddm-hero-1.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <div className="pointer-events-none absolute inset-0 bg-black/60" />

        {/* Warm tint overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-950/30 via-transparent to-orange-950/20" />

        {/* Gradient fade at bottom */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

        {/* Decorative accent lines */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className="absolute top-[55%] left-0 w-full h-[2px] opacity-[0.15]"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(245,158,11,0.5) 15%, rgba(245,158,11,0.9) 50%, rgba(245,158,11,0.5) 85%, transparent 100%)",
              boxShadow: "0 0 15px 3px rgba(245,158,11,0.4), 0 0 50px 8px rgba(245,158,11,0.15)",
            }}
          />
          <div
            className="absolute top-[25%] left-0 w-[140%] h-[2px] origin-left rotate-[15deg] opacity-[0.10]"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(249,115,22,0.4) 10%, rgba(249,115,22,0.8) 50%, rgba(249,115,22,0.4) 90%, transparent 100%)",
              boxShadow: "0 0 12px 2px rgba(249,115,22,0.35), 0 0 40px 6px rgba(249,115,22,0.12)",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-32 md:pb-32 md:pt-44">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <Badge variant="secondary" className="mb-4 bg-amber-500/20 text-amber-300 border-amber-500/30">
                DDM
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
                Brand &{" "}
                <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
                  Design Systems
                </span>
              </h1>
              <p className="mt-4 text-lg text-zinc-300">
                Premium brand and design execution powered by our creative partners.
                Enterprise-grade creative crafted with intention and precision.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#portfolio">
                  <Button size="lg" className="gap-2 bg-amber-500 hover:bg-amber-600 text-white">
                    View Our Work
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </a>
                <a href="https://calendly.com/alan-cepheimedia/30min" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg" className="gap-2 border-white/20 text-white hover:bg-white/10">
                    Book a Consultation
                  </Button>
                </a>
              </div>
            </div>

            {/* Second video on the right */}
            <div className="hidden md:block">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_60px_-15px_rgba(245,158,11,0.3)]">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full aspect-video object-cover"
                >
                  <source src="/videos/ddm-hero-2.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

    <div className="mx-auto max-w-7xl px-6 py-24">

      {/* Creative Partners Section - BIGGER & More Marketing */}
      <div className="mt-20">
        <h2 className="text-2xl font-semibold text-center mb-4">Our Creative Partners</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          We&apos;ve partnered with industry-leading creative studios to bring you world-class branding, content, and production.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Haus of BH - Large Card */}
          <a
            href="https://hausofbh.info"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-3xl bg-[#f6e9cf] p-8 md:p-12 flex flex-col items-center text-center hover:scale-[1.02] transition-transform"
          >
            {/* Logo container - fixed height */}
            <div className="h-20 md:h-24 flex items-center justify-center mb-6">
              <Image
                src="/images/hausofbh-logo-dark.png"
                alt="Haus of BH"
                width={220}
                height={70}
                className="h-16 md:h-20 w-auto"
              />
            </div>
            <h3 className="text-xl font-semibold mb-3" style={{ color: "#201d0f" }}>
              Branding & Social Media Studio
            </h3>
            <p className="text-sm mb-6 flex-grow" style={{ color: "#201d0f", opacity: 0.7 }}>
              Full-service brand identity, social media management, content creation, and creative direction. From strategy to execution.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {["Branding", "Social Media", "Content", "Creative Direction"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{ backgroundColor: "#201d0f", color: "#f6e9cf" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </a>

          {/* Digital Wave Productions - Large Card */}
          <a
            href="https://digitalwaveproductions.tv"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-500 p-8 md:p-12 flex flex-col items-center text-center hover:scale-[1.02] transition-transform"
          >
            {/* Logo container - fixed height */}
            <div className="h-20 md:h-24 flex items-center justify-center mb-6">
              <div className="bg-white rounded-2xl p-3">
                <Image
                  src="/images/partners/digital-wave-logo.jpg"
                  alt="Digital Wave Productions"
                  width={100}
                  height={100}
                  className="h-14 md:h-18 w-14 md:w-18 object-contain"
                />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">
              Video & Photo Production
            </h3>
            <p className="text-sm mb-6 flex-grow text-white/80">
              Premium video production, commercial photography, and social content creation. Cinematic quality for every project.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {["Video Production", "Photography", "Social Content", "Commercial"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          </a>
        </div>

        {/* Our Work Button */}
        <div className="mt-8 text-center">
          <a href="#portfolio">
            <Button variant="outline" size="lg" className="gap-2">
              View Our Work
              <ArrowRight className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>

      {/* Services */}
      <div className="mt-20">
        <h2 className="text-2xl font-semibold">What We Create</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {services.map((service, i) => (
            <AnimateIn key={service.title} delay={i * 100}>
            <div
              className="rounded-xl border border-border/60 bg-card/50 p-6 transition-all hover:shadow-[0_0_30px_-8px_rgba(245,158,11,0.2)] hover:border-amber-500/30"
            >
              <service.icon className="h-6 w-6 text-primary" />
              <h3 className="mt-3 font-semibold">{service.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {service.desc}
              </p>
            </div>
            </AnimateIn>
          ))}
        </div>
      </div>

      {/* Deliverables */}
      <div className="mt-20">
        <h2 className="text-2xl font-semibold">Deliverables</h2>
        <p className="mt-2 text-muted-foreground">
          Every project includes comprehensive assets and documentation.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {deliverables.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-lg border border-border/40 bg-card/30 px-4 py-3 text-sm"
            >
              <Check className="h-4 w-4 shrink-0 text-primary" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Portfolio Section */}
      <div id="portfolio" className="mt-20 scroll-mt-16">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end mb-8">
          <div>
            <h2 className="text-2xl font-semibold">Our Work</h2>
            <p className="mt-2 text-muted-foreground">
              Click on any project to explore the full gallery.
            </p>
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => openModal(project)}
              className="group cursor-pointer overflow-hidden rounded-xl border border-border/60 bg-card/50 transition-all hover:border-primary/50 hover:shadow-xl hover:scale-[1.02]"
            >
              {/* Media */}
              <div className="relative aspect-square overflow-hidden bg-muted">
                {project.type === "video" ? (
                  <video
                    src={project.media}
                    className="h-full w-full object-cover"
                    muted
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <Image
                    src={project.media}
                    alt={project.client}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                )}

                {/* Partner logo */}
                <div className="absolute top-3 left-3 z-10">
                  {project.partner === "digitalwave" ? (
                    <div className="rounded-xl bg-white/95 backdrop-blur-sm p-2 shadow-lg">
                      <Image
                        src="/images/partners/digital-wave-logo.jpg"
                        alt="Digital Wave"
                        width={44}
                        height={44}
                        className="h-11 w-11 object-contain"
                      />
                    </div>
                  ) : (
                    <div className="rounded-xl bg-[#f6e9cf]/95 backdrop-blur-sm px-3 py-2 shadow-lg">
                      <Image
                        src="/images/hausofbh-logo-dark.png"
                        alt="Haus of BH"
                        width={80}
                        height={28}
                        className="h-7 w-auto"
                      />
                    </div>
                  )}
                </div>

                {/* View overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full px-4 py-2 text-sm font-medium text-black">
                    View Project
                  </div>
                </div>

                {/* Image count badge */}
                {project.allImages.length > 1 && (
                  <div className="absolute bottom-3 right-3 z-10 rounded-full bg-background/90 backdrop-blur-sm px-2.5 py-1 text-xs font-medium">
                    {project.allImages.length} images
                  </div>
                )}
                {project.type === "video" && (
                  <div className="absolute bottom-3 right-3 z-10 rounded-full bg-blue-500/90 backdrop-blur-sm px-2.5 py-1 text-xs font-medium text-white">
                    Video
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold">{project.client}</h3>
                    <p className="text-sm text-muted-foreground">
                      {project.handle}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs">
                    {project.category}
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Process */}
      <div className="mt-20 rounded-xl border border-border/60 bg-card/50 p-8">
        <h2 className="text-2xl font-semibold">Our Process</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {[
            {
              step: "01",
              title: "Discovery",
              desc: "We dive deep into your brand, audience, and goals to understand what makes you unique.",
            },
            {
              step: "02",
              title: "Create",
              desc: "Strategic design execution with intention — every element serves a purpose.",
            },
            {
              step: "03",
              title: "Deliver",
              desc: "Comprehensive assets, guidelines, and systems ready for scale.",
            },
          ].map((phase) => (
            <div key={phase.step}>
              <span className="text-sm font-medium text-muted-foreground">
                {phase.step}
              </span>
              <h3 className="mt-2 text-lg font-semibold">{phase.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {phase.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-20 text-center">
        <h2 className="text-2xl font-semibold">
          Ready for a brand that performs?
        </h2>
        <p className="mt-3 text-muted-foreground">
          Let&apos;s create something exceptional together.
        </p>
        <div className="mt-6">
          <a href="https://calendly.com/alan-cepheimedia/30min" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="gap-2">
              Book a Consultation
              <ArrowRight className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-5xl max-h-[90vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white transition-colors"
            >
              <X className="h-8 w-8" />
            </button>

            {/* Content */}
            <div className="bg-card rounded-2xl overflow-hidden">
              {/* Media area */}
              <div className="relative aspect-[4/3] md:aspect-video bg-black">
                {selectedProject.type === "video" ? (
                  <video
                    src={selectedProject.media}
                    className="h-full w-full object-contain"
                    controls
                    autoPlay
                    playsInline
                  />
                ) : (
                  <>
                    <Image
                      src={selectedProject.allImages[currentImageIndex]}
                      alt={selectedProject.client}
                      fill
                      className="object-contain"
                    />

                    {/* Navigation arrows */}
                    {selectedProject.allImages.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                        >
                          <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                        >
                          <ChevronRight className="h-6 w-6" />
                        </button>

                        {/* Image indicators */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                          {selectedProject.allImages.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setCurrentImageIndex(i)}
                              className={`w-2 h-2 rounded-full transition-colors ${
                                i === currentImageIndex ? "bg-white" : "bg-white/40"
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                )}

                {/* Partner logo in modal */}
                <div className="absolute top-4 left-4">
                  {selectedProject.partner === "digitalwave" ? (
                    <div className="rounded-xl bg-white p-2 shadow-lg">
                      <Image
                        src="/images/partners/digital-wave-logo.jpg"
                        alt="Digital Wave"
                        width={50}
                        height={50}
                        className="h-12 w-12 object-contain"
                      />
                    </div>
                  ) : (
                    <div className="rounded-xl bg-[#f6e9cf] px-4 py-2 shadow-lg">
                      <Image
                        src="/images/hausofbh-logo-dark.png"
                        alt="Haus of BH"
                        width={100}
                        height={35}
                        className="h-8 w-auto"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Info area */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold">{selectedProject.client}</h3>
                    <p className="text-muted-foreground">{selectedProject.handle}</p>
                  </div>
                  <Badge variant="secondary">{selectedProject.category}</Badge>
                </div>
                <p className="mt-4 text-muted-foreground">
                  {selectedProject.description}
                </p>

                {/* Thumbnail strip for multi-image projects */}
                {selectedProject.allImages.length > 1 && (
                  <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
                    {selectedProject.allImages.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentImageIndex(i)}
                        className={`relative shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                          i === currentImageIndex ? "border-primary" : "border-transparent"
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`${selectedProject.client} ${i + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
