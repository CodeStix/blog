import { faGithub, faTwitter, faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import CenterContainer from "./CenterContainer";
import CoffeeIcon from "./CoffeeIcon";

const navBarHeight = "3.5em";

const Nav = styled.nav`
    max-height: 3.5em;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    transition: max-height 100ms;

    &.navOpen {
        max-height: 100vh;
        transition: max-height 800ms;
    }
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
    /* height: 100%; */
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
    display: flex;
    align-items: center;
    border-bottom: 4px solid white;
    font-weight: bold;
    padding: 1em 1em;
    cursor: pointer;
    text-decoration: none;

    &:hover {
        /* color: gray; */
        background-color: #fff1;
    }

    @media only screen and (max-width: 600px) {
        width: 100%;
        font-size: 1em;
        border: none;
        background: #fff1;
        border-radius: 1em;
        margin-top: 0.5em;
        font-size: 1.2em;
    }
`;

const NavSocialIcons = styled.div`
    display: flex;
    align-items: center;
    font-size: 1.5em;
    margin: 0.5em 0 0.5em 2em;

    @media only screen and (max-width: 600px) {
        margin: 0.5em 0;
        font-size: 2em;
    }
`;

const NavSocialIcon = styled.a`
    display: block;
    padding: 0 0.2em;

    &:hover {
        opacity: 0.5;
    }
`;

const NavMain = styled.div`
    display: flex;
    flex-grow: 1;
`;

const NavSide = styled.div`
    display: flex;
    flex-wrap: wrap;

    @media only screen and (max-width: 600px) {
        width: 100%;
    }
`;

const MenuButton = styled.div`
    position: absolute;
    top: 0.23em;
    right: 0.2em;
    font-size: 2.2em;

    @media only screen and (min-width: 600px) {
        display: none;
    }
`;

const Container = styled(CenterContainer)`
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    transition: transform 200ms;
    transform: rotateX(90deg);
    transform-origin: 0 0;
    width: 100vw;
    box-shadow: 0 5px 20px #0005;
    backdrop-filter: blur(10px);
    background: #fff1;

    &.shown {
        transition: transform 400ms;
        transform: rotateX(0);
    }
`;

const Filler = styled.div`
    height: ${navBarHeight};
`;

export default function NavBar() {
    const [openMenu, setOpenMenu] = useState(false);

    return (
        <>
            <Container className="shown">
                <Nav className={openMenu && "navOpen"}>
                    <NavMain>
                        <NavIcon>
                            <CoffeeIcon style={{}} />
                        </NavIcon>
                        <Link href="/">
                            <NavName>codestix</NavName>
                        </Link>
                    </NavMain>
                    <NavSide>
                        <Link href="/projects" as="/projects" passHref>
                            <NavItem>Projects</NavItem>
                        </Link>
                        {/* <Link href="/test" as="/test" passHref>
                        <NavItem>Test</NavItem>
                    </Link> */}
                        <NavSocialIcons>
                            <Link href="https://github.com/CodeStix/blog" passHref>
                                <NavSocialIcon>
                                    <FontAwesomeIcon icon={faGithub} />
                                </NavSocialIcon>
                            </Link>
                            <Link href="https://twitter.com/codest1x" passHref>
                                <NavSocialIcon>
                                    <FontAwesomeIcon icon={faTwitter} />
                                </NavSocialIcon>
                            </Link>
                            <Link href="https://discord.gg/gnDwyU" passHref>
                                <NavSocialIcon>
                                    <FontAwesomeIcon icon={faDiscord} />
                                </NavSocialIcon>
                            </Link>
                        </NavSocialIcons>
                    </NavSide>
                    <MenuButton onClick={() => setOpenMenu(!openMenu)}>
                        <FontAwesomeIcon icon={faBars} />
                    </MenuButton>
                </Nav>
            </Container>
            <Filler />
        </>
    );
}
