import React from "react";
import { rnd, WIDTH, HEIGHT } from "./world";

const abs: React.CSSProperties = { position: "absolute", inset: 0 };

/**
 * Traitement « caméra embarquée » : flou radial dû à la vitesse, vignettage
 * de l'objectif grand-angle, poussière sur la lentille, et scintillement du
 * soleil qui passe derrière les arbres.
 */
export const LensFx: React.FC<{ t: number }> = ({ t }) => {
  // Le soleil est filtré par les sapins : variation rapide et irrégulière
  const flicker =
    0.5 +
    0.5 *
      (Math.sin(t * 11.3) * 0.5 +
        Math.sin(t * 27.7 + 1.1) * 0.3 +
        Math.sin(t * 43.1 + 2.4) * 0.2);
  const sun = 0.06 + flicker * 0.16;

  // Filés de vitesse sur les bords du cadre
  const streaks = Array.from({ length: 26 }, (_, i) => {
    const a = (i / 26) * Math.PI * 2 + rnd(i, 2) * 0.2;
    const r0 = 460 + rnd(i, 3) * 260;
    const len = 120 + rnd(i, 4) * 420 * (0.6 + 0.4 * Math.sin(t * 3 + i));
    const cx = WIDTH / 2;
    const cy = HEIGHT / 2 + 40;
    return (
      <line
        key={i}
        x1={cx + Math.cos(a) * r0}
        y1={cy + Math.sin(a) * r0 * 0.62}
        x2={cx + Math.cos(a) * (r0 + len)}
        y2={cy + Math.sin(a) * (r0 + len) * 0.62}
        stroke="#ffffff"
        strokeWidth={1.6 + rnd(i, 5) * 2.2}
        opacity={0.035 + rnd(i, 6) * 0.05}
        strokeLinecap="round"
      />
    );
  });

  return (
    <>
      {/* Flou radial : net au centre, brouillé sur les bords */}
      <div
        style={{
          ...abs,
          backdropFilter: "blur(9px)",
          WebkitBackdropFilter: "blur(9px)",
          maskImage:
            "radial-gradient(ellipse 46% 52% at 50% 52%, rgba(0,0,0,0) 55%, rgba(0,0,0,1) 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 46% 52% at 50% 52%, rgba(0,0,0,0) 55%, rgba(0,0,0,1) 100%)",
        }}
      />

      <svg
        width={WIDTH}
        height={HEIGHT}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        style={{ ...abs }}
      >
        {streaks}
      </svg>

      {/* Aberration chromatique en périphérie */}
      <div
        style={{
          ...abs,
          background:
            "radial-gradient(ellipse 58% 64% at 50% 50%, rgba(0,0,0,0) 62%, rgba(80,140,255,0.10) 88%, rgba(255,90,60,0.13) 100%)",
          mixBlendMode: "screen",
        }}
      />

      {/* Vignettage du grand-angle */}
      <div
        style={{
          ...abs,
          background:
            "radial-gradient(ellipse 62% 68% at 50% 48%, rgba(0,0,0,0) 48%, rgba(0,0,0,0.36) 82%, rgba(0,0,0,0.72) 100%)",
        }}
      />

      {/* Soleil rasant à travers les arbres */}
      <div
        style={{
          ...abs,
          background: `radial-gradient(circle 620px at 24% 22%, rgba(255,238,196,${sun.toFixed(3)}) 0%, rgba(255,224,160,${(sun * 0.35).toFixed(3)}) 34%, rgba(0,0,0,0) 70%)`,
          mixBlendMode: "screen",
        }}
      />
      <div
        style={{
          ...abs,
          background: `linear-gradient(115deg, rgba(255,248,222,${(sun * 0.5).toFixed(3)}) 0%, rgba(0,0,0,0) 42%)`,
          mixBlendMode: "screen",
        }}
      />

      {/* Poussière et micro-rayures sur la lentille */}
      <svg width={WIDTH} height={HEIGHT} style={{ ...abs, opacity: 0.16 }}>
        {Array.from({ length: 22 }, (_, i) => (
          <circle
            key={i}
            cx={rnd(i, 31) * WIDTH}
            cy={rnd(i, 32) * HEIGHT}
            r={1 + rnd(i, 33) * 4}
            fill="#ffffff"
            opacity={0.25 + rnd(i, 34) * 0.4}
          />
        ))}
      </svg>

      {/* Grain capteur : bruit régénéré à chaque image */}
      <svg
        width={WIDTH}
        height={HEIGHT}
        style={{ ...abs, opacity: 0.06, mixBlendMode: "overlay" }}
      >
        <filter id="sensorNoise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves={3}
            seed={Math.floor(t * 30) % 97}
          />
        </filter>
        <rect width={WIDTH} height={HEIGHT} filter="url(#sensorNoise)" />
      </svg>
    </>
  );
};
