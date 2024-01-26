import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import {
  LinksFunction,
  LoaderFunction,
  LoaderFunctionArgs,
} from "@remix-run/node";
import { cssBundleHref } from "@remix-run/css-bundle";
import { authenticator } from "./authentication/authenticator.server";
import Header from "./components/global/Header";
import Layout from "./components/global/Layout";
import Footer from "./components/global/Footer";

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const profile = await authenticator.isAuthenticated(request);
  return {
    isAuthenticated: !!profile,
    profile,
  };
};

export const links: LinksFunction = () => {
  return [
    // ref: https://remix.run/docs/en/main/guides/styling#css-modules
    ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  ];
};

export default function App() {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body style={{
        margin: '0 auto',
        maxWidth: '42rem',
        padding: '2rem',
      }}>
        <Layout>
          <Header />
          <Outlet />
          <Footer />
        </Layout>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
