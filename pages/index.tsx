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
import Button from "../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Release } from "../src/Release";

type IndexProps = {
    recentProjects: Article[];
    recentPosts: Article[];
    recent: Article[];
    releases: Release[];
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

const ReleaseContainer = styled.div`
    display: flex;
    justify-content: stretch;
`;

const ReleaseCard = styled.a<{ color: string; url: string }>`
    position: relative;
    display: block;
    text-decoration: none;
    max-width: 400px;
    flex-grow: 1;
    color: ${(e) => e.color};
    border: 2px solid ${(e) => e.color};
    padding: 1em 3em 1em 1.2em;
    border-radius: 0.5em;

    background-image: linear-gradient(to right, #0005 0%, #1b1b1b 80%), url("${(e) => e.url}");
    background-size: contain;
    transition: 200ms;

    &:hover {
        transition: 200ms;
        color: #eee;
        border-color: #eee;

        svg {
            transition: 100ms;
            transform: translateX(5px);
        }
    }
`;

const ReleaseTitle = styled.span`
    display: block;
    font-size: 1.4em;
    margin: 0 0 0.1em 0;
    font-family: inherit;
    font-weight: bold;
`;

const ReleaseDescription = styled.p`
    font-size: 0.8em;
    padding: 0 1em 0 0;
    color: white;
`;

const ReleaseArrow = styled(FontAwesomeIcon)`
    transition: 100ms;
    font-size: 2em;
    position: absolute;
    right: 0.7em;
    top: 0;
    height: 100%;
`;

export default function Index({ recentProjects, recentPosts, recent, releases }: IndexProps) {
    return (
        <>
            <NavBar />
            <CenterContainer>
                <WelcomeCard>
                    <WelcomeCardImage />
                    <WelcomeText>
                        <WelcomeTextTitle>👋 Oh hey!</WelcomeTextTitle>I am Stijn and I welcome you to my website. Here you can find my latest major
                        projects, blog posts and more!
                    </WelcomeText>
                </WelcomeCard>

                {releases.length > 0 && (
                    <>
                        <Title>Releases</Title>
                        <ReleaseContainer>
                            {releases.map((e) => (
                                <ReleaseCard url={e.thumbnail} color={e.color} href={e.url} target="_blank">
                                    <ReleaseTitle>{e.name}</ReleaseTitle>
                                    {e.description && <ReleaseDescription>{e.description}</ReleaseDescription>}
                                    <ReleaseArrow icon={faArrowRight} />
                                </ReleaseCard>
                            ))}
                        </ReleaseContainer>
                    </>
                )}

                <Title>Latest activity</Title>

                {recent.map((post) => (
                    <ArticleCard key={post.name} article={post} />
                ))}

                {recentPosts.length > 0 && <Title>Other recent posts</Title>}
                {recentPosts.map((post) => (
                    <ArticleCard key={post.name} article={post} />
                ))}

                {recentProjects.length > 0 && <Title>Other recent projects</Title>}
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
        releases: [],
        recent: articles.splice(0, 2),
        recentProjects: articles.filter((e) => e.type === "project").splice(0, 2),
        recentPosts: articles.filter((e) => e.type === "post").splice(0, 2),
    };

    return {
        props,
        revalidate: 10,
    };
};
