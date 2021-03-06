import React from "react";
import styled from "styled-components";

const OuterContainer = styled.section`
    display: flex;
    width: 100%;
    justify-content: center;
    /* margin-bottom: 2em; */
    padding: 0 10px;
`;

const InnerContainer = styled.div`
    position: relative;
    max-width: 1000px;
    width: 1000px;
    min-width: 100px;
    overflow: hidden;
`;

type CenterContainerProps = {
    children: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
};

export default function CenterContainer({ children, style, className }: CenterContainerProps) {
    return (
        <OuterContainer style={style} className={className}>
            <InnerContainer>{children}</InnerContainer>
        </OuterContainer>
    );
}
