import type { APIRoute } from "astro";
import { generateSitemapIndexXml } from "@/lib/sitemap";

export const prerender = true;

export const GET: APIRoute = () => {
  return new Response(generateSitemapIndexXml(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
