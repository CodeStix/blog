import React, { useState } from "react";
import { GetStaticProps } from "next";
import NavBar from "../components/NavBar";
import CenterContainer from "../components/CenterContainer";
import BigTitle from "../components/BigTitle";
import Title from "../components/Title";
import Card from "../components/Card";
import ArticleCard from "../components/ArticleCard";
import { getArticles } from "../server/articleLoader";
import { Article } from "../shared/Article";

type IndexProps = {
    recentProjects: Article[];
    recentPosts: Article[];
};

export default function Index({ recentProjects, recentPosts }: IndexProps) {
    return (
        <>
            <NavBar />
            <CenterContainer>
                <Title>Recent posts</Title>
                {recentPosts.map((post) => (
                    <ArticleCard key={post.name} article={post} />
                ))}

                <Title>Recent projects</Title>
                {recentProjects.map((project) => (
                    <ArticleCard key={project.name} article={project} />
                ))}
            </CenterContainer>
        </>
    );
}

// called on server
export const getStaticProps: GetStaticProps = async function () {
    var articles = await getArticles();
    articles = articles.sort((a, b) => b.modified - a.modified);
    var props: IndexProps = {
        recentProjects: articles
            .filter((e) => e.type === "project")
            .splice(0, 2),
        recentPosts: articles.filter((e) => e.type === "post").splice(0, 2),
    };

    return {
        props,
        revalidate: 10,
    };
};
