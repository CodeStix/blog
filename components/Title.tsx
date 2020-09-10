import React from "react";
import styled from "styled-components";

const TitleHeader = styled.h2`
    margin: 1em 0em 0.5em 0em;
    color: ${(props) => props.color ?? "white"};
    font-size: 1.8em;

    &:first-child {
        margin-top: 0;
    }
`;

const TitleSmall = styled.small`
    display: inline-block;
    opacity: 0.4;
    font-size: 0.6em;
    padding-left: 0.5em;
`;

type TitleProps = {
    color?: string;
    title: string;
    small?: string;
};

export default function Title({ title, color, small }: TitleProps) {
    return (
        <TitleHeader color={color}>
            {title}
            {small && <TitleSmall>{small}</TitleSmall>}
        </TitleHeader>
    );
}
