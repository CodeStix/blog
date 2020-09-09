import path from "path";
import process from "process";
import util from "util";
import fs from "fs";
import { Article } from "../shared/Article";

const readdirAsync = util.promisify(fs.readdir);
const readFileAsync = util.promisify(fs.readFile);
export const projectsDir = path.join(process.cwd(), "projects");

export async function readArticleNames(): Promise<string[]> {
    var files;
    try {
        files = await readdirAsync(projectsDir);
    } catch (ex) {
        console.error("Could not read projects folder: " + ex);
        return [];
    }

    var paths = [];
    for (let i = 0; i < files.length; i++) {
        var file = files[i];
        if (file.endsWith(".json")) {
            paths.push(path.basename(file, ".json"));
        } else if (file.endsWith(".md")) {
            continue;
        } else {
            console.warn("Unknown project page file: " + file);
        }
    }
    return paths;
}

export async function getMarkdownForArticle(name: string): Promise<string> {
    try {
        return await readFileAsync(path.join(projectsDir, name + ".md"), { encoding: "utf8" });
    } catch (ex) {
        console.error("Could not read article markdown: " + ex);
        return null;
    }
}

export async function getArticleWithName(name: string): Promise<Article> {
    try {
        var json = await readFileAsync(path.join(projectsDir, name + ".json"), { encoding: "utf8" });
        var article: Article = JSON.parse(json);
        article.href = `/project/${name}`;
        return article;
    } catch (ex) {
        console.error("Could not read article metadata: " + ex);
        return null;
    }
}
