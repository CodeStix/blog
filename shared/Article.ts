export type Article = {
    themeColor: string;
    name: string;
    description: string;
    thumbnail?: string;
    href: string;
    modified: number;
    type: "project" | "post";
};
