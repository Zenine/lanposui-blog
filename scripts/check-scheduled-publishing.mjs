import { getPublishedPosts } from "../src/data/publishing.mjs";

const fixturePosts = [
  {
    title: "已发布文章",
    href: "/articles/published/",
    date: "2026-08-04",
    categorySlug: "test",
    collectionSlug: "test",
  },
  {
    title: "未来文章",
    href: "/articles/future/",
    date: "2026-08-05",
    categorySlug: "test",
    collectionSlug: "test",
  },
];

const published = getPublishedPosts(fixturePosts, new Date("2026-08-04T15:30:00.000Z"));
const titles = published.map(post => post.title);

assertIncludes(titles, "已发布文章", "published posts");
assertExcludes(titles, "未来文章", "published posts");

function assertIncludes(items, expected, label) {
  if (!items.includes(expected)) {
    throw new Error(`${label} is missing ${expected}`);
  }
}

function assertExcludes(items, unexpected, label) {
  if (items.includes(unexpected)) {
    throw new Error(`${label} should not include ${unexpected}`);
  }
}
