"use client";

import { Card } from "./card";
import { useEffect, useState } from "react";
import { MediaGrid } from "./media-grid";
import { Alert, Box } from "@mui/material";

interface IMovie {
  title: string;
  year: string;
  image_url: string;
  link: string;
}

export const Movies = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setError(null);
        const res = await fetch("/api/movies");
        const json = await res.json().catch(() => null);

        if (!res.ok) {
          const message =
            (json &&
              typeof json === "object" &&
              "error" in json &&
              (json as any).error) ||
            "Oops — this isn’t quite working as expected right now.";
          setMovies([]);
          setError(String(message));
          return;
        }

        if (!Array.isArray(json)) {
          setMovies([]);
          setError("Unexpected response from /api/movies.");
          return;
        }

        setMovies(json as IMovie[]);
      } catch (error) {
        setMovies([]);
        setError("Couldn’t load movies right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <MediaGrid>
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} loading heading="Loading" text="Loading" />
        ))}
      </MediaGrid>
    );
  }

  if (error) {
    return (
      <Box sx={{ px: 1 }}>
        <Alert severity="warning">{error}</Alert>
      </Box>
    );
  }

  return (
    <MediaGrid>
      {movies.slice(0, 12).map((movie) => (
        <Card
          key={movie.title}
          eyebrow="Movie"
          heading={movie.title}
          text={movie.year}
          imageUrl={`https://${movie.image_url}`}
          link={movie.link}
        />
      ))}
    </MediaGrid>
  );
};
