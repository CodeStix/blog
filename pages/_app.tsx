import React from "react";
import "../css/styles.scss";
import Head from "next/head";
import "highlight.js/styles/monokai.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Poppins&family=Rubik&display=swap"
                    rel="stylesheet"
                />
                <title>Stijn Rogiest / codestix</title>
                <meta
                    name="description"
                    content="The home page of codestix' hobby programming work!"
                />
                <meta name="keywords" content="Programming, Coding, Blog" />
                <meta name="author" content="Stijn Rogiest" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}
