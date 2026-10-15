// The site's public address, used for metadata, robots.txt and the sitemap.
// Set NEXT_PUBLIC_SITE_URL once you have a custom domain; on Vercel it otherwise
// falls back to the project's production address, which Vercel provides.
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000")
).replace(/\/$/, "");
