import React from "react";
import {
  depthSamples,
  groundY,
  NEAR,
  projectX,
  ROAD_HALF,
  rnd,
  scaleAt,
  wrap,
} from "./world";

const polygon = (pts: [number, number][]) =>
  pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");

/** Bande longitudinale de largeur constante, suivie sur toute la profondeur. */
const stripe = (s: number, lateral: number, halfWidth: number) => {
  const zs = depthSamples(56);
  const left: [number, number][] = [];
  const right: [number, number][] = [];
  for (const z of zs) {
    const absZ = s + z;
    const y = groundY(z);
    left.push([projectX(lateral - halfWidth, z, absZ, s), y]);
    right.push([projectX(lateral + halfWidth, z, absZ, s), y]);
  }
  return polygon([...left, ...right.reverse()]);
};

export const Road: React.FC<{ s: number }> = ({ s }) => {
  const zs = depthSamples(56);

  // Chaussée
  const asphalt: [number, number][] = [];
  const asphaltRight: [number, number][] = [];
  for (const z of zs) {
    const absZ = s + z;
    const y = groundY(z);
    asphalt.push([projectX(-ROAD_HALF, z, absZ, s), y]);
    asphaltRight.push([projectX(ROAD_HALF, z, absZ, s), y]);
  }

  // Accotement : gravier puis herbe rase, des deux côtés
  const shoulderL = stripe(s, -(ROAD_HALF + 0.55), 0.55);
  const shoulderR = stripe(s, ROAD_HALF + 0.55, 0.55);

  // Bandes de rive continues
  const edgeL = stripe(s, -(ROAD_HALF - 0.28), 0.09);
  const edgeR = stripe(s, ROAD_HALF - 0.28, 0.09);

  // Axe central discontinu : traits de 3 m tous les 11 m
  const dashes: React.ReactElement[] = [];
  const DASH_SPACING = 11;
  const DASH_COUNT = 16;
  const DASH_PERIOD = DASH_SPACING * DASH_COUNT;
  for (let i = 0; i < DASH_COUNT; i++) {
    const z0 = wrap(i * DASH_SPACING - s, DASH_PERIOD) + NEAR;
    const z1 = z0 + 3;
    if (z0 > 135) continue;
    const a0 = s + z0;
    const a1 = s + z1;
    const y0 = groundY(z0);
    const y1 = groundY(z1);
    const half = 0.075;
    dashes.push(
      <polygon
        key={`d${i}`}
        points={polygon([
          [projectX(-half, z0, a0, s), y0],
          [projectX(half, z0, a0, s), y0],
          [projectX(half, z1, a1, s), y1],
          [projectX(-half, z1, a1, s), y1],
        ])}
        fill="#e8e4d8"
        opacity={0.82}
      />,
    );
  }

  // Réparations d'enrobé : taches sombres irrégulières qui cassent l'uniformité
  const patches: React.ReactElement[] = [];
  const PATCH_COUNT = 10;
  const PATCH_PERIOD = 190;
  for (let i = 0; i < PATCH_COUNT; i++) {
    const z0 = wrap(i * (PATCH_PERIOD / PATCH_COUNT) - s, PATCH_PERIOD) + NEAR;
    if (z0 > 90) continue;
    const len = 2.5 + rnd(i, 5) * 6;
    const lat = (rnd(i, 6) - 0.5) * 2 * (ROAD_HALF - 0.8);
    const w = 0.5 + rnd(i, 7) * 1.4;
    const z1 = z0 + len;
    const a0 = s + z0;
    const a1 = s + z1;
    patches.push(
      <polygon
        key={`p${i}`}
        points={polygon([
          [projectX(lat - w, z0, a0, s), groundY(z0)],
          [projectX(lat + w * 0.7, z0, a0, s), groundY(z0)],
          [projectX(lat + w, z1, a1, s), groundY(z1)],
          [projectX(lat - w * 0.6, z1, a1, s), groundY(z1)],
        ])}
        fill="#1d2024"
        opacity={0.35}
      />,
    );
  }

  // Granulat de l'enrobé. Les grains sont posés dans le monde, pas à l'écran :
  // ils défilent donc à la bonne vitesse et s'étirent en approchant, ce qui
  // fournit l'essentiel de la sensation de vitesse.
  const grains: React.ReactElement[] = [];
  const GRAIN_COUNT = 260;
  const GRAIN_PERIOD = 70;
  for (let i = 0; i < GRAIN_COUNT; i++) {
    const z = wrap(rnd(i, 51) * GRAIN_PERIOD - s, GRAIN_PERIOD) + NEAR;
    if (z > 42) continue;
    const lat = (rnd(i, 52) * 2 - 1) * (ROAD_HALF - 0.15);
    const sc = scaleAt(z);
    const r = Math.min(7, (0.006 + rnd(i, 53) * 0.014) * sc);
    const stretch = 1 + 3.5 / z; // filé dû à la vitesse
    grains.push(
      <ellipse
        key={`g${i}`}
        cx={projectX(lat, z, s + z, s)}
        cy={groundY(z)}
        rx={Math.max(0.4, r)}
        ry={Math.max(0.4, r * stretch)}
        fill={rnd(i, 54) > 0.5 ? "#9aa1a9" : "#0d1012"}
        opacity={0.08 + rnd(i, 55) * 0.12}
      />,
    );
  }

  // Ombres des sapins projetées en travers de la chaussée par le soleil rasant
  const shadows: React.ReactElement[] = [];
  const SH_SPACING = 6.5;
  const SH_COUNT = 22;
  const SH_PERIOD = SH_SPACING * SH_COUNT;
  const H = ROAD_HALF + 0.7;
  for (let i = 0; i < SH_COUNT; i++) {
    const z0 = wrap(i * SH_SPACING - s, SH_PERIOD) + NEAR;
    if (z0 > 95) continue;
    const depth = 1.1 + rnd(i, 41) * 1.9;
    const skew = 2.2 + rnd(i, 42) * 2.4;
    const z1 = z0 + depth;
    shadows.push(
      <polygon
        key={`sh${i}`}
        points={polygon([
          [projectX(-H, z0, s + z0, s), groundY(z0)],
          [projectX(H, z0 + skew, s + z0 + skew, s), groundY(z0 + skew)],
          [projectX(H, z1 + skew, s + z1 + skew, s), groundY(z1 + skew)],
          [projectX(-H, z1, s + z1, s), groundY(z1)],
        ])}
        fill="#0a1420"
        opacity={0.26 + rnd(i, 43) * 0.12}
      />,
    );
  }

  return (
    <g>
      <polygon points={shoulderL} fill="#5c5346" />
      <polygon points={shoulderR} fill="#5c5346" />
      <polygon
        points={polygon([...asphalt, ...asphaltRight.reverse()])}
        fill="url(#asphalt)"
      />
      {patches}
      {grains}
      <polygon points={edgeL} fill="#e8e4d8" opacity={0.8} />
      <polygon points={edgeR} fill="#e8e4d8" opacity={0.8} />
      {dashes}
      {shadows}
    </g>
  );
};

/** Glissière de sécurité côté vide, avec ses poteaux. */
export const Guardrail: React.FC<{ s: number }> = ({ s }) => {
  const LAT = ROAD_HALF + 0.75;
  const posts: React.ReactElement[] = [];
  const SPACING = 3.4;
  const COUNT = 44;
  const PERIOD = SPACING * COUNT;

  for (let i = 0; i < COUNT; i++) {
    const z = wrap(i * SPACING - s, PERIOD) + NEAR;
    if (z > 120 || z < 2.2) continue;
    const absZ = s + z;
    const sc = scaleAt(z);
    const x = projectX(LAT, z, absZ, s);
    const yBase = groundY(z);
    const h = 0.78 * sc;
    const w = Math.max(1, 0.09 * sc);
    posts.push(
      <rect
        key={`gp${i}`}
        x={x - w / 2}
        y={yBase - h}
        width={w}
        height={h}
        fill="#4a4f54"
      />,
    );
  }

  // Ruban métallique continu entre 0.45 m et 0.78 m
  const zs = depthSamples(48).filter((z) => z <= 120);
  const top: [number, number][] = [];
  const bottom: [number, number][] = [];
  for (const z of zs) {
    const absZ = s + z;
    const sc = scaleAt(z);
    const x = projectX(LAT, z, absZ, s);
    top.push([x, groundY(z) - 0.79 * sc]);
    bottom.push([x, groundY(z) - 0.5 * sc]);
  }

  return (
    <g>
      {posts}
      <polygon
        points={polygon([...top, ...bottom.reverse()])}
        fill="url(#rail)"
        opacity={0.92}
      />
    </g>
  );
};
