import "server-only";
import { createClient } from "contentful";

export type TimelineEntry = {
  title: string;
  location: string;
  date: string;
  description: string;
  type: "work" | "education";
  skills?: string[];
};

export type AboutContent = {
  heading: string;
  lines: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt?: string;
  publishedAt?: string;
  contentMarkdown: string;
};

function getClient() {
  const space = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

  if (!space || !accessToken) return null;

  return createClient({
    space,
    accessToken,
  });
}

export async function fetchTimelineEntries(): Promise<TimelineEntry[] | null> {
  const client = getClient();
  if (!client) return null;

  let res;
  try {
    res = await client.getEntries({
      content_type: "timelineEntry",
      order: ["-fields.startDate"],
      limit: 50,
    });
  } catch {
    return null;
  }

  return res.items
    .map((item: any) => {
      const f = item.fields ?? {};
      const skills = Array.isArray(f.skills)
        ? f.skills
            .flatMap((v: unknown) => String(v).split(","))
            .map((s: string) => s.trim().toLowerCase())
            .filter(Boolean)
        : typeof f.skills === "string"
          ? f.skills
              .split(",")
              .map((s: string) => s.trim().toLowerCase())
              .filter(Boolean)
          : undefined;

      return {
        title: String(f.title ?? ""),
        location: String(f.location ?? ""),
        date: String(f.dateLabel ?? ""),
        description: String(f.description ?? ""),
        type: f.type === "education" ? "education" : "work",
        skills,
      } satisfies TimelineEntry;
    })
    .filter((e) => e.title && e.location && e.date && e.description);
}

export async function fetchAboutContent(): Promise<AboutContent | null> {
  const client = getClient();
  if (!client) return null;

  let res;
  try {
    res = await client.getEntries({
      content_type: "aboutContent",
      limit: 1,
    });
  } catch {
    return null;
  }

  const item: any = res.items?.[0];
  const f = item?.fields ?? {};

  const heading = String(f.heading ?? "About");
  const lines =
    Array.isArray(f.lines) && f.lines.length
      ? f.lines.map(String).filter(Boolean)
      : [];

  return { heading, lines };
}

export async function fetchBlogPosts(): Promise<BlogPost[] | null> {
  const client = getClient();
  if (!client) return null;

  let res;
  try {
    res = await client.getEntries({
      content_type: "blogPost",
      order: ["-fields.publishedAt"],
      limit: 50,
    });
  } catch {
    return null;
  }

  return res.items
    .map((item: any) => {
      const f = item.fields ?? {};
      return {
        slug: String(f.slug ?? ""),
        title: String(f.title ?? ""),
        excerpt: f.excerpt ? String(f.excerpt) : undefined,
        publishedAt: f.publishedAt ? String(f.publishedAt) : undefined,
        contentMarkdown: String(f.contentMarkdown ?? ""),
      } satisfies BlogPost;
    })
    .filter((p) => p.slug && p.title);
}

export async function fetchBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  const client = getClient();
  if (!client) return null;

  let res;
  try {
    res = await client.getEntries({
      content_type: "blogPost",
      "fields.slug": slug,
      limit: 1,
    });
  } catch {
    return null;
  }

  const item: any = res.items?.[0];
  if (!item) return null;

  const f = item.fields ?? {};
  const post: BlogPost = {
    slug: String(f.slug ?? ""),
    title: String(f.title ?? ""),
    excerpt: f.excerpt ? String(f.excerpt) : undefined,
    publishedAt: f.publishedAt ? String(f.publishedAt) : undefined,
    contentMarkdown: String(f.contentMarkdown ?? ""),
  };

  if (!post.slug || !post.title) return null;
  return post;
}

