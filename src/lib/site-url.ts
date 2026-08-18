const fallbackUrl = "http://localhost:3000";

export function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const candidate = configuredUrl || (vercelUrl ? `https://${vercelUrl}` : fallbackUrl);

  try {
    return new URL(candidate);
  } catch {
    return new URL(fallbackUrl);
  }
}
