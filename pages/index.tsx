import React, { useState } from "react";
import { GetStaticProps } from "next";
import ReactMarkdown from "react-markdown";
import hightlight from "remark-highlight.js";

export default function Index() {
    const [input, setInput] = useState("# Test");

    return (
        <div>
            <h2>Enter text:</h2>
            <textarea onChange={(e) => setInput(e.target.value)} value={input}></textarea>
            <ReactMarkdown source={input} plugins={[hightlight]} renderers={{ code: hightlight }} />
        </div>
    );
}

// called on server
export const getStaticProp: GetStaticProps = async function ({ params }) {
    return {
        props: {},
        revalidate: 10,
    };
};
