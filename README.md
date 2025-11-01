# Mooni — Starter Kit (statico + pagamenti)

Questo pacchetto contiene:
- Sito statico (homepage + pagina artista) pronto per GitHub Pages
- UI responsive in stile Mooni
- Donazione per ogni brano (demo) + pagina di ringraziamento
- Template Cloudflare Worker per webhook Stripe
- Regole base Firebase Storage (facoltative)

## Come provarlo subito (senza backend)
1. Carica la cartella su **GitHub** (repo pubblica) e abilita **GitHub Pages** (branch main, root).
2. Apri `index.html`. Clicca un artista, prova il player.
3. I pulsanti €0,20/€0,50 portano alla pagina `thanks.html` con un "finto" download di esempio.
   - In produzione sostituirai questa parte con Stripe Checkout e un link temporaneo reale.

## Dati/artisti
- Modifica `data/artists.json` per aggiungere artisti, generi, tracce e anteprime.
- Le anteprime (preview) puntano a `assets/previews/*.mp3`.

## Passare a produzione con Stripe
1. Crea un account **Stripe**.
2. Sostituisci `pk_test_REPLACE_ME` in `js/checkout.js` con la tua **publishable key**.
3. Crea un endpoint server (consigliato **Cloudflare Workers**) che:
   - Riceve una richiesta POST `/create-checkout-session` con `{artistId, trackId, amount}`.
   - Crea una **Checkout Session** (prezzo a scelta o priceID).
   - Restituisce `sessionId` al browser.
4. Nel browser usa `stripe.redirectToCheckout({ sessionId })`.
5. Configura un **webhook** Stripe → Worker `/webhook/stripe` (evento `checkout.session.completed`).
6. Nel webhook genera un **link temporaneo** al file completo e invialo all'utente (email) o
   reindirizza alla pagina `thanks.html?token=...` che scambia il token per il link temporaneo.

## Storage audio
- Anteprime pubbliche → `assets/previews/` oppure Firebase Storage in `/previews/`.
- File completi protetti → non inserirli nella repo. Usa uno storage con URL firmati
  (Firebase Storage / GCS / Cloudflare R2) e generali dal webhook.

## Personalizzazione UI
- Colori/font in `styles.css`.
- Logo testuale nel topbar.

## Note sui microimporti
- Le commissioni sui pagamenti molto piccoli sono rilevanti. Valuta crediti/bundle.

Buon lavoro con Mooni!