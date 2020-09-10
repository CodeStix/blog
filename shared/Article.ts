export type Article = {
    themeColor: string;
    name: string;
    description: string;
    type: "project" | "post";
    thumbnails?: string[];
    tease?: string;
    href: string;
    markdown: string;
    modified: number;
};
