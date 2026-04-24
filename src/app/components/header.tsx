import Image from "next/image";
import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaBluesky } from "react-icons/fa6";
import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";

interface SocialMediaIconProps {
  platform: string;
  url: string;
  icon: React.ReactNode;
}

const socialMediaLinks: SocialMediaIconProps[] = [
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/joe-mills/",
    icon: <FaLinkedin />,
  },
  {
    platform: "Bluesky",
    url: "https://bsky.app/profile/mills.codes",
    icon: <FaBluesky />,
  },
  {
    platform: "Github",
    url: "https://github.com/millsjoe",
    icon: <FaGithub />,
  },
];

export const SocialMedia = () => {
  return (
    <Box sx={{ px: 1, pt: 1, pb: 2 }}>
      <Stack direction="row" spacing={1} sx={{ justifyContent: "flex-end" }}>
        {socialMediaLinks.map(({ platform, url, icon }) => (
          <IconButton
            key={platform}
            component="a"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={platform}
          >
            {icon}
          </IconButton>
        ))}
      </Stack>

      <Stack direction="row" spacing={2} sx={{ alignItems: "center", mt: 2 }}>
        <Avatar
          sx={{ width: 56, height: 56 }}
          alt="Joe Mills"
          src="/me.png"
          slotProps={{ img: { referrerPolicy: "no-referrer" } }}
        />
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 900, lineHeight: 1.1 }}>
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
