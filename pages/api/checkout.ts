import type { NextApiHandler } from "next";
import { Stripe } from "stripe";
export type SessionStripe = {
  session: Promise<Stripe.Response<Stripe.Checkout.Session>>;
};
const stripeCheckoutHandler: NextApiHandler<
  SessionStripe | { error: string }
> = async (req, res) => {
  //   if (req.method !== "POST")
  //     return res
  //       .status(405)
  //       .setHeader("Access-Control-Allowed-Methods", "POST")
  //       .end();
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey)
    return res.status(405).json({ error: "Stripe secret key not set" });
  const stripe = new Stripe(stripeSecretKey, { apiVersion: "2022-11-15" });
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    locale: "pl",
    payment_method_types: ["blik", "card", "p24"],
    success_url: "https://localhost:3000/checkout/success",
    cancel_url: "https://localhost:3000/checkout/cancel",
    line_items: [
      {
        quantity: 2,
        price_data: {
          unit_amount: 2330,
          currency: "PLN",
          product_data: {
            name: "Backpack",
          },
        },
      },
    ],
  });
  return res.status(200).json({ session });
};

export default stripeCheckoutHandler;
