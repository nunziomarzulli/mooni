/**
 * Minimal Stripe Checkout demo.
 * In produzione: crea sessioni di Checkout via endpoint server/worker sicuro.
 */
const STRIPE_PUBLISHABLE_KEY = "pk_test_REPLACE_ME";

function startCheckout({artistId, trackId, amount}){
  // DEMO: redirect a pagina "thanks" con un file finto
  // In produzione: fetch('/create-checkout-session', {artistId, trackId, amount})
  // e Stripe.redirectToCheckout({sessionId}). Dopo il webhook, generi link temporaneo.
  const file = encodeURIComponent(`assets/demos/${artistId}/${trackId}.mp3`);
  location.href = `thanks.html?file=${file}`;
}

window.startCheckout = startCheckout;
