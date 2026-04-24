"use client";

import { Card } from "./card";
import { useEffect, useState } from "react";
import { MediaGrid } from "./media-grid";
import { Alert, Box } from "@mui/material";

interface IBook {
  title: string;
  author: string;
  link: string;
  rating: string;
  image_url: string;
}

export const Books = () => {
  const [books, setBooks] = useState<IBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setError(null);
        const res = await fetch("/api/books");
        const json = await res.json().catch(() => null);

        if (!res.ok) {
          setBooks([]);
          setError("Couldn’t load books right now.");
          return;
        }

        if (!Array.isArray(json)) {
          setBooks([]);
          setError("Unexpected response from /api/books.");
          return;
        }

        setBooks(json as IBook[]);
      } catch (error) {
        setBooks([]);
        setError("Couldn’t load books right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <MediaGrid>
        {Array.from({ length: 8 }).map((_, i) => (
          <Card
            key={i}
            loading
            heading="Loading"
            text="Loading"
            rating=" "
          />
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
      {books.slice(0, 12).map((book: IBook) => (
        <Card
          key={book.title}
          eyebrow="Book"
          heading={book.title}
          text={book.author ? `by ${book.author}` : ""}
          rating={book.rating ? `${book.rating}★` : undefined}
          imageUrl={book.image_url}
          link={book.link}
        />
      ))}
    </MediaGrid>
  );
};
