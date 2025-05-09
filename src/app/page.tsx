import { SocialMedia } from "./components/header";
import React from "react";
import { Timeline } from "./components/timeline";

export default function Home() {
  return (
    <div className=" bg-[#f5f7fa] flex flex-col md:flex-col items-center justify-center">
      <SocialMedia />
      <div className="flex justify-center min-h-screen p-4">
        <Timeline />
      </div>
    </div>
  );
}
