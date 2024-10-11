interface ICardProps {
  heading: string;
  text: string;
}

export const Card = ({ heading, text }: ICardProps) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-lg w-full md:min-h-64">
      <h2 className="text-2xl font-bold mb-2 text-black">{heading}</h2>
      <p className="text-gray-700">{text}</p>
    </div>
  );
};
