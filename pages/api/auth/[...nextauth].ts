import { authClient } from "apollo/apolloClients";
import { GetAccountByEmailDocument } from "generated/graphql";
import type {
  GetAccountByEmailQuery,
  GetAccountByEmailQueryVariables,
} from "generated/graphql";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = { id: "1", name: "J Smith", email: credentials?.email };

        if (!credentials) {
          return null;
        }

        const {
          data: { account },
        } = await authClient.query<
          GetAccountByEmailQuery,
          GetAccountByEmailQueryVariables
        >({
          query: GetAccountByEmailDocument,
          variables: { email: credentials?.email },
        });

        console.log(account);

        if (!account) {
          return null;
        }

        const arePasswordEqual = await bcrypt.compare(
          credentials.password,
          account.password
        );

        if (!arePasswordEqual) return null;

        return {
          id: account.id,
          email: account.email,
        };
      },
    }),
  ],
  pages: { signIn: "/login" },
};
export default NextAuth(authOptions);
