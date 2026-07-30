// Géométrie du monde et projection perspective pour la vue POV.
// Toutes les distances sont en mètres, l'axe Z part de la caméra vers l'avant.

export const WIDTH = 1920;
export const HEIGHT = 1080;
export const FPS = 30;
export const DURATION_IN_FRAMES = 12 * FPS;

export const FOCAL = 900; // pixels par mètre à 1 m de distance
export const CAM_HEIGHT = 1.35; // hauteur du casque au-dessus de la route
export const HORIZON = HEIGHT * 0.44;
export const ROAD_HALF = 3.1; // demi-largeur de la chaussée
export const NEAR = 1.7;
export const FAR = 150;

export const SPEED = 17.6; // m/s, ~63 km/h

export const wrap = (value: number, period: number) =>
  ((value % period) + period) % period;

export const rnd = (i: number, seed = 1) => {
  const x = Math.sin(i * 127.1 + seed * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/** Distance parcourue depuis le début du plan. */
export const travelled = (t: number) => SPEED * t;

/**
 * Décalage latéral de l'axe de la route, en fonction de la distance absolue
 * depuis le départ. Deux sinusoïdes déphasées donnent un enchaînement de
 * virages irrégulier, comme une vraie descente de col.
 */
export const roadCenter = (absZ: number) =>
  14 * Math.sin(absZ / 62) + 5 * Math.sin(absZ / 26 + 1.2);

/** Position latérale de la caméra : la trajectoire du pilote. */
export const cameraX = (s: number) =>
  roadCenter(s) + 0.75 * Math.sin(s / 37) + 0.3 * Math.sin(s / 11);

/** Pente locale du virage : sert à incliner l'image (angle de gîte). */
export const curveSlope = (s: number) => (roadCenter(s + 35) - roadCenter(s)) / 35;

export const scaleAt = (z: number) => FOCAL / z;

/** Ordonnée écran du sol à la distance z. */
export const groundY = (z: number) => HORIZON + (CAM_HEIGHT * FOCAL) / z;

/**
 * Abscisse écran d'un point situé à `lateral` mètres de l'axe de la route,
 * à la distance apparente z (absZ = distance absolue correspondante).
 */
export const projectX = (lateral: number, z: number, absZ: number, s: number) =>
  WIDTH / 2 + (lateral + roadCenter(absZ) - cameraX(s)) * scaleAt(z);

/** Échantillonnage géométrique de la profondeur : dense au premier plan. */
export const depthSamples = (count = 64) => {
  const out: number[] = [];
  for (let k = 0; k <= count; k++) {
    out.push(NEAR * Math.pow(FAR / NEAR, k / count));
  }
  return out;
};

/** Secousses du casque : plusieurs harmoniques + impacts sur la chaussée. */
export const shake = (f: number, s: number) => {
  const bump = Math.max(0, 1 - wrap(s, 41) / 1.4) * 7;
  return {
    x: 3 * Math.sin(f * 1.9) + 2 * Math.sin(f * 4.3 + 1) + 1.2 * Math.sin(f * 8.7),
    y:
      2.6 * Math.cos(f * 2.3) +
      1.9 * Math.sin(f * 5.1 + 2) +
      1.1 * Math.sin(f * 9.3) -
      bump,
    rot: 0.35 * Math.sin(f * 1.3) + 0.2 * Math.sin(f * 3.7 + 0.5),
  };
};
