import React from "react";
import { Article } from "../shared/Article";
import { GetStaticProps } from "next";
import NavBar from "../components/NavBar";
import CenterContainer from "../components/CenterContainer";
import BigTitle from "../components/BigTitle";
import ArticleCard from "../components/ArticleCard";
import { readArticleNames, getArticleWithName } from "../server/articleLoader";

type ProjectsProps = {
    projects: Article[];
};

export default function Projects({ projects }: ProjectsProps) {
    return (
        <>
            <NavBar />
            <CenterContainer>
                <BigTitle
                    title="Projects"
                    description="Below is a list of some of my most important projects, all of them are hosted on GitHub and the source code is public. Enjoy!"
                />
                {projects.map((project) => (
                    <ArticleCard key={project.name} article={project} />
                ))}
            </CenterContainer>
        </>
    );
}

export const getStaticProps: GetStaticProps = async function ({ params }) {
    var articles = await Promise.all((await readArticleNames()).map((art) => getArticleWithName(art)));
    var props: ProjectsProps = {
        projects: articles.filter((e) => e.type === "project"),
    };
    return {
        props,
    };
};
