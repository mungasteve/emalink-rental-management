import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXTAUTH_URL || "https://emalink.co.ke";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/owner", "/tenant", "/api"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
