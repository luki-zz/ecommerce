import { client } from "apollo/apolloClients";
import type {
  GetProductsQuery,
  GetProductsQueryVariables,
} from "generated/graphql";
import { useGetProductsQuery } from "generated/graphql";
import type { NextApiHandler } from "next";
import { Stripe } from "stripe";
export type SessionStripe = {
  session: Stripe.Response<Stripe.Checkout.Session>;
};
const stripeCheckoutHandler: NextApiHandler<
  SessionStripe | { error: string }
> = async (req, res) => {
  if (req.method !== "POST")
    return res
      .status(405)
      .setHeader("Access-Control-Allowed-Methods", "POST")
      .end();
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey)
    return res.status(405).json({ error: "Stripe secret key not set" });
  const stripe = new Stripe(stripeSecretKey, { apiVersion: "2022-11-15" });

  const {
    data: { products },
  } = await client.query<GetProductsQuery, GetProductsQueryVariables>({
    query: useGetProductsQuery,
  });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    locale: "pl",
    payment_method_types: ["blik", "card", "p24"],
    success_url: "https://localhost:3000/checkout/success",
    cancel_url: "https://localhost:3000/checkout/cancel",
    line_items: req.body,
  });

  return res.status(200).json({ session });
};

export default stripeCheckoutHandler;
