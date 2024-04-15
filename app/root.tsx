import type { LinksFunction } from "@vercel/remix";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import styles from "./styles.css?url";

export const config = { runtime: "edge" };

export const links: LinksFunction = () => [
  {
    href: styles,
    rel: "stylesheet",
  },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Links />
      </head>
      <body>
        <header>
          <h1>Tromsøkarusellen</h1>
          <a href="/calendar.ics">Legg til i kalenderen din</a>
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
