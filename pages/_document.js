import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <title>Unisell</title>
      <Head>
        <link
          rel="icon"
          href="/assets/Vector.svg"
          sizes="16x16"
          type="image/svg+xml"
        />
      </Head>
      <body className="pt-[70px]">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
