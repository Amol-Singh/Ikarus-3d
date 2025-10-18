import React from "react";

const sampleImages = [
  "https://picsum.photos/seed/1/400/300",
  "https://picsum.photos/seed/2/400/300",
  "https://picsum.photos/seed/3/400/300",
  "https://picsum.photos/seed/4/400/300"
];

function Button({ cfg, children }) {
  const shadows = {
    none: "none",
    small: "0 1px 3px rgba(0,0,0,0.12)",
    medium: "0 4px 8px rgba(0,0,0,0.15)",
    large: "0 8px 20px rgba(0,0,0,0.2)"
  };
  return (
    <div style={{ textAlign: cfg.button.alignment }}>
      <button
        style={{
          background: cfg.button.backgroundColor,
          color: cfg.button.textColor,
          padding: "10px 18px",
          border: "none",
          borderRadius: cfg.button.borderRadius,
          boxShadow: shadows[cfg.button.shadow] || "none",
          cursor: "pointer",
          fontSize: cfg.typography.fontSize,
          fontWeight: cfg.typography.fontWeight
        }}
      >
        {children}
      </button>
    </div>
  );
}

function Gallery({ cfg }) {
  const gap = cfg.gallery.gap;
  const radius = cfg.gallery.imageRadius;
  const alignMap = {
    "grid-left": "flex-start",
    "grid-center": "center",
    "grid-right": "flex-end",
    carousel: "center"
  };

  const justify = alignMap[cfg.gallery.alignment] || "center";

  if (cfg.gallery.alignment === "carousel") {
    return (
      <div className="carousel" style={{ gap: `${gap}px` }}>
        {sampleImages.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            style={{ width: 300, borderRadius: radius, display: "block", margin: "0 auto" }}
          />
        ))}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", justifyContent: justify, gap: `${gap}px`, flexWrap: "wrap" }}>
      {sampleImages.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          style={{
            width: 160,
            height: 120,
            objectFit: "cover",
            borderRadius: radius,
            border: `${cfg.stroke.strokeWeight}px solid ${cfg.stroke.strokeColor}`
          }}
        />
      ))}
    </div>
  );
}

export default function Preview({ config }) {
  const cfg = config;
  const styleRoot = {
    fontFamily: cfg.typography.fontFamily,
    fontWeight: cfg.typography.fontWeight,
    fontSize: cfg.typography.fontSize + "px",
    padding: cfg.layout.containerPadding,
    background: "#f3f4f6",
    minHeight: "100vh"
  };

  const cardStyle = {
    borderRadius: cfg.layout.cardRadius,
    padding: 20,
    background: cfg.layout.sectionBg,
    border: `${cfg.stroke.strokeWeight}px solid ${cfg.stroke.strokeColor}`,
    boxShadow: "0 2px 6px rgba(0,0,0,0.04)"
  };

  // Two example layouts
  if (cfg.layoutSwitch === "layoutB") {
    return (
      <main style={styleRoot}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <div style={cardStyle}>
            <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <h1 style={{ margin: 0 }}>Product Title - Variant B</h1>
                <p style={{ marginTop: 8, marginBottom: 12 }}>
                  A different layout: description text goes here to show typography and spacing.
                </p>
                <Button cfg={cfg}>Action Button</Button>
              </div>
              <div style={{ width: 320 }}>
                <Gallery cfg={cfg} />
              </div>
            </div>
          </div>

          <div style={{ height: 16 }} />

          <div style={cardStyle}>
            <h3>Secondary Section</h3>
            <p>More content demonstrating card radius, padding, and stroke.</p>
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ flex: 1, padding: 12, background: "#fff", borderRadius: 8 }}>
                <strong>Stats</strong>
                <div>Value 1</div>
                <div>Value 2</div>
              </div>
              <div style={{ flex: 1, padding: 12, background: "#fff", borderRadius: 8 }}>
                <strong>More</strong>
                <div>Value A</div>
                <div>Value B</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // layoutA (default)
  return (
    <main style={styleRoot}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={cardStyle}>
          <h1 style={{ margin: 0 }}>Product Title</h1>
          <p style={{ marginTop: 8 }}>
            This preview reflects your live changes for typography, colors, spacing and more.
          </p>

          <Gallery cfg={cfg} />

          <div style={{ height: 16 }} />

          <Button cfg={cfg}>Primary Action</Button>
        </div>

        <div style={{ height: 16 }} />

        <div style={cardStyle}>
          <h2>Another section</h2>
          <p>Use these blocks to preview card corners, stroke, and background color.</p>
        </div>
      </div>
    </main>
  );
}
