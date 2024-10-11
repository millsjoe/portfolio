import { AboutMe } from "./components/about";
import { Experience } from "./components/experience";
import { SocialMedia } from "./components/header";
import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-col gap-2 items-center justify-center">
      <SocialMedia />
      <div className="bg-gray-100 flex items-center justify-center min-h-screen">
        <div className="flex flex-col md:flex-row gap-4">
          <AboutMe />
          <Experience />
        </div>
      </div>
    </div>
  );
}
