export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/add-team",
    "/add-coins",
    "/calendar/[id]/register-team",
    "/profile",
  ],
};
