import React from "react";
import Card from "./Card";
import Title from "./Title";
import styled from "styled-components";
import Link from "next/link";
import { Article } from "../src/Article";
import { Carousel } from "react-responsive-carousel";
import ReactPlayer from "react-player";
import UrlCarousel from "./UrlCarousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlasses, faPen, faUser } from "@fortawesome/free-solid-svg-icons";
import ArticleHeader from "./ArticleHeader";

type ArticleCardProps = {
    article: Article;
};

const OverlayLink = styled.a`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    display: flex;
    background-color: #000b;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    opacity: 0;
    transition: opacity 200ms;
    font-size: 1.6em;
    text-align: center;
    font-weight: bold;
    text-decoration: none;

    @media only screen and (min-width: 600px) {
        &:hover {
            opacity: 1;
            transition: opacity 200ms;
        }
    }
`;

const CarouselContainer = styled.div`
    border-radius: 2em 2em 0 0;
    z-index: 10;
    overflow: hidden;
`;

export default function ArticleCard({ article }: ArticleCardProps) {
    return (
        <Card color={article.themeColor}>
            <Link href="/article/[name]" as={article.href} passHref>
                <OverlayLink>{article.tease ?? "Click here to read more!"}</OverlayLink>
            </Link>
            <ArticleHeader article={article} />
            {article.thumbnails && (
                <CarouselContainer>
                    <UrlCarousel imageAlign={article.thumbnailAlign} urls={article.thumbnails} />
                </CarouselContainer>
            )}
        </Card>
    );
}
