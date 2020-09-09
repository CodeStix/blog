import React from "react";
import Card from "./Card";
import Title from "./Title";
import styled from "styled-components";
import Link from "next/link";
import { Article } from "../shared/Article";

type ArticleCardProps = {
    article: Article;
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

export default function ArticleCard({ article }: ArticleCardProps) {
    return (
        <Card color={article.themeColor}>
            <Link href="/article/[name]" as={article.href} passHref>
                <OverlayLink>Click to check it out</OverlayLink>
            </Link>
            <Header>
                <Title color={article.themeColor} title={article.name} />
                <p>{article.description}</p>
            </Header>
            {article.thumbnail && <Thumbnail src={article.thumbnail} />}
        </Card>
    );
}
