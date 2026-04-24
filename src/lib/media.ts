import "server-only";

import { XMLParser } from "fast-xml-parser";

export type BookItem = {
  title: string;
  author: string;
  link: string;
  rating: string;
  image_url: string;
};

export type MovieItem = {
  title: string;
  year: number;
  image_url: string;
  last_watched_at: string;
  link: string;
};

type MovieResponse = {
  last_watched_at: string;
  movie: {
    title: string;
    year: number;
    ids: { slug: string };
    images: { poster: string };
  };
};

export async function fetchGoodreadsBooks(): Promise<
  { ok: true; items: BookItem[] } | { ok: false }
> {
  try {
    const res = await fetch(
      "https://www.goodreads.com/review/list_rss/146550500?shelf=read&sort=date_read",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
        },
        next: { revalidate: 60 * 60 }, // 1 hour
      }
    );

    if (!res.ok) return { ok: false };

    const text = await res.text();
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "",
      parseAttributeValue: true,
    });
    const parsed = parser.parse(text);
    const bookList = parsed?.rss?.channel?.item ?? [];

    const items: BookItem[] = bookList.map((book: any) => ({
      title: String(book.title ?? ""),
      author: String(book.author_name ?? ""),
      link: String(book.link ?? ""),
      rating: String(book.user_rating ?? ""),
      image_url: String(book.book_large_image_url ?? ""),
    }));

    return { ok: true, items: items.filter((b) => b.title) };
  } catch {
    return { ok: false };
  }
}

export async function fetchTraktMovies(): Promise<
  { ok: true; items: MovieItem[] } | { ok: false }
> {
  try {
    const res = await fetch(
      "https://api.trakt.tv/users/millsjoe/watched/movies?extended=images",
      {
        headers: {
          "trakt-api-version": "2",
          "trakt-api-key": process.env.API_KEY || "",
          Accept: "application/json",
        },
        next: { revalidate: 10 * 60 }, // 10 minutes
      }
    );

    if (!res.ok) return { ok: false };

    const data: MovieResponse[] = await res.json();
    const items: MovieItem[] = data
      .map((row) => ({
        title: row.movie.title,
        year: row.movie.year,
        image_url: row.movie.images.poster?.[0] ?? row.movie.images.poster,
        last_watched_at: row.last_watched_at,
        link: `https://trakt.tv/movies/${row.movie.ids.slug}`,
      }))
      .sort(
        (a, b) =>
          new Date(b.last_watched_at).getTime() -
          new Date(a.last_watched_at).getTime()
      );

    return { ok: true, items };
  } catch {
    return { ok: false };
  }
}

