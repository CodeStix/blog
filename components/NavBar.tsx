import React, { useState, useEffect } from "react";
import CenterContainer from "./CenterContainer";
import styled from "styled-components";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import CoffeeIcon from "./CoffeeIcon";

const navBarHeight = "3.5em";

const Nav = styled.nav`
    height: ${navBarHeight};
    display: flex;
`;

const NavIcon = styled.div`
    /* background: url("/image/kutnocoffeedarktrans.png"); */
    /* background-repeat: no-repeat; */
    /* background-size: contain; */
    height: ${navBarHeight};
    width: ${navBarHeight};
    margin-right: 1.5em;
    flex-shrink: 0;
`;

const NavName = styled.span`
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
    letter-spacing: 0px;
    cursor: pointer;

    &:hover {
        letter-spacing: 1px;
        transition: 200ms;
    }

    &:active {
        letter-spacing: 5px;
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

const NavSocialIcons = styled.div`
    display: flex;
    align-items: center;
    margin-left: 3em;
`;

const NavSocialIcon = styled.a`
    display: block;
    padding: 0 0.4em;
    font-size: 2em;

    &:hover {
        opacity: 0.5;
    }
`;

export default function NavBar() {
    return (
        <CenterContainer style={{ backgroundColor: "#2c2c2c" }}>
            <Nav>
                <NavIcon>
                    <CoffeeIcon style={{}} />
                </NavIcon>
                <Link href="/">
                    <NavName>codestix</NavName>
                </Link>
                <NavSocialIcons>
                    <Link href="https://github.com/CodeStix/blog" passHref>
                        <NavSocialIcon>
                            <FontAwesomeIcon icon={faGithub} />
                        </NavSocialIcon>
                    </Link>
                </NavSocialIcons>
            </Nav>
        </CenterContainer>
    );
}
