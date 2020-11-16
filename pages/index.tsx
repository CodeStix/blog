import React, { useState } from "react";
import { GetStaticProps } from "next";
import CenterContainer from "../components/CenterContainer";
import BigTitle from "../components/BigTitle";
import Title from "../components/Title";
import Card from "../components/Card";
import ArticleCard from "../components/ArticleCard";
import { getArticles } from "../src/articleLoader";
import { Article } from "../src/Article";
import NavBar from "../components/NavBar";
import styled from "styled-components";
import CoffeeIcon from "../components/CoffeeIcon";

type IndexProps = {
    recentProjects: Article[];
    recentPosts: Article[];
    recent: Article[];
};

const WelcomeCard = styled.div`
    margin: 2em 0 3em 0;
    display: flex;
    flex-wrap: wrap-reverse;
    max-width: 700px;

    border-bottom: 0.8em solid #676777;
    border-left: 0.8em solid transparent;
    border-right: 0.8em solid transparent;

    @media only screen and (max-width: 600px) {
        border: none;
        background: #fff1;
        border-radius: 1em;
    }
`;

const WelcomeCardImage = styled(CoffeeIcon)`
    margin: 1em 1em 0 1em;
    height: 100px;
    width: 100px;
    min-width: 100px;

    @media only screen and (max-width: 600px) {
        display: none;
    }
`;

const WelcomeTextTitle = styled.h2``;

const WelcomeText = styled.p`
    padding: 1em;
    opacity: 0.9;
    font-size: 0.9em;
    width: 500px;
`;

export default function Index({ recentProjects, recentPosts, recent }: IndexProps) {
    return (
        <>
            <NavBar />
            <CenterContainer>
                <WelcomeCard>
                    <WelcomeCardImage />
                    <WelcomeText>
                        <WelcomeTextTitle>👋 Oh hey!</WelcomeTextTitle>I am Stijn and I welcome you to my website. Here
                        you can find my latest major projects, blog posts and more! If you are for looking for someone
                        to work with, check out the about page, or shoot me a message via social media.
                    </WelcomeText>
                </WelcomeCard>

                <Title>Latest activity</Title>

                {recent.map((post) => (
                    <ArticleCard key={post.name} article={post} />
                ))}

                {recentPosts.length > 0 && <Title>Recent posts</Title>}
                {recentPosts.map((post) => (
                    <ArticleCard key={post.name} article={post} />
                ))}

                {recentProjects.length > 0 && <Title>Recent projects</Title>}
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
    articles = articles.sort((a, b) => b.updated - a.updated);
    var props: IndexProps = {
        recent: articles.splice(0, 2),
        recentProjects: articles.filter((e) => e.type === "project").splice(0, 2),
        recentPosts: articles.filter((e) => e.type === "post").splice(0, 2),
    };

    return {
        props,
        revalidate: 10,
    };
};
