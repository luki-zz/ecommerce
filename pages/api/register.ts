import type { NextApiHandler } from "next";
import * as bcrypt from "bcrypt";
import { registerSchema } from "src/components/Login/loginRegisterSchema";
import { ValidationError } from "yup";
import { authClient } from "apollo/apolloClients";
import type {
  CreateAccountMutation,
  CreateAccountMutationVariables,
} from "generated/graphql";
import { CreateAccountDocument } from "generated/graphql";

const handler: NextApiHandler = async (req, res) => {
  if (!process.env.ADMIN_TOKEN) {
    return Error("API token is not valid");
  }

  if (req.method !== "POST") {
    res.status(405).setHeader("Access-Control-Allow-Methods", "POST").end();
  }

  try {
    const clientData = await registerSchema.validate(JSON.parse(req.body));
    const hashedPassword = await bcrypt.hash(clientData.password, 12);
    const { data } = await authClient.mutate<
      CreateAccountMutation,
      CreateAccountMutationVariables
    >({
      mutation: CreateAccountDocument,
      variables: { email: clientData.email, password: hashedPassword },
    });
    return res.json(data);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.json({ message: error.message });
    }
    return res.json({ message: "Error fetching data from hygraph" });
  }
};

export default handler;
