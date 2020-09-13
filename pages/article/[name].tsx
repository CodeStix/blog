import React, { useEffect, useRef } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import CenterContainer from "../../components/CenterContainer";
import NavBar from "../../components/NavBar";
import { Article } from "../../shared/Article";
import BigTitle from "../../components/BigTitle";
import { getArticleWithName, getArticles } from "../../server/articleLoader";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import hljs from "highlight.js";
import Card from "../../components/Card";
import Title from "../../components/Title";
import Head from "next/head";
import ArticleHeader from "../../components/ArticleHeader";

type ArticlePageProps = {
    article: Article;
};

const MarkdownContainer = styled.div<{ color: string }>`
    margin-bottom: 10em;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        margin: 1.8em 0 0.8em 0;
        padding-bottom: 0.25em;
        border-bottom: 4px solid #fff2;
        color: ${(props) => props.color};

        a {
            border-bottom: none;
        }
    }

    p {
        margin: 1.2em 0;
    }

    ol li::before {
        content: counter(li) ".";
        color: ${(props) => props.color};
        opacity: 0.8;
    }

    ul li::before {
        content: "-";
        color: ${(props) => props.color};
        opacity: 0.8;
    }

    ol,
    ul {
        list-style: none;
        margin: 0.5em 0em;
        li {
            counter-increment: li;
        }
        li::before {
            display: inline-block;
            width: 1.2em;
            font-weight: bold;
        }
    }

    em {
        font-weight: normal;
        font-style: italic;
        opacity: 0.7;
    }

    a {
        text-decoration: none;
        font-weight: bold;
        border-bottom: 3px solid ${(props) => props.color};

        &:hover {
            color: gray;
            border-bottom: 3px solid gray;
        }
    }

    hr {
        border: none;
        height: 4px;
        background-color: #fff1;
    }

    blockquote {
        border-left: 4px solid #fff2;
        padding: 0 1em;
        opacity: 0.8;
    }

    pre code {
        font-family: monospace;
        background-color: #0005;
        display: block;
        padding: 1em;
        border: 1px solid #fff2;
        border-radius: 0.5em;
        white-space: pre-wrap;
    }

    code {
        font-family: monospace;
        background-color: #0005;
        padding: 0.3em 0.5em;
        border-radius: 0.3em;
    }

    img {
        margin: 0.8em 0;
        max-width: 100%;
    }
`;

function CodeBlock(props: { value: string; language?: string }) {
    const codeRef = useRef<HTMLElement>(null);

    useEffect(() => {
        hljs.highlightBlock(codeRef.current);
    }, [codeRef]);

    return (
        <pre>
            <code
                ref={codeRef}
                className={props.language && `language-${props.language}`}
            >
                {props.value}
            </code>
        </pre>
    );
}

const ArticleHeaderCard = styled.div`
    position: relative;
    background: #fff1;
    margin-bottom: 3em;
    padding: 0.5em;
    border-radius: 1em;
    /* max-height: 40vh; */
    /* overflow: auto; */

    @media only screen and (max-width: 600px) {
        border-radius: 0.5em;
        padding: 0em;
    }
`;

export default function ArticlePage({ article }: ArticlePageProps) {
    const description = `${article.description}\n(modified ${new Date(
        article.modified
    ).toLocaleString()})`;
    return (
        <>
            <Head>
                <title>{article.name}</title>
                <meta name="description" content={article.description} />
                <meta name="keywords" content="Programming, Coding" />
                <meta name="author" content="Stijn Rogiest" />
            </Head>
            <NavBar />
            <CenterContainer>
                <ArticleHeaderCard>
                    <ArticleHeader article={article} />
                </ArticleHeaderCard>
                <MarkdownContainer color={article.themeColor}>
                    <ReactMarkdown
                        source={article.markdown}
                        renderers={{ code: CodeBlock }}
                        skipHtml={false}
                        escapeHtml={false}
                    />
                </MarkdownContainer>
            </CenterContainer>
        </>
    );
}

export const getStaticPaths: GetStaticPaths = async function () {
    var paths = await (await getArticles()).map((e) => e.href);
    return {
        fallback: false,
        paths,
    };
};

export const getStaticProps: GetStaticProps = async function ({ params }) {
    const name = params["name"] as string;

    if (!name) {
        console.error("No 'name' parameter in params!");
        return {
            props: {},
            revalidate: 3,
        };
    }

    var article = await getArticleWithName(name);
    var props: ArticlePageProps = {
        article,
    };

    return {
        props,
        revalidate: 30,
    };
};
