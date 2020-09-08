import React from "react";
import styled from "styled-components";

const TitleHeader = styled.h2`
    margin: 1em 0em 0.5em 0em;
    color: ${(props) => props.color ?? "white"};
    font-size: 1.8em;
`;

type TitleProps = {
    color?: string;
    title: string;
};

export default function Title({ title, color }: TitleProps) {
    return <TitleHeader color={color}>{title}</TitleHeader>;
}
