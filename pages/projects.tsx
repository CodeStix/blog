import React from "react";
import { Article } from "../shared/Article";
import { GetStaticProps } from "next";
import NavBar from "../components/NavBar";
import CenterContainer from "../components/CenterContainer";
import BigTitle from "../components/BigTitle";
import ArticleCard from "../components/ArticleCard";
import { getArticles } from "../server/articleLoader";
import Title from "../components/Title";
import ScrollNavBar from "../components/ScrollNavBar";

type ProjectsProps = {
    projects: Article[];
};

export default function Projects({ projects }: ProjectsProps) {
    return (
        <>
            <NavBar />
            <ScrollNavBar />
            <CenterContainer>
                <Title>Projects</Title>
                {projects.map((project) => (
                    <ArticleCard key={project.name} article={project} />
                ))}
            </CenterContainer>
        </>
    );
}

export const getStaticProps: GetStaticProps = async function ({ params }) {
    var articles = await getArticles();
    // var articles = await Promise.all((await readArticlePaths()).map((art) => getArticleWithName(art)));
    var props: ProjectsProps = {
        projects: articles.filter((e) => e.type === "project"),
    };
    return {
        props,
    };
};
