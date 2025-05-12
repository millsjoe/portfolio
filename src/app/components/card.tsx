import Image from "next/image";

interface ICardProps {
  heading: string;
  text: string;
  rating?: string;
  imageUrl?: string;
  link?: string;
}

export const Card = ({ heading, text, imageUrl, rating, link }: ICardProps) => {
  return (
    <div className="bg-white w-[200px] min-w-[200px] p-5 rounded-[1em] shadow-md flex flex-col items-center justify-center gap-4 hover:shadow-2xl transition-shadow duration-300">
      <h3 className="text-md font-bold mb-2 text-[#0d3b66] w-full truncate text-center">
        {heading}
      </h3>
      <p className="text-gray-700 text-sm text-center w-full truncate">
        {text}
      </p>
      <p className="text-gray-700 text-sm text-center w-full truncate">
        {rating}
      </p>

      <Image
        src={
          imageUrl ||
          "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1328629682l/13456414.jpg"
        }
        alt={heading}
        className="rounded-lg hover:scale-105 transition-transform duration-300 object-cover"
        width={100}
        height={100}
      />
    </div>
  );
};
