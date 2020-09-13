import React from "react";
import NavBar from "../components/NavBar";
import styled from "styled-components";
import CenterContainer from "../components/CenterContainer";
import CoffeeIcon from "../components/CoffeeIcon";

export default function New() {
    return (
        <>
            <NavBar />
            <CenterContainer>
                <p>(page for testing purposes)</p>
                <CoffeeIcon />
            </CenterContainer>
        </>
    );
}
