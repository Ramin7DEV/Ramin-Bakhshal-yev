const COLOR_GROUPS = [
  {
    name: "Surfaces",
    tokens: [
      { name: "--surface-void", value: "var(--surface-void)" },
      { name: "--surface-obsidian", value: "var(--surface-obsidian)" },
      { name: "--surface-graphite", value: "var(--surface-graphite)" },
      { name: "--surface-slate", value: "var(--surface-slate)" },
    ],
  },
  {
    name: "Lines",
    tokens: [
      { name: "--line-hairline", value: "var(--line-hairline)" },
      { name: "--line-medium", value: "var(--line-medium)" },
      { name: "--line-strong", value: "var(--line-strong)" },
    ],
  },
  {
    name: "Text",
    tokens: [
      { name: "--text-primary", value: "var(--text-primary)" },
      { name: "--text-secondary", value: "var(--text-secondary)" },
      { name: "--text-tertiary", value: "var(--text-tertiary)" },
      { name: "--text-inverse", value: "var(--text-inverse)" },
    ],
  },
  {
    name: "Accents",
    tokens: [
      { name: "--accent-gold", value: "var(--accent-gold)" },
      { name: "--accent-signal", value: "var(--accent-signal)" },
      { name: "--accent-gold-dim", value: "var(--accent-gold-dim)" },
      { name: "--accent-signal-dim", value: "var(--accent-signal-dim)" },
    ],
  },
] as const;

export default function Page() {
  return (
    <main
      style={{
        padding: "var(--gutter)",
        maxWidth: "var(--container-max)",
        marginLeft: "auto",
        marginRight: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-9)",
      }}
    >
      <header
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-4)",
        }}
      >
        <span className="t-label" style={{ color: "var(--accent-signal)" }}>
          Phase 0 Review
        </span>
        <h1 className="t-display-xl">
          Design System & <em>Tokens</em>
        </h1>
        <p className="t-body-l" style={{ color: "var(--text-secondary)", maxWidth: "var(--measure)" }}>
          Temporary verification page for design system tokens, typography classes, and color palettes.
        </p>
      </header>

      <section
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-6)",
          borderTop: "var(--border-hairline)",
          paddingTop: "var(--space-6)",
        }}
      >
        <span className="t-label" style={{ color: "var(--text-tertiary)" }}>
          Typography Scale
        </span>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
          <div>
            <span className="t-label" style={{ color: "var(--text-tertiary)" }}>.t-display-xl</span>
            <p className="t-display-xl">Display XL</p>
          </div>
          <div>
            <span className="t-label" style={{ color: "var(--text-tertiary)" }}>.t-display-l</span>
            <p className="t-display-l">Display L Headline</p>
          </div>
          <div>
            <span className="t-label" style={{ color: "var(--text-tertiary)" }}>.t-display-m</span>
            <p className="t-display-m">Display M Section</p>
          </div>
          <div>
            <span className="t-label" style={{ color: "var(--text-tertiary)" }}>.t-heading</span>
            <p className="t-heading">Heading Standard</p>
          </div>
          <div>
            <span className="t-label" style={{ color: "var(--text-tertiary)" }}>.t-body-l</span>
            <p className="t-body-l">Body L editorial lead paragraph text sample.</p>
          </div>
          <div>
            <span className="t-label" style={{ color: "var(--text-tertiary)" }}>.t-body-m</span>
            <p className="t-body-m">Body M regular paragraph text with <em>italic gold emphasis</em> included.</p>
          </div>
          <div>
            <span className="t-label" style={{ color: "var(--text-tertiary)" }}>.t-body-s</span>
            <p className="t-body-s">Body S meta and supporting secondary descriptive information.</p>
          </div>
          <div>
            <span className="t-label" style={{ color: "var(--text-tertiary)" }}>.t-label</span>
            <p className="t-label">Label uppercase mono 0.16em letter-spacing</p>
          </div>
        </div>
      </section>

      <section
        id="font-verification-test"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-4)",
          borderTop: "var(--border-hairline)",
          paddingTop: "var(--space-6)",
        }}
      >
        <span className="t-label" style={{ color: "var(--accent-signal)" }}>
          Cyrillic and Azerbaijani Glyph Verification Test
        </span>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
          <p id="test-cyrillic" className="t-display-l">
            Русский текст
          </p>
          <p id="test-azerbaijan" className="t-display-l">
            Azərbaycan dili — ə ğ ı ö ü ç ş
          </p>
        </div>
      </section>

      <section
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-6)",
          borderTop: "var(--border-hairline)",
          paddingTop: "var(--space-6)",
        }}
      >
        <span className="t-label" style={{ color: "var(--text-tertiary)" }}>
          Color Tokens Swatches
        </span>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "var(--space-6)",
          }}
        >
          {COLOR_GROUPS.map((group) => (
            <div
              key={group.name}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-3)",
                backgroundColor: "var(--surface-graphite)",
                border: "var(--border-hairline)",
                borderRadius: "var(--radius-md)",
                padding: "var(--space-4)",
              }}
            >
              <span className="t-label" style={{ color: "var(--accent-signal)" }}>
                {group.name}
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                {group.tokens.map((token) => (
                  <div
                    key={token.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "var(--space-2)",
                      backgroundColor: "var(--surface-obsidian)",
                      border: "var(--border-hairline)",
                      borderRadius: "var(--radius-xs)",
                    }}
                  >
                    <span className="t-label" style={{ color: "var(--text-secondary)" }}>
                      {token.name}
                    </span>
                    <span
                      style={{
                        display: "inline-block",
                        width: "var(--space-5)",
                        height: "var(--space-5)",
                        borderRadius: "var(--radius-xs)",
                        backgroundColor: token.value,
                        border: "1px solid var(--line-hairline)",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
