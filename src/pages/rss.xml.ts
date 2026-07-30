import rss from "@astrojs/rss";
import { absoluteUrl, site, sortedPosts } from "../data/blog";

export function GET() {
  return rss({
    title: site.title,
    description: site.description,
    site: site.url,
    items: sortedPosts.map(post => ({
      title: post.title,
      description: post.description,
      pubDate: new Date(post.date),
      link: absoluteUrl(post.href),
      categories: [post.category, post.collection, ...post.tags],
    })),
  });
}
