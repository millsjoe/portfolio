import Image from "next/image";
import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaBluesky } from "react-icons/fa6";

interface SocialMediaIconProps {
  platform: string;
  url: string;
  icon: JSX.Element;
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
    <div className="flex flex-col gap-4 items-center justify-center p-2">
      <div className="flex space-x-4">
        {socialMediaLinks.map(({ platform, url, icon }) => (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-500"
          >
            {icon}
          </a>
        ))}
      </div>
      <Image
        src="/me.png"
        alt="Joe Mills"
        width={50}
        height={50}
        className="rounded-full"
      />
      <h1 className="text-2xl font-bold text-[#0d3b66]">Hi! I&apos;m Joe</h1>
    </div>
  );
};
