import type { APIRoute } from "astro";
import { generateSitemapXml } from "@/lib/sitemap";

export const prerender = true;

export const GET: APIRoute = async () => {
  const xml = await generateSitemapXml();
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
