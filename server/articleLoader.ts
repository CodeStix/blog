import path from "path";
import process from "process";
import util from "util";
import fs from "fs";
import { Article } from "../shared/Article";

const readdirAsync = util.promisify(fs.readdir);
const readFileAsync = util.promisify(fs.readFile);
const statFileAsync = util.promisify(fs.stat);
export const articlesDir = path.join(process.cwd(), "articles");

export async function readArticleNames(): Promise<string[]> {
    var files;
    try {
        files = await readdirAsync(articlesDir);
    } catch (ex) {
        console.error("Could not read articles folder: " + ex);
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
            console.warn("Unknown article page file: " + file);
        }
    }
    return paths;
}

export async function getMarkdownForArticle(name: string): Promise<string> {
    try {
        return await readFileAsync(path.join(articlesDir, name + ".md"), { encoding: "utf8" });
    } catch (ex) {
        console.error("Could not read article markdown: " + ex);
        return null;
    }
}

export async function getArticleWithName(name: string): Promise<Article> {
    try {
        const filePath = path.join(articlesDir, name + ".json");
        var stat = await statFileAsync(filePath);
        var json = await readFileAsync(filePath, { encoding: "utf8" });
        var article: Article = JSON.parse(json);
        article.modified = stat.mtimeMs;
        article.href = `/article/${name}`;
        return article;
    } catch (ex) {
        console.error("Could not read article metadata: " + ex);
        return null;
    }
}
