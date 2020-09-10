import React from "react";
import styled from "styled-components";
import Separator from "./Separator";
import Title from "./Title";

type BigTitleProps = {
    children: React.ReactNode;
    description?: string;
    color?: string;
};

const Description = styled.p`
    margin-top: 0.5em;
    opacity: 0.5;
`;

export default function BigTitle({
    children,
    description,
    color,
}: BigTitleProps) {
    return (
        <>
            <Title color={color}>{children}</Title>
            {description && <Description>{description}</Description>}
            <Separator color={color} />
        </>
    );
}
