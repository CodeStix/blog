import React from "react";
import styled from "styled-components";

const ButtonComponent = styled.button<{ color: string }>`
    appearance: none;
    padding: 0.3em 0.5em;
    font-size: inherit;
    border: 3px solid ${(props) => props.color};
    color: ${(props) => props.color};
    background: none;
    border-radius: 1em;
    cursor: pointer;
    transition: 100ms;

    &:hover {
        background-color: ${(props) => props.color};
        color: black;
        transition: 100ms;
    }
`;

type ButtonProps = {
    color?: string;
    children: React.ReactNode;
    style?: React.CSSProperties;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export default function Button(props: ButtonProps) {
    return (
        <ButtonComponent onClick={props.onClick} style={props.style} color={props.color ?? "white"}>
            {props.children}
        </ButtonComponent>
    );
}
