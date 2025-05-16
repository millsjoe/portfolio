import { Card } from "./card";

interface IMovie {
  title: string;
  year: string;
  image_url: string;
  link: string;
}

export const Movies = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const data = await fetch(`${baseUrl}/api/movies`);

  const movies: IMovie[] = await data.json();
  return (
    <div className="flex flex-col justify-center p-4">
      <div className="flex flex-row items-center justify-center gap-4 mb-4">
        {renderMovieCards(movies)}
      </div>
    </div>
  );
};

const renderMovieCards = (movies: IMovie[]) =>
  movies
    .slice(0, 8)
    .map((movie) => (
      <Card
        key={movie.title}
        heading={movie.title}
        text={movie.year}
        imageUrl={`https://${movie.image_url}`}
        link={movie.link}
      />
    ));
