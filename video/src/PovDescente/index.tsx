import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { Backdrop, Scenery } from "./Scenery";
import { Guardrail, Road } from "./Road";
import { RiderAhead } from "./RiderAhead";
import { Cockpit } from "./Cockpit";
import { LensFx } from "./LensFx";
import { Hud } from "./Hud";
import { curveSlope, HEIGHT, HORIZON, shake, travelled, WIDTH } from "./world";

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

const Defs: React.FC = () => (
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2={HORIZON} gradientUnits="userSpaceOnUse">
      <stop offset="0%" stopColor="#5b93c4" />
      <stop offset="55%" stopColor="#9dc3de" />
      <stop offset="100%" stopColor="#dbe7ee" />
    </linearGradient>

    <linearGradient
      id="asphalt"
      x1="0"
      y1={HORIZON}
      x2="0"
      y2={HEIGHT}
      gradientUnits="userSpaceOnUse"
    >
      <stop offset="0%" stopColor="#6a7076" />
      <stop offset="18%" stopColor="#4c5258" />
      <stop offset="100%" stopColor="#26292d" />
    </linearGradient>

    <linearGradient
      id="rock"
      x1="0"
      y1={HORIZON - 260}
      x2="0"
      y2={HEIGHT}
      gradientUnits="userSpaceOnUse"
    >
      <stop offset="0%" stopColor="#5c5f52" />
      <stop offset="45%" stopColor="#3d4037" />
      <stop offset="100%" stopColor="#23251f" />
    </linearGradient>

    <linearGradient id="rail" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#9198a0" />
      <stop offset="42%" stopColor="#5f666e" />
      <stop offset="100%" stopColor="#3a4046" />
    </linearGradient>

    <linearGradient
      id="ground"
      x1="0"
      y1={HORIZON}
      x2="0"
      y2={HEIGHT}
      gradientUnits="userSpaceOnUse"
    >
      <stop offset="0%" stopColor="#7d8f76" />
      <stop offset="14%" stopColor="#4e5f43" />
      <stop offset="100%" stopColor="#2b3626" />
    </linearGradient>

    <linearGradient
      id="hill"
      x1="0"
      y1={HORIZON - 700}
      x2="0"
      y2={HEIGHT}
      gradientUnits="userSpaceOnUse"
    >
      <stop offset="0%" stopColor="#3d5138" />
      <stop offset="45%" stopColor="#2b3a28" />
      <stop offset="100%" stopColor="#1a231a" />
    </linearGradient>

    <linearGradient
      id="brink"
      x1="0"
      y1={HORIZON}
      x2="0"
      y2={HEIGHT}
      gradientUnits="userSpaceOnUse"
    >
      <stop offset="0%" stopColor="#7e8f83" />
      <stop offset="16%" stopColor="#42503a" />
      <stop offset="100%" stopColor="#20281d" />
    </linearGradient>

    <linearGradient
      id="valley"
      x1="0"
      y1={HORIZON - 20}
      x2="0"
      y2={HEIGHT}
      gradientUnits="userSpaceOnUse"
    >
      <stop offset="0%" stopColor="#b6ccda" />
      <stop offset="26%" stopColor="#77939f" />
      <stop offset="100%" stopColor="#31474c" />
    </linearGradient>

    <linearGradient
      id="haze"
      x1="0"
      y1={HORIZON - 90}
      x2="0"
      y2={HORIZON + 40}
      gradientUnits="userSpaceOnUse"
    >
      <stop offset="0%" stopColor="rgba(226,238,246,0)" />
      <stop offset="70%" stopColor="rgba(226,238,246,0.62)" />
      <stop offset="100%" stopColor="rgba(226,238,246,0.85)" />
    </linearGradient>

    {/* Perspective aérienne : tout ce qui touche la ligne d'horizon se dilue */}
    <linearGradient
      id="airHaze"
      x1="0"
      y1={HORIZON - 190}
      x2="0"
      y2={HORIZON + 74}
      gradientUnits="userSpaceOnUse"
    >
      <stop offset="0%" stopColor="rgba(216,231,241,0)" />
      <stop offset="40%" stopColor="rgba(216,231,241,0.26)" />
      <stop offset="68%" stopColor="rgba(216,231,241,0.46)" />
      <stop offset="100%" stopColor="rgba(216,231,241,0)" />
    </linearGradient>
  </defs>
);

export const PovDescente: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const s = travelled(t);
  const sh = shake(frame, s);

  // Angle de gîte du pilote dans le virage, plafonné pour rester lisible
  const lean = clamp(curveSlope(s) * 75, -9, 9);
  const speed = 63 + 9 * Math.sin(t * 0.7);

  const world = [
    `translate(${WIDTH / 2} ${HEIGHT / 2})`,
    `rotate(${(lean + sh.rot).toFixed(3)})`,
    "scale(1.05)",
    `translate(${(-WIDTH / 2 + sh.x).toFixed(2)} ${(-HEIGHT / 2 + sh.y).toFixed(2)})`,
  ].join(" ");

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <svg
        width={WIDTH}
        height={HEIGHT}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        style={{ position: "absolute", inset: 0 }}
      >
        <Defs />
        <g transform={world}>
          <Backdrop s={s} />
          <Scenery s={s} />
          <Road s={s} />
          <Guardrail s={s} />
          {/* Posée après le décor pour noyer glissière, bord du vide et
              pied des sapins dans la brume de la vallée */}
          <rect
            x={-800}
            y={HORIZON - 190}
            width={WIDTH + 1600}
            height={264}
            fill="url(#airHaze)"
          />
          <RiderAhead s={s} t={t} />
        </g>
        {/* Le vélo est solidaire du pilote : il ne subit pas la rotation du monde */}
        <Cockpit t={t} lean={lean} speed={speed} />
      </svg>

      <LensFx t={t} />
      <Hud t={t} s={s} speed={speed} />
    </AbsoluteFill>
  );
};
