import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Octokit } from "@octokit/rest";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCodeBranch, faDownload } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import Button from "./Button";

type GitHubStatusProps = {
    repo: string;
    color?: string;
};

type GitHubStats = {
    forks: number;
    watchers: number;
    starsgazers: number;
};

type GitHubStargazer = {
    name: string;
    avatarUrl: string;
};

const GitHubBadge = styled.span<{ color: string }>`
    color: ${(props) => props.color};
    font-weight: bold;
    padding: 0.5em 0.8em;
`;

const GitHubStatGroup = styled.div`
    display: flex;
    flex-grow: 1;
`;

const GitHubStat = styled.span`
    padding: 0.5em 0.8em;
    background-color: #fff1;
    flex-grow: 1;
`;

const Important = styled.span`
    font-weight: bold;
`;

const GitHubStatImage = styled.img`
    height: 2.1em;
`;

const InnerContainer = styled.div`
    position: relative;
    border-radius: 1em;
    display: inline-flex;
    flex-wrap: wrap;
    border: 1px solid #fff1;
    overflow: hidden;
`;

const ContainerOverlay = styled.a`
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000c;
    z-index: 2;
    opacity: 0;
    transition: opacity 200ms;

    @media only screen and (min-width: 600px) {
        &:hover {
            opacity: 1;
            transition: opacity 200ms;
        }
    }
`;

export default function GitHubStatus({ repo: repository, color }: GitHubStatusProps) {
    const [stats, setStats] = useState<GitHubStats>(null);
    const [lastStargazer, setLastStargazer] = useState<GitHubStargazer>(null);

    useEffect(() => {
        (async () => {
            let split = repository.split("/");
            let owner = split[0],
                repo = split[1];
            let octo = new Octokit();
            var repoStats = await octo.repos.get({
                owner,
                repo,
            });

            setStats({
                starsgazers: repoStats.data.stargazers_count,
                forks: repoStats.data.forks_count,
                watchers: repoStats.data.watchers_count,
            });
            console.log({ repoStats });

            if (repoStats.data.stargazers_count <= 0) return;

            var repoStargazers = await octo.activity.listStargazersForRepo({
                owner,
                repo,
                per_page: 100,
                page: repoStats.data.stargazers_count / 100,
            });

            let last = repoStargazers.data[repoStargazers.data.length - 1];
            if ("user" in last) {
                setLastStargazer({
                    name: last.user.login,
                    avatarUrl: last.user.avatar_url,
                });
            } else {
                setLastStargazer({
                    name: last.login,
                    avatarUrl: last.avatar_url,
                });
            }
        })();
    }, []);

    return (
        <InnerContainer>
            <Link href={`https://github.com/${repository}`} passHref>
                <ContainerOverlay>Star me!</ContainerOverlay>
            </Link>
            <GitHubBadge color={color ?? "lime"}>
                <FontAwesomeIcon icon={faGithub} /> {repository}
            </GitHubBadge>
            {stats ? (
                <>
                    {!!stats.forks && (
                        <GitHubStat>
                            <FontAwesomeIcon icon={faCodeBranch} />{" "}
                            <Important>{stats.forks} forks</Important>
                        </GitHubStat>
                    )}

                    <GitHubStat>
                        <FontAwesomeIcon icon={faStar} />{" "}
                        <Important>{stats.starsgazers} stars</Important>
                    </GitHubStat>

                    {lastStargazer && (
                        <GitHubStatGroup>
                            <GitHubStat>Last stargazer</GitHubStat>
                            <GitHubStatImage src={lastStargazer.avatarUrl} />
                            <GitHubStat>
                                <Important>{lastStargazer.name}</Important>
                            </GitHubStat>
                        </GitHubStatGroup>
                    )}
                </>
            ) : (
                <GitHubStat>Loading...</GitHubStat>
            )}
        </InnerContainer>
    );
}
