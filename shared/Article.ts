export type Article = {
    themeColor: string;
    name: string;
    description: string;
    imagesVideos?: string[];
    href: string;
    modified: number;
    type: "project" | "post";
    tease?: string;
};
