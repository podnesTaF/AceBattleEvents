import { createCookieSessionStorage } from "@remix-run/node";

const secret = process.env.SESSION_SECRET || "secret";
export let adminSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "abe-admin-session",
    sameSite: "none",
    path: "/",
    httpOnly: true,
    secrets: [secret],
    secure: process.env.NODE_ENV === "production", // enable this in prod only
  },
});

export let {
  getSession: getAdminSession,
  commitSession: commitAdminSession,
  destroySession,
} = adminSessionStorage;
