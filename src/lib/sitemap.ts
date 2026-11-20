import { getCollection } from "astro:content";
import { SITE_URL } from "@/lib/site";

export async function generateSitemapXml(): Promise<string> {
  const posts = await getCollection("blog");
  const docs = await getCollection("docs");

  const staticRoutes = [
    { url: "", changefreq: "weekly", priority: "1.0" },
    { url: "/tienda", changefreq: "daily", priority: "0.9" },
    { url: "/market", changefreq: "weekly", priority: "0.9" },
    { url: "/restaurantes", changefreq: "weekly", priority: "0.9" },
    { url: "/odontologia", changefreq: "weekly", priority: "0.9" },
    { url: "/blog", changefreq: "daily", priority: "0.9" },
    { url: "/docs", changefreq: "weekly", priority: "0.8" },
    { url: "/info/politicas-privacidad", changefreq: "yearly", priority: "0.4" },
    { url: "/info/terminos-condiciones-uso", changefreq: "yearly", priority: "0.4" },
    { url: "/llms.txt", changefreq: "monthly", priority: "0.5" },
  ];

  const now = new Date().toISOString();

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticRoutes
  .map(
    (route) => `  <url>
    <loc>${SITE_URL}${route.url.endsWith(".txt") ? route.url : route.url + "/"}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join("\n")}
${posts
  .map((post) => {
    const slug = post.id.replace(/\.md$/, "");
    const lastmod = post.data.updatedDate
      ? new Date(post.data.updatedDate).toISOString()
      : new Date(post.data.pubDate).toISOString();
    return `  <url>
    <loc>${SITE_URL}/blog/${slug}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
  })
  .join("\n")}
${docs
  .map((doc) => {
    // Same path rule as src/pages/docs/[rubro]/[slug].astro
    const parts = doc.id.replace(/\.md$/, "").split("/");
    const rubro = parts.length > 1 ? parts[0] : (doc.data as { rubro?: string }).rubro;
    const slug = parts[parts.length - 1];
    return `  <url>
    <loc>${SITE_URL}/docs/${rubro}/${slug}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  })
  .join("\n")}
</urlset>`;
}

export function generateSitemapIndexXml(): string {
  const now = new Date().toISOString();
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/sitemap-0.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
</sitemapindex>`;
}
