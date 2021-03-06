import React, { useState } from "react";
import ReactPlayer from "react-player";
import { Carousel } from "react-responsive-carousel";
import styled from "styled-components";

const defaultHeight = "320px";

type UrlCarouselProps = {
    urls: string[];
    height?: string;
    loop?: boolean;
    interval?: number;
    autoPlay?: boolean;
    showArrows?: boolean;
    imageAlign?: string;
};

const ResourceContainer = styled.div`
    position: relative;

    /* fix video width on mobile*/
    iframe {
        width: 100% !important;
        margin: 0 !important;
    }
`;

const ResourceImage = styled.div<{ src: string; height: string; imageAlign?: string }>`
    width: 100%;
    height: ${(props) => props.height};
    /* border-radius: 1em 1em 0 0; */
    background: url("${(props) => props.src}");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: ${(props) => props.imageAlign ?? "bottom left"};
`;

export default function UrlCarousel(props: UrlCarouselProps) {
    const [selected, setSelected] = useState(0);

    return (
        <Carousel
            onChange={setSelected}
            autoPlay={props.autoPlay ?? true}
            interval={props.interval ?? 5000}
            infiniteLoop={props.loop ?? true}
            showThumbs={false}
            showArrows={props.showArrows}
            showStatus={false}
        >
            {props.urls.map((src, i) => (
                <ResourceContainer key={i}>
                    {src.startsWith("https://www.youtube.com/") ? (
                        <ReactPlayer
                            width="100%"
                            height={props.height ?? defaultHeight}
                            controls={false}
                            url={src}
                            playing={selected === i}
                            loop={true}
                            muted={true}
                        />
                    ) : (
                        <ResourceImage imageAlign={props.imageAlign} src={src} height={props.height ?? defaultHeight} />
                    )}
                </ResourceContainer>
            ))}
        </Carousel>
    );
}
