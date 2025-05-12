import { Card } from "./card";

interface IBook {
  title: string;
  author: string;
  link: string;
  rating: string;
  image_url: string;
}

export const Books = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const data = await fetch(`${baseUrl}/api/books`);

  const books: IBook[] = await data.json();
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
