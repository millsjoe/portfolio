"use client";

import { Card } from "./card";
import { useEffect, useState } from "react";

interface IMovie {
  title: string;
  year: string;
  image_url: string;
  link: string;
}

export const Movies = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const data = await fetch(`${baseUrl}/api/movies`);
        const moviesData: IMovie[] = await data.json();
        setMovies(moviesData);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center p-4">
        <div className="flex flex-row items-center justify-center gap-4 mb-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white w-[200px] min-w-[200px] p-5 rounded-[1em] shadow-md flex flex-col items-center justify-center gap-4"
            >
              <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-full h-3 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-[100px] h-[150px] bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center p-4">
      <div className="flex flex-row items-center justify-center gap-4 mb-4">
        {movies.slice(0, 8).map((movie) => (
          <Card
            key={movie.title}
            heading={movie.title}
            text={movie.year}
            imageUrl={`https://${movie.image_url}`}
            link={movie.link}
          />
        ))}
      </div>
    </div>
  );
};
