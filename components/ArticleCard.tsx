import React from "react";
import Card from "./Card";
import Title from "./Title";
import styled from "styled-components";
import Link from "next/link";
import { Article } from "../shared/Article";
import { Carousel } from "react-responsive-carousel";
import ReactPlayer from "react-player";
import UrlCarousel from "./UrlCarousel";

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

const CarouselContainer = styled.div`
    border-radius: 2em 2em 0 0;
    overflow: hidden;
`;

export default function ArticleCard({ article }: ArticleCardProps) {
    const customRenderItem = (item, props) => (
        <item.type {...item.props} {...props} />
    );

    return (
        <Card color={article.themeColor}>
            <Link href="/article/[name]" as={article.href} passHref>
                <OverlayLink>
                    {article.tease ?? "Click here to read more!"}
                </OverlayLink>
            </Link>
            <Header>
                <Title
                    color={article.themeColor}
                    title={article.name}
                    small={
                        article.readMinutes &&
                        `${article.readMinutes} minute read.`
                    }
                />
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
