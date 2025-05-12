import { SocialMedia } from "./components/header";
import React from "react";
import { Timeline } from "./components/timeline";
import { Books } from "./components/books";
import { Section } from "./components/section";

export default function Home() {
  return (
    <div className=" bg-[#f5f7fa] flex flex-col md:flex-col items-center justify-center">
      <SocialMedia />
      <>
        <AboutMe />
        <Section title="Recently Read">
          <Books />
        </Section>
      </>
      <h2 className="text-2xl font-bold text-[#0d3b66] p-4"> Timeline</h2>
      <div className="flex justify-center min-h-screen p-4">
        <Timeline />
      </div>
    </div>
  );
}

const AboutMe = () => {
  return (
    <div className="w-full md:w-3/4">
      <h2 className="text-2xl font-bold text-[#0d3b66] p-4"> About Me</h2>
      <p className="p-4">
        I am a Senior Software Engineer for Sky Betting and Gaming (Flutter
        UKI), responsible for all your favourite betting products and tools like
        the Games Launch Service and Reality Check Service. More recently, I
        have been involved with the development of Paddy Power & Betfair -
        gamblings in my blood at this point.
      </p>
      <p className="p-4">
        When I&apos;m not working, I enjoy gaming, reading and watching movies.
        I thought it would be neat to keep you up to date on some of the things
        I&apos;ve been reading and watching.
      </p>
    </div>
  );
};
