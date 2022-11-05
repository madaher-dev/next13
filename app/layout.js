import { Providers } from "./providers";
import localFont from "@next/font/local";
import Script from "next/script";

const Archivo = localFont({
  src: "./fonts/Archivo-Regular.ttf",
  weight: "400",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        <Providers>
          <section
            style={{
              backgroundColor: "red",
              height: "50px",
            }}
            className={Archivo.className}
          >
            The is the App Top Header - Will Apear in all pages
          </section>
          <section>{children}</section>
        </Providers>
      </body>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script strategy="lazyOnload">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
        page_path: window.location.pathname,
        });
    `}
      </Script>
    </html>
  );
}
