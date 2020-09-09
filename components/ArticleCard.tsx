import React from "react";
import Card from "./Card";
import Title from "./Title";
import styled from "styled-components";
import Link from "next/link";
import { Article } from "../shared/Article";

type ProjectCardProps = {
    project: Article;
};

const Header = styled.div`
    padding: 0.8em;
`;

const Thumbnail = styled.div<{ src: string }>`
    width: 100%;
    background: url("${(props) => props.src}");
    height: 300px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top;
`;

const OverlayLink = styled.a`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    background-color: #0008;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    opacity: 0;
    transition: opacity 200ms;
    font-size: 1.4em;
    font-weight: bold;
    /* display: none; */

    &:hover {
        opacity: 1;
        transition: opacity 200ms;
    }
`;

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <Card color={project.themeColor}>
            <Link href="/project/[name]" as={project.href} passHref>
                <OverlayLink>Click to check it out</OverlayLink>
            </Link>
            <Header>
                <Title color={project.themeColor} title={project.name} />
                <p>{project.description}</p>
            </Header>
            {project.thumbnail && <Thumbnail src={project.thumbnail} />}
        </Card>
    );
}