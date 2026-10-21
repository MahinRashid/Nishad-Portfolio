// The site's public address, used for metadata, robots.txt and the sitemap.
// NEXT_PUBLIC_SITE_URL can override it, for example on a preview deployment.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nishadportfolio.com").replace(/\/$/, "");
