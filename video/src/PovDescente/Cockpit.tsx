import React from "react";

const NAVY = "#002843";
const LIME = "#C6F000";
const SKIN = "#b9825f";

/**
 * Premier plan : ce que le pilote voit de son propre vélo. Avec une caméra
 * casque, seules les cocottes, les mains et un bout de pneu entrent dans le
 * cadre — le cintre lui-même est presque entièrement hors champ.
 * Le vélo étant solidaire de la machine et la caméra du casque, les deux ne
 * tremblent pas en phase : c'est ce décalage qui donne la sensation embarquée.
 */
export const Cockpit: React.FC<{ t: number; lean: number; speed: number }> = ({
  t,
  lean,
  speed,
}) => {
  const bx = 5.5 * Math.sin(t * 7.1 + 0.9) + 2.6 * Math.sin(t * 15.3);
  const by = 3.6 * Math.cos(t * 6.2 + 1.6) + 1.9 * Math.sin(t * 13.1);
  const steer = lean * 0.16 + 1.4 * Math.sin(t * 2.1);

  const Hand: React.FC<{ cx: number; flip: 1 | -1 }> = ({ cx, flip }) => (
    <g transform={`translate(${cx} 0) scale(${flip} 1)`}>
      {/* Cocotte de frein, inclinée vers l'avant */}
      <path d="M -34 1082 L 40 1058 L 24 906 L -40 928 Z" fill="#0f1216" />
      <path d="M 6 926 L 30 918 L 22 1042 L 0 1050 Z" fill="#1b2026" opacity={0.9} />
      {/* Levier qui dépasse vers l'avant */}
      <path d="M 18 930 L 42 920 L 38 866 L 16 878 Z" fill="#b9bec3" />
      <path d="M 24 928 L 40 921 L 37 872 L 22 878 Z" fill="#7d848a" opacity={0.7} />

      {/* Main gantée refermée sur la cocotte */}
      <path
        d="M -52 1082 Q -60 986 -34 936 Q -6 912 26 932 Q 44 948 40 990 L 34 1082 Z"
        fill="#191d22"
      />
      {/* Doigts sur le levier */}
      <path d="M 20 946 Q 46 936 52 954 Q 44 968 18 972 Z" fill="#0d1013" />
      <path d="M 22 976 Q 50 968 56 986 Q 46 1000 20 1002 Z" fill="#0d1013" />
      {/* Reflet et serrage lime */}
      <path d="M -44 1010 Q -14 976 30 984 L 32 1006 Q -12 1000 -40 1034 Z" fill={LIME} opacity={0.45} />
      <path d="M -30 950 Q -8 930 16 940" stroke="#39414a" strokeWidth={5} fill="none" />

      {/* Avant-bras qui sort du cadre */}
      <path d="M -54 1000 L -116 1082 L 40 1082 L 34 1010 Z" fill={SKIN} />
      <path d="M -54 1000 L -96 1052 L -46 1082 L -8 1030 Z" fill="#00000022" />
    </g>
  );

  return (
    <g
      transform={`translate(${bx.toFixed(2)} ${(by - 46).toFixed(2)}) rotate(${steer.toFixed(2)} 960 1300)`}
    >
      {/* Pneu avant : vu de dessus il ne fait qu'une bande étroite */}
      <path d="M 948 946 L 972 946 L 986 1082 L 934 1082 Z" fill="#0a0c0e" />
      <path d="M 953 952 L 967 952 L 975 1082 L 945 1082 Z" fill="#1a1e22" />
      <path d="M 958 960 L 962 960 L 964 1082 L 956 1082 Z" fill="#4d545b" opacity={0.6} />

      {/* Têtes de fourche de part et d'autre */}
      <path d="M 918 992 L 936 986 L 926 1082 L 896 1082 Z" fill={NAVY} />
      <path d="M 1002 992 L 984 986 L 994 1082 L 1024 1082 Z" fill={NAVY} />

      {/* Compteur sur support déporté, à peine dans le cadre */}
      <g>
        <rect x={874} y={892} width={172} height={104} rx={13} fill="#090b0d" />
        <rect x={886} y={904} width={148} height={80} rx={8} fill="#16261f" />
        <text
          x={960}
          y={950}
          textAnchor="middle"
          fontFamily="ui-monospace, 'Space Mono', monospace"
          fontSize={44}
          fontWeight={700}
          fill="#9ce8b4"
        >
          {speed.toFixed(1)}
        </text>
        <text
          x={960}
          y={974}
          textAnchor="middle"
          fontFamily="ui-monospace, 'Space Mono', monospace"
          fontSize={16}
          fill="#5f9c74"
        >
          KM/H
        </text>
      </g>

      {/* Cintre : seul le dessus de la barre entre dans le champ */}
      <path
        d="M 190 1176 Q 580 1060 960 1066 Q 1340 1060 1730 1176"
        stroke="#0b0d10"
        strokeWidth={40}
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 190 1162 Q 580 1050 960 1056 Q 1340 1050 1730 1162"
        stroke="#2b3138"
        strokeWidth={8}
        fill="none"
        strokeLinecap="round"
        opacity={0.55}
      />

      <Hand cx={520} flip={1} />
      <Hand cx={1400} flip={-1} />
    </g>
  );
};
