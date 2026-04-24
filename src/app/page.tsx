import React from "react";
import { Timeline } from "./components/timeline";
import { Shell } from "./components/shell";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { fetchAboutContent, fetchTimelineEntries } from "../lib/contentful";

export const revalidate = 60;

export default async function Home() {
  const timelineEntries = await fetchTimelineEntries();
  const about = await fetchAboutContent();

  return (
    <Shell>
      <Hero />
      <AboutMe about={about} />

      <Box sx={{ pt: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: 900, mb: 2 }}>
          Timeline
        </Typography>
        <Timeline entries={timelineEntries} />
      </Box>
    </Shell>
  );
}

const Hero = () => {
  return (
    <Box sx={{ px: 1, pt: 1, pb: 1.5 }}>
      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <Avatar
          sx={{ width: 56, height: 56 }}
          alt="Joe Mills"
          src="/me.png"
          slotProps={{ img: { referrerPolicy: "no-referrer" } }}
        />
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 950, lineHeight: 1.1 }}>
            Hi! I&apos;m Joe
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Senior Software Engineer
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

const AboutMe = ({
  about,
}: {
  about: { heading: string; lines: string[] } | null;
}) => {
  const heading = about?.heading ?? "About";
  const lines =
    about?.lines?.length
      ? about.lines
      : [
          "I am a Senior Software Engineer by trade!",
          "When I'm not working, I enjoy gaming, reading and watching movies. I thought it would be neat to keep you up to date on some of the things I've been reading and watching.",
        ];

  return (
    <Box sx={{ px: 1, pb: 1 }}>
      <Typography variant="h5" sx={{ fontWeight: 900, mb: 1 }}>
        {heading}
      </Typography>
      {lines.map((line, idx) => (
        <Typography
          key={idx}
          sx={{ color: "text.secondary", mb: idx === lines.length - 1 ? 0 : 1.5 }}
        >
          {line}
        </Typography>
      ))}
    </Box>
  );
};
