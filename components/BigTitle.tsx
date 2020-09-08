import React from "react";
import styled from "styled-components";
import Separator from "./Separator";
import Title from "./Title";

type BigTitleProps = {
    title: string;
    description?: string;
    color?: string;
};

const Description = styled.p`
    margin-top: 0.5em;
    opacity: 0.5;
`;

export default function BigTitle({ title, description, color }: BigTitleProps) {
    return (
        <>
            <Title color={color} title={title} />
            {description && <Description>{description}</Description>}
            <Separator color={color} />
        </>
    );
}
