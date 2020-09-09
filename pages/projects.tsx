import React from "react";
import { Article } from "../shared/Article";
import { GetStaticProps } from "next";
import NavBar from "../components/NavBar";
import CenterContainer from "../components/CenterContainer";
import BigTitle from "../components/BigTitle";
import ProjectCard from "../components/ArticleCard";
import { readArticleNames, getArticleWithName } from "../server/projectLoader";

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
                    <ProjectCard key={project.name} project={project} />
                ))}
            </CenterContainer>
        </>
    );
}

export const getStaticProps: GetStaticProps = async function ({ params }) {
    var articles = await Promise.all((await readArticleNames()).map((art) => getArticleWithName(art)));
    var props: ProjectsProps = {
        projects: articles,
    };

    /*var props: ProjectsProps = {
        projects: [
            {
                id: 0,
                description: "Use this tool to convert a standard Beat Saber level into a 360 degree one!",
                name: "Beat-360fyer",
                themeColor: "#00A3FF",
                image: "/image/360.png",
            },
            {
                id: 1,
                description: "An amazing Discord bot that connects with reddit. Has video downloading support, 50/50 spoilers ...",
                name: "Reddit Discord bot",
                themeColor: "#FFA800",
                image: "/image/reddit.png",
            },
        ],
    };*/

    return {
        props,
    };
};
