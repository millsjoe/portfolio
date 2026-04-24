import { Movies } from "../components/movies";
import { Shell } from "../components/shell";
import { Box, Typography } from "@mui/material";
import { BackLink } from "../components/back-link";

export default function WatchedPage() {
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
      <Movies />
    </Shell>
  );
}

