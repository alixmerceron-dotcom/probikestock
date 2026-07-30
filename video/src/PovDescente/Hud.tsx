import React from "react";
import { curveSlope } from "./world";

const MONO = "ui-monospace, 'Space Mono', 'SFMono-Regular', Menlo, monospace";
const LIME = "#C6F000";

const pad = (n: number, len = 2) => String(Math.floor(n)).padStart(len, "0");

/** Incrustation de la caméra embarquée : témoin d'enregistrement, télémétrie. */
export const Hud: React.FC<{ t: number; s: number; speed: number }> = ({
  t,
  s,
  speed,
}) => {
  const rec = Math.sin(t * Math.PI * 2) > -0.2;
  const timecode = `${pad(0)}:${pad(t / 60)}:${pad(t % 60)}.${pad((t * 100) % 100)}`;
  // Pente : plus le virage est serré, plus on est haut dans le lacet
  const grade = -(6.8 + 2.4 * Math.sin(s / 45) + Math.abs(curveSlope(s)) * 6);
  const battery = Math.max(0.18, 0.74 - t * 0.004);

  const label: React.CSSProperties = {
    fontFamily: MONO,
    color: "#ffffff",
    letterSpacing: "0.14em",
    textShadow: "0 2px 10px rgba(0,0,0,0.75)",
  };

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {/* Enregistrement */}
      <div
        style={{
          position: "absolute",
          top: 54,
          left: 66,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: 11,
            background: "#ff2b1f",
            opacity: rec ? 1 : 0.15,
            boxShadow: rec ? "0 0 22px rgba(255,43,31,0.85)" : "none",
          }}
        />
        <span style={{ ...label, fontSize: 26, fontWeight: 700 }}>REC</span>
        <span style={{ ...label, fontSize: 22, opacity: 0.75 }}>4K60 · WIDE</span>
      </div>

      {/* Timecode et batterie */}
      <div
        style={{
          position: "absolute",
          top: 54,
          right: 66,
          display: "flex",
          alignItems: "center",
          gap: 22,
        }}
      >
        <span style={{ ...label, fontSize: 26 }}>{timecode}</span>
        <div
          style={{
            width: 52,
            height: 24,
            border: "3px solid rgba(255,255,255,0.85)",
            borderRadius: 4,
            padding: 3,
          }}
        >
          <div
            style={{
              width: `${battery * 100}%`,
              height: "100%",
              background: battery > 0.25 ? "#ffffff" : "#ff2b1f",
            }}
          />
        </div>
      </div>

      {/* Télémétrie */}
      <div style={{ position: "absolute", bottom: 58, left: 66 }}>
        <div
          style={{
            ...label,
            fontSize: 132,
            fontWeight: 700,
            lineHeight: 0.9,
            letterSpacing: "-0.02em",
          }}
        >
          {Math.round(speed)}
          <span style={{ fontSize: 40, marginLeft: 14, letterSpacing: "0.1em" }}>
            KM/H
          </span>
        </div>
        <div style={{ display: "flex", gap: 40, marginTop: 18 }}>
          <span style={{ ...label, fontSize: 30, color: LIME }}>
            {grade.toFixed(1)}%
          </span>
          <span style={{ ...label, fontSize: 30, opacity: 0.85 }}>
            {(1_842 - s * 0.09).toFixed(0)} M
          </span>
          <span style={{ ...label, fontSize: 30, opacity: 0.85 }}>
            {(s / 1000).toFixed(2)} KM
          </span>
        </div>
      </div>

      {/* Signature */}
      <div
        style={{
          position: "absolute",
          bottom: 58,
          right: 66,
          textAlign: "right",
        }}
      >
        <div style={{ ...label, fontSize: 24, opacity: 0.7 }}>DESCENTE — COL</div>
        <div
          style={{
            ...label,
            fontSize: 30,
            color: LIME,
            fontWeight: 700,
            marginTop: 10,
          }}
        >
          @probikestock
        </div>
      </div>
    </div>
  );
};
