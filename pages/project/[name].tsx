import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import CenterContainer from "../../components/CenterContainer";
import NavBar from "../../components/NavBar";
import { Article } from "../../shared/Article";

type ProjectProps = {
    article: Article;
    markdown: string;
};

export default function ProjectPage({ article }: ProjectProps) {
    return (
        <>
            <NavBar />
            <CenterContainer>
                <BigTitle title={article.name} description={article.description} color={article.themeColor} />
                <code>{JSON.stringify(article, null, 2)}</code>
            </CenterContainer>
        </>
    );
}

import { getArticleWithName, getMarkdownForArticle, readArticleNames } from "../../server/projectLoader";
import BigTitle from "../../components/BigTitle";

export const getStaticPaths: GetStaticPaths = async function () {
    var paths = await (await readArticleNames()).map((name) => `/project/${name}`);
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

    var props: ProjectProps = {
        markdown,
        article,
    };

    return {
        props,
        revalidate: 30,
    };
};
