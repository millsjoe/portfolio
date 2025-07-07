import Image from "next/image";
import React from "react";

interface ICardProps {
  heading: string;
  text: string;
  rating?: string;
  imageUrl?: string;
  link?: string;
}

export const Card = React.memo(
  ({ heading, text, imageUrl, rating, link }: ICardProps) => {
    return (
      <div className="bg-white w-[200px] min-w-[200px] p-5 rounded-[1em] shadow-md flex flex-col items-center justify-center gap-4">
        <h3 className="text-md font-bold mb-2 text-[#0d3b66] w-full truncate text-center">
          {heading}
        </h3>
        <p className="text-gray-700 text-sm text-center w-full truncate">
          {text}
        </p>
        <p className="text-gray-700 text-sm text-center w-full truncate">
          {rating}
        </p>

        <div className="relative w-[100px] h-[150px] overflow-hidden rounded-lg">
          <Image
            src={
              imageUrl ||
              "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1328629682l/13456414.jpg"
            }
            alt={heading}
            fill
            loading="lazy"
            sizes="100px"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    );
  }
);

Card.displayName = "Card";
