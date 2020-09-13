export type Article = {
    themeColor: string;
    name: string;
    description: string;
    type: "project" | "post" | "tutorial";
    readMinutes?: string;
    thumbnails?: string[];
    tease?: string;
    githubRepo?: string;
    href: string;
    markdown: string;
    modified: number;
};
