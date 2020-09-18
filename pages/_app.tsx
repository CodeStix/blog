import React from "react";
import "../css/styles.scss";
import Head from "next/head";
import "highlight.js/styles/monokai.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { config, dom } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; // https://github.com/FortAwesome/react-fontawesome/issues/284

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=Poppins&family=Rubik&display=swap" rel="stylesheet" />
                <script data-ad-client="ca-pub-8051423254886424" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                <style>{dom.css()}</style>
                <title>Stijn Rogiest / codestix</title>
                <meta name="description" content="The home page of codestix' hobby programming work!" />
                <meta name="keywords" content="Programming, Coding, Blog" />
                <meta name="author" content="Stijn Rogiest" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}
