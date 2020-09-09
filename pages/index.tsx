import React, { useState } from "react";
import { GetStaticProps } from "next";
import NavBar from "../components/NavBar";
import CenterContainer from "../components/CenterContainer";
import BigTitle from "../components/BigTitle";
import Title from "../components/Title";
import Card from "../components/Card";
import ProjectCard from "../components/ArticleCard";

export default function Index() {
    return (
        <>
            <NavBar />
            <CenterContainer>
                <Title title="Projects" />
                <ProjectCard
                    project={{
                        id: 0,
                        description: "Use this tool to convert a standard Beat Saber level into a 360 degree one!",
                        name: "Beat-360fyer",
                        themeColor: "#00A3FF",
                        image: "/image/360.png",
                    }}
                />
                <ProjectCard
                    project={{
                        id: 1,
                        description: "An amazing Discord bot that connects with reddit. Has video downloading support, 50/50 spoilers ...",
                        name: "Reddit Discord bot",
                        themeColor: "#FFA800",
                        image: "/image/reddit.png",
                    }}
                />
            </CenterContainer>
        </>
    );
}

// called on server
export const getStaticProp: GetStaticProps = async function ({ params }) {
    return {
        props: {},
        revalidate: 10,
    };
};
