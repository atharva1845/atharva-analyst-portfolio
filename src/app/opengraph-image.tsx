import { ImageResponse } from "next/og";

export const alt = "Atharva Rajoba - Business, Product and Data Analyst";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 76px",
          background: "linear-gradient(135deg, #eef1ff 0%, #ffd8df 55%, #ffe39d 100%)",
          color: "#15151f",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 62,
              height: 62,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 8,
              background: "#15151f",
              color: "white",
              fontSize: 22,
              fontWeight: 800,
            }}
          >
            AR
          </div>
          <span style={{ fontSize: 24, fontWeight: 700 }}>Business clarity, powered by evidence</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h1 style={{ margin: 0, fontSize: 86, lineHeight: 1, fontWeight: 900 }}>Atharva Rajoba.</h1>
          <p style={{ margin: 0, fontSize: 32, fontWeight: 600, color: "#3f4250" }}>
            Business Analyst / Product Analyst / Data Analyst
          </p>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {["Business Analysis", "Product Thinking", "Data Analytics", "Applied AI"].map((item) => (
            <span
              key={item}
              style={{
                padding: "10px 15px",
                border: "1px solid rgba(21, 21, 31, 0.25)",
                borderRadius: 6,
                fontSize: 18,
                fontWeight: 700,
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
