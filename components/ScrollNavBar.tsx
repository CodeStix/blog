import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import NavBar from "./NavBar";

type ScrollNavBarProps = {
    threshold?: number;
};

const Container = styled.div`
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    transition: transform 200ms;
    transform: rotateX(90deg);
    transform-origin: 0 0;
    width: 100vw;

    &.shown {
        transition: transform 400ms;
        transform: rotateX(0);
    }
`;

export default function ScrollNavBar({ threshold }: ScrollNavBarProps) {
    const [visible, setVisible] = useState<boolean>(false);
    const scrollInfoRef = useRef({ previousOffset: 0 });

    function onScroll() {
        setVisible(() => {
            let newState =
                scrollInfoRef.current.previousOffset > window.pageYOffset &&
                window.pageYOffset > (threshold || 100);
            scrollInfoRef.current.previousOffset = window.pageYOffset;
            return newState;
        });
    }

    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <Container className={visible && "shown"}>
            <NavBar />
        </Container>
    );
}
