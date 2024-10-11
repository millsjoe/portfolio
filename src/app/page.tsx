import { Card } from "./components/card";
import { SocialMedia } from "./components/header";
import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-col gap-2 items-center justify-center">
      <SocialMedia />
      <div className="bg-gray-100 flex justify-center min-h-screen p-4">
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <Card
            heading="About Me"
            text="Hello! I'm Joe Mills, a passionate developer with a love for creating
and maintaining applications. In my spare time I enjoy playing video
games and watching movies."
          />
          <Card
            heading="Experience"
            text="I have over 6 years of experience in web development, working with
various technologies like React, Node.js, AWS and React Native. I have
built and maintained a range of projects from small personal websites to
large-scale enterprise applications."
          />
        </div>
      </div>
      WIP
    </div>
  );
}
