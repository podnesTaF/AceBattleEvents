import { withEmotionCache } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import type {
  MetaFunction,
  type LinksFunction,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";

import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import type { ReactNode } from "react";
import { useContext, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import globalStyles from "~/styles/global.css";
import stylesheet from "~/tailwind.css";
import { AppBar, CustomDrawer, Footer } from "./components";
import MainNavigation from "./components/shared/header/MainNavigation";
import ClientStyleContext from "./context/ClientStyleContext";
import { LayoutProvider, useLayout } from "./lib/shared/context/LayoutContex";
import type { AuthenticatedUser } from "./lib/types";
import { authenticator } from "./lib/utils";
import theme from "./styles/theme";

const queryClient = new QueryClient();

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "stylesheet", href: globalStyles },
  {
    rel: "stylesheet",
    href: "/styles/swiper-bundle.min.css",
  },
];
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request);
  if (
    user?.roles?.find((r) => r.name === "admin") ||
    request.url.includes("under-construction") ||
    request.url.includes("auth/login")
  ) {
    return json({ user });
  }

  // redirect to under construction
  return redirect("/under-construction");
};

export const meta: MetaFunction = () => {
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
      user: AuthenticatedUser | null;
    },
    emotionCache
  ) => {
    const { showNav } = useLayout();
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
      <QueryClientProvider client={queryClient}>
        <html lang="en">
          <head>
            <meta charSet="utf-8" />
            <meta
              name="viewport"
              content="width=device-width,initial-scale=1"
            />
            <Meta />
            <Links />
          </head>
          <body>
            <ThemeProvider theme={theme}>
              {user?.roles?.find((r) => r.name === "admin") ? (
                <>
                  {showNav && (
                    <AppBar
                      DrawerComponent={CustomDrawer}
                      drawerProps={{ user }}
                      NavComponent={MainNavigation}
                      user={user}
                      className={"mb-[56px] lg:mb-[80px]"}
                    />
                  )}
                  {children}
                  <Footer />
                </>
              ) : (
                children
              )}
              <ScrollRestoration />
              <Scripts />
              <ReactQueryDevtools initialIsOpen={false} />
            </ThemeProvider>
          </body>
        </html>
      </QueryClientProvider>
    );
  }
);

export default function App() {
  const { user } = useLoaderData();

  return (
    <LayoutProvider>
      <Document title="" user={user}>
        <Outlet />
      </Document>
    </LayoutProvider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <LayoutProvider>
        <Document title="" user={null}>
          <div className="error-container">
            <h1 className="font-semibold text-3xl">
              {error.status} {error.statusText}
            </h1>
          </div>
        </Document>
      </LayoutProvider>
    );
  }

  const errorMessage = error instanceof Error ? error.message : "Unknown error";
  return (
    <LayoutProvider>
      <Document title="" user={null}>
        <div className="error-container">
          <h1 className="font-semibold text-3xl mb-3">App Error</h1>
          <pre>{errorMessage}</pre>
        </div>
      </Document>
    </LayoutProvider>
  );
}
