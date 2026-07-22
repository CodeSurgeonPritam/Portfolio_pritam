import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 7,
          position: "relative",
        }}
      >
        <span
          style={{
            fontSize: 21,
            fontWeight: 700,
            color: "#ededed",
            letterSpacing: -1,
            lineHeight: 1,
            transform: "translate(-1px, 0.5px)",
          }}
        >
          P
        </span>
        <span
          style={{
            position: "absolute",
            right: 6,
            bottom: 6,
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "#ff5a1f",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
