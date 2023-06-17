import { Html, Head, Main, NextScript } from "next/document";
import { useEffect, useState } from "react";

export default function Document() {
  const [title, setTitle] = useState();
  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath === "/dashboard") {
      setTitle("Teamlance || Dashboard");
    } else {
      return "Teamlance || Homepage";
    }
  });

  return (
    <Html lang="en">
      <Head>
        <title>{title}</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
