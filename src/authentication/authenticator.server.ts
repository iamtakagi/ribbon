import { Authenticator } from "remix-auth";
import { GitHubStrategy } from "./strategy/github";
import { createCookieSessionStorage } from "@remix-run/node";
import type { OAuth2Profile } from "remix-auth-oauth2";
import { GoogleStrategy } from "./strategy/google";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.COOKIE_SECRET!],
    secure: process.env.NODE_ENV === "production",
  },
});

export const authenticator = new Authenticator<OAuth2Profile>(sessionStorage);

export const strategies = [
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID ?? '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
      callbackURL: (process.env.NODE_ENV !== 'production' ? `http://127.0.0.1:8787` : `https://ribbon.iamtakagi.net`) + '/auth/github/callback',
    },
    async ({ profile }) => {
      return profile;
    }
  ),
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      callbackURL: (process.env.NODE_ENV !== 'production' ? `http://127.0.0.1:8787` : `https://ribbon.iamtakagi.net`) + '/auth/google/callback',
    },
    async ({ profile }) => {
      return profile;
    }
  ),
];

strategies.forEach((strategy) => authenticator.use(strategy));