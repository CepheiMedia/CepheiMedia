"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Music,
  Megaphone,
  Video,
  Users,
  TrendingUp,
  Handshake,
  Check,
  X,
  ExternalLink,
  MapPin,
  Globe,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
} from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";
import { CountUp } from "@/components/ui/count-up";
import { DpmMerchStore } from "@/components/marketing/dpm-merch-strip";

interface MerchItem {
  id: string;
  name: string;
  price: string;
  category: string;
  description: string;
  color: string;
}

const services = [
  {
    icon: Megaphone,
    title: "Booking & Gig Expansion",
    desc: "We build a booking pipeline — leveraging venue relationships, direct outreach to event directors, college town circuits, opening slot positioning, and cross-city exposure.",
  },
  {
    icon: Music,
    title: "Digital Brand Positioning",
    desc: "Profile optimization, bio rewrites, highlight structure, feed aesthetic alignment, brand tone direction, and electronic press kit guidance. We make you look booked.",
  },
  {
    icon: Video,
    title: "Content & Live Coverage",
    desc: "Live event coverage, cinematic DJ booth edits, crowd energy clips, 24-hour recap reels, next-day highlights, and viral short-form cuts. Every gig becomes marketing.",
  },
  {
    icon: Users,
    title: "Takeovers & Cross Promotion",
    desc: "Venue page takeovers, collaborative posts, cross-promotions with other artists, story swaps, event countdown pushes, pre-event hype reels, and aftermovie tagging.",
  },
  {
    icon: Handshake,
    title: "Connection Leverage",
    desc: "Strategic introductions to event directors, resident promoters, and production teams. We expand your network circles and push you into higher venue tiers.",
  },
  {
    icon: TrendingUp,
    title: "Strategic Growth Planning",
    desc: "Market positioning, sound niche analysis, target audience demographics, college vs nightlife vs luxury markets, geographic expansion, and long-term booking goals.",
  },
];

const deliverables = [
  "Booking outreach assistance",
  "Monthly strategy sessions",
  "Content direction plan",
  "Gig recap edits & reels",
  "Social media growth alignment",
  "Connection introductions",
  "Event amplification strategy",
  "Electronic press kit guidance",
];

// DJ roster
const djs = [
  {
    id: "romi-lux",
    name: "Romi Lux",
    role: "DJ / Producer",
    image: "/images/dj-romilux-2.jpg",
    gallery: ["/images/dj-romilux-2.jpg", "/images/dj-romilux.webp"],
    bio: "Romi Lux, originally from Prague, Czech Republic, is an international DJ and producer based in Miami, FL known for her musical talent and energy behind the decks. With more than 100 shows a year, she gained audiences across the globe, holding down residencies spanning from Miami to Europe. Her style is influenced by Melodic House & Techno but her extensive music knowledge and skills allow her to read any crowd of any size. When not performing, Romi Lux focuses on producing music and hosting her weekly mix show Escape Radio. She has released several original tracks and remixes on labels such as Armada, Spinnin', Coldharbour and Revealed, that were supported by major artists like Tiesto, Yotto, Martin Garrix, Nicky Romero, Fedde Le Grand, Timmy Trumpet, and many more.",
    highlights: [
      "100+ shows per year worldwide",
      "Residencies spanning from Miami to Europe",
      "Performed in Miami, Las Vegas, New York, Chicago, Prague, Ibiza, Croatia, Bahamas, Germany, Amsterdam and more",
      "Shared the stage with Above & Beyond, Kaskade, Deadmau5, Zedd, John Summit, Alesso, Vintage Culture, Gorgon City, The Chainsmokers, Oliver Heldens, Snoop Dogg and more",
      "Releases on Armada, Spinnin', Darklight Recordings, Revealed",
      "Supported by Tiesto, Above & Beyond, Martin Garrix, Nicky Romero, Fedde Le Grand, Timmy Trumpet, Morgan Page",
      "Host of Escape Radio weekly mix show",
    ],
    topTracks: [
      { name: "SPELL", plays: "533K", url: "https://open.spotify.com/track/68and52EY5iYhisaRZWsCT" },
      { name: "Set On You", plays: "298K", url: "https://open.spotify.com/track/27LbL3raU9Mts08Qo3lUhs" },
    ],
    merch: [
      { id: "romi-1", name: "Sundance Sessions Tee", price: "$35", category: "Tee", description: "Official Sundance Sessions graphic tee. Soft-wash cotton with front logo and back episode art.", color: "bg-purple-500" },
      { id: "romi-2", name: "Romi Lux Snapback", price: "$28", category: "Hat", description: "Structured snapback with embroidered Romi Lux logo. One size fits all.", color: "bg-pink-500" },
      { id: "romi-3", name: "SPELL Limited Vinyl", price: "$24", category: "Vinyl", description: "Limited press 12\" vinyl of SPELL. Numbered edition with custom sleeve art.", color: "bg-violet-500" },
    ] as MerchItem[],
    links: {
      spotify: "https://open.spotify.com/artist/3R0G5zcoYl9Ja3NRogHvXr",
      appleMusic: null as string | null,
      soundcloud: null as string | null,
      instagram: "https://www.instagram.com/djromilux",
      youtube: null as string | null,
    },
  },
  {
    id: "fame-sounds",
    name: "FAME Sounds",
    role: "DJ / Producer",
    image: "/images/dj-famesounds-headshot.jpeg",
    gallery: ["/images/dj-famesounds-headshot.jpeg", "/images/dj-famesounds.png"],
    bio: "Michael, also known as Fame Sounds, is a DJ/Producer from Seattle, WA with over 15 years in the music industry. The Fame brand started in 2009 — from there he traveled across the country touring as a hip hop DJ for Dizzy Wright. Around 2012, Fame shifted focus to EDM in Las Vegas, quickly becoming locally known as one of the best. In 2014 he was voted \"Best Nightclub DJ in Las Vegas.\" After a hiatus as one half of the bass duo Dobaloyy, Fame relaunched as Fame Sounds in 2020, diving into the tech house sound. Now a resident DJ for the Seattle Mariners (Beer Garden) and founder of FS Records, Fame Sounds shows no signs of slowing down.",
    highlights: [
      "Voted Best Nightclub DJ — Las Vegas 2014",
      "Guest DJ on Insomniac & Dash Radio",
      "Toured with Dizzy Wright, Jarren Benton, Snow the Product, Skrillex & more",
      "Resident DJ for Seattle Mariners (Beer Garden)",
      "#1 on Beatport — The Elements EP",
      "Founder of FS Records",
      "Bass Canyon 2023, 2024 & 2025 · Beyond Wonderland 2024 & 2025",
      "Spring Awakening 2018 & 2019 · Life in Color 2014 · Life is Beautiful 2014",
    ],
    topTracks: [],
    merch: [
      { id: "fame-1", name: "FS Records Tee", price: "$32", category: "Tee", description: "FS Records flagship tee. Heavyweight cotton with front chest logo and back label artwork.", color: "bg-orange-500" },
      { id: "fame-2", name: "Bass Canyon Cap", price: "$30", category: "Hat", description: "Curved brim cap with Bass Canyon embroidered patch. Adjustable strap.", color: "bg-red-500" },
      { id: "fame-3", name: "FAME Sounds Pullover", price: "$65", category: "Hoodie", description: "Midweight fleece pullover with FAME Sounds branding. Kangaroo pocket, ribbed cuffs.", color: "bg-amber-500" },
    ] as MerchItem[],
    links: {
      spotify: "https://open.spotify.com/artist/47gZgELu7feCG8NwdhoNF2",
      appleMusic: null as string | null,
      soundcloud: "https://soundcloud.com/famesoundss",
      instagram: "https://www.instagram.com/famesoundss",
      youtube: null as string | null,
    },
  },
  {
    id: "chris-padin",
    name: "Chris Padin",
    role: "DJ / Producer",
    image: "/images/dj-chrispadin-logo.jpg",
    gallery: ["/images/dj-chrispadin.webp", "/images/dj-chrispadin-logo.jpg"],
    bio: "Chris Padin is a versatile DJ and producer whose anthemic house sound has earned him features on EDM.com and a growing presence on 1001Tracklists. With hundreds of thousands of streams across his releases, Chris delivers high-energy, crowd-first performances that blend progressive house, electro, and festival-ready drops. From intimate club sets to large-scale events across South Florida, Chris Padin continues to expand his reach — backed by a catalog that speaks for itself.",
    highlights: ["Featured on EDM.com", "Present on 1001Tracklists", "300K+ streams on top releases"],
    topTracks: [
      { name: "Hold Me Closer", plays: "322K", url: "https://open.spotify.com/track/2jY60ArGMPJIbnMqJ1GmLh" },
      { name: "Call Me Up", plays: "169K", url: "https://open.spotify.com/track/2SBfe9nfWh6pgQ5EPgZZoD" },
    ],
    merch: [
      { id: "chris-1", name: "House Is Life Tee", price: "$34", category: "Tee", description: "Statement tee with bold 'House Is Life' typography. Premium ring-spun cotton.", color: "bg-blue-500" },
      { id: "chris-2", name: "CP Logo Cap", price: "$26", category: "Hat", description: "Clean minimal cap with embroidered CP monogram. Adjustable closure.", color: "bg-sky-500" },
      { id: "chris-3", name: "Chris Padin Tote", price: "$20", category: "Tote", description: "Heavy-duty canvas tote with Chris Padin logo. Perfect for vinyl and gear.", color: "bg-indigo-500" },
    ] as MerchItem[],
    links: {
      spotify: "https://open.spotify.com/artist/68wKYzG06o74N6o5aSifjN",
      appleMusic: "https://music.apple.com/us/artist/chris-padin/1395646977",
      soundcloud: null as string | null,
      instagram: "https://www.instagram.com/chris_padin/",
      youtube: null as string | null,
    },
  },
  {
    id: "antonee",
    name: "Antonee",
    role: "DJ / Producer",
    image: "/images/dj-antonee-1.jpeg",
    gallery: ["/images/dj-antonee-1.jpeg", "/images/dj-antonee-2.jpeg", "/images/dj-antonee-logo.png"],
    bio: "Antonee is a DJ and selector rooted in the UK and Amsterdam underground sound — deep house, deep tech, and everything in between. Heavily influenced by the European club scene, Antonee brings a darker, more textured approach to the decks that sets him apart from the typical South Florida sound. With sets at venues like MODE Miami and bookings stretching internationally to Japan, Antonee is building a global footprint one dancefloor at a time. His sets are hypnotic, layered, and built for the heads — the kind of music that rewards attention and moves bodies without compromise.",
    highlights: [
      "UK & Amsterdam-influenced deep house / deep tech sound",
      "Performed at MODE Miami",
      "International bookings including Japan",
      "Dark, textured sets built for underground dancefloors",
    ],
    topTracks: [],
    merch: [
      { id: "antonee-1", name: "Underground Movement Tee", price: "$36", category: "Tee", description: "Dark-toned tee inspired by the UK underground scene. Oversized fit with back print.", color: "bg-zinc-600" },
      { id: "antonee-2", name: "Deep Tech Vinyl", price: "$28", category: "Vinyl", description: "Curated deep tech compilation on 12\" vinyl. Limited numbered pressing.", color: "bg-neutral-600" },
      { id: "antonee-3", name: "Antonee Beanie", price: "$22", category: "Hat", description: "Ribbed knit beanie with woven Antonee label. One size.", color: "bg-stone-600" },
    ] as MerchItem[],
    links: {
      spotify: null as string | null,
      appleMusic: null as string | null,
      soundcloud: "https://soundcloud.com/antonee_ofc",
      instagram: "https://www.instagram.com/antonee_ofc",
      youtube: null as string | null,
    },
  },
  {
    id: "larkinn",
    name: "Larkinn",
    role: "DJ / Producer",
    image: "/images/dj-larkinn.jpg",
    gallery: ["/images/dj-larkinn.jpg"],
    bio: "Larkinn is a rising force in the electronic scene, carving out a signature sound rooted in deep, melodic grooves and atmospheric builds. Whether it's a late-night club set or an outdoor festival stage, Larkinn creates immersive sonic journeys that pull crowds in and hold them there. With an ear for tracks that balance emotion with energy, Larkinn is steadily building a reputation as one of the most promising names coming out of the South Florida underground.",
    highlights: ["Deep & melodic house specialist", "Growing South Florida underground presence"],
    topTracks: [
      { name: "First Class", plays: "16K", url: "https://open.spotify.com/track/0IQRo6hh7juu0Q0FJoyG1X" },
      { name: "$hawty", plays: "8.6K", url: "https://open.spotify.com/track/3thYv3dhKk1kfwTOrI3Dhf" },
    ],
    merch: [
      { id: "larkinn-1", name: "Melodic Grooves Tee", price: "$33", category: "Tee", description: "Soft-wash tee with atmospheric melodic grooves artwork. Relaxed fit.", color: "bg-teal-500" },
      { id: "larkinn-2", name: "Larkinn Snapback", price: "$27", category: "Hat", description: "Flat brim snapback with embroidered Larkinn wordmark. Structured crown.", color: "bg-emerald-500" },
      { id: "larkinn-3", name: "Journey Tote", price: "$18", category: "Tote", description: "Lightweight canvas tote with Journey EP artwork. Great for everyday carry.", color: "bg-cyan-500" },
    ] as MerchItem[],
    links: {
      spotify:
        "https://open.spotify.com/artist/2wnREXtZjqgUGTrmqu4mcl",
      appleMusic: null as string | null,
      soundcloud: null as string | null,
      instagram: "https://www.instagram.com/larkinnmusic",
      youtube: null as string | null,
    },
  },
  {
    id: "memo-p",
    name: "Memo P",
    role: "DJ / Producer",
    image: "/images/dj-memop-2.jpg",
    gallery: ["/images/dj-memop-2.jpg"],
    bio: "Danny Palacios, known as Memo P, is a versatile DJ who brings raw, dynamic energy to every set. With a deep understanding of crowd dynamics and a genre-fluid approach that moves between house, Latin beats, and open format, Memo P has become a trusted name across South Florida's nightlife circuit. Whether it's a packed club night or a private event, Memo P delivers — building momentum with every booking and leaving every room wanting more.",
    highlights: ["Genre-fluid open format sets", "South Florida nightlife circuit regular"],
    topTracks: [],
    merch: [
      { id: "memo-1", name: "Open Format Tee", price: "$34", category: "Tee", description: "Bold graphic tee celebrating the open format lifestyle. Unisex fit.", color: "bg-rose-500" },
      { id: "memo-2", name: "Memo P Cap", price: "$26", category: "Hat", description: "Classic dad cap with Memo P embroidered logo. Washed cotton.", color: "bg-fuchsia-500" },
      { id: "memo-3", name: "MP Hoodie", price: "$60", category: "Hoodie", description: "Premium heavyweight hoodie with MP branding. Fleece-lined, oversized cut.", color: "bg-pink-600" },
    ] as MerchItem[],
    links: {
      spotify: null as string | null,
      appleMusic: null as string | null,
      soundcloud: null as string | null,
      instagram: "https://www.instagram.com/memopmusic",
      youtube: "https://www.youtube.com/@memopmusic",
    },
  },
  {
    id: "genna",
    name: "Genna",
    role: "DJ",
    image: "/images/dj-genna.jpeg",
    gallery: ["/images/dj-genna.jpeg", "/images/dj-genna-logo.png"],
    bio: "Originally from New York and now based in Florida, Genna brings that raw Northeast grit fused with South Florida's sun-soaked nightlife energy. Rooted in house and tech house, Genna's sets are built around infectious grooves, driving four-on-the-floor rhythms, and carefully curated track selection that keeps the dancefloor locked in from first beat to last call. Whether it's a warehouse party or a prime-time club slot, Genna delivers a sound that's equal parts underground authenticity and crowd-moving power — carving out a lane that bridges two coasts and two scenes into one relentless vibe.",
    highlights: ["Originally from New York, based in Florida", "House & tech house focused", "Northeast grit meets South Florida energy"],
    topTracks: [],
    merch: [
      { id: "genna-1", name: "Two Coasts Tee", price: "$33", category: "Tee", description: "NY-to-FL inspired graphic tee. Dual skyline artwork on premium cotton.", color: "bg-slate-500" },
      { id: "genna-2", name: "Genna Logo Cap", price: "$25", category: "Hat", description: "Minimal curved brim cap with embroidered Genna wordmark.", color: "bg-gray-500" },
      { id: "genna-3", name: "House Music Tote", price: "$18", category: "Tote", description: "Durable canvas tote with 'House Music' typography. Everyday essential.", color: "bg-zinc-500" },
    ] as MerchItem[],
    links: {
      spotify: null as string | null,
      appleMusic: null as string | null,
      soundcloud: null as string | null,
      instagram: null as string | null,
      youtube: null as string | null,
    },
  },
];

type DJ = (typeof djs)[number];

// Venues where our artists have played
const venues = [
  { name: "Daer Nightclub", logo: "/images/venue-daer.jpg", location: "Fort Lauderdale, FL" },
  { name: "Vixens", logo: "/images/venue-vixens.png", location: "Fort Lauderdale, FL" },
  { name: "MODE", logo: "/images/venue-mode.jpg", location: "Miami, FL" },
  { name: "Cantina Añejo", logo: "/images/venue-cantina.png", location: "Fort Lauderdale, FL" },
  { name: "LIV", location: "Miami Beach, FL" },
  { name: "E11EVEN", location: "Miami, FL" },
  { name: "Club Space", location: "Miami, FL" },
  { name: "Bâoli", location: "Miami Beach, FL" },
  { name: "International Shows", location: "Worldwide" },
];


export default function DPMPage() {
  const [selectedDJ, setSelectedDJ] = useState<DJ | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [selectedMerch, setSelectedMerch] = useState<MerchItem | null>(null);

  const openDJ = (dj: DJ) => {
    setSelectedDJ(dj);
    setGalleryIndex(0);
    setSelectedMerch(null);
  };

  const galleryNext = () => {
    if (!selectedDJ) return;
    setGalleryIndex((prev) => (prev + 1) % selectedDJ.gallery.length);
  };

  const galleryPrev = () => {
    if (!selectedDJ) return;
    setGalleryIndex((prev) => (prev - 1 + selectedDJ.gallery.length) % selectedDJ.gallery.length);
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
          <source src="/videos/dpm-hero-1.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <div className="pointer-events-none absolute inset-0 bg-black/65" />

        {/* Cyan tint overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-950/30 via-transparent to-purple-950/20" />

        {/* Gradient fade at bottom */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

        {/* Laser accent beams over hero */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className="absolute top-[60%] left-0 w-full h-[2px] opacity-[0.18]"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(6,182,212,0.5) 15%, rgba(6,182,212,0.9) 50%, rgba(6,182,212,0.5) 85%, transparent 100%)",
              boxShadow: "0 0 15px 3px rgba(6,182,212,0.4), 0 0 50px 8px rgba(6,182,212,0.15)",
            }}
          />
          <div
            className="absolute top-[20%] left-0 w-[140%] h-[2px] origin-left rotate-[20deg] opacity-[0.12]"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(6,182,212,0.4) 10%, rgba(6,182,212,0.8) 50%, rgba(6,182,212,0.4) 90%, transparent 100%)",
              boxShadow: "0 0 12px 2px rgba(6,182,212,0.35), 0 0 40px 6px rgba(6,182,212,0.12)",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-32 md:pb-32 md:pt-44">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <Badge variant="secondary" className="mb-4 bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                DPM
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
                Artist Growth &{" "}
                <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Strategic Booking
                </span>
              </h1>
              <p className="mt-4 text-lg text-zinc-300">
                Brand positioning + booking leverage + content velocity + event
                placement. For DJs, producers, and nightlife artists who want
                structured growth and higher-level bookings.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#roster">
                  <Button size="lg" className="gap-2 bg-cyan-500 hover:bg-cyan-600 text-white">
                    Meet the Roster
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </a>
                <a href="#work">
                  <Button variant="outline" size="lg" className="gap-2 border-white/20 text-white hover:bg-white/10">
                    View Our Work
                  </Button>
                </a>
              </div>
            </div>

            {/* Second video on the right */}
            <div className="hidden md:block">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_60px_-15px_rgba(6,182,212,0.3)]">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full aspect-video object-cover"
                >
                  <source src="/videos/dpm-hero-2.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="relative mx-auto max-w-7xl px-6 py-24">

      {/* Powered by Cephei */}
      <div className="mt-20">
        <h2 className="text-2xl font-semibold text-center mb-4">
          A Cephei Media Division
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          DPM is our dedicated branch for nightlife talent — a hybrid of artist
          development, booking support, content production, and digital
          amplification.
        </p>

        <div className="max-w-2xl mx-auto">
          <div className="relative rounded-3xl border border-cyan-500/20 overflow-hidden shadow-[0_0_80px_-20px_rgba(6,182,212,0.15)]">
            {/* Logo as full background */}
            <div className="absolute inset-0">
              <Image
                src="/images/dpm-logo.png"
                alt=""
                fill
                className="object-contain opacity-20"
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-card/80 backdrop-blur-[2px]" />
            </div>
            <div className="relative p-8 md:p-12 text-center">
              <Image
                src="/images/dpm-logo.png"
                alt="Cephei Media Promotions"
                width={600}
                height={330}
                className="mx-auto h-56 md:h-80 w-auto"
              />
              <h3 className="mt-6 text-xl font-semibold">
                Digital Promotional Marketing
              </h3>
              <p className="mt-3 text-sm text-muted-foreground max-w-lg mx-auto">
                We turn 1 gig into 10 pieces of content, into 3 new venue
                conversations, into expanded booking leverage. This is not social
                media management — this is infrastructure.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 justify-center">
                {[
                  "Artist Development",
                  "Booking Support",
                  "Content Production",
                  "Digital Amplification",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* View Work Button */}
        <div className="mt-8 text-center">
          <a href="#work">
            <Button variant="outline" size="lg" className="gap-2">
              View Our Work
              <ArrowRight className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>

      {/* Our DJs — full-bleed section with video background */}
      </div>{/* close max-w-7xl container temporarily */}
      <section id="roster" className="relative mt-20 scroll-mt-16 overflow-hidden py-20">
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/venues-bg.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay */}
        <div className="pointer-events-none absolute inset-0 bg-black/80" />
        {/* Cyan accent tint */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-950/25 via-transparent to-purple-950/15" />
        {/* Top/bottom fade into page background */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />

        <div className="relative mx-auto max-w-7xl px-6">
          <h2 className="text-2xl font-semibold text-center text-white mb-4">Our Roster</h2>
          <p className="text-zinc-400 text-center mb-12 max-w-2xl mx-auto">
            The artists we work with to build their brand, expand their bookings,
            and amplify their presence.
          </p>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
            {djs.map((dj) => (
              <div
                key={dj.id}
                onClick={() => openDJ(dj)}
                className="group cursor-pointer rounded-2xl border border-white/[0.1] bg-zinc-900/80 backdrop-blur-sm overflow-hidden transition-all hover:border-cyan-500/40 hover:shadow-[0_0_40px_-10px_rgba(6,182,212,0.3)] hover:scale-[1.02]"
              >
                <div className="relative aspect-square overflow-hidden bg-zinc-950">
                  {dj.image && dj.image !== "" ? (
                    <Image
                      src={dj.image}
                      alt={dj.name}
                      fill
                      className={`transition-transform duration-500 group-hover:scale-105 ${
                        dj.image.includes("logo") ? "object-contain p-8" : `object-cover ${dj.image.includes("romilux") ? "object-top" : "object-center"}`
                      }`}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-zinc-900 to-purple-900/20 flex items-center justify-center">
                      <Music className="h-12 w-12 text-cyan-400/30" />
                    </div>
                  )}
                  {/* View overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full px-4 py-2 text-sm font-medium text-black">
                      View Artist
                    </div>
                  </div>
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-lg font-semibold text-white">{dj.name}</h3>
                  <p className="text-sm text-zinc-400">{dj.role}</p>
                </div>
              </div>
            ))}

            {/* Coming Soon */}
            <div className="rounded-2xl border border-dashed border-white/[0.08] bg-zinc-900/40 backdrop-blur-sm overflow-hidden flex flex-col">
              <div className="relative aspect-square overflow-hidden bg-zinc-950/30 flex items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-zinc-700">
                    <Music className="h-8 w-8 text-zinc-700" />
                  </div>
                </div>
              </div>
              <div className="p-5 text-center">
                <h3 className="text-lg font-semibold text-zinc-500">
                  Coming Soon
                </h3>
                <p className="text-sm text-zinc-600">
                  More artists joining the roster
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="relative mx-auto max-w-7xl px-6 py-0">{/* reopen container */}

      {/* Merch Store */}
      <DpmMerchStore
        djs={djs.map((dj) => ({
          id: dj.id,
          name: dj.name,
          image: dj.image,
          merch: dj.merch,
        }))}
      />

      {/* Venues — Where Our Artists Play */}
      <div className="mt-20">
        <AnimateIn>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm font-medium text-cyan-400 mb-4">
              <MapPin className="h-3.5 w-3.5" />
              Venue Network
            </div>
            <h2 className="text-2xl font-semibold">Where Our Artists Play</h2>
            <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
              From South Florida&apos;s top nightlife venues to international stages — our roster performs where it matters.
            </p>
          </div>
        </AnimateIn>

        {/* Scrolling marquee */}
        <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/30 py-10">
          {/* Gradient fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-card to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-card to-transparent" />

          {/* Marquee track — two identical sets side by side, gap must match between sets */}
          <div className="animate-marquee flex">
            {/* Set A */}
            <div className="flex shrink-0 gap-6">
              {venues.map((venue) => (
                <div
                  key={venue.name}
                  className="group flex h-28 w-64 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] px-8 transition-all hover:border-cyan-500/30 hover:bg-cyan-500/[0.06]"
                >
                  {venue.logo ? (
                    <Image
                      src={venue.logo}
                      alt={venue.name}
                      width={220}
                      height={90}
                      className="h-16 w-auto max-w-[180px] rounded object-contain opacity-70 transition-opacity group-hover:opacity-100"
                    />
                  ) : (
                    <div className="text-center">
                      <p className="text-base font-bold tracking-wide text-zinc-400 transition-colors group-hover:text-cyan-400">
                        {venue.name}
                      </p>
                      {venue.location === "Worldwide" ? (
                        <Globe className="mx-auto mt-1.5 h-4 w-4 text-zinc-600 transition-colors group-hover:text-cyan-500" />
                      ) : (
                        <p className="mt-1 text-xs text-zinc-600">{venue.location}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* Set B (identical clone) — gap-6 on the left to match spacing */}
            <div className="flex shrink-0 gap-6 pl-6">
              {venues.map((venue) => (
                <div
                  key={`${venue.name}-dup`}
                  className="group flex h-28 w-64 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] px-8 transition-all hover:border-cyan-500/30 hover:bg-cyan-500/[0.06]"
                >
                  {venue.logo ? (
                    <Image
                      src={venue.logo}
                      alt={venue.name}
                      width={220}
                      height={90}
                      className="h-16 w-auto max-w-[180px] rounded object-contain opacity-70 transition-opacity group-hover:opacity-100"
                    />
                  ) : (
                    <div className="text-center">
                      <p className="text-base font-bold tracking-wide text-zinc-400 transition-colors group-hover:text-cyan-400">
                        {venue.name}
                      </p>
                      {venue.location === "Worldwide" ? (
                        <Globe className="mx-auto mt-1.5 h-4 w-4 text-zinc-600 transition-colors group-hover:text-cyan-500" />
                      ) : (
                        <p className="mt-1 text-xs text-zinc-600">{venue.location}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Location tags */}
        <AnimateIn delay={200}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {["Miami", "Fort Lauderdale", "South Florida", "International"].map((loc) => (
              <span
                key={loc}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs font-medium text-zinc-500"
              >
                <MapPin className="h-3 w-3" />
                {loc}
              </span>
            ))}
          </div>
        </AnimateIn>
      </div>

      {/* Services */}
      <div className="mt-20">
        <h2 className="text-2xl font-semibold">What We Do For Artists</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <AnimateIn key={service.title} delay={i * 100}>
            <div
              className="rounded-xl border border-border/60 bg-card/50 p-6 transition-all hover:border-cyan-500/30 hover:shadow-[0_0_30px_-8px_rgba(6,182,212,0.2)]"
            >
              <service.icon className="h-6 w-6 text-cyan-400" />
              <h3 className="mt-3 font-semibold">{service.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {service.desc}
              </p>
            </div>
            </AnimateIn>
          ))}
        </div>
      </div>

      {/* What Makes DPM Different */}
      <div className="mt-20 rounded-xl border border-cyan-500/15 bg-card/50 p-8 shadow-[0_0_60px_-20px_rgba(6,182,212,0.1)]">
        <h2 className="text-2xl font-semibold">What Makes DPM Different</h2>
        <p className="mt-3 text-muted-foreground">
          Most DJs post random clips, hope to get noticed, rely on word of
          mouth, and never systemize growth. DPM creates a system around you.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <AnimateIn>
          <div className="text-center">
            <div className="text-3xl font-bold">
              <CountUp end={1} duration={1000} /> Gig
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Every performance is captured
            </p>
          </div>
          </AnimateIn>
          <AnimateIn delay={150}>
          <div className="text-center">
            <div className="text-3xl font-bold">
              <CountUp end={10} duration={1500} suffix="+" /> Pieces
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Of content created per event
            </p>
          </div>
          </AnimateIn>
          <AnimateIn delay={300}>
          <div className="text-center">
            <div className="text-3xl font-bold">
              <CountUp end={3} duration={1500} suffix="+" /> Venues
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              New conversations opened from leverage
            </p>
          </div>
          </AnimateIn>
        </div>
      </div>

      {/* Deliverables */}
      <div className="mt-20">
        <h2 className="text-2xl font-semibold">What You Get</h2>
        <p className="mt-2 text-muted-foreground">
          Core DPM package includes everything you need for structured artist
          growth.
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

      {/* Work Section */}
      <div id="work" className="mt-20 scroll-mt-16">
        <h2 className="text-2xl font-semibold">Our Work</h2>
        <div className="mt-6 rounded-xl border border-dashed border-border/60 bg-card/30 p-12 text-center">
          <Music className="h-10 w-10 text-cyan-400/30 mx-auto" />
          <h3 className="mt-4 text-lg font-semibold text-muted-foreground">Portfolio Coming Soon</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
            We&apos;re building out case studies and project showcases. Check back soon to see our work in action.
          </p>
        </div>
      </div>

      {/* Process */}
      <div className="mt-20 rounded-xl border border-border/60 bg-card/50 p-8">
        <h2 className="text-2xl font-semibold">Our Process</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {[
            {
              step: "01",
              title: "Position",
              desc: "We audit your brand, optimize your digital presence, and define your market positioning and target venues.",
            },
            {
              step: "02",
              title: "Amplify",
              desc: "Live coverage, content production, and digital amplification that turns every performance into marketing assets.",
            },
            {
              step: "03",
              title: "Expand",
              desc: "Strategic introductions, booking pipeline development, and geographic expansion into new markets and venue tiers.",
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
          Ready to build your artist brand?
        </h2>
        <p className="mt-3 text-muted-foreground">
          Let&apos;s talk about where you are, where you want to be, and how we
          get you there.
        </p>
        <div className="mt-6">
          <a
            href="https://calendly.com/alan-cepheimedia/30min"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="gap-2">
              Book a Consultation
              <ArrowRight className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>

      {/* DJ Modal — full-screen takeover */}
      {selectedDJ && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md overflow-y-auto"
          onClick={() => setSelectedDJ(null)}
        >
          {/* Close button — fixed top right */}
          <button
            onClick={() => setSelectedDJ(null)}
            className="fixed top-6 right-6 z-[60] rounded-full border border-white/10 bg-white/5 p-3 text-white/70 backdrop-blur-sm transition-all hover:bg-white/10 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>

          <div
            className="mx-auto max-w-6xl px-6 py-16 md:py-20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Hero section — image + name */}
            <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-start">
              {/* Photo */}
              <div className="relative group/gallery">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl">
                  {selectedDJ.gallery.length > 0 ? (
                    <>
                      <Image
                        src={selectedDJ.gallery[galleryIndex]}
                        alt={`${selectedDJ.name}`}
                        fill
                        className={`transition-opacity duration-300 ${
                          selectedDJ.gallery[galleryIndex].includes("logo") ? "object-contain p-8" : "object-cover"
                        }`}
                        key={selectedDJ.gallery[galleryIndex]}
                      />
                      {/* Gallery navigation */}
                      {selectedDJ.gallery.length > 1 && (
                        <>
                          <button
                            onClick={(e) => { e.stopPropagation(); galleryPrev(); }}
                            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2.5 text-white/70 opacity-0 backdrop-blur-sm transition-all hover:bg-black/80 hover:text-white group-hover/gallery:opacity-100"
                          >
                            <ChevronLeft className="h-5 w-5" />
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); galleryNext(); }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2.5 text-white/70 opacity-0 backdrop-blur-sm transition-all hover:bg-black/80 hover:text-white group-hover/gallery:opacity-100"
                          >
                            <ChevronRight className="h-5 w-5" />
                          </button>
                          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
                            {selectedDJ.gallery.map((_, i) => (
                              <button
                                key={i}
                                onClick={(e) => { e.stopPropagation(); setGalleryIndex(i); }}
                                className={`h-2 rounded-full transition-all ${
                                  i === galleryIndex ? "w-6 bg-white" : "w-2 bg-white/40 hover:bg-white/60"
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-zinc-900 to-purple-900/20 flex items-center justify-center">
                      <Music className="h-24 w-24 text-cyan-400/20" />
                    </div>
                  )}
                </div>
                {/* Glow effect behind image */}
                <div className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 blur-2xl" />
              </div>

              {/* Info */}
              <div className="space-y-8">
                {/* Name + badge */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Image
                      src="/images/cephei-logo-transparent.png"
                      alt="Cephei Media"
                      width={100}
                      height={29}
                      className="h-5 w-auto opacity-60"
                    />
                    <span className="text-xs text-zinc-600">/</span>
                    <Badge variant="secondary" className="bg-cyan-500/15 text-cyan-400 border-cyan-500/25">DPM Artist</Badge>
                  </div>
                  <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                    {selectedDJ.name}
                  </h2>
                  <p className="mt-1 text-lg text-zinc-400">{selectedDJ.role}</p>
                </div>

                {/* Bio */}
                <div>
                  <h4 className="text-xs font-medium uppercase tracking-wider text-zinc-500 mb-3">About</h4>
                  <p className="text-base leading-relaxed text-zinc-300">
                    {selectedDJ.bio}
                  </p>
                </div>

                {/* Highlights / Accomplishments */}
                {selectedDJ.highlights.length > 0 && (
                  <div>
                    <h4 className="text-xs font-medium uppercase tracking-wider text-zinc-500 mb-3">Highlights</h4>
                    <div className="space-y-2">
                      {selectedDJ.highlights.map((item) => (
                        <div key={item} className="flex items-start gap-2.5">
                          <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                          <span className="text-sm text-zinc-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Music platform links */}
                <div className="flex flex-wrap gap-3">
                  {selectedDJ.links.spotify && (
                    <a href={selectedDJ.links.spotify} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#1DB954] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
                      Spotify <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {selectedDJ.links.appleMusic && (
                    <a href={selectedDJ.links.appleMusic} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FC3C44] to-[#FA233B] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043A5.022 5.022 0 0019.7.19a10.588 10.588 0 00-1.766-.111C17.058.03 16.182.01 15.308 0H8.688c-.876.01-1.752.03-2.626.079A10.588 10.588 0 004.296.19a5.022 5.022 0 00-1.874.7C1.304 1.625.559 2.624.242 3.934a9.23 9.23 0 00-.24 2.19C-.028 7 .001 7.876.011 8.75v6.5c-.01.874-.039 1.75-.009 2.626a9.23 9.23 0 00.24 2.19c.317 1.31 1.062 2.31 2.18 3.043a5.022 5.022 0 001.874.7c.876.08 1.752.06 2.626.069h6.62c.876-.009 1.752.011 2.626-.069a5.022 5.022 0 001.874-.7c1.118-.733 1.863-1.733 2.18-3.043a9.23 9.23 0 00.24-2.19c.03-.876.001-1.752.011-2.626V8.75c.01-.874.039-1.75.009-2.626zM16.95 17.07a1.084 1.084 0 01-.783.377 1.071 1.071 0 01-.862-.321.994.994 0 01-.231-.546 3.07 3.07 0 01-.009-.532V9.951L9.3 11.237v5.81c.01.196.01.392-.01.588a1.073 1.073 0 01-.271.644 1.093 1.093 0 01-.798.369 1.083 1.083 0 01-.864-.321.992.992 0 01-.228-.544 3.073 3.073 0 01-.01-.534v-.069a1.8 1.8 0 01.498-1.36 2.07 2.07 0 01.637-.457c.235-.106.483-.181.737-.223l.265-.042V8.09l.003-.076a.826.826 0 01.65-.761l6.698-1.745h.005a.726.726 0 01.168-.02.592.592 0 01.482.219.726.726 0 01.153.452V15.92c.01.196.01.393-.01.589a1.07 1.07 0 01-.271.644l-.153-.083z"/></svg>
                      Apple Music <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {selectedDJ.links.soundcloud && (
                    <a href={selectedDJ.links.soundcloud} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#FF5500] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.057-.05-.1-.1-.1m-.899.828c-.06 0-.091.037-.104.094L0 14.479l.172 1.308c.013.06.045.094.104.094.057 0 .094-.03.104-.094l.194-1.308-.194-1.332c-.01-.06-.047-.094-.104-.094m1.8-1.168c-.065 0-.11.05-.116.11l-.22 2.49.22 2.395c.006.06.051.11.116.11.063 0 .11-.05.116-.11l.25-2.395-.25-2.49c-.006-.06-.053-.11-.116-.11m.899-.287c-.073 0-.12.06-.127.127l-.2 2.776.2 2.59c.007.067.054.127.127.127.073 0 .12-.06.127-.127l.227-2.59-.227-2.776c-.007-.067-.054-.127-.127-.127m.9-.255c-.08 0-.133.064-.14.14l-.18 3.031.18 2.705c.007.075.06.14.14.14.08 0 .133-.065.14-.14l.2-2.705-.2-3.031c-.007-.076-.06-.14-.14-.14m.9-.162c-.088 0-.147.072-.152.152l-.166 3.193.166 2.8c.005.08.064.152.152.152.087 0 .147-.072.152-.152l.187-2.8-.187-3.193c-.005-.08-.065-.152-.152-.152m.951-.12c-.093 0-.16.08-.165.166l-.155 3.313.155 2.846c.005.088.072.166.165.166.094 0 .16-.078.166-.166l.175-2.846-.175-3.313c-.006-.087-.072-.165-.166-.165m.953-.085c-.1 0-.173.087-.178.18l-.14 3.398.14 2.87c.005.092.078.178.178.178.1 0 .173-.086.178-.178l.16-2.87-.16-3.398c-.005-.093-.078-.18-.178-.18m.955-.048c-.107 0-.185.093-.19.192l-.13 3.446.13 2.882c.005.1.083.192.19.192.106 0 .185-.093.19-.192l.147-2.882-.147-3.446c-.005-.1-.084-.192-.19-.192m1.005.005c-.11 0-.196.097-.2.2l-.122 3.44.122 2.895c.004.108.09.2.2.2.11 0 .196-.092.2-.2l.14-2.895-.14-3.44c-.004-.103-.09-.2-.2-.2m1.005.07c-.12 0-.207.105-.21.21l-.115 3.37.115 2.894c.003.11.09.21.21.21.117 0 .207-.1.21-.21l.13-2.894-.13-3.37c-.003-.106-.093-.21-.21-.21m1.01.11c-.125 0-.22.11-.223.22l-.104 3.26.104 2.878c.003.116.098.22.223.22.124 0 .22-.104.222-.22l.12-2.878-.12-3.26c-.003-.11-.098-.22-.222-.22m1.01.166c-.13 0-.232.118-.235.232l-.095 3.094.095 2.86c.003.12.105.232.235.232.13 0 .232-.112.234-.232l.11-2.86-.11-3.094c-.002-.114-.105-.232-.234-.232m1.063.256c-.136 0-.243.124-.245.244l-.088 2.838.088 2.84c.002.124.11.244.245.244.136 0 .243-.12.245-.244l.1-2.84-.1-2.838c-.002-.12-.11-.244-.245-.244m5.097.62c-.24 0-.47.033-.694.088a5.131 5.131 0 00-5.097-4.578c-.576 0-1.14.098-1.656.28-.193.07-.245.14-.248.283v9.004c.003.14.106.257.246.27h7.45a2.96 2.96 0 002.958-2.958 2.96 2.96 0 00-2.959-2.958"/></svg>
                      SoundCloud <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {selectedDJ.links.instagram && (
                    <a href={selectedDJ.links.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                      Instagram <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {selectedDJ.links.youtube && (
                    <a href={selectedDJ.links.youtube} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#FF0000] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                      YouTube <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {!selectedDJ.links.spotify && !selectedDJ.links.appleMusic && !selectedDJ.links.soundcloud && !selectedDJ.links.instagram && !selectedDJ.links.youtube && (
                    <p className="text-sm text-zinc-500 italic">Music links coming soon</p>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom sections — IG left, Spotify + tracks right */}
            {(selectedDJ.links.instagram || selectedDJ.topTracks.length > 0 || selectedDJ.links.spotify) && (
              <div className="mt-12 grid gap-8 md:grid-cols-2">
                {/* LEFT — Instagram embed */}
                {selectedDJ.links.instagram && (() => {
                  const igHandle = selectedDJ.links.instagram.split("instagram.com/")[1]?.replace(/\/$/, "");
                  return igHandle ? (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <svg className="h-4 w-4 text-pink-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                          <h4 className="text-xs font-medium uppercase tracking-wider text-zinc-500">@{igHandle}</h4>
                        </div>
                        <a
                          href={selectedDJ.links.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-medium text-pink-400 hover:text-pink-300 transition-colors"
                        >
                          Follow <ExternalLink className="inline h-3 w-3 ml-1" />
                        </a>
                      </div>
                      <div className="rounded-xl border border-white/[0.06] overflow-hidden">
                        <iframe
                          src={`https://www.instagram.com/${igHandle}/embed`}
                          width="100%"
                          height="380"
                          frameBorder="0"
                          scrolling="yes"
                          allowTransparency
                          loading="lazy"
                          className="bg-transparent"
                          style={{ colorScheme: "normal" }}
                        />
                      </div>
                    </div>
                  ) : null;
                })()}

                {/* RIGHT — Spotify + Top Tracks stacked */}
                {(selectedDJ.links.spotify || selectedDJ.topTracks.length > 0) && (
                  <div className="space-y-6">
                    {/* Spotify Embed Player */}
                    {selectedDJ.links.spotify && (
                      <div>
                        <h4 className="text-xs font-medium uppercase tracking-wider text-zinc-500 mb-3">Listen Now</h4>
                        <iframe
                          src={`https://open.spotify.com/embed/artist/${selectedDJ.links.spotify.split("/artist/")[1]}?utm_source=generator&theme=0`}
                          width="100%"
                          height="152"
                          frameBorder="0"
                          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                          loading="lazy"
                          className="rounded-xl"
                        />
                      </div>
                    )}

                    {/* Top Tracks */}
                    {selectedDJ.topTracks.length > 0 && (
                      <div>
                        <h4 className="text-xs font-medium uppercase tracking-wider text-zinc-500 mb-3">Popular Tracks</h4>
                        <div className="space-y-2">
                          {selectedDJ.topTracks.map((track, i) => (
                            <a
                              key={track.url}
                              href={track.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3 transition-all hover:border-[#1DB954]/30 hover:bg-[#1DB954]/5 group"
                            >
                              <span className="text-sm font-bold text-zinc-600 w-5">{i + 1}</span>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">{track.name}</p>
                              </div>
                              <span className="text-xs text-zinc-400">{track.plays}</span>
                              <svg className="h-4 w-4 text-[#1DB954] opacity-50 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Artist Merch */}
            {selectedDJ.merch && selectedDJ.merch.length > 0 && (
              <div className="mt-12">
                <div className="flex items-center gap-2.5 mb-6">
                  <ShoppingBag className="h-4 w-4 text-cyan-400" />
                  <h4 className="text-xs font-medium uppercase tracking-wider text-zinc-500">Artist Merch</h4>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {selectedDJ.merch.map((item) => (
                    <button
                      key={item.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMerch(selectedMerch?.id === item.id ? null : item);
                      }}
                      className={`group/merch rounded-xl border text-left transition-all ${
                        selectedMerch?.id === item.id
                          ? "border-cyan-500/40 shadow-[0_0_30px_-8px_rgba(6,182,212,0.3)]"
                          : "border-white/[0.06] hover:border-cyan-500/30 hover:shadow-[0_0_20px_-8px_rgba(6,182,212,0.15)]"
                      }`}
                    >
                      <div className={`aspect-square rounded-t-xl ${item.color} flex items-center justify-center`}>
                        <ShoppingBag className="h-8 w-8 text-white/20" />
                      </div>
                      <div className="p-3">
                        <p className="text-sm font-medium text-white truncate">{item.name}</p>
                        <div className="mt-1 flex items-center justify-between">
                          <span className="text-[10px] text-zinc-500">{item.category}</span>
                          <span className="text-xs font-semibold text-cyan-400">{item.price}</span>
                        </div>
                        <span className="mt-2 block text-[10px] text-cyan-400 opacity-0 transition-opacity group-hover/merch:opacity-100">
                          View &rarr;
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Inline merch detail */}
                {selectedMerch && (
                  <div className="mt-4 rounded-xl border border-cyan-500/20 bg-zinc-900/80 p-6">
                    <div className="flex gap-6">
                      <div className={`h-32 w-32 shrink-0 rounded-lg ${selectedMerch.color} flex items-center justify-center`}>
                        <ShoppingBag className="h-10 w-10 text-white/20" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h5 className="text-lg font-semibold text-white">{selectedMerch.name}</h5>
                            <p className="mt-1 text-lg font-bold text-cyan-400">{selectedMerch.price}</p>
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); setSelectedMerch(null); }}
                            className="rounded-full border border-white/10 p-1.5 text-zinc-500 hover:text-white transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="mt-3 text-sm text-zinc-400 leading-relaxed">{selectedMerch.description}</p>
                        <button className="mt-4 rounded-full border border-cyan-500/40 px-5 py-2 text-sm font-medium text-cyan-400 transition-all hover:bg-cyan-500/10">
                          Notify Me
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
    </div>
  );
}
