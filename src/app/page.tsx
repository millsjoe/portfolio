import Image from "next/image";
import { AboutMe } from "./components/about";
import { Experience } from "./components/experience";

export default function Home() {
  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="flex flex-col md:flex-row gap-4">
        {/* <AboutMe />
        <Experience /> */}

        <Image
          src="/cat-jam.gif"
          alt="Cat"
          width={300}
          height={300}
          className="animate-bounce"
        />
      </div>
    </div>
  );
}
