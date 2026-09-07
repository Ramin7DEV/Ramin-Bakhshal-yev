"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const projects = [
  {
    id: "mirrorly",
    index: "01",
    type: "AI / Mobile product",
    title: "Mirrorly",
    statement: "AI-supported reflection flow for a more focused mobile experience.",
    note: "Less noise. Better next action.",
    image: "/images/project-mirrorly.png",
    imageAlt:
      "Two dark smartphones with an abstract AI interface on a graphite surface.",
    accent: "gold",
  },
  {
    id: "otur",
    index: "02",
    type: "Local platform",
    title: "Azerbaijan Otur",
    statement: "A calmer local mobility experience, made for trust and clear routes.",
    note: "Trust is a navigation layer.",
    image: "/images/project-azerbaijan-otur.png",
    imageAlt:
      "A phone displaying an abstract map beside a key and compass on a paper map.",
    accent: "cyan",
  },
  {
    id: "beauty",
    index: "03",
    type: "Concept / UI system",
    title: "Beauty App",
    statement: "A quiet editorial UI system for a more intentional beauty ritual.",
    note: "Softness needs a strong system.",
    image: "/images/project-beauty-app.png",
    imageAlt:
      "A mobile beauty app beside a cosmetic bottle and a translucent oval mirror.",
    accent: "ivory",
  },
] as const;

type ProjectId = (typeof projects)[number]["id"];

const systemNotes = [
  {
    index: "01",
    title: "The signal",
    copy: "İstifadəçinin növbəti qərarını tapıram. Vizual bu qərarı aydınlaşdırmalıdır.",
  },
  {
    index: "02",
    title: "The system",
    copy: "Product logic, hierarchy və interface eyni dilin hissələri kimi işləyir.",
  },
  {
    index: "03",
    title: "The feeling",
    copy: "Premium hiss çox elementdən yox, düzgün seçilmiş elementlərdən yaranır.",
  },
] as const;

export default function Home() {
  const [activeProjectId, setActiveProjectId] = useState<ProjectId>(projects[0].id);
  const [menuOpen, setMenuOpen] = useState(false);
  const introDialogRef = useRef<HTMLDialogElement>(null);
  const menuDialogRef = useRef<HTMLDialogElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const activeProject = projects.find((project) => project.id === activeProjectId) ?? projects[0];

  useEffect(() => {
    const introDialog = introDialogRef.current;
    const isDismissed = typeof window !== "undefined" && sessionStorage.getItem("intro_dismissed") === "true";
    if (introDialog && !introDialog.open && !isDismissed) {
      introDialog.showModal();
    }
  }, []);

  function dismissIntro() {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("intro_dismissed", "true");
    }
    introDialogRef.current?.close();
  }

  function handleIntroClose() {
    window.requestAnimationFrame(() => mainRef.current?.focus());
  }

  function openMenu() {
    const menuDialog = menuDialogRef.current;
    if (menuDialog && !menuDialog.open) {
      menuDialog.showModal();
      setMenuOpen(true);
    }
  }

  function closeMenu() {
    menuDialogRef.current?.close();
  }

  function handleMenuClose() {
    setMenuOpen(false);
  }

  return (
    <div className="atelier-page">
      <a className="skip-link" href="#main-content">
        Əsas məzmuna keç
      </a>

      <dialog
        ref={introDialogRef}
        className="intro-gate"
        aria-labelledby="intro-title"
        onClose={handleIntroClose}
        onWheel={(e) => {
          if (e.deltaY > 0) dismissIntro();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) dismissIntro();
        }}
      >
        <div className="intro-gate__grain" />
        <div className="intro-gate__topline">
          <span>RB-01 / AI Atelier</span>
          <button type="button" onClick={dismissIntro}>
            Skip opening
          </button>
        </div>
        <div className="intro-gate__core">
          <span className="intro-gate__index">001</span>
          <p>Initializing a more considered interface.</p>
          <p id="intro-title" className="intro-gate__title">
            <span>MAKE</span>
            <span>THE</span>
            <span>SYSTEM</span>
            <i>THINK.</i>
          </p>
          <button type="button" className="intro-gate__enter" onClick={dismissIntro}>
            <span>Enter the atelier</span>
            <span aria-hidden="true">↓</span>
          </button>
        </div>
        <div className="intro-gate__coordinates">40.4093° N / 49.8671° E</div>
      </dialog>

      <header className="system-nav">
        <a href="#main-content" className="system-nav__brand" aria-label="Ana səhifəyə keç">
          <span>RB</span>
          <strong>Ramin Bakhshaliyev</strong>
        </a>
        <nav aria-label="Əsas menyu">
          <a href="#projects">Work</a>
          <a href="#method">Method</a>
          <a href="#contact">Contact</a>
        </nav>
        <span className="system-nav__status">Available / 2026</span>
        <button
          type="button"
          className="system-nav__menu"
          aria-haspopup="dialog"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={openMenu}
        >
          Menu <span aria-hidden="true">↗</span>
        </button>
      </header>

      <dialog
        id="mobile-menu"
        ref={menuDialogRef}
        className="mobile-menu"
        aria-labelledby="mobile-menu-title"
        onClose={handleMenuClose}
      >
        <div className="mobile-menu__header">
          <p id="mobile-menu-title">Navigate</p>
          <button type="button" onClick={closeMenu}>
            Close <span aria-hidden="true">×</span>
          </button>
        </div>
        <nav aria-label="Mobil menyu">
          <a href="#projects" onClick={closeMenu}>Work</a>
          <a href="#method" onClick={closeMenu}>Method</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
      </dialog>

      <main id="main-content" ref={mainRef} tabIndex={-1}>
        <section className="atelier-hero" aria-labelledby="hero-title">
          <div className="atelier-hero__grid" />
          <div className="atelier-hero__meta atelier-hero__meta--top">
            <span>Studio practice</span>
            <span>01 / 04</span>
          </div>
          <div className="atelier-hero__copy">
            <p className="system-label">AI-first product engineer</p>
            <h1 id="hero-title">
              <span>Interfaces</span>
              <span>that learn</span>
              <span>to <i>listen.</i></span>
            </h1>
            <p className="atelier-hero__description">
              AI, mobile products və vizual sistemlər. Sürətli işləyən, sakit hiss olunan
              və istifadəçi üçün doğru qərarı görünən edən təcrübələr.
            </p>
          </div>

          <figure className="atelier-hero__workbench">
            <Image
              src="/images/hero-studio.png"
              alt="Zərif, qaranlıq studiyada mobil məhsul interfeysləri üzərində işləyən developer."
              fill
              priority
              sizes="(max-width: 760px) 100vw, 62vw"
              className="atelier-image"
            />
            <div className="atelier-hero__wash" />
            <span className="workbench-tag workbench-tag--north">Product logic</span>
            <span className="workbench-tag workbench-tag--east">Visual rhythm</span>
            <span className="workbench-tag workbench-tag--south">AI orchestration</span>
            <figcaption>Ramin Bakhshaliyev / workstation 01</figcaption>
          </figure>

          <div className="atelier-hero__meta atelier-hero__meta--bottom">
            <a href="#projects">Scroll to explore <span>↓</span></a>
            <span>Built in Baku / Working globally</span>
          </div>
        </section>

        <section id="projects" className="project-navigator" aria-labelledby="project-navigator-title">
          <div className="navigator-heading">
            <div>
              <p className="system-label">Selected signals</p>
              <h2 id="project-navigator-title">Choose a project to enter.</h2>
            </div>
            <p>
              Hər iş ayrı məhsul dünyasıdır. Navigator yalnız giriş nöqtəsidir, case
              isə öz ritmini aşağıda açır.
            </p>
          </div>

          <div className={`navigator-stage navigator-stage--${activeProject.accent}`}>
            <div className="navigator-stage__grid" />
            <div className="navigator-stage__readout">
              <span>Selected artifact</span>
              <strong>{activeProject.index}</strong>
            </div>
            <div className="navigator-stage__image" key={activeProject.id}>
              <Image
                src={activeProject.image}
                alt={activeProject.imageAlt}
                fill
                sizes="(max-width: 760px) 100vw, 68vw"
                className="atelier-image"
              />
            </div>
            <div className="navigator-stage__copy">
              <span>{activeProject.type}</span>
              <h3>{activeProject.title}</h3>
              <p>{activeProject.statement}</p>
            </div>

            <fieldset className="navigator-stage__controls">
              <legend className="visually-hidden">Layihə seçimi</legend>
              {projects.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  className={`project-signal project-signal--${project.accent} ${
                    project.id === activeProjectId ? "is-active" : ""
                  }`}
                  onClick={() => setActiveProjectId(project.id)}
                  aria-pressed={project.id === activeProjectId}
                >
                  <span>{project.index}</span>
                  <strong>{project.title}</strong>
                  <i>{project.type}</i>
                </button>
              ))}
            </fieldset>
            <p className="visually-hidden" role="status" aria-atomic="true">
              Seçilmiş layihə: {activeProject.title}. {activeProject.statement}
            </p>
          </div>
        </section>

        <div className="case-sequence">
          {projects.map((project, index) => (
            <section
              id={`case-${project.id}`}
              key={project.id}
              className={`case-scene case-scene--${project.accent}`}
              aria-labelledby={`${project.id}-title`}
            >
              <div className="case-scene__sticky">
                <div className="case-scene__numeral">{project.index}</div>
                <div className="case-scene__frame">
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    sizes="100vw"
                    className="atelier-image"
                  />
                  <div className="case-scene__shade" />
                  <div className="case-scene__frame-label">Scene / 0{index + 1}</div>
                </div>
                <div className="case-scene__content">
                  <div className="case-scene__eyebrow">
                    <span>{project.index}</span>
                    <span>{project.type}</span>
                  </div>
                  <h2 id={`${project.id}-title`}>{project.title}</h2>
                  <p>{project.statement}</p>
                  <span className="case-scene__note">{project.note}</span>
                </div>
              </div>
            </section>
          ))}
        </div>

        <section id="method" className="method-room" aria-labelledby="method-title">
          <div className="method-room__title">
            <p className="system-label">Method / no decoration without direction</p>
            <h2 id="method-title">
              A design system should feel <i>inevitable.</i>
            </h2>
          </div>
          <div className="method-room__notes">
            {systemNotes.map((note) => (
              <article key={note.index}>
                <span>{note.index}</span>
                <h3>{note.title}</h3>
                <p>{note.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="dispatch" aria-labelledby="dispatch-title">
          <div className="dispatch__lines" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <p className="system-label">Transmission channel open</p>
          <h2 id="dispatch-title">
            Have a product worth <i>building?</i>
          </h2>
          <div className="dispatch__actions">
            <a href="mailto:raminbakhshaliyev@gmail.com">Start a conversation <span>↗</span></a>
            <a href="https://github.com/Ramin7DEV" target="_blank" rel="noreferrer">
              Browse GitHub <span>↗</span>
            </a>
          </div>
          <footer>
            <span>© 2026 Ramin Bakhshaliyev</span>
            <span>RB-01 / Baku, Azerbaijan</span>
          </footer>
        </section>
      </main>
    </div>
  );
}
