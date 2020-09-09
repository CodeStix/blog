import React, { useState } from "react";
import { GetStaticProps } from "next";
import NavBar from "../components/NavBar";
import CenterContainer from "../components/CenterContainer";
import BigTitle from "../components/BigTitle";
import Title from "../components/Title";
import Card from "../components/Card";
import ProjectCard from "../components/ArticleCard";
import { readArticleNames, getArticleWithName } from "../server/projectLoader";
import { Article } from "../shared/Article";

type IndexProps = {
    recentProjects: Article[];
};

export default function Index({ recentProjects }: IndexProps) {
    return (
        <>
            <NavBar />
            <CenterContainer>
                <Title title="Recent projects" />

                {recentProjects.map((project) => (
                    <ProjectCard key={project.name} project={project} />
                ))}
            </CenterContainer>
        </>
    );
}

// called on server
export const getStaticProps: GetStaticProps = async function () {
    var articles = await Promise.all((await readArticleNames()).map((art) => getArticleWithName(art)));
    var props: IndexProps = {
        recentProjects: articles.sort((a, b) => b.modified - a.modified).splice(0, 2),
    };

    return {
        props,
        revalidate: 10,
    };
};
