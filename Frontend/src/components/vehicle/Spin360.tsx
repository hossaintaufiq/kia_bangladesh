"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * 360° exterior viewer driven by a pre-rendered image sequence (same technique
 * as kia.com: numbered frames, drag maps to frame index).
 *
 * Frames live at  {folder}/01.webp … {FRAMES}.webp  (2-digit, 1-based, one full
 * rotation, same camera/size). If the first frame is missing the viewer falls
 * back to the single `still` photo, so it is safe to ship before renders exist.
 */
const DEFAULT_FRAMES = 36;
const SENSITIVITY = 1.1; // frames per (viewer-width / FRAMES) of drag
const FRICTION = 0.94;
// The car is drawn a little larger below the lg breakpoint, but never past this fill.
const SMALL_BOOST = 1.12;
const MAX_ZOOM = 0.97;

const frameUrl = (folder: string, i: number) =>
  `${folder}/${String(i + 1).padStart(2, "0")}.webp`;

type Props = {
  folder: string;
  still: string;
  alt: string;
  /** Number of frames in one full rotation. */
  frames?: number;
  /** Use on dark backgrounds (hint and counter colours). */
  dark?: boolean;
  /** Scale of the car inside the viewer (1 = fills it). */
  zoom?: number;
  /** Other frame folders to quietly preload once this one is ready. */
  warm?: string[];
};

export default function Spin360({ folder, still, alt, frames: FRAMES = DEFAULT_FRAMES, dark = false, zoom = 1, warm }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const imgs = useRef<HTMLImageElement[]>([]);
  const pos = useRef(0); // fractional frame position
  const vel = useRef(0);
  const raf = useRef(0);
  const drag = useRef<{ x: number; pos: number; lastX: number; lastT: number } | null>(null);

  const [status, setStatus] = useState<"loading" | "ready" | "still">("loading");
  const [pct, setPct] = useState(0);
  const [touched, setTouched] = useState(false);

  const draw = useCallback(() => {
    const c = canvas.current;
    const w = wrap.current;
    if (!c || !w) return;
    const img = imgs.current[((Math.round(pos.current) % FRAMES) + FRAMES) % FRAMES];
    if (!img?.complete || !img.naturalWidth) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cw = Math.round(w.clientWidth * dpr);
    const ch = Math.round(w.clientHeight * dpr);
    if (c.width !== cw || c.height !== ch) {
      c.width = cw;
      c.height = ch;
    }
    const wide = window.matchMedia("(min-width: 1024px)").matches;
    const z = wide ? zoom : Math.min(zoom * SMALL_BOOST, MAX_ZOOM);
    const s = Math.min(cw / img.naturalWidth, ch / img.naturalHeight) * z;
    const dw = img.naturalWidth * s;
    const dh = img.naturalHeight * s;
    const ctx = c.getContext("2d")!;
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
  }, [FRAMES, zoom]);

  // Load the sequence; bail to the still photo if frame 1 is missing.
  useEffect(() => {
    let dead = false;
    let done = 0;
    // First load shows the counter. On a colour switch the previous car stays on
    // screen (same size, same angle) until the new frames are ready, so nothing jumps.
    if (imgs.current.length === 0) {
      setStatus("loading");
      setPct(0);
    }
    const next: HTMLImageElement[] = [];

    const probe = new window.Image();
    probe.onerror = () => {
      if (dead) return;
      imgs.current = [];
      setStatus("still");
    };
    probe.onload = () => {
      if (dead) return;
      next[0] = probe;
      done = 1;
      for (let i = 1; i < FRAMES; i++) {
        const im = new window.Image();
        const finish = () => {
          if (dead) return;
          done++;
          setPct(Math.round((done / FRAMES) * 100));
          if (done >= FRAMES) {
            imgs.current = next;
            setStatus("ready");
            requestAnimationFrame(draw);
          }
        };
        im.onload = finish;
        im.onerror = finish;
        im.src = frameUrl(folder, i);
        next[i] = im;
      }
    };
    probe.src = frameUrl(folder, 0);
    return () => {
      dead = true;
      cancelAnimationFrame(raf.current);
    };
  }, [folder, draw, FRAMES]);

  const warmKey = warm?.join("|");
  useEffect(() => {
    if (status !== "ready" || !warmKey) return;
    let dead = false;
    const keep: HTMLImageElement[] = [];
    const t = window.setTimeout(() => {
      warmKey.split("|").forEach((f) => {
        for (let i = 0; i < FRAMES && !dead; i++) {
          const im = new window.Image();
          im.src = frameUrl(f, i);
          keep.push(im);
        }
      });
    }, 800);
    return () => {
      dead = true;
      window.clearTimeout(t);
    };
  }, [status, warmKey, FRAMES]);

  useEffect(() => {
    if (status !== "ready") return;
    const ro = new ResizeObserver(draw);
    if (wrap.current) ro.observe(wrap.current);
    return () => ro.disconnect();
  }, [status, draw]);

  const coast = useCallback(() => {
    cancelAnimationFrame(raf.current);
    const step = () => {
      pos.current += vel.current;
      vel.current *= FRICTION;
      draw();
      if (Math.abs(vel.current) > 0.02) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  }, [draw]);

  const perPx = () => (FRAMES / (wrap.current?.clientWidth || 800)) * SENSITIVITY;

  const onDown = (e: React.PointerEvent) => {
    if (status !== "ready") return;
    cancelAnimationFrame(raf.current);
    vel.current = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, pos: pos.current, lastX: e.clientX, lastT: e.timeStamp };
    setTouched(true);
  };
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    pos.current = d.pos - (e.clientX - d.x) * perPx();
    const dt = Math.max(e.timeStamp - d.lastT, 1);
    vel.current = (-(e.clientX - d.lastX) * perPx()) / dt * 16;
    d.lastX = e.clientX;
    d.lastT = e.timeStamp;
    draw();
  };
  const onUp = () => {
    if (!drag.current) return;
    drag.current = null;
    coast();
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (status !== "ready") return;
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      vel.current = 0;
      pos.current += e.key === "ArrowRight" ? 1 : -1;
      setTouched(true);
      draw();
    }
  };

  return (
    <div
      ref={wrap}
      className={`relative aspect-[3/2] w-full select-none md:aspect-[2/1] overflow-hidden ${
        status === "ready" ? "cursor-grab touch-pan-y active:cursor-grabbing" : ""
      }`}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      onKeyDown={onKey}
      tabIndex={status === "ready" ? 0 : -1}
      role={status === "ready" ? "img" : undefined}
      aria-label={status === "ready" ? `${alt}. Drag or use arrow keys to rotate 360 degrees.` : undefined}
    >
      {status !== "ready" && (
        <div
          className="absolute inset-0 [transform:scale(var(--zm))] lg:[transform:scale(var(--z))]"
          style={{ "--z": zoom, "--zm": Math.min(zoom * SMALL_BOOST, MAX_ZOOM) } as React.CSSProperties}
        >
          <Image
            src={still}
            alt={alt}
            fill
            sizes="(min-width: 1280px) 1000px, 100vw"
            className="object-contain"
            priority={false}
          />
        </div>
      )}
      <canvas
        ref={canvas}
        className={`absolute inset-0 h-full w-full ${status === "ready" ? "" : "invisible"}`}
      />

      {status === "loading" && (
        <span
          className={`absolute bottom-2 right-3 text-xs font-bold tabular-nums ${dark ? "text-white/60" : "text-midnight/50"}`}
        >
          360° {pct}%
        </span>
      )}
      {status === "ready" && (
        <span
          aria-hidden
          className={`pointer-events-none absolute bottom-3 left-1/2 flex whitespace-nowrap -translate-x-1/2 items-center gap-2 rounded-full ${dark ? "bg-white/15 backdrop-blur" : "bg-midnight/80"} px-4 py-1.5 text-xs font-bold text-white transition-opacity duration-500 ${
            touched ? "opacity-0" : "opacity-100"
          }`}
        >
          ← Drag to rotate 360° →
        </span>
      )}
    </div>
  );
}
