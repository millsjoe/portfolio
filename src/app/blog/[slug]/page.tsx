import { notFound } from "next/navigation";
import { Box, Divider, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import ReactMarkdown from "react-markdown";
import { Shell } from "../../components/shell";
import { BackLink } from "../../components/back-link";
import { fetchBlogPostBySlug } from "../../../lib/contentful";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await fetchBlogPostBySlug(slug);

  if (!post) notFound();

  return (
    <Shell>
      <BackLink href="/blog" label="Back to blog" />
      <Box sx={{ px: 1, pb: 2 }}>
        {post.publishedAt ? (
          <Typography
            variant="caption"
            sx={{ color: "text.secondary", fontWeight: 700 }}
          >
            {new Date(post.publishedAt).toLocaleDateString()}
          </Typography>
        ) : null}
        <Typography variant="h4" sx={{ fontWeight: 950, mt: 0.5 }}>
          {post.title}
        </Typography>
        {post.excerpt ? (
          <Typography sx={{ color: "text.secondary", mt: 1 }}>
            {post.excerpt}
          </Typography>
        ) : null}
      </Box>

      <Divider sx={{ mx: 1, mb: 2 }} />

      <Box sx={{ px: 1 }}>
        <Box
          sx={{
            "& h1, & h2, & h3": { fontWeight: 900, letterSpacing: -0.3 },
            "& h2": { mt: 3, mb: 1 },
            "& p": { color: "text.secondary", lineHeight: 1.8, mb: 1.5 },
            "& a": { color: "primary.main" },
            "& ul": { color: "text.secondary", pl: 3, mb: 1.5 },
            "& li": { mb: 0.5 },
            "& code": {
              fontFamily:
                'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
              fontSize: "0.95em",
            },
            "& pre": {
              bgcolor: alpha("#2B5B66", 0.08),
              p: 2,
              borderRadius: 3,
              overflowX: "auto",
              mb: 2,
            },
          }}
        >
          <ReactMarkdown>{post.contentMarkdown}</ReactMarkdown>
        </Box>
      </Box>
    </Shell>
  );
}

