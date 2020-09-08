import React from "react";
import styled from "styled-components";

const OuterContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    margin-bottom: 2em;
`;

const InnerContainer = styled.div`
    max-width: 900px;
    min-width: 900px;
`;

type CenterContainerProps = {
    children: React.ReactNode;
    style?: React.CSSProperties;
};

export default function CenterContainer({ children, style }: CenterContainerProps) {
    return (
        <OuterContainer style={style}>
            <InnerContainer>{children}</InnerContainer>
        </OuterContainer>
    );
}
