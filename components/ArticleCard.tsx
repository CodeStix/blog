import React from "react";
import Card from "./Card";
import Title from "./Title";
import styled from "styled-components";
import Link from "next/link";
import { Article } from "../shared/Article";
import { Carousel } from "react-responsive-carousel";
import ReactPlayer from "react-player";
import UrlCarousel from "./UrlCarousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlasses, faPen } from "@fortawesome/free-solid-svg-icons";

type ArticleCardProps = {
    article: Article;
};

const Header = styled.div`
    padding: 0.8em;
`;

const OverlayLink = styled.a`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    background-color: #0009;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    opacity: 0;
    transition: opacity 200ms;
    font-size: 1.4em;
    text-align: center;
    font-weight: bold;
    text-decoration: none;

    &:hover {
        opacity: 1;
        transition: opacity 200ms;
    }
`;

const HeaderRow = styled.div`
    display: flex;
    justify-content: space-between;
`;

const HeaderModified = styled.small`
    margin-left: 0.5em;
    opacity: 0.4;
    font-size: 0.8em;
`;

const CarouselContainer = styled.div`
    border-radius: 2em 2em 0 0;
    overflow: hidden;
`;

export default function ArticleCard({ article }: ArticleCardProps) {
    return (
        <Card color={article.themeColor}>
            <Link href="/article/[name]" as={article.href} passHref>
                <OverlayLink>
                    {article.tease ?? "Click here to read more!"}
                </OverlayLink>
            </Link>
            <Header>
                <HeaderRow>
                    <Title color={article.themeColor}>{article.name}</Title>
                    <HeaderModified>
                        <FontAwesomeIcon icon={faPen} />{" "}
                        {new Date(article.modified).toLocaleString()}
                    </HeaderModified>
                </HeaderRow>
                <p>{article.description}</p>
            </Header>
            {article.thumbnails && (
                <CarouselContainer>
                    <UrlCarousel urls={article.thumbnails} />
                </CarouselContainer>
            )}
        </Card>
    );
}
