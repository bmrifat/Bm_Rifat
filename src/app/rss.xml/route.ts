import { NextResponse } from "next/server";
import { posts } from "@/data/posts";

export async function GET() {
  const siteUrl = "https://bmrifat.com";

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>BM Rifat — Engineering Notes</title>
    <link>${siteUrl}</link>
    <description>Articles and architectural deep dives by BM Rifat</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${posts
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title.en}]]></title>
      <link>${siteUrl}/en/writing/${post.slug}</link>
      <guid>${siteUrl}/en/writing/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.summary.en}]]></description>
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

  return new NextResponse(rssFeed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
