"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Full-bleed WebGL image stage.
 * Slides dissolve into each other through a noise-driven liquid wipe,
 * and the picture leans slightly toward the cursor.
 * Renders nothing but the picture: all text lives in the DOM above it.
 */

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uFrom;
  uniform sampler2D uTo;
  uniform vec2 uFromSize;
  uniform vec2 uToSize;
  uniform vec2 uRes;
  uniform float uProgress;
  uniform float uTime;
  uniform vec2 uMouse;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  // "object-fit: cover" for a texture
  vec2 cover(vec2 uv, vec2 img) {
    float rs = uRes.x / uRes.y;
    float is = img.x / img.y;
    vec2 s = rs > is ? vec2(1.0, is / rs) : vec2(rs / is, 1.0);
    return (uv - 0.5) * s + 0.5;
  }

  void main() {
    vec2 uv = vUv;
    float p = uProgress;

    float n = noise(uv * vec2(3.0, 2.0) + uTime * 0.03);
    float t = uv.x * 0.7 + n * 0.3;
    float m = 1.0 - smoothstep(p * 1.5 - 0.5, p * 1.5, t);

    float bump = sin(3.14159265 * p);
    vec2 warp = (vec2(n, noise(uv * 3.0 + 7.0)) - 0.5) * 0.05 * bump;

    vec2 lean = uMouse * 0.012 + vec2(sin(uTime * 0.15), cos(uTime * 0.12)) * 0.004;

    vec2 uvF = (cover(uv, uFromSize) - 0.5) / 1.08 + 0.5 + lean + warp;
    float zoomT = mix(1.16, 1.08, p);
    vec2 uvT = (cover(uv, uToSize) - 0.5) / zoomT + 0.5 + lean + warp;

    vec4 a = texture2D(uFrom, uvF);
    vec4 b = texture2D(uTo, uvT);
    gl_FragColor = vec4(mix(a, b, m).rgb, 1.0);
  }
`;

const DURATION = 1500;
const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

export type StageSlide = {
  /** Still picture. Always required: it is the fallback for video slides. */
  image: string;
  /** Optional looping, muted video that replaces the still when it can play. */
  video?: string;
};

type Props = {
  slides: StageSlide[];
  index: number;
  reducedMotion: boolean;
  onReady: () => void;
  onFail: () => void;
};

export default function HeroCanvas({ slides, index, reducedMotion, onReady, onFail }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const indexRef = useRef(index);
  const reducedRef = useRef(reducedMotion);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);
  useEffect(() => {
    reducedRef.current = reducedMotion;
  }, [reducedMotion]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false });
    } catch {
      onFail();
      return;
    }

    let disposed = false;
    let raf = 0;
    let visible = true;
    const textures: THREE.Texture[] = [];
    // One entry per slide: the <video> element if that slide is playing video.
    const videos: (HTMLVideoElement | null)[] = slides.map(() => null);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms: {
        uFrom: { value: null },
        uTo: { value: null },
        uFromSize: { value: new THREE.Vector2(1, 1) },
        uToSize: { value: new THREE.Vector2(1, 1) },
        uRes: { value: new THREE.Vector2(1, 1) },
        uProgress: { value: 0 },
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
      },
    });
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(quad);

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = wrap;
      if (!w || !h) return;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
      renderer.setSize(w, h, false);
      material.uniforms.uRes.value.set(w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    // Only the slides on screen (current and incoming) should be decoding video.
    const syncVideos = () => {
      videos.forEach((v, i) => {
        if (!v) return;
        const wanted = visible && (i === from || i === to);
        if (wanted && v.paused) v.play().catch(() => {});
        if (!wanted && !v.paused) v.pause();
      });
    };

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        syncVideos();
      },
      { threshold: 0 },
    );
    io.observe(wrap);

    const mouseTarget = new THREE.Vector2();
    const onMove = (e: PointerEvent) => {
      mouseTarget.set((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1));
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    // Transition state
    let from = 0;
    let to = 0;
    let startedAt = 0;
    let animating = false;

    const setTex = (u: "uFrom" | "uTo", i: number) => {
      const tex = textures[i];
      material.uniforms[u].value = tex;
      const img = tex.image as HTMLImageElement | HTMLVideoElement;
      const w = img instanceof HTMLVideoElement ? img.videoWidth : img.width;
      const h = img instanceof HTMLVideoElement ? img.videoHeight : img.height;
      material.uniforms[`${u}Size`].value.set(w, h);
    };

    const loader = new THREE.TextureLoader();
    const loadImage = (src: string) =>
      new Promise<THREE.Texture>((resolve, reject) => loader.load(src, resolve, undefined, reject));

    const loadVideo = (src: string, slot: number) =>
      new Promise<THREE.Texture>((resolve, reject) => {
        const v = document.createElement("video");
        v.muted = true;
        v.loop = true;
        v.playsInline = true;
        v.preload = "auto";
        v.src = src;
        const timer = window.setTimeout(() => reject(new Error("video timeout")), 8000);
        v.addEventListener(
          "loadeddata",
          () => {
            window.clearTimeout(timer);
            videos[slot] = v;
            resolve(new THREE.VideoTexture(v));
          },
          { once: true },
        );
        v.addEventListener("error", () => reject(new Error("video error")), { once: true });
        v.load();
      });

    Promise.all(
      slides.map((s, i) =>
        s.video && !reducedRef.current
          ? loadVideo(s.video, i).catch(() => loadImage(s.image))
          : loadImage(s.image),
      ),
    )
      .then((loaded) => {
        if (disposed) {
          loaded.forEach((t) => t.dispose());
          return;
        }
        loaded.forEach((t) => {
          t.minFilter = THREE.LinearFilter;
          t.generateMipmaps = false;
          textures.push(t);
        });
        from = to = indexRef.current;
        setTex("uFrom", from);
        setTex("uTo", to);
        syncVideos();
        material.uniforms.uProgress.value = 0;
        onReady();
        loop(performance.now());
      })
      .catch(() => !disposed && onFail());

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden) return;

      // New slide requested?
      if (indexRef.current !== to && textures.length) {
        from = to;
        setTex("uFrom", from);
        to = indexRef.current;
        const incoming = videos[to];
        if (incoming) incoming.currentTime = 0; // always start a clip from its first frame
        setTex("uTo", to);
        syncVideos();
        startedAt = now;
        animating = true;
        material.uniforms.uProgress.value = 0;
      }

      if (animating) {
        const raw = reducedRef.current ? 1 : Math.min(1, (now - startedAt) / DURATION);
        material.uniforms.uProgress.value = easeInOut(raw);
        if (raw >= 1) {
          animating = false;
          from = to;
          setTex("uFrom", from);
          material.uniforms.uProgress.value = 0;
          syncVideos(); // the outgoing clip can stop now
        }
      }

      const motionOn = !reducedRef.current;
      material.uniforms.uTime.value = motionOn ? now / 1000 : 0;
      const m = material.uniforms.uMouse.value as THREE.Vector2;
      if (motionOn) m.lerp(mouseTarget, 0.04);
      else m.set(0, 0);

      renderer.render(scene, camera);
    };

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      videos.forEach((v) => {
        if (!v) return;
        v.pause();
        v.removeAttribute("src");
        v.load();
      });
      textures.forEach((t) => t.dispose());
      quad.geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
    // The stage is created once; slide changes flow in through refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
