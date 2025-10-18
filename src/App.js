import React, { useState, useEffect } from "react";
import Editor from "./Editor";
import Preview from "./Preview";

const defaultConfig = {
  typography: {
    fontFamily: "Inter, sans-serif",
    fontWeight: 400,
    fontSize: 16
  },
  button: {
    borderRadius: 8,
    shadow: "small",
    alignment: "center",
    backgroundColor: "#2563eb",
    textColor: "#ffffff"
  },
  gallery: {
    alignment: "grid-center",
    gap: 8,
    imageRadius: 8
  },
  layout: {
    cardRadius: 12,
    containerPadding: 24,
    sectionBg: "#ffffff"
  },
  stroke: {
    strokeColor: "#e5e7eb",
    strokeWeight: 1
  },
  layoutSwitch: "layoutA"
};

export default function App() {
  const [config, setConfig] = useState(() => {
    try {
      const raw = localStorage.getItem("ui-config");
      return raw ? JSON.parse(raw) : defaultConfig;
    } catch {
      return defaultConfig;
    }
  });

  useEffect(() => {
    localStorage.setItem("ui-config", JSON.stringify(config));
  }, [config]);

  // export JSON file
  function exportJSON() {
    const dataStr = JSON.stringify(config, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ui-config.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function importJSON(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        setConfig((prev) => ({ ...prev, ...parsed }));
      } catch (err) {
        alert("Invalid JSON");
      }
    };
    reader.readAsText(file);
  }

  function resetDefaults() {
    if (!window.confirm("Reset to defaults?")) return;
    setConfig(defaultConfig);
  }

  return (
    <div className="app-root">
      <Editor
        config={config}
        setConfig={setConfig}
        onExport={exportJSON}
        onImport={importJSON}
        onReset={resetDefaults}
      />
      <Preview config={config} />
    </div>
  );
}
