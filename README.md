# Pizzeria Chiesina — sito web

Sito statico (HTML, CSS e JavaScript, nessuna dipendenza) per la pizzeria.

## Sezioni

- **Home** con presentazione e pulsanti "Scopri il menù" / "Chiama e ordina"
- **Chi siamo** con la storia e i punti di forza
- **Menù** diviso in schede: Classiche, Speciali, Antipasti, Dolci & Bevande
- **Orari** con indicazione automatica "Aperto ora / Chiuso ora"
- **Prenota** — il modulo apre WhatsApp con il messaggio di prenotazione già compilato
- **Contatti** con mappa di Google Maps

## Come vederlo

Apri `index.html` nel browser, oppure avvia un piccolo server:

```sh
python3 -m http.server 8000
# poi visita http://localhost:8000
```

## Cosa personalizzare

I dati attuali sono **segnaposto**: sostituiscili con quelli reali.

| Cosa | Dove |
| --- | --- |
| Nome, testi, prezzi del menù | `index.html` |
| Telefono (`+390000000000`), email, indirizzo, Instagram, P.IVA | `index.html` |
| Indirizzo della mappa (`q=Chiesina+Uzzanese`) | `index.html`, sezione Contatti |
| Numero WhatsApp per le prenotazioni | `script.js` → `WHATSAPP_NUMBER` |
| Orari di apertura | `script.js` → `OPENING_HOURS` **e** la tabella in `index.html` |
| Colori e caratteri | `styles.css` → variabili in `:root` |

## Pubblicazione gratuita con GitHub Pages

Su GitHub: **Settings → Pages → Build and deployment**, scegli il branch e la cartella `/ (root)`.
Il sito sarà online all'indirizzo `https://<utente>.github.io/<repository>/`.
