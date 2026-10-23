# valastro-dev

Portfolio personale di **Christian Valastro**, Junior IT Support / Help Desk / Full Stack Web Developer a Catania.

Assistenza informatica e sviluppo web: competenze hardware e software, esperienza pratica, formazione e progetti in un sito vetrina con grafica editoriale, scena 3D e animazioni.

[Visita il portfolio](https://valastro-dev.netlify.app/) · [LinkedIn](https://www.linkedin.com/in/christian-valastro/) · [GitHub](https://github.com/christianvalastroo)

## Contenuti

- Presentazione del profilo IT e web.
- Diagnostica hardware, riparazione di PC, MacBook e smartphone, installazione software e utilizzo di Windows e macOS.
- Esperienza pratica nell’assistenza informatica, problem solving e attenzione al cliente.
- Certificazioni EPICODE Full Stack Web Development ed ECDL.
- Progetti con anteprime reali, pulsante **Apri progetto** e collegamento al codice.
- Servizi di sviluppo web e contatti diretti.

L’interfaccia mantiene la palette scura con accenti arancio e menta, la navigazione laterale, il menu mobile e il supporto alla preferenza di movimento ridotto.

## Progetti

| Progetto | Esperienza | Codice |
| --- | --- | --- |
| **EasyTrip** | Travel planner full-stack per attività, budget, note e checklist. [Apri l’app](https://easytrip-sigma.vercel.app/). | [Repository](https://github.com/christianvalastroo/Easytrip) |
| **Inviti per compleanno · Busta interattiva** | Busta animata, musica, coriandoli, conto alla rovescia e conferma su WhatsApp. Demo inclusa nel portfolio. | [Repository](https://github.com/christianvalastroo/invito-compleanno) |
| **Inviti per compleanno · Eleganza e animazione** | Busta bordeaux e oro, animazioni, musica e informazioni sull’evento. Demo inclusa nel portfolio. | [Repository](https://github.com/christianvalastroo/invito-Martina) |

### Demo degli inviti

Gli inviti sono siti statici autonomi in `public/progetti/`, distribuiti insieme al portfolio. Non richiedono backend o installazioni aggiuntive. Dalle schede, **Apri progetto** apre la demo in una nuova scheda; **Vedi codice** apre il repository GitHub.

Con il server locale avviato, aggiungere al suo indirizzo uno di questi percorsi:

- `/progetti/busta-interattiva/index.html`
- `/progetti/invito-elegante/index.html`

I percorsi restano validi anche nella build di produzione. Audio, video e sfondo degli inviti vengono richiesti dalle rispettive demo, non dalla pagina principale del portfolio.

Le copie locali sono indipendenti dai repository originali. Per aggiornarle, riportare HTML, CSS, JavaScript e risorse nella rispettiva cartella e aggiornare l’anteprima in `src/assets/projects/` se cambia la grafica.

## Tecnologie

| Area | Strumenti |
| --- | --- |
| Interfaccia | React, JavaScript, HTML, CSS, Lucide |
| Scena 3D | Three.js, React Three Fiber, Drei |
| Animazioni | GSAP, ScrollTrigger |
| Sviluppo e build | Vite, npm |
| Analisi statica | oxlint |
| Demo degli inviti | HTML, CSS e JavaScript senza dipendenze npm |

## Avvio locale

Requisiti: Node.js `20.19+` oppure `22.12+` e npm, compatibili con Vite 8.

```bash
git clone https://github.com/christianvalastroo/Portafolio.git
cd Portafolio
npm ci
npm run dev
```

Aprire l’indirizzo mostrato da Vite nel terminale.

## Comandi

| Comando | Funzione |
| --- | --- |
| `npm run dev` | Avvia il server di sviluppo. |
| `npm run lint` | Esegue l’analisi statica del codice. |
| `npm run build` | Genera il sito in `dist/`, incluse le demo. |
| `npm run preview` | Serve localmente la build già generata. |

Per verificare la versione di produzione:

```bash
npm run lint
npm run build
npm run preview
```

La scena 3D è caricata separatamente. Vite può segnalare che il suo bundle supera 500 kB: è un avviso sulle dimensioni, non un errore di compilazione.

## Struttura

```text
src/
  App.jsx                 Contenuti, navigazione e schede dei progetti
  App.css                 Stili e layout responsive
  assets/projects/        Anteprime dei progetti
  components/             Scena 3D, sfondo ed effetti
  utils/                  Funzioni di supporto
public/
  progetti/
    busta-interattiva/     Primo invito completo di risorse
    invito-elegante/       Secondo invito completo di risorse
index.html                Metadati e punto di ingresso
```

## Pubblicazione

Il sito è predisposto per hosting statico. Su Netlify usare `npm run build` come comando di build e `dist` come cartella di pubblicazione. Le demo vengono copiate automaticamente da `public/progetti/`.

Commit e build locali non pubblicano il sito: il rilascio dipende dalla configurazione del servizio di hosting e dal relativo flusso di deploy.

## Contatti

- [Email](mailto:valastro.dev@outlook.it)
- [WhatsApp](https://wa.me/37060266624)
- [LinkedIn](https://www.linkedin.com/in/christian-valastro/)
- [GitHub](https://github.com/christianvalastroo)
