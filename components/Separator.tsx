import React from "react";
import styled from "styled-components";

type SeparatorProps = {
    color?: string;
};

const SeparatorDiv = styled.div`
    margin: 1em 0em;
    width: 100%;
    height: 0.5em;
    border-radius: 0.25em;
    background-color: ${(props) => props.color ?? "#fff1"};
`;

export default function Separator({ color }: SeparatorProps) {
    return <SeparatorDiv color={color} />;
}
