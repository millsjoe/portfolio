import Image from "next/image";
import React from "react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

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
    platform: "Twitter",
    url: "https://x.com/iamjoemills",
    icon: <FaTwitter />,
  },
  {
    platform: "Github",
    url: "https://github.com/millsjoe",
    icon: <FaGithub />,
  },
];

export const SocialMedia = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
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
    </div>
  );
};
