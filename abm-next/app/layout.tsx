import Footer from "@/src/app/Components/Footer";
import { Header } from "@/src/app/Components/Header";
import { ReactQueryProvider } from "@/src/app/Providers";
import { auth } from "@/src/entities/Auth";
import theme from "@/styles/theme";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Ace Battle Association",
  description:
    "Web platform for Ace Battle Association | Events, Rankings, and more!",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={montserrat.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <ReactQueryProvider>
              <Header session={session} />
              {children}
              <Footer />
            </ReactQueryProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

