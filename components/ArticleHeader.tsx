import React from "react";
import styled from "styled-components";
import Title from "./Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faGlasses, faUser } from "@fortawesome/free-solid-svg-icons";
import { Article } from "../shared/Article";

const Header = styled.div`
    padding: 0.8em;
`;

const HeaderRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
`;

const HeaderTitle = styled.div<{ color: string }>`
    flex-grow: 1;
    font-size: 1.7em;
    margin-bottom: 0.35rem;
    color: ${(props) => props.color ?? "white"};
    font-weight: bold;

    @media only screen and (max-width: 600px) {
        font-size: 1.4rem;
    }
`;

const HeaderDetails = styled.div`
    margin-bottom: 0.35rem;
`;

const HeaderType = styled.span`
    font-size: 0.8em;
    opacity: 0.7;
    text-transform: capitalize;
`;

const HeaderDetail = styled.small`
    /* font-size: 0.7em; */
    display: inline-block;
    margin: 0.3em 0;
    margin-right: 1.3em;
`;

type ArticleHeaderProps = {
    article: Article;
};

export default function ArticleHeader({ article }: ArticleHeaderProps) {
    return (
        <Header>
            <HeaderRow>
                <HeaderTitle color={article.themeColor}>
                    <HeaderType>{article.type}: </HeaderType>
                    {article.name}
                </HeaderTitle>
                <HeaderDetails>
                    <HeaderDetail>
                        <FontAwesomeIcon icon={faPen} /> Updated{" "}
                        {new Date(article.modified).toDateString()}
                    </HeaderDetail>
                    {article.readMinutes && (
                        <HeaderDetail>
                            <FontAwesomeIcon icon={faGlasses} />{" "}
                            {article.readMinutes} minute read
                        </HeaderDetail>
                    )}
                    <HeaderDetail>
                        <FontAwesomeIcon icon={faUser} /> {"Stijn Rogiest"}
                    </HeaderDetail>
                </HeaderDetails>
            </HeaderRow>
            <p>{article.description}</p>
        </Header>
    );
}
