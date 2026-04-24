import { Shell } from "../components/shell";
import { Box, Typography } from "@mui/material";
import { BackLink } from "../components/back-link";
import { fetchGoodreadsBooks } from "../../lib/media";
import { MediaGrid } from "../components/media-grid";
import { Card } from "../components/card";

export const revalidate = 3600;

export default async function ReadPage() {
  const res = await fetchGoodreadsBooks();

  return (
    <Shell>
      <BackLink href="/" label="Back home" />
      <Box sx={{ px: 1, pb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 900, mb: 0.5 }}>
          Recently read
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
          A quick snapshot of what I&apos;ve been reading lately.
        </Typography>
      </Box>
      {res.ok ? (
        <MediaGrid>
          {res.items.slice(0, 12).map((book) => (
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
      ) : (
        <Box sx={{ px: 1 }}>
          <Typography sx={{ color: "text.secondary" }}>
            Oops — this isn’t quite working as expected right now.
          </Typography>
        </Box>
      )}
    </Shell>
  );
}

