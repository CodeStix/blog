import React from "react";
import styled from "styled-components";

const CardDiv = styled.article`
    position: relative;
    border-radius: 1em;
    z-index: 1;
    /* width: 100%; */
    border: 0.33em solid ${(props) => props.color ?? "#fff1"};
    margin: 2em 0;
    /* flex-basis: 50%; */
    overflow: hidden;

    @media only screen and (max-width: 600px) {
        /* border-radius: 0; */
        border-left: none;
        border-right: none;
        background: #fff1;
        /* margin: 0; */
    }
`;

type CardProps = {
    children: React.ReactNode;
    color?: string;
};

export default function Card({ children, color }: CardProps) {
    return <CardDiv color={color}>{children}</CardDiv>;
}
