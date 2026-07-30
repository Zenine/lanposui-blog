import type { APIContext } from "astro";

export function GET(context: APIContext) {
  const site = context.site ?? new URL("https://zenine.github.io");

  return new Response(
    [
      "User-agent: *",
      "Allow: /",
      `Sitemap: ${new URL("/lanposui-blog/sitemap-index.xml", site).toString()}`,
    ].join("\n"),
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    }
  );
}
