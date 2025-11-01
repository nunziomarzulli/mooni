export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/webhook/stripe" && request.method === "POST") {
      // TODO: verify Stripe signature with env.STRIPE_WEBHOOK_SECRET
      // Parse event and on checkout.session.completed create a one-time URL
      // from your storage (Firebase/GCS, R2, etc.) and email it or store a token.
      return new Response("ok", { status: 200 });
    }
    return new Response("Mooni worker up", { status: 200 });
  }
}