interface InfoContainerProps {
  title: string;
  items: { label: string; value: string | number }[];
}

export const InfoContainer = ({ title, items }: InfoContainerProps): JSX.Element => {
  return (
    <div className="w-full">
      <h3 className="text-xl md:text-2xl font-semibold py-2 border-b-2 border-gray-300 mb-3">
        {title}
      </h3>
      <div className="flex w-full flex-col gap-4  border-l-red-500 border-l-2 p-2 pb-10">
        {items.map((item, index) => (
          <div key={index} className="flex gap-4 items-center justify-between">
            <h4 className="text-gray-500">{item.label}</h4>
            <h4>{item.value}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};