import React, { useEffect, useRef } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import CenterContainer from "../../components/CenterContainer";
import NavBar from "../../components/NavBar";
import { Article } from "../../shared/Article";
import BigTitle from "../../components/BigTitle";
import { getArticleWithName, getMarkdownForArticle, readArticleNames } from "../../server/articleLoader";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import hljs from "highlight.js";

type ArticlePageProps = {
    article: Article;
    markdown: string;
};

const MarkdownContainer = styled.div<{ color: string }>`
    font-size: 1.1em;
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
        margin: 1em 0;
    }

    ol li::before {
        content: counter(li) ".";
        color: ${(props) => props.color};
        opacity: 0.6;
    }

    ul li::before {
        content: "-";
        color: ${(props) => props.color};
        opacity: 0.6;
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
    }

    code {
        font-family: monospace;
        background-color: #0005;
        padding: 0.3em 0.5em;
        border-radius: 0.3em;
    }
`;

function CodeBlock(props: { value: string; language?: string }) {
    const codeRef = useRef<HTMLElement>(null);

    useEffect(() => {
        hljs.highlightBlock(codeRef.current);
    }, [codeRef]);

    return (
        <pre>
            <code ref={codeRef} className={props.language && `language-${props.language}`}>
                {props.value}
            </code>
        </pre>
    );
}

export default function ArticlePage({ article, markdown }: ArticlePageProps) {
    const description = `${article.description}\n(modified ${new Date(article.modified).toLocaleString()})`;
    return (
        <>
            <NavBar />
            <CenterContainer>
                {article && <BigTitle title={article.name} description={description} color={article.themeColor} />}
                {markdown ? (
                    <MarkdownContainer color={article.themeColor}>
                        <ReactMarkdown source={markdown} renderers={{ code: CodeBlock }} />
                    </MarkdownContainer>
                ) : (
                    <p>(Nothing here!)</p>
                )}
            </CenterContainer>
        </>
    );
}

export const getStaticPaths: GetStaticPaths = async function () {
    var paths = await (await readArticleNames()).map((name) => `/article/${name}`);
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
    var markdown = await getMarkdownForArticle(name);

    var props: ArticlePageProps = {
        markdown,
        article,
    };

    return {
        props,
        revalidate: 30,
    };
};
