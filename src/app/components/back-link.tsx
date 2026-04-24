import Link from "next/link";
import { Box, Typography } from "@mui/material";

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Box sx={{ px: 1, pb: 1 }}>
      <Link href={href} style={{ textDecoration: "none" }}>
        <Typography
          sx={{
            color: "text.secondary",
            fontWeight: 800,
            "&:hover": { color: "text.primary" },
          }}
        >
          ← {label}
        </Typography>
      </Link>
    </Box>
  );
}

