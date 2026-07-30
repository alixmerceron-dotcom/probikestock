import React from "react";
import {
  depthSamples,
  FOCAL,
  CAM_HEIGHT,
  HEIGHT,
  HORIZON,
  NEAR,
  projectX,
  ROAD_HALF,
  rnd,
  scaleAt,
  WIDTH,
  wrap,
  curveSlope,
} from "./world";

/** Ordonnée écran d'un point situé `drop` mètres sous le plan de la route. */
const groundYAt = (z: number, drop: number) =>
  HORIZON + ((CAM_HEIGHT + drop) * FOCAL) / z;

const polygon = (pts: [number, number][]) =>
  pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");

type Tree = { z: number; x: number; yBase: number; sc: number; seed: number };

const HAZE: [number, number, number] = [214, 229, 240];

const mix = (
  c: [number, number, number],
  d: [number, number, number],
  k: number,
) =>
  `rgb(${Math.round(c[0] + (d[0] - c[0]) * k)},${Math.round(
    c[1] + (d[1] - c[1]) * k,
  )},${Math.round(c[2] + (d[2] - c[2]) * k)})`;

/**
 * Sapin vu de côté. Le soleil vient de la gauche : chaque étage reçoit une
 * moitié éclairée, ce qui évite l'aplat de couleur unique. La perspective
 * aérienne délave les arbres lointains vers la couleur de la brume.
 */
const Conifer: React.FC<{ t: Tree }> = ({ t }) => {
  const h = (7 + rnd(t.seed, 3) * 9) * t.sc;
  const w = h * (0.22 + rnd(t.seed, 4) * 0.08);
  const { x, yBase } = t;
  const tint = 0.7 + rnd(t.seed, 9) * 0.3;
  const fog = Math.min(0.72, Math.max(0, (t.z - 22) / 115));

  const dark = mix(
    [Math.round(22 * tint), Math.round(44 * tint), Math.round(29 * tint)],
    HAZE,
    fog,
  );
  const lit = mix(
    [Math.round(52 * tint), Math.round(86 * tint), Math.round(48 * tint)],
    HAZE,
    fog,
  );
  const trunk = mix([38, 30, 22], HAZE, fog);

  const tier = (yb: number, yt: number, half: number, key: string) => (
    <g key={key}>
      <polygon
        points={polygon([
          [x - half, yb],
          [x + half, yb],
          [x, yt],
        ])}
        fill={dark}
      />
      <polygon
        points={polygon([
          [x - half, yb],
          [x, yb],
          [x, yt],
        ])}
        fill={lit}
      />
    </g>
  );

  return (
    <g>
      <rect
        x={x - w * 0.07}
        y={yBase - h * 0.3}
        width={Math.max(0.6, w * 0.14)}
        height={h * 0.3}
        fill={trunk}
      />
      {tier(yBase - h * 0.22, yBase - h * 0.68, w / 2, "a")}
      {tier(yBase - h * 0.5, yBase - h * 0.86, w * 0.4, "b")}
      {tier(yBase - h * 0.74, yBase - h, w * 0.26, "c")}
    </g>
  );
};

/** Talus rocheux côté montagne (à gauche de la chaussée). */
const RockWall: React.FC<{ s: number }> = ({ s }) => {
  const LAT = -(ROAD_HALF + 1.05);
  const zs = depthSamples(56).filter((z) => z <= 130);
  const top: [number, number][] = [];
  const bottom: [number, number][] = [];
  const height = (absZ: number) =>
    2.7 + 1.35 * Math.sin(absZ / 9) + 0.85 * Math.sin(absZ / 3.3 + 1.7);

  for (const z of zs) {
    const absZ = s + z;
    const sc = scaleAt(z);
    const x = projectX(LAT, z, absZ, s);
    top.push([x, groundYAt(z, 0) - height(absZ) * sc]);
    bottom.push([x, groundYAt(z, 0) + 2]);
  }

  return (
    <g>
      <polygon
        points={polygon([...top, ...bottom.reverse()])}
        fill="url(#rock)"
      />
    </g>
  );
};

/**
 * Le versant qui plonge côté vide : au-delà du bas-côté, le sol s'arrête et
 * l'on retrouve la brume de la vallée. C'est ce décrochage qui donne
 * l'impression d'être accroché à flanc de montagne.
 */
const ValleyDrop: React.FC<{ s: number }> = ({ s }) => {
  // Le bord n'est pas rectiligne : il ondule et s'enfonce progressivement,
  // sinon la limite du vide dessine un fil tendu au-dessus du décor.
  const edge = (absZ: number) =>
    5.4 + 1.1 * Math.sin(absZ / 13) + 0.6 * Math.sin(absZ / 31 + 2.1);
  const zs = depthSamples(52).filter((z) => z <= 140);

  const lip: [number, number][] = [];
  const brink: [number, number][] = [];
  for (const z of zs) {
    const absZ = s + z;
    const e = edge(absZ);
    lip.push([projectX(e, z, absZ, s), groundYAt(z, 0)]);
    brink.push([projectX(e + 2.6, z, absZ, s), groundYAt(z, 1.9)]);
  }

  const far: [number, number][] = [...brink];
  far.push([WIDTH * 2, groundYAt(140, 1.9)]);
  far.push([WIDTH * 2, HEIGHT * 2]);
  far.push([brink[0][0], HEIGHT * 2]);

  return (
    <g>
      {/* Le vide, noyé de brume */}
      <polygon points={polygon(far)} fill="url(#valley)" />
      {/* Talus d'accotement qui bascule vers la pente */}
      <polygon
        points={polygon([...lip, ...brink.reverse()])}
        fill="url(#brink)"
      />
    </g>
  );
};

/** Le flanc de montagne côté intérieur, qui ferme le cadre à gauche. */
const Hillside: React.FC<{ s: number }> = ({ s }) => {
  const LAT = -(ROAD_HALF + 4.5);
  const zs = depthSamples(48).filter((z) => z <= 145);
  const height = (absZ: number) =>
    13 + 7 * Math.sin(absZ / 47) + 3.5 * Math.sin(absZ / 17 + 0.8);
  const top: [number, number][] = [];
  const bottom: [number, number][] = [];
  for (const z of zs) {
    const absZ = s + z;
    const sc = scaleAt(z);
    const x = projectX(LAT, z, absZ, s);
    top.push([x, groundYAt(z, 0) - height(absZ) * sc]);
    bottom.push([x, groundYAt(z, 0) + 6]);
  }
  return <polygon points={polygon([...top, ...bottom.reverse()])} fill="url(#hill)" />;
};

/** Arêtes lointaines, sol et vallée, avec un balancement dans les virages. */
export const Backdrop: React.FC<{ s: number }> = ({ s }) => {
  const swing = -curveSlope(s) * 1500;
  const ridge = (
    amp: number,
    base: number,
    step: number,
    seed: number,
    fill: string,
    parallax: number,
  ) => {
    const pts: [number, number][] = [];
    for (let x = -600; x <= WIDTH + 600; x += step) {
      const n =
        Math.sin((x + seed * 340) / 210) * 0.6 +
        Math.sin((x + seed * 90) / 83) * 0.3 +
        Math.sin((x + seed * 17) / 41) * 0.1;
      pts.push([x + swing * parallax, base - n * amp]);
    }
    pts.push([WIDTH + 600, HORIZON + 40]);
    pts.push([-600, HORIZON + 40]);
    return <polygon points={polygon(pts)} fill={fill} />;
  };

  return (
    <g>
      <rect x={-600} y={-200} width={WIDTH + 1200} height={HEIGHT} fill="url(#sky)" />
      {ridge(120, HORIZON - 130, 26, 1, "#8fa2b4", 0.25)}
      {ridge(96, HORIZON - 70, 22, 4, "#6f8496", 0.4)}
      {ridge(64, HORIZON - 24, 18, 9, "#54687a", 0.6)}
      {/* Brume de vallée qui noie le pied des reliefs */}
      <rect
        x={-600}
        y={HORIZON - 90}
        width={WIDTH + 1200}
        height={130}
        fill="url(#haze)"
      />
      {/* Plan de la route, puis décrochage côté vide */}
      <rect
        x={-WIDTH}
        y={HORIZON - 2}
        width={WIDTH * 3}
        height={HEIGHT * 2}
        fill="url(#ground)"
      />
      <ValleyDrop s={s} />
    </g>
  );
};

export const Scenery: React.FC<{ s: number }> = ({ s }) => {
  const trees: Tree[] = [];

  // Côté montagne : sapins perchés sur le talus
  const LEFT_COUNT = 26;
  const LEFT_SPACING = 6.5;
  const LEFT_PERIOD = LEFT_COUNT * LEFT_SPACING;
  for (let i = 0; i < LEFT_COUNT; i++) {
    const z = wrap(i * LEFT_SPACING - s, LEFT_PERIOD) + NEAR;
    if (z > 125 || z < 3) continue;
    const lat = -(ROAD_HALF + 2.2 + rnd(i, 11) * 9);
    const perch = -(2.9 + rnd(i, 12) * 2.6);
    trees.push({
      z,
      x: projectX(lat, z, s + z, s),
      yBase: groundYAt(z, perch),
      sc: scaleAt(z),
      seed: i + 100,
    });
  }

  // Côté vide : la pente plonge, on ne voit que la cime des arbres
  const RIGHT_COUNT = 30;
  const RIGHT_SPACING = 5.8;
  const RIGHT_PERIOD = RIGHT_COUNT * RIGHT_SPACING;
  for (let i = 0; i < RIGHT_COUNT; i++) {
    const z = wrap(i * RIGHT_SPACING - s, RIGHT_PERIOD) + NEAR;
    if (z > 125 || z < 3) continue;
    const lat = ROAD_HALF + 2.6 + rnd(i, 21) * 12;
    const drop = (lat - ROAD_HALF) * 0.62 + rnd(i, 22) * 2;
    trees.push({
      z,
      x: projectX(lat, z, s + z, s),
      yBase: groundYAt(z, drop),
      sc: scaleAt(z),
      seed: i + 400,
    });
  }

  trees.sort((a, b) => b.z - a.z);

  return (
    <g>
      <Hillside s={s} />
      <RockWall s={s} />
      {trees.map((t, i) => (
        <Conifer key={`t${i}`} t={t} />
      ))}
    </g>
  );
};
