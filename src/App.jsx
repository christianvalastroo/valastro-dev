import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowDownRight, ArrowUpRight, Blocks, BriefcaseBusiness, Code2, MonitorCog, Wrench, HardDrive, Mail, MessageCircle, PartyPopper, PanelsTopLeft, ShoppingBag, Smartphone, UtensilsCrossed } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import easytripPreview from './assets/projects/easytrip.png'
import invitationPreview from './assets/projects/invito-18.png'
import SandBackground from './components/SandBackground'
import LightningEffect from './components/LightningEffect'
import { triggerLightning } from './utils/lightning'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

const Scene3D = lazy(() => import('./components/Scene3D'))

const navItems = [
  { label: 'Home', href: '#home', index: '01' },
  { label: 'Competenze IT', href: '#competenze-it', index: '02' },
  { label: 'Progetti', href: '#progetti', index: '03' },
  { label: 'Servizi', href: '#servizi', index: '04' },
  { label: 'Profilo', href: '#chi-sono', index: '05' },
  { label: 'Contatti', href: '#contatti', index: '08' },
]

const projects = [
  {
    number: '01',
    name: 'EasyTrip',
    type: 'Full-stack · Travel planner',
    description: 'Uno spazio personale per progettare viaggi, gestire attività, budget, note e checklist senza perdere il filo.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    href: 'https://github.com/christianvalastroo/Easytrip',
    live: 'https://easytrip-sigma.vercel.app/',
    preview: easytripPreview,
    previewAlt: 'Homepage dell’applicazione EasyTrip',
    accent: '#ff4d1c',
  },
  {
    number: '02',
    name: 'Next Project',
    type: 'Nuova esperienza · In arrivo',
    description: 'Sto lavorando a qualcosa di nuovo. Un progetto pensato per unire utilità, interazioni curate e una solida esperienza full-stack.',
    tech: ['Research', 'Design', 'Development'],
    status: 'In arrivo',
    accent: '#8bf5dc',
  },
  {
    number: '03',
    name: 'Invito del 18°',
    type: 'Frontend · Interactive experience',
    description: 'Un invito digitale pensato per smartphone: una busta argentata si apre e trasforma un gesto semplice in un momento speciale.',
    tech: ['React', 'Vite', 'CSS', 'Motion'],
    href: 'https://github.com/christianvalastroo/invito-18',
    live: 'https://invito-18.vercel.app/',
    preview: invitationPreview,
    previewAlt: 'Busta interattiva dell’Invito del 18°',
    accent: '#f5f1e8',
  },
]

const services = [
  {
    number: '01',
    title: 'Siti vetrina',
    description: 'Una presenza online moderna, veloce e costruita per raccontare al meglio attività, servizi e identità.',
    icon: PanelsTopLeft,
  },
  {
    number: '02',
    title: 'Mini applicazioni',
    description: 'Piccoli strumenti web su misura per semplificare prenotazioni, richieste, calcoli o processi quotidiani.',
    icon: Blocks,
  },
  {
    number: '03',
    title: 'E-commerce',
    description: 'Negozi online intuitivi e responsive, pensati per presentare i prodotti e rendere semplice ogni acquisto.',
    icon: ShoppingBag,
  },
  {
    number: '04',
    title: 'Menu digitali',
    description: 'Menu eleganti e facili da aggiornare per bar e ristoranti, perfetti da consultare tramite QR code.',
    icon: UtensilsCrossed,
  },
  {
    number: '05',
    title: 'Inviti digitali',
    description: 'Esperienze interattive per compleanni, feste ed eventi, con animazioni e dettagli capaci di sorprendere.',
    icon: PartyPopper,
  },
  {
    number: '06',
    title: 'Mobile first',
    description: 'Landing page e interfacce che funzionano bene su ogni schermo, curate dal primo tap all’ultima sezione.',
    icon: Smartphone,
  },
]

const itSkills = [
  {
    title: 'Diagnostica hardware',
    description: 'Individuazione dei malfunzionamenti, analisi dei sintomi e verifica dei componenti per capire l’origine del problema.',
    icon: HardDrive,
    tags: ['Diagnostica', 'Problem solving'],
  },
  {
    title: 'Riparazione dispositivi',
    description: 'Assistenza pratica e riparazione di PC, MacBook e smartphone, con attenzione al funzionamento del dispositivo e alle esigenze di chi lo usa.',
    icon: Wrench,
    tags: ['PC', 'MacBook', 'Smartphone'],
  },
  {
    title: 'Software e sistemi',
    description: 'Installazione e configurazione software, utilizzo di Windows e macOS e supporto nella risoluzione dei problemi quotidiani.',
    icon: MonitorCog,
    tags: ['Windows', 'macOS', 'Software'],
  },
]

function Loader({ hidden }) {
  return (
    <div className={`loader ${hidden ? 'loader--hidden' : ''}`} aria-hidden={hidden}>
      <div className="loader__panel loader__panel--left" />
      <div className="loader__panel loader__panel--right" />
      <div className="loader__content">
        <div className="loader__brand" aria-label="valastro-dev">
          <div className="loader__symbol"><img src="/favicon.svg" alt="" /></div>
          <div className="loader__name">Christian <span>Valastro</span></div>
        </div>
        <div className="loader__track"><span /></div>
        <p>Costruendo l’esperienza</p>
      </div>
    </div>
  )
}

function Sidebar({ open, onToggle }) {
  return (
    <>
      <button
        className={`menu-toggle ${open ? 'menu-toggle--open' : ''}`}
        onClick={onToggle}
        aria-label={open ? 'Chiudi menu' : 'Apri menu'}
        aria-expanded={open}
        aria-controls="sidebar-navigation"
      >
        <span className="menu-toggle__lines" aria-hidden="true">
          <i /><i /><i />
        </span>
      </button>
      <aside className={`sidebar ${open ? 'sidebar--open' : ''}`} id="sidebar-navigation">
        <a className="brand" href="#home" onClick={onToggle} aria-label="valastro-dev · Home">
          <img src="/favicon.svg" alt="" />
        </a>
        <nav aria-label="Navigazione principale">
          {navItems.map((item) => (
            <a href={item.href} key={item.href} onClick={onToggle}>
              <span>{item.index}</span>{item.label}
            </a>
          ))}
        </nav>
        <div className="sidebar__footer">
          <div className="socials">
            <a href="https://github.com/christianvalastroo" target="_blank" rel="noreferrer" aria-label="GitHub"><Code2 /></a>
            <a href="https://www.linkedin.com/in/christian-valastro/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><BriefcaseBusiness /></a>
          </div>
          <p>Catania, IT<br /><span>37.5079° N</span></p>
        </div>
      </aside>
    </>
  )
}

function App() {
  const [loaded, setLoaded] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const appRef = useRef()

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 1700)
    return () => window.clearTimeout(timer)
  }, [])

  useLayoutEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motionQuery.matches) return undefined

    const context = gsap.context(() => {
      gsap.from('.hero__copy > *', {
        y: 44,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        delay: 1.55,
        ease: 'power3.out',
      })

      gsap.utils.toArray('.project-card').forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: 'top 82%', end: 'top 42%', scrub: 0.7 },
          y: 120,
          rotateX: index % 2 ? -8 : 8,
          scale: 0.92,
          opacity: 0.25,
          transformPerspective: 1000,
        })
      })

      gsap.utils.toArray('.service-card').forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: 'top 88%' },
          y: 70,
          rotateY: index % 2 ? 8 : -8,
          opacity: 0,
          duration: 0.8,
          delay: (index % 3) * 0.08,
          ease: 'power3.out',
        })
      })

      gsap.from('.skills__orb', {
        scrollTrigger: { trigger: '.skills', start: 'top 78%', end: 'center center', scrub: 1 },
        rotate: -130,
        scale: 0.55,
      })
    }, appRef)

    return () => context.revert()
  }, [])

  return (
    <div className="app-shell" ref={appRef}>
      <SandBackground />
      <LightningEffect />
      <Loader hidden={loaded} />
      <Sidebar open={menuOpen} onToggle={() => setMenuOpen((value) => !value)} />

      <main>
        <section className="hero" id="home">
          <div className="hero__grid" aria-hidden="true" />
          <div className="hero__copy">
            <div className="eyebrow"><span />IT Support · Web Development</div>
            <h1>
              Build.<br />
              Break.<br />
              <em>Make it better.</em>
            </h1>
            <p>
              Sono Christian Valastro. Unisco assistenza informatica e sviluppo web:
              risolvo problemi hardware e software e creo esperienze digitali
              curate e semplici da usare.
            </p>
            <p className="hero__role">Junior IT Support / Help Desk / Full Stack Web Developer</p>
            <div className="hero__actions">
              <a className="button button--primary" href="#competenze-it">Scopri le competenze <ArrowDownRight /></a>
              <a className="button button--ghost" href="mailto:valastro.dev@outlook.it">Parliamone</a>
            </div>
          </div>

          <div className="hero__visual" aria-label="Scultura tridimensionale interattiva">
            <Suspense fallback={<div className="scene-fallback">Caricamento scena 3D</div>}>
              <Scene3D />
            </Suspense>
            <div className="visual-label visual-label--top">Ideas into<br />real interfaces.</div>
            <div className="visual-label visual-label--bottom">Move your cursor<br />to shape the scene.</div>
          </div>

          <div className="hero__meta">
            <span>Hardware / Windows / macOS / Full Stack</span>
            <span className="availability"><i /> Disponibile per opportunità IT e web</span>
          </div>

          <a className="scroll-cue" href="#progetti">
            <span>Scroll to explore</span><i />
          </a>
        </section>

        <section className="it-expertise" id="competenze-it" aria-labelledby="it-heading">
          <header className="section-heading">
            <span>02 / Competenze IT</span>
            <h2 id="it-heading">Hardware e software.<br /><em>Soluzioni concrete.</em></h2>
            <p>Dalla diagnosi di un dispositivo al supporto nell’uso del software: competenze pratiche al servizio delle persone.</p>
          </header>
          <div className="it-expertise__grid">
            {itSkills.map(({ title, description, icon: Icon, tags }, index) => (
              <article className="it-card" key={title}>
                <div className="it-card__top"><span>0{index + 1}</span><Icon aria-hidden="true" /></div>
                <h3>{title}</h3>
                <p>{description}</p>
                <ul aria-label="Ambiti di competenza">{tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        <section className="projects" id="progetti">
          <header className="section-heading">
            <span>03 / Progetti web</span>
            <h2>Progetti che risolvono.<br /><em>Interfacce che restano.</em></h2>
            <p>Dal problema al prodotto: ogni progetto racconta una scelta, una sfida e qualcosa che ho imparato.</p>
          </header>

          <div className="projects__list">
            {projects.map((project) => (
              <article className="project-card" key={project.name} style={{ '--project-accent': project.accent }}>
                <div className="project-card__number">{project.number}</div>
                <div className="project-card__stage">
                  <div className="project-card__window">
                    <span /><span /><span />
                    {project.preview
                      ? <img src={project.preview} alt={project.previewAlt} />
                      : <div className="project-card__code" aria-hidden="true">
                          <i>const idea =</i><b>{`{ ${project.name} }`}</b><i>build → test → improve</i>
                        </div>}
                  </div>
                </div>
                <div className="project-card__content">
                  <p>{project.type}</p>
                  <h3>{project.name}</h3>
                  <p className="project-card__description">{project.description}</p>
                  <ul>{project.tech.map((item) => <li key={item}>{item}</li>)}</ul>
                  <div className="project-card__actions">
                    {project.live && <a className="project-card__live" href={project.live} target="_blank" rel="noreferrer">Apri applicazione <ArrowUpRight /></a>}
                    {project.href
                      ? <a href={project.href} target="_blank" rel="noreferrer">Vedi codice <Code2 /></a>
                      : <span className="project-card__status"><i />{project.status}</span>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="services" id="servizi">
          <div className="services__glow" aria-hidden="true" />
          <header className="services__heading">
            <span>04 / Cosa posso creare</span>
            <h2>La tua idea.<br /><em>Costruita su misura.</em></h2>
            <div className="services__intro">
              <p>Ogni progetto parte da una conversazione. Obiettivi, stile e funzionalità vengono definiti insieme.</p>
              <a href="mailto:valastro.dev@outlook.it?subject=Richiesta%20preventivo">Parliamo del progetto <ArrowUpRight /></a>
            </div>
          </header>

          <div className="services__grid">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <article className="service-card" key={service.title}>
                  <div className="service-card__top">
                    <span>{service.number}</span>
                    <Icon aria-hidden="true" />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <a href={`mailto:valastro.dev@outlook.it?subject=${encodeURIComponent(`Preventivo ${service.title}`)}`}>
                    Richiedi preventivo <ArrowUpRight />
                  </a>
                </article>
              )
            })}
          </div>

          <div className="services__ticker" aria-hidden="true">
            <div>
              <span>NESSUN LISTINO STANDARD</span><i />
              <span>OGNI IDEA È DIVERSA</span><i />
              <span>PREVENTIVO IN PRIVATO</span><i />
              <span>NESSUN LISTINO STANDARD</span><i />
              <span>OGNI IDEA È DIVERSA</span><i />
              <span>PREVENTIVO IN PRIVATO</span><i />
            </div>
          </div>
        </section>

        <section className="about" id="chi-sono">
          <div className="about__intro">
            <span>05 / Profilo ed esperienza</span>
            <h2>Curiosità,<br />tecnica e <em>ascolto.</em></h2>
          </div>
          <div className="about__copy">
            <p className="about__lead">Un approccio pratico, dalle persone alla tecnologia.</p>
            <p>Il mio percorso unisce la pratica nell’assistenza informatica alla formazione full-stack. Mi occupo di diagnostica hardware, riparazione di PC, MacBook e smartphone e installazione software, affiancando queste attività allo sviluppo di applicazioni web.
            </p>
            <div className="about__experience">
              <h3>Assistenza informatica pratica</h3>
              <p>Parto dall’ascolto del problema, ne analizzo le possibili cause e verifico la soluzione sul dispositivo. Problem solving, pazienza e attenzione al cliente guidano il mio modo di lavorare.</p>
              <p>Spiego i passaggi in modo chiaro e aiuto le persone a usare la tecnologia con più autonomia: un approccio che voglio portare in un ruolo Junior IT Support, Help Desk o Tecnico Informatico.</p>
            </div>
            <p>Nei progetti web applico la stessa attenzione: capire un’esigenza, costruire una soluzione e migliorarla attraverso prove concrete.</p>
            <a href="mailto:valastro.dev@outlook.it">Scrivimi una mail <ArrowUpRight /></a>
          </div>
        </section>

        <section className="skills">
          <div className="skills__orb" aria-hidden="true"><span>{`{ }`}</span></div>
          <div className="skills__content">
            <span>06 / Sviluppo web</span>
            <h2>Gli strumenti cambiano.<br /><em>Il modo di pensare resta.</em></h2>
            <div className="skills__grid">
              <div><small>Frontend & CMS</small><p>HTML · CSS · JavaScript<br />React · Bootstrap · Tailwind<br />WordPress</p></div>
              <div><small>Backend</small><p>Node.js · Express<br />MongoDB · REST API</p></div>
              <div><small>Workflow</small><p>Git · GitHub<br />Vite · Vercel · Render</p></div>
            </div>
          </div>
        </section>

        <section className="certifications" id="certificazioni" aria-labelledby="certifications-heading">
          <header className="section-heading">
            <span>07 / Certificazioni</span>
            <h2 id="certifications-heading">Formazione solida.<br /><em>Pratica continua.</em></h2>
            <p>Le basi digitali e le competenze di sviluppo che accompagnano il mio percorso nell’informatica.</p>
          </header>
          <div className="certifications__grid">
            <article className="certification-card">
              <span>01 / Sviluppo web</span>
              <h3>EPICODE</h3>
              <p className="certification-card__title">Full Stack Web Development</p>
              <p>Formazione nello sviluppo di applicazioni web, dal frontend al backend, applicata a progetti concreti come EasyTrip.</p>
            </article>
            <article className="certification-card">
              <span>02 / Competenze digitali</span>
              <h3>ECDL</h3>
              <p className="certification-card__title">Patente europea del computer</p>
              <p>Competenze informatiche di base e utilizzo degli strumenti digitali a supporto delle attività quotidiane.</p>
            </article>
          </div>
        </section>

        <footer className="contact" id="contatti">
          <span>08 / Parliamone</span>
          <h2>Tecnologia e persone.<br /><em>Mettiamoci in contatto.</em></h2>
          <p className="contact__intro">Cerchi un profilo junior per IT Support, Help Desk, assistenza tecnica o sviluppo web? Sono disponibile a parlare di nuove opportunità e progetti.</p>
          <div className="contact__channels">
            <a
              className="contact__mail"
              href="mailto:valastro.dev@outlook.it"
              onPointerEnter={(event) => triggerLightning(event.currentTarget, event.pointerType === 'mouse')}
              onFocus={(event) => triggerLightning(event.currentTarget, false)}
              onClick={(event) => triggerLightning(event.currentTarget, true, true)}
            >
              <Mail /> valastro.dev@outlook.it <ArrowUpRight />
            </a>
            <a
              className="contact__mail contact__whatsapp"
              href="https://wa.me/37060266624"
              target="_blank"
              rel="noreferrer"
              onPointerEnter={(event) => triggerLightning(event.currentTarget, event.pointerType === 'mouse')}
              onFocus={(event) => triggerLightning(event.currentTarget, false)}
              onClick={(event) => triggerLightning(event.currentTarget, true, true)}
            >
              <MessageCircle /> WhatsApp · +370 602 66624 <ArrowUpRight />
            </a>
          </div>
          <div className="contact__bottom">
            <p>Christian Valastro · IT Support & Web Development · Catania</p>
            <div><a href="https://github.com/christianvalastroo">GitHub</a><a href="https://www.linkedin.com/in/christian-valastro/">LinkedIn</a></div>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default App
