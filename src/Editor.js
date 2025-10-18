import React from "react";


// helper small inputs
function ColorInput({ value, onChange }) {
  return (
    <div className="row">
      <input type="color" value={value} onChange={(e) => onChange(e.target.value)} />
      <input
        className="text-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="#rrggbb"
      />
    </div>
  );
}

export default function Editor({ config, setConfig, onExport, onImport, onReset }) {
  const update = (path, value) => {
    setConfig((c) => {
      const next = JSON.parse(JSON.stringify(c));
      const keys = path.split(".");
      let cur = next;
      for (let i = 0; i < keys.length - 1; i++) cur = cur[keys[i]];
      cur[keys[keys.length - 1]] = value;
      return next;
    });
  };

  return (
    <aside className="editor">
      <h2>Dynamic UI Editor</h2>

      <section>
        <h3>Typography</h3>
        <label>Font Family</label>
        <select
          value={config.typography.fontFamily}
          onChange={(e) => update("typography.fontFamily", e.target.value)}
        >
          <option value={'Inter, sans-serif'}>Inter</option>
          <option value={'Roboto, sans-serif'}>Roboto</option>
          <option value={'Poppins, sans-serif'}>Poppins</option>
          <option value={'system-ui, sans-serif'}>System</option>
        </select>

        <label>Font Weight</label>
        <input
          type="range"
          min="300"
          max="800"
          step="100"
          value={config.typography.fontWeight}
          onChange={(e) => update("typography.fontWeight", Number(e.target.value))}
        />
        <div className="small-label">{config.typography.fontWeight}</div>

        <label>Font Size (px)</label>
        <input
          type="range"
          min="10"
          max="60"
          value={config.typography.fontSize}
          onChange={(e) => update("typography.fontSize", Number(e.target.value))}
        />
        <div className="small-label">{config.typography.fontSize}px</div>
      </section>

      <section>
        <h3>Button</h3>
        <label>Border Radius</label>
        <input
          type="range"
          min="0"
          max="40"
          value={config.button.borderRadius}
          onChange={(e) => update("button.borderRadius", Number(e.target.value))}
        />
        <div className="small-label">{config.button.borderRadius}px</div>

        <label>Shadow</label>
        <select
          value={config.button.shadow}
          onChange={(e) => update("button.shadow", e.target.value)}
        >
          <option value="none">None</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>

        <label>Alignment</label>
        <select
          value={config.button.alignment}
          onChange={(e) => update("button.alignment", e.target.value)}
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>

        <label>Background & Text Color</label>
        <ColorInput
          value={config.button.backgroundColor}
          onChange={(v) => update("button.backgroundColor", v)}
        />
        <ColorInput
          value={config.button.textColor}
          onChange={(v) => update("button.textColor", v)}
        />
      </section>

      <section>
        <h3>Galleries / Images</h3>
        <label>Gallery Alignment</label>
        <select
          value={config.gallery.alignment}
          onChange={(e) => update("gallery.alignment", e.target.value)}
        >
          <option value="grid-left">Grid Left</option>
          <option value="grid-center">Grid Center</option>
          <option value="grid-right">Grid Right</option>
          <option value="carousel">Carousel (stacked)</option>
        </select>

        <label>Spacing Between Images</label>
        <input
          type="range"
          min="0"
          max="40"
          value={config.gallery.gap}
          onChange={(e) => update("gallery.gap", Number(e.target.value))}
        />
        <div className="small-label">{config.gallery.gap}px</div>

        <label>Image Border Radius</label>
        <input
          type="range"
          min="0"
          max="40"
          value={config.gallery.imageRadius}
          onChange={(e) => update("gallery.imageRadius", Number(e.target.value))}
        />
        <div className="small-label">{config.gallery.imageRadius}px</div>
      </section>

      <section>
        <h3>General Layout</h3>
        <label>Card Corner Radius</label>
        <input
          type="range"
          min="0"
          max="40"
          value={config.layout.cardRadius}
          onChange={(e) => update("layout.cardRadius", Number(e.target.value))}
        />
        <div className="small-label">{config.layout.cardRadius}px</div>

        <label>Container Padding</label>
        <input
          type="range"
          min="0"
          max="80"
          value={config.layout.containerPadding}
          onChange={(e) => update("layout.containerPadding", Number(e.target.value))}
        />
        <div className="small-label">{config.layout.containerPadding}px</div>

        <label>Section Background Color</label>
        <input
          type="color"
          value={config.layout.sectionBg}
          onChange={(e) => update("layout.sectionBg", e.target.value)}
        />
      </section>

      <section>
        <h3>Stroke / Border</h3>
        <label>Stroke Color</label>
        <input
          type="color"
          value={config.stroke.strokeColor}
          onChange={(e) => update("stroke.strokeColor", e.target.value)}
        />
        <label>Stroke Weight</label>
        <input
          type="range"
          min="0"
          max="6"
          value={config.stroke.strokeWeight}
          onChange={(e) => update("stroke.strokeWeight", Number(e.target.value))}
        />
        <div className="small-label">{config.stroke.strokeWeight}px</div>
      </section>

      <section>
        <h3>Layout Switching</h3>
        <div className="row">
          <button
            className={`tiny ${config.layoutSwitch === "layoutA" ? "active" : ""}`}
            onClick={() => setConfig((c) => ({ ...c, layoutSwitch: "layoutA" }))}
          >
            Layout A
          </button>
          <button
            className={`tiny ${config.layoutSwitch === "layoutB" ? "active" : ""}`}
            onClick={() => setConfig((c) => ({ ...c, layoutSwitch: "layoutB" }))}
          >
            Layout B
          </button>
        </div>
      </section>

      <section>
        <h3>Save / Load</h3>
        <div className="row">
          <button onClick={onExport}>Export JSON</button>
          <label className="file-label">
            Import JSON
            <input
              type="file"
              accept=".json,application/json"
              onChange={(e) => {
                onImport(e.target.files[0]);
                e.target.value = "";
              }}
            />
          </label>
        </div>
        <div className="row">
          <button onClick={onReset} className="danger">Reset</button>
        </div>
      </section>

      <footer className="editor-footer">
        <small>Live preview updates instantly. Export config to reuse later.</small>
      </footer>
    </aside>
  );
}
