import {
  V2_MetaFunction,
  json,
  type LinksFunction,
  type LoaderArgs,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";

import { withEmotionCache } from "@emotion/react";
import { ReactNode, useContext, useEffect } from "react";
import globalStyles from "~/styles/global.css";
import stylesheet from "~/tailwind.css";
import { AppBar, Footer } from "./components";
import ClientStyleContext from "./context/ClientStyleContext";
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

export const meta: V2_MetaFunction = () => {
  return [{ title: "Ace Battle Events | Main Page" }];
};

const Document = withEmotionCache(
  (
    {
      children,
      title,
      user,
    }: {
      children: ReactNode;
      title: string;
      user: IUser | null;
    },
    emotionCache
  ) => {
    const clientStyleData = useContext(ClientStyleContext);

    useEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head;
      // re-inject tags
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        (emotionCache.sheet as any)._insertTag(tag);
      });
      clientStyleData.reset();
    }, []);

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
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
);

export default function App() {
  const { user } = useLoaderData();
  return (
    <Document title="" user={user}>
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Document title="" user={null}>
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
    <Document title="" user={null}>
      <div className="error-container">
        <h1 className="font-semibold text-3xl mb-3">App Error</h1>
        <pre>{errorMessage}</pre>
      </div>
    </Document>
  );
}
