import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import CenterContainer from "../../components/CenterContainer";
import NavBar from "../../components/NavBar";
import { Article } from "../../shared/Article";
import BigTitle from "../../components/BigTitle";
import { getArticleWithName, getMarkdownForArticle, readArticleNames } from "../../server/articleLoader";

type ArticlePageProps = {
    article: Article;
    markdown: string;
};

export default function ArticlePage({ article }: ArticlePageProps) {
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
