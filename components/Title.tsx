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

type TitleProps = {
    children: React.ReactNode;
    color?: string;
};

export default function Title({ children, color }: TitleProps) {
    return <TitleHeader color={color}>{children}</TitleHeader>;
}
