import React from "react";
import { curveSlope, groundY, projectX, scaleAt } from "./world";

const NAVY = "#002843";
const LIME = "#C6F000";

/**
 * Le coureur qui descend devant. Dessiné de dos, en mètres dans un repère
 * local (y négatif vers le haut), puis mis à l'échelle selon sa distance.
 */
export const RiderAhead: React.FC<{ s: number; t: number }> = ({ s, t }) => {
  // Il se rapproche puis s'éloigne au gré des relances : 10 à 17 m devant
  const gap = 6.9 + 1.7 * Math.sin(t * 0.55) + 0.4 * Math.sin(t * 1.7);
  const z = gap;
  const absZ = s + z;
  const sc = scaleAt(z);

  // Sa propre trajectoire dans la chaussée, décalée de la nôtre
  const lateral = 0.45 * Math.sin(absZ / 34) - 0.15;
  const x = projectX(lateral, z, absZ, s);
  const yBase = groundY(z);

  // Il s'incline dans le virage — mais la caméra bascule déjà avec notre
  // propre gîte, donc seul l'écart entre les deux inclinaisons se voit.
  const lean = Math.max(
    -7,
    Math.min(7, (curveSlope(absZ) - curveSlope(s)) * 260),
  );

  // Pédalage : il mouline peu en descente, quelques coups de relance
  const cadence = 82 + 22 * Math.sin(t * 0.4);
  const phase = (t * cadence * 2 * Math.PI) / 60;
  const legL = Math.sin(phase);
  const legR = Math.sin(phase + Math.PI);

  // Oscillation du vélo sous le corps
  const sway = 0.9 * Math.sin(phase * 0.5);

  return (
    <g transform={`translate(${x.toFixed(1)} ${yBase.toFixed(1)}) scale(${sc.toFixed(3)})`}>
      <g transform={`rotate(${(lean + sway).toFixed(2)} 0 -0.55)`}>
        {/* Ombre portée sur l'asphalte */}
        <ellipse cx={0.28} cy={-0.015} rx={0.3} ry={0.055} fill="#000" opacity={0.22} />

        {/* Roue arrière vue de dos : très fine, mais on distingue le pneu,
            la jante à profil haut et l'éclat du moyeu */}
        <ellipse cx={0} cy={-0.34} rx={0.036} ry={0.345} fill="#0a0c0e" />
        <ellipse cx={0} cy={-0.34} rx={0.022} ry={0.33} fill="#22262b" />
        <ellipse cx={0} cy={-0.34} rx={0.028} ry={0.21} fill="#101317" />
        <ellipse cx={0} cy={-0.34} rx={0.011} ry={0.2} fill="#5b636b" opacity={0.55} />
        <circle cx={0} cy={-0.34} r={0.035} fill="#2c3238" />
        {/* Bases arrière et dérailleur */}
        <path d="M -0.055 -0.30 L -0.135 -0.345 L -0.135 -0.325 L -0.05 -0.285 Z" fill={NAVY} />
        <path d="M 0.055 -0.30 L 0.135 -0.345 L 0.135 -0.325 L 0.05 -0.285 Z" fill={NAVY} />
        <path d="M 0.03 -0.30 L 0.075 -0.24 L 0.04 -0.19 L 0.012 -0.26 Z" fill="#1b1f24" />

        {/* Cadre : tube de selle + haubans */}
        <path d="M -0.055 -0.30 L -0.02 -0.72 L 0.02 -0.72 L 0.055 -0.30 Z" fill={NAVY} />
        <path d="M -0.10 -0.34 L -0.03 -0.66 L -0.005 -0.66 L -0.065 -0.33 Z" fill={NAVY} opacity={0.85} />
        <path d="M 0.10 -0.34 L 0.03 -0.66 L 0.005 -0.66 L 0.065 -0.33 Z" fill={NAVY} opacity={0.85} />

        {/* Selle */}
        <path d="M -0.075 -0.76 L 0.075 -0.76 L 0.05 -0.72 L -0.05 -0.72 Z" fill="#0d0f12" />

        {/* Jambes : cuissard sombre, mollets clairs, mouvement alterné */}
        {[
          { side: -1, k: legL },
          { side: 1, k: legR },
        ].map(({ side, k }) => {
          const knee = -0.44 + k * 0.05;
          const foot = -0.14 + k * 0.11;
          return (
            <g key={side}>
              <path
                d={`M ${side * 0.075} -0.74 L ${side * 0.115} ${knee} L ${side * 0.06} ${knee} L ${side * 0.035} -0.74 Z`}
                fill="#14181d"
              />
              <path
                d={`M ${side * 0.108} ${knee} L ${side * 0.098} ${foot} L ${side * 0.055} ${foot} L ${side * 0.062} ${knee} Z`}
                fill="#c98f6a"
              />
              <rect x={side * 0.11 - 0.035} y={foot - 0.035} width={0.07} height={0.04} fill={LIME} />
            </g>
          );
        })}

        {/* Buste incliné : maillot navy, bande lime dans le dos */}
        <path d="M -0.155 -0.78 L 0.155 -0.78 L 0.21 -1.22 L -0.21 -1.22 Z" fill={NAVY} />
        <path d="M -0.05 -0.78 L 0.05 -0.78 L 0.055 -1.22 L -0.055 -1.22 Z" fill={LIME} opacity={0.9} />
        {/* Poches arrière */}
        <rect x={-0.14} y={-0.9} width={0.28} height={0.075} fill="#001b2e" opacity={0.8} />

        {/* Épaules */}
        <path d="M -0.21 -1.22 L 0.21 -1.22 L 0.235 -1.33 L -0.235 -1.33 Z" fill={NAVY} />

        {/* Bras pliés vers les cocottes : coudes sortis, avant-bras plongeants.
            Vu de dos on n'en aperçoit que la partie qui déborde du buste. */}
        {[-1, 1].map((side) => (
          <g key={`arm${side}`}>
            <path
              d={`M ${side * 0.2} -1.31 L ${side * 0.275} -1.14 L ${side * 0.225} -1.12 L ${side * 0.165} -1.29 Z`}
              fill={NAVY}
            />
            <path
              d={`M ${side * 0.275} -1.14 L ${side * 0.245} -1.0 L ${side * 0.2} -1.01 L ${side * 0.225} -1.13 Z`}
              fill="#c98f6a"
            />
            {/* Main gantée et bout de cintre */}
            <rect x={side * 0.235 - 0.028} y={-1.015} width={0.056} height={0.05} fill="#12161a" />
            <rect x={side * 0.245 - 0.05} y={-0.985} width={0.1} height={0.022} fill="#0d1013" />
          </g>
        ))}

        {/* Nuque et casque aéro */}
        <rect x={-0.055} y={-1.42} width={0.11} height={0.09} fill="#c98f6a" />
        <path
          d="M -0.115 -1.44 Q -0.115 -1.60 0 -1.60 Q 0.115 -1.60 0.115 -1.44 L 0.09 -1.40 L -0.09 -1.40 Z"
          fill="#f2f4f6"
        />
        <path d="M -0.10 -1.50 L 0.10 -1.50 L 0.09 -1.455 L -0.09 -1.455 Z" fill={LIME} />

        {/* Feu arrière : petit point rouge qui pulse */}
        <circle
          cx={0}
          cy={-0.70}
          r={0.028}
          fill="#ff2b1f"
          opacity={0.55 + 0.45 * Math.sin(t * 9)}
        />
      </g>
    </g>
  );
};
