import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Client } from "pg";
import bcrypt from "bcrypt";

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});
client.connect();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await client.query("SELECT * FROM users WHERE email=$1", [
          credentials.email,
        ]);
        const user = res.rows[0];

        if (
          user &&
          (await bcrypt.compare(credentials.password, user.password))
        ) {
          return { id: user.id, email: user.email };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
