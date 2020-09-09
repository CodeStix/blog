import React from "react";
import styled from "styled-components";

const CardDiv = styled.div`
    position: relative;
    border-radius: 1em;
    /* width: 100%; */
    border: 0.4em solid ${(props) => props.color ?? "#fff1"};
    margin: 2em 0;
    /* flex-basis: 50%; */
    overflow: hidden;
`;

type CardProps = {
    children: React.ReactNode;
    color?: string;
};

export default function Card({ children, color }: CardProps) {
    return <CardDiv color={color}>{children}</CardDiv>;
}
