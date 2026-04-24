import { XMLParser } from "fast-xml-parser";

export async function GET() {
  try {
    const res = await fetch(
      "https://www.goodreads.com/review/list_rss/146550500?shelf=read&sort=date_read",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return new Response(
        JSON.stringify({
          error: "Oops - this isn't quite working as expected right now.",
        }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    const text = await res.text();
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "",
      parseAttributeValue: true,
    });
    const parsed = parser.parse(text);
    const bookList = parsed?.rss?.channel?.item ?? [];

    const books = bookList.map((book: any) => ({
      title: book.title,
      author: book.author_name,
      link: book.link,
      rating: book.user_rating,
      image_url: book.book_large_image_url,
    }));

    return new Response(JSON.stringify(books), {
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(
      JSON.stringify({
        error: "Oops - this isn't quite working as expected right now.",
      }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }
}
