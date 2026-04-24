import { NextResponse } from "next/server";

interface IMovie {
  title: string;
  year: number;
  ids: {
    trakt: number;
    slug: string;
  };
  images: {
    poster: string;
  };
}
interface IMovieResponse {
  last_watched_at: string;
  movie: IMovie;
}
export async function GET() {
  const res = await fetch(
    "https://api.trakt.tv/users/millsjoe/watched/movies?extended=images",
    {
      headers: {
        "trakt-api-version": "2",
        "trakt-api-key": process.env.API_KEY || "",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return NextResponse.json(
      {
        error: "Oops - this isn't quite working as expected right now.",
      },
      { status: 502 }
    );
  }

  const data: IMovieResponse[] = await res.json();
  const movies = data
    .map((movie: IMovieResponse) => ({
      title: movie.movie.title,
      year: movie.movie.year,
      image_url: movie.movie.images.poster[0],
      last_watched_at: movie.last_watched_at,
      link: `https://trakt.tv/movies/${movie.movie.ids.slug}`,
    }))
    .sort(
      (a, b) =>
        new Date(b.last_watched_at).getTime() -
        new Date(a.last_watched_at).getTime()
    );

  return NextResponse.json(movies);
}
