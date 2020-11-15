import React from "react";
import styled from "styled-components";
import CenterContainer from "../components/CenterContainer";
import CoffeeIcon from "../components/CoffeeIcon";
import ScrollNavBar from "../components/ScrollNavBar";

export default function New() {
    return (
        <>
            <ScrollNavBar />
            <CenterContainer>
                <p>(page for testing purposes)</p>
                <CoffeeIcon />
            </CenterContainer>
        </>
    );
}
