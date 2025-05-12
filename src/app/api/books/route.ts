import type { NextRequest } from "next/server";
import { XMLParser } from "fast-xml-parser";

export const runtime = "edge";
export async function GET(request: NextRequest) {
  let books;
  await fetch(
    "https://www.goodreads.com/review/list_rss/146550500?shelf=read&sort=date_read",
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
      },
    }
  )
    .then(async (res) => {
      const text = await res.text();
      const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: "",
        parseAttributeValue: true,
      });
      const parsed = parser.parse(text);
      const bookList = parsed.rss.channel.item;
      books = bookList.map((book: any) => ({
        title: book.title,
        author: book.author_name,
        link: book.link,
        rating: book.user_rating,
        image_url: book.book_large_image_url,
      }));
    })
    .catch((err) => {
      console.error("Error fetching data:", err);
    });

  return new Response(JSON.stringify(books), {
    headers: { "Content-Type": "application/json" },
  });
}
