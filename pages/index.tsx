import React from "react";
import { GetStaticProps } from "next";

export default function Index() {
    return <p>this is a test</p>;
}

// called on server
export const getStaticProp: GetStaticProps = async function ({ params }) {
    return {
        props: {},
        revalidate: 10,
    };
};
