import path from "path";
import process from "process";
import util from "util";
import fs from "fs";
import { Article } from "../shared/Article";
import matter from "gray-matter";

const readdirAsync = util.promisify(fs.readdir);
const readFileAsync = util.promisify(fs.readFile);
const statFileAsync = util.promisify(fs.stat);
export const articlesDir = path.join(process.cwd(), "articles");

export async function getArticles(): Promise<Article[]> {
    var files: string[] = [];
    try {
        files = await readdirAsync(articlesDir);
    } catch (ex) {
        console.error("Could not read articles folder: " + ex);
        return [];
    }

    var articles = [];
    for (let i = 0; i < files.length; i++) {
        var file = files[i];
        if (!file.endsWith(".md")) {
            console.log("Unknown file", file);
            continue;
        }

        const name = path.basename(file, ".md");
        articles.push(await getArticleWithName(name));
    }

    return articles;
}

export async function getArticleWithName(name: string): Promise<Article> {
    const file = path.join(articlesDir, name + ".md");
    var stat = await statFileAsync(file);
    var md = await readFileAsync(file, {
        encoding: "utf8",
    });

    const meta = matter(md);
    return {
        modified: stat.mtimeMs,
        href: `/article/${name}`,
        markdown: meta.content,
        ...meta.data,
    } as Article;

    /*try {
        const filePath = path.join(articlesDir, name + ".json");
        var stat = await statFileAsync(filePath);
        var json = await readFileAsync(filePath, {
            encoding: "utf8",
        });
        var article: Article = JSON.parse(json);
        article.modified = stat.mtimeMs;
        article.href = `/article/${name}`;
        return article;
    } catch (ex) {
        console.error("Could not read article metadata: " + ex);
        return null;
    }*/
}
