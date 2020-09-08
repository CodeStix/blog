import React, { useState } from "react";
import { GetStaticProps } from "next";
import NavBar from "../components/NavBar";
import CenterContainer from "../components/CenterContainer";
import BigTitle from "../components/BigTitle";
import Title from "../components/Title";
import Card from "../components/Card";

export default function Index() {
    return (
        <>
            <NavBar />
            <CenterContainer>
                <Title title="Projects" />
                <Card color="#00A3FF">
                    <Title title="Beat-360fyer" color="#00A3FF" />
                    <p>Use this tool to convert a standard Beat Saber level into a 360 degree one!</p>
                </Card>
                <Card color="#FFA800">
                    <Title title="Reddit Discord bot" color="#FFA800" />
                    <p>An amazing Discord bot that connects with reddit. Has video downloading support, 50/50 spoilers ...</p>
                </Card>
            </CenterContainer>
        </>
    );
}

// called on server
export const getStaticProp: GetStaticProps = async function ({ params }) {
    return {
        props: {},
        revalidate: 10,
    };
};
