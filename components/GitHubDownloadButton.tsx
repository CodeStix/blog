import React, { useEffect, useState } from "react";
import { Octokit } from "@octokit/rest";
import styled from "styled-components";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

type GitHubDownloadButtonProps = {
    repo: string;
    color?: string;
    style?: React.CSSProperties;
};

type GitHubRelease = {
    tag: string;
    url: string;
    name: string;
};

const DownloadName = styled.span`
    font-weight: bold;
    font-size: 1.1em;
`;

export default function GitHubDownloadButton({
    repo: repository,
    color,
    style,
}: GitHubDownloadButtonProps) {
    const [latestRelease, setLatestRelease] = useState<GitHubRelease>(null);
    const router = useRouter();

    useEffect(() => {
        (async () => {
            let split = repository.split("/");
            let owner = split[0],
                repo = split[1];
            let octo = new Octokit();
            let release = await octo.repos.getLatestRelease({ repo, owner });
            setLatestRelease({
                name: release.data.name,
                url: release.data.html_url,
                tag: release.data.tag_name,
            });
        })();
    }, []);

    if (!latestRelease) return null;

    return (
        <Button
            style={style}
            onClick={() => router.push(latestRelease.url)}
            color={color ?? "lime"}
        >
            <FontAwesomeIcon icon={faDownload} /> <DownloadName>{latestRelease.name}</DownloadName>
        </Button>
    );
}
