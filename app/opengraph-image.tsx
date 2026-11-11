import { ImageResponse } from "next/og";
import { contact } from "@/lib/site";

// Preview image shown when a link to the site is shared (LinkedIn, Slack, X, WhatsApp…).
export const alt = `${contact.name} — ${contact.jobTitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const pastels = ["#d4e3fc", "#f9d9d4", "#fbe7b5", "#d0ecd9"];
const skills = ["SEO", "GEO", "CRO", "UI/UX", "No-code"];

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
          color: "#1f2124",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", gap: 12 }}>
          {pastels.map((c) => (
            <div key={c} style={{ width: 28, height: 28, borderRadius: 14, background: c, border: "2px solid #dadce0" }} />
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 40, color: "#5f6368" }}>{contact.name}</div>
          <div style={{ fontSize: 72, fontWeight: 600, letterSpacing: -2, lineHeight: 1.1 }}>
            Growth Marketer &amp; Product Builder
          </div>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          {skills.map((s, i) => (
            <div
              key={s}
              style={{ fontSize: 30, padding: "12px 28px", borderRadius: 999, background: pastels[i % pastels.length] }}
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
