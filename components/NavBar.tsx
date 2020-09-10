import React, { useState, useEffect } from "react";
import CenterContainer from "./CenterContainer";
import styled from "styled-components";
import Link from "next/link";

const Nav = styled.div`
    height: 4em;
    display: flex;
`;

const NavIcon = styled.div`
    background: url("/image/kutnocoffeedarktrans.png");
    background-repeat: no-repeat;
    background-size: contain;
    height: 4em;
    width: 4em;
    margin-right: 1.5em;
    flex-shrink: 0;
`;

const NavName = styled.span`
    color: white;
    font-weight: bold;
    display: block;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    justify-content: center;
    font-size: 1.5em;
    flex-grow: 1; /* push other nav items to the right */
    transition: 200ms;
    transition: transform 100ms, letter-spacing 200ms;
    transform: scaleY(1);

    &:hover {
        color: cyan;
        letter-spacing: 2px;
        transition: 200ms;
    }

    &.squashed {
        transform: scaleY(0);
        transition: transform 100ms;
    }
`;

const NavItem = styled.a`
    display: block;
    display: flex;
    align-items: center;
    border-bottom: 4px solid white;
    font-weight: bold;
    padding: 0 0.5em;
    cursor: pointer;
    text-decoration: none;

    &:hover {
        /* color: gray; */
        background-color: #fff1;
    }
`;

export default function NavBar() {
    const [squashed, setSquashed] = useState(false);
    const [name, setName] = useState("Stijn Rogiest");

    function changeName() {
        setSquashed(true);

        setTimeout(() => {
            setName((name) => {
                setSquashed(false);
                if (name === "Stijn Rogiest") return "codestix";
                else return "Stijn Rogiest";
            });
        }, 500);
    }

    useEffect(() => {
        var handle = setInterval(changeName, 5000);
        return () => clearInterval(handle);
    }, []);

    return (
        <CenterContainer style={{ backgroundColor: "#fff1" }}>
            <Nav>
                <Link href="/">
                    <NavIcon />
                </Link>
                <NavName className={squashed && "squashed"}>// {name}</NavName>
                <Link href="https://github.com/CodeStix/blog" passHref>
                    <NavItem>GitHub</NavItem>
                </Link>
            </Nav>
        </CenterContainer>
    );
}
