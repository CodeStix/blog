import React from "react";
import styled from "styled-components";
import CenterContainer from "../components/CenterContainer";

// Credits for smoke svg: https://codepen.io/frrrnd/pen/YQNEEL

const CoffeeSvg = styled.svg`
    position: absolute;
    left: 80%;
    top: -52%;
    width: 100%;
    height: 100%;

    @keyframes shift {
        0% {
            transform: translateY(120%);
            opacity: 1;
        }

        80% {
            opacity: 0;
        }

        100% {
            opacity: 0;
            transform: translateY(0);
        }
    }

    .smoke-1 {
        animation: shift 5s ease-out 1.2s infinite;
    }

    .smoke-2 {
        animation: shift 4s ease-out 0.6s infinite;
    }

    .smoke-3 {
        animation: shift 4.5s ease-out 1.5s infinite;
    }
`;

const Container = styled.div`
    display: inline-block;
    position: relative;
    /* height: 200px; */
    /* width: 200px; */
`;

const Icon = styled.img`
    width: 100%;
    height: 100%;
`;

type CoffeeIconProps = {
    style?: React.CSSProperties;
    icon?: string;
};

export default function CoffeeIcon({ style, icon }: CoffeeIconProps) {
    return (
        <Container style={style}>
            <Icon src={icon ?? "/image/icon.png"} />
            <CoffeeSvg x="0" y="0" width="200" height="200" viewBox="0 0 200 200">
                <g transform="scale(1,1)">
                    <g transform="translate(15, 0.000000)" stroke="#BEBEBE" strokeWidth="10">
                        <g className="smoke-1">
                            <path
                                id="Shape1"
                                d="M0.5,8.8817842e-16 C0.5,8.8817842e-16 3.5,5.875 3.5,11.75 C3.5,17.625 0.5,17.625 0.5,23.5 C0.5,29.375 3.5,29.375 3.5,35.25 C3.5,41.125 0.5,41.125 0.5,47"
                            ></path>
                        </g>
                    </g>
                    <g transform="translate(24.000000, 0.000000)" stroke="#BEBEBE" strokeWidth="10">
                        <g className="smoke-2">
                            <path
                                id="Shape1"
                                d="M0.5,8.8817842e-16 C0.5,8.8817842e-16 3.5,5.875 3.5,11.75 C3.5,17.625 0.5,17.625 0.5,23.5 C0.5,29.375 3.5,29.375 3.5,35.25 C3.5,41.125 0.5,41.125 0.5,47"
                            ></path>
                        </g>
                    </g>
                    <g transform="translate(6.000000, 0.000000)" stroke="#BEBEBE" strokeWidth="10">
                        <g className="smoke-3">
                            <path
                                id="Shape1"
                                d="M0.5,8.8817842e-16 C0.5,8.8817842e-16 3.5,5.875 3.5,11.75 C3.5,17.625 0.5,17.625 0.5,23.5 C0.5,29.375 3.5,29.375 3.5,35.25 C3.5,41.125 0.5,41.125 0.5,47"
                            ></path>
                        </g>
                    </g>
                </g>
            </CoffeeSvg>
        </Container>
    );
}
