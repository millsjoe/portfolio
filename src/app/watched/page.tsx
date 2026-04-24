import { Shell } from "../components/shell";
import { Box, Typography } from "@mui/material";
import { BackLink } from "../components/back-link";
import { fetchTraktMovies } from "../../lib/media";
import { MediaGrid } from "../components/media-grid";
import { Card } from "../components/card";

export const revalidate = 600;

export default async function WatchedPage() {
  const res = await fetchTraktMovies();

  return (
    <Shell>
      <BackLink href="/" label="Back home" />
      <Box sx={{ px: 1, pb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 900, mb: 0.5 }}>
          Recently watched
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
          A quick snapshot of what I&apos;ve been watching lately.
        </Typography>
      </Box>
      {res.ok ? (
        <MediaGrid>
          {res.items.slice(0, 12).map((movie) => (
            <Card
              key={movie.title}
              eyebrow="Movie"
              heading={movie.title}
              text={String(movie.year)}
              imageUrl={`https://${movie.image_url}`}
              link={movie.link}
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

