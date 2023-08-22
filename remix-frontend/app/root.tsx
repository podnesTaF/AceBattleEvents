import { json, type LinksFunction, type LoaderArgs } from "@remix-run/node";
import {
  isRouteErrorResponse,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";

import { ReactNode } from "react";
import globalStyles from "~/styles/global.css";
import stylesheet from "~/tailwind.css";
import { AppBar, Footer } from "./components";
import { IUser } from "./lib/types";
import { authenticator } from "./lib/utils";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "stylesheet", href: globalStyles },
];

export const loader = async ({ request }: LoaderArgs) => {
  const user = await authenticator.isAuthenticated(request);

  return json({ user });
};

function Document({
  children,
  title,
  user,
}: {
  children: ReactNode;
  title: string;
  user: IUser | null;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <title>{title}</title>
        <Meta />
        <Links />
      </head>
      <body>
        <AppBar user={user} />
        {children}
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  const { user } = useLoaderData();
  return (
    <Document title="Remix Starter" user={user}>
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Document title={`${error.status} ${error.statusText}`} user={null}>
        <div className="error-container">
          <h1 className="font-semibold text-3xl">
            {error.status} {error.statusText}
          </h1>
        </div>
      </Document>
    );
  }

  const errorMessage = error instanceof Error ? error.message : "Unknown error";
  return (
    <Document title="App error!" user={null}>
      <div className="error-container">
        <h1 className="font-semibold text-3xl mb-3">App Error</h1>
        <pre>{errorMessage}</pre>
      </div>
    </Document>
  );
}
