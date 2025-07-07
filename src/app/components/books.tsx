"use client";

import { Card } from "./card";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const data = await fetch(`${baseUrl}/api/books`);
        const booksData: IBook[] = await data.json();
        setBooks(booksData);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
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
        {books.slice(0, 8).map((book: IBook) => (
          <Card
            key={book.title}
            heading={book.title}
            text={`by ${book.author}`}
            rating={`${book.rating}⭐`}
            imageUrl={book.image_url}
            link={book.link}
          />
        ))}
      </div>
    </div>
  );
};
