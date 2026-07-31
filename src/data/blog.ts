import { readFileSync } from "node:fs";
import { imageSize } from "image-size";
import { posts, type Post } from "./posts";

export const site = {
  title: "蓝破碎半圆",
  description: "一个 AI 时代技术决策者的判断笔记。",
  url: "https://zenine.github.io/lanposui-blog",
  author: "ZENINEXU",
};

export const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));

export function getCategories() {
  return groupBy(sortedPosts, post => post.categorySlug).map(group => ({
    slug: group.key,
    name: group.items[0].category,
    posts: group.items,
  }));
}

export function getCollections() {
  return groupBy(sortedPosts, post => post.collectionSlug).map(group => ({
    slug: group.key,
    name: group.items[0].collection,
    posts: group.items,
  }));
}

export function getRelatedPosts(post: Pick<Post, "href" | "categorySlug" | "collectionSlug">, limit = 3) {
  return sortedPosts
    .filter(item => item.href !== post.href)
    .map(item => ({
      post: item,
      score:
        Number(item.collectionSlug === post.collectionSlug) * 2 +
        Number(item.categorySlug === post.categorySlug),
    }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score || b.post.date.localeCompare(a.post.date))
    .slice(0, limit)
    .map(item => item.post);
}

export function absoluteUrl(path = "") {
  return `${site.url}/${path.replace(/^\/+/, "")}`;
}

// 读取 public/ 下站内图片的真实宽高，构建期写入 width/height 消除 CLS。
// 接受 posts.ts 的 "/images/..." 或 Markdown 的 "/lanposui-blog/images/..." 两种前缀。
export function imageDims(src = "") {
  const rel = src.replace(/^\/lanposui-blog\//, "/").replace(/^\/+/, "");
  if (!rel.startsWith("images/")) return undefined;
  try {
    const size = imageSize(readFileSync(`public/${rel}`));
    return size.width && size.height ? { width: size.width, height: size.height } : undefined;
  } catch {
    return undefined;
  }
}

function groupBy<T>(items: T[], getKey: (item: T) => string) {
  const groups = new Map<string, T[]>();

  for (const item of items) {
    const key = getKey(item);
    groups.set(key, [...(groups.get(key) ?? []), item]);
  }

  return [...groups.entries()].map(([key, groupedItems]) => ({ key, items: groupedItems }));
}
