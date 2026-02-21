"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingBag, X, ChevronRight, Shirt, Tag, Truck, Bell } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";

interface MerchItem {
  id: string;
  name: string;
  price: string;
  category: string;
  description: string;
  color: string;
}

interface DjMerch {
  id: string;
  name: string;
  image: string | null;
  merch: MerchItem[];
}

/* Icon per category to make the placeholder images more realistic */
const categoryIcon: Record<string, typeof Shirt> = {
  Tee: Shirt,
  Hat: Tag,
  Hoodie: Shirt,
  Vinyl: Tag,
  Tote: ShoppingBag,
};

/* Fake size options per category */
const categorySizes: Record<string, string[]> = {
  Tee: ["S", "M", "L", "XL", "XXL"],
  Hoodie: ["S", "M", "L", "XL"],
  Hat: ["One Size"],
  Vinyl: ["12\""],
  Tote: ["One Size"],
};

export function DpmMerchStore({ djs }: { djs: DjMerch[] }) {
  const [activeDj, setActiveDj] = useState(0);
  const [selectedItem, setSelectedItem] = useState<MerchItem | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const currentDj = djs[activeDj];

  const handleSelectItem = (item: MerchItem) => {
    if (selectedItem?.id === item.id) {
      setSelectedItem(null);
      setSelectedSize(null);
    } else {
      setSelectedItem(item);
      const sizes = categorySizes[item.category] || ["One Size"];
      setSelectedSize(sizes.length === 1 ? sizes[0] : null);
    }
  };

  return (
    <AnimateIn>
      <div className="mt-20">
        {/* Section header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm font-medium text-cyan-400 mb-4">
            <ShoppingBag className="h-3.5 w-3.5" />
            Artist Merch
          </div>
          <h2 className="text-2xl font-semibold">The Merch Store</h2>
          <p className="mt-2 text-muted-foreground max-w-lg mx-auto">
            Limited drops and exclusives from the roster. Browse by artist.
          </p>
        </div>

        {/* Store container */}
        <div className="rounded-2xl border border-white/[0.08] bg-zinc-950 overflow-hidden shadow-2xl shadow-cyan-500/[0.03]">
          {/* Browser chrome */}
          <div className="flex items-center justify-between border-b border-white/[0.06] bg-zinc-900/80 px-4 py-2.5">
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
              <div className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
            </div>
            <div className="flex items-center gap-2 rounded-md border border-white/[0.06] bg-white/[0.03] px-3 py-1">
              <ShoppingBag className="h-2.5 w-2.5 text-cyan-400/60" />
              <span className="font-mono text-[10px] text-zinc-500">shop.cepheimedia.com/dpm</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-1">
                <ShoppingBag className="h-2.5 w-2.5 text-zinc-500" />
                <span className="font-mono text-[10px] text-zinc-500">0</span>
              </div>
            </div>
          </div>

          {/* DJ tabs — horizontal scroll with avatars */}
          <div className="border-b border-white/[0.06] bg-zinc-900/40">
            <div className="flex overflow-x-auto scrollbar-hide">
              {djs.map((dj, i) => (
                <button
                  key={dj.id}
                  onClick={() => { setActiveDj(i); setSelectedItem(null); setSelectedSize(null); }}
                  className={`group flex shrink-0 items-center gap-2.5 border-b-2 px-5 py-3 transition-all ${
                    activeDj === i
                      ? "border-cyan-500 bg-cyan-500/[0.04]"
                      : "border-transparent hover:bg-white/[0.02]"
                  }`}
                >
                  {/* Avatar */}
                  <div className={`relative h-7 w-7 shrink-0 overflow-hidden rounded-full border ${
                    activeDj === i ? "border-cyan-500/60" : "border-white/[0.1]"
                  }`}>
                    {dj.image ? (
                      <Image
                        src={dj.image}
                        alt={dj.name}
                        fill
                        className={`object-cover ${dj.image.includes("logo") ? "object-contain p-0.5" : ""}`}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cyan-500/20 to-purple-500/20">
                        <span className="text-[9px] font-bold text-zinc-400">{dj.name[0]}</span>
                      </div>
                    )}
                  </div>
                  <span className={`text-xs font-medium whitespace-nowrap transition-colors ${
                    activeDj === i ? "text-cyan-400" : "text-zinc-500 group-hover:text-zinc-300"
                  }`}>
                    {dj.name}
                  </span>
                  <span className={`text-[9px] tabular-nums ${
                    activeDj === i ? "text-cyan-500/60" : "text-zinc-700"
                  }`}>
                    {dj.merch.length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Store body */}
          <div className="p-5 md:p-6">
            {/* DJ header row */}
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Larger DJ avatar */}
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/[0.1]">
                  {currentDj.image ? (
                    <Image
                      src={currentDj.image}
                      alt={currentDj.name}
                      fill
                      className={`object-cover ${currentDj.image.includes("logo") ? "object-contain p-1" : ""}`}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cyan-500/20 to-purple-500/20">
                      <span className="text-sm font-bold text-zinc-400">{currentDj.name[0]}</span>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">{currentDj.name}</h3>
                  <p className="text-[11px] text-zinc-500">{currentDj.merch.length} items</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-amber-500/20 bg-amber-500/[0.06] px-2.5 py-1 text-[10px] font-medium text-amber-400">
                  Pre-Order
                </span>
                <span className="rounded-full border border-cyan-500/20 bg-cyan-500/[0.06] px-2.5 py-1 text-[10px] font-medium text-cyan-400">
                  DPM Exclusive
                </span>
              </div>
            </div>

            {/* Product grid */}
            <div className="grid gap-4 sm:grid-cols-3">
              {currentDj.merch.map((item) => {
                const CatIcon = categoryIcon[item.category] || ShoppingBag;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectItem(item)}
                    className={`group/card rounded-xl border text-left transition-all duration-300 ${
                      selectedItem?.id === item.id
                        ? "border-cyan-500/40 bg-cyan-500/[0.04] shadow-[0_0_30px_-8px_rgba(6,182,212,0.25)]"
                        : "border-white/[0.06] bg-white/[0.02] hover:border-cyan-500/20 hover:bg-white/[0.04] hover:shadow-[0_0_20px_-8px_rgba(6,182,212,0.1)]"
                    }`}
                  >
                    {/* Product image placeholder — styled like a product photo */}
                    <div className={`relative aspect-[4/3] overflow-hidden rounded-t-xl ${item.color}`}>
                      {/* Gradient overlay for depth */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/30" />
                      {/* Centered product icon */}
                      <CatIcon className="absolute top-1/2 left-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 text-white/20 drop-shadow-lg" />
                      {/* Coming Soon ribbon */}
                      <div className="absolute top-2.5 right-2.5 rounded-full bg-black/50 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-amber-400 backdrop-blur-sm">
                        Coming Soon
                      </div>
                      {/* Category badge */}
                      <span className="absolute bottom-2.5 left-2.5 rounded-full bg-black/40 px-2 py-0.5 text-[9px] font-medium text-white/80 backdrop-blur-sm">
                        {item.category}
                      </span>
                    </div>
                    {/* Product info */}
                    <div className="p-3.5">
                      <p className="text-sm font-medium text-white leading-tight">{item.name}</p>
                      <p className="mt-0.5 text-[10px] text-zinc-600">{currentDj.name}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-sm font-bold text-cyan-400">{item.price}</span>
                        <span className="flex items-center gap-0.5 text-[10px] text-cyan-400/70 opacity-0 transition-opacity group-hover/card:opacity-100">
                          Quick View <ChevronRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick-view detail panel */}
            {selectedItem && (() => {
              const CatIcon = categoryIcon[selectedItem.category] || ShoppingBag;
              const sizes = categorySizes[selectedItem.category] || ["One Size"];
              return (
                <div className="mt-4 overflow-hidden rounded-xl border border-cyan-500/20 bg-zinc-900/80 backdrop-blur-sm">
                  <div className="flex flex-col sm:flex-row">
                    {/* Large product preview */}
                    <div className={`relative aspect-square w-full sm:w-56 shrink-0 ${selectedItem.color}`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/30" />
                      <CatIcon className="absolute top-1/2 left-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 text-white/20 drop-shadow-lg" />
                      <div className="absolute top-3 left-3 rounded-full bg-black/50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-amber-400 backdrop-blur-sm">
                        Coming Soon
                      </div>
                    </div>
                    {/* Info */}
                    <div className="flex-1 p-5">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">{selectedItem.category} &middot; {currentDj.name}</span>
                          <h4 className="mt-1 text-lg font-semibold text-white">{selectedItem.name}</h4>
                          <p className="mt-1 text-xl font-bold text-cyan-400">{selectedItem.price}</p>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); setSelectedItem(null); setSelectedSize(null); }}
                          className="rounded-full border border-white/10 p-1.5 text-zinc-500 transition-colors hover:text-white"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-zinc-400">{selectedItem.description}</p>

                      {/* Size selector */}
                      <div className="mt-4">
                        <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                          {sizes.length > 1 ? "Select Size" : "Size"}
                        </span>
                        <div className="mt-1.5 flex flex-wrap gap-1.5">
                          {sizes.map((size) => (
                            <button
                              key={size}
                              onClick={(e) => { e.stopPropagation(); setSelectedSize(size); }}
                              className={`rounded-md border px-3 py-1.5 text-[11px] font-medium transition-all ${
                                selectedSize === size
                                  ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-400"
                                  : "border-white/[0.08] bg-white/[0.02] text-zinc-400 hover:border-white/[0.15]"
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-5 flex items-center gap-3">
                        <button className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-cyan-600">
                          <Bell className="h-3.5 w-3.5" />
                          Notify Me on Drop
                        </button>
                      </div>
                      <div className="mt-3 flex items-center gap-4 text-[10px] text-zinc-600">
                        <span className="flex items-center gap-1"><Truck className="h-3 w-3" /> Made-to-order &middot; Ships in 2 weeks</span>
                        <span className="flex items-center gap-1"><Tag className="h-3 w-3" /> Limited edition</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Store footer */}
          <div className="border-t border-white/[0.06] bg-zinc-900/40 px-5 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4 text-[10px] text-zinc-600">
              <span className="flex items-center gap-1"><Truck className="h-3 w-3" /> Free shipping on orders $75+</span>
              <span className="hidden sm:inline">&middot;</span>
              <span className="hidden sm:flex items-center gap-1"><Tag className="h-3 w-3" /> All items are DPM exclusives</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-500" />
              </span>
              <span className="text-[10px] text-zinc-500">Store launching soon</span>
            </div>
          </div>
        </div>
      </div>
    </AnimateIn>
  );
}
