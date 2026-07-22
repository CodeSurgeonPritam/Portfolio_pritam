import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          position: "relative",
        }}
      >
        <span
          style={{
            fontSize: 112,
            fontWeight: 700,
            color: "#ededed",
            letterSpacing: -4,
            lineHeight: 1,
            transform: "translate(-4px, 2px)",
          }}
        >
          P
        </span>
        <span
          style={{
            position: "absolute",
            right: 34,
            bottom: 34,
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: "#ff5a1f",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
