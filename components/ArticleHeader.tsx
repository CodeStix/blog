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
    flex-wrap: wrap-reverse;
    justify-content: flex-start;
`;

const HeaderItem = styled.div<{ grow?: boolean }>`
    ${(props) => props.grow && "flex-grow: 1;"}
    margin-right: 1.3em;
`;

const HeaderType = styled.span`
    font-size: 0.8em;
    opacity: 0.7;
    text-transform: capitalize;
`;

const HeaderDetail = styled.small`
    /* font-size: 0.7em; */
    display: inline-block;
    margin: 0.5em;
`;

type ArticleHeaderProps = {
    article: Article;
};

export default function ArticleHeader({ article }: ArticleHeaderProps) {
    return (
        <Header>
            <HeaderRow>
                <HeaderItem grow={true}>
                    <Title color={article.themeColor}>
                        <HeaderType>{article.type}: </HeaderType>
                        {article.name}
                    </Title>
                </HeaderItem>
                <HeaderItem>
                    <HeaderDetail>
                        <FontAwesomeIcon icon={faPen} /> Updated{" "}
                        {new Date(article.modified).toDateString()}
                    </HeaderDetail>
                </HeaderItem>
                {article.readMinutes && (
                    <HeaderItem>
                        <HeaderDetail>
                            <FontAwesomeIcon icon={faGlasses} />{" "}
                            {article.readMinutes} minute read
                        </HeaderDetail>
                    </HeaderItem>
                )}
                <HeaderItem>
                    <HeaderDetail>
                        <FontAwesomeIcon icon={faUser} /> {"Stijn Rogiest"}
                    </HeaderDetail>
                </HeaderItem>
            </HeaderRow>
            <p>{article.description}</p>
        </Header>
    );
}
