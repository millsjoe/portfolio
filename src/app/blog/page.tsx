import Link from "next/link";
import { Box, Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Shell } from "../components/shell";
import { BackLink } from "../components/back-link";
import { fetchBlogPosts } from "../../lib/contentful";

export default async function BlogIndexPage() {
  const posts = await fetchBlogPosts();

  return (
    <Shell>
      <BackLink href="/" label="Back home" />
      <Box sx={{ px: 1, pb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 900, mb: 0.5 }}>
          Blog
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
         Certified ramblings of a software engineer
        </Typography>
      </Box>

      <Box sx={{ display: "grid", gap: 2, px: 1 }}>
        {(posts ?? []).map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            style={{ textDecoration: "none" }}
          >
            <Card
              variant="outlined"
              sx={{
                borderRadius: 1.5,
                overflow: "hidden",
                boxShadow: "none",
                borderColor: "divider",
                transition: "background-color 120ms ease, border-color 120ms ease",
                "&:hover": {
                  bgcolor: alpha("#2B5B66", 0.05),
                  borderColor: alpha("#2B5B66", 0.25),
                },
              }}
            >
              <CardActionArea component="div">
                <CardContent sx={{ p: 2 }}>
                  {post.publishedAt ? (
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary", fontWeight: 700 }}
                    >
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </Typography>
                  ) : null}
                  <Typography variant="h6" sx={{ fontWeight: 900 }}>
                    {post.title}
                  </Typography>
                  {post.excerpt ? (
                    <Typography sx={{ color: "text.secondary", mt: 0.5 }}>
                      {post.excerpt}
                    </Typography>
                  ) : null}
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        ))}

        {posts && posts.length === 0 ? (
          <Typography sx={{ color: "text.secondary" }}>
            No posts yet.
          </Typography>
        ) : null}

        {posts === null ? (
          <Typography sx={{ color: "text.secondary" }}>
            Blog is not configured yet.
          </Typography>
        ) : null}
      </Box>
    </Shell>
  );
}

