import Image from "next/image";
import React from "react";
import {
  Card as MuiCard,
  CardActionArea,
  CardContent,
  CardMedia,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import StarRounded from "@mui/icons-material/StarRounded";
import { alpha } from "@mui/material/styles";

interface ICardProps {
  heading: string;
  text: string;
  rating?: string;
  imageUrl?: string;
  link?: string;
  eyebrow?: string;
  loading?: boolean;
}

export const Card = React.memo(
  ({ heading, text, imageUrl, rating, link, eyebrow, loading }: ICardProps) => {
    const content = (
      <MuiCard
        variant="outlined"
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          bgcolor: "background.paper",
          borderColor: "divider",
          boxShadow: `0 10px 24px ${alpha("#0b1220", 0.06)}`,
          transition: "box-shadow 140ms ease, transform 140ms ease",
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: `0 16px 34px ${alpha("#0b1220", 0.10)}`,
          },
        }}
      >
        <CardMedia sx={{ position: "relative", aspectRatio: "2 / 3" }}>
          {loading ? (
            <Skeleton variant="rectangular" width="100%" height="100%" />
          ) : (
            <Image
              src={
                imageUrl ||
                "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1328629682l/13456414.jpg"
              }
              alt={heading}
              fill
              sizes="(max-width: 600px) 50vw, (max-width: 900px) 33vw, 25vw"
              style={{ objectFit: "cover" }}
            />
          )}
        </CardMedia>
        <CardContent sx={{ p: 1.5, display: "flex", flexDirection: "column" }}>
          {loading ? (
            <>
              <Skeleton width="60%" />
              <Skeleton width="90%" />
              <Skeleton width="40%" />
            </>
          ) : (
            <>
              {(eyebrow || rating) && (
                <Stack
                  direction="row"
                  sx={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 0.75,
                    minHeight: 18,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                      fontWeight: 800,
                      letterSpacing: 0.6,
                      textTransform: "uppercase",
                    }}
                  >
                    {eyebrow ?? " "}
                  </Typography>

                  {rating ? (
                    <Stack
                      direction="row"
                      spacing={0.25}
                      sx={{ alignItems: "center", color: "text.secondary" }}
                    >
                      <StarRounded sx={{ fontSize: 16, color: "secondary.main" }} />
                      <Typography variant="caption" sx={{ fontWeight: 900 }}>
                        {rating.replace("★", "").replace("⭐", "")}
                      </Typography>
                    </Stack>
                  ) : (
                    <span />
                  )}
                </Stack>
              )}

              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 950,
                  lineHeight: 1.25,
                  minHeight: "2.5em", // reserve 2 lines
                }}
                title={heading}
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {heading}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  mt: 0.25,
                  lineHeight: 1.4,
                  minHeight: "2.8em", // reserve 2 lines
                }}
                title={text}
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {text}
              </Typography>
            </>
          )}
        </CardContent>
      </MuiCard>
    );

    return (
      link ? (
        <CardActionArea
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ borderRadius: 2 }}
        >
          {content}
        </CardActionArea>
      ) : (
        content
      )
    );
  }
);

Card.displayName = "Card";
