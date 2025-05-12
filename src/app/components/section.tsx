export const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="w-full md:w-3/4">
      <h2 className="text-2xl font-bold text-[#0d3b66] p-4">{title}</h2>
      <div className="bg-[#f5f7fa] overflow-x-scroll no-scrollbar">
        <div className="flex space-x-4" style={{ minWidth: "calc(5 * 16rem)" }}>
          {children}
        </div>
      </div>
    </div>
  );
};
