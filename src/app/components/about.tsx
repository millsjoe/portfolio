export const AboutMe = () => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-lg flex-1">
      <h2 className="text-2xl font-bold mb-2">About Me</h2>
      <p className="text-gray-700">{text}</p>
    </div>
  );
};

const text = `Hello! I'm Joe Mills, a passionate developer with a love for creating
and maintaining applications. In my spare time I enjoy playing video
games and watching movies.`;
