import { ImageResponse } from "next/og";
import { contact } from "@/lib/site";

// Preview image shown when a link to the site is shared (LinkedIn, Slack, X, WhatsApp…).
export const alt = `${contact.name} — Portfolio: SEO, GEO, no-code & digital transformation`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const pills = ["#d3e8e6", "#f9dfc9"];
const skills = ["SEO", "GEO", "No-code", "Digital & AI"];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#ffffff",
          color: "#1b2427",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "#145c63",
              color: "#ffffff",
              fontSize: 30,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            AS
          </div>
          <div style={{ width: 120, height: 8, borderRadius: 4, background: "#e8995b" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, fontWeight: 600, letterSpacing: -2, lineHeight: 1.1 }}>{contact.name}</div>
          <div style={{ fontSize: 36, color: "#52605f", marginTop: 16, lineHeight: 1.3 }}>
            Business student · websites, apps and tools, findable on Google and AI engines
          </div>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          {skills.map((s, i) => (
            <div
              key={s}
              style={{ fontSize: 30, padding: "12px 28px", borderRadius: 999, background: pills[i % pills.length], color: "#0d3a40" }}
            >
              {s}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
