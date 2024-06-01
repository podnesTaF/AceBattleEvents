import { createCookieSessionStorage } from "@remix-run/node";

const secret = process.env.SESSION_SECRET || "secret";

export let sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "abe-session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,
    secrets: [secret],
    secure: process.env.NODE_ENV === "production", // enable this in prod only
  },
});

export let { getSession, commitSession, destroySession } = sessionStorage;
