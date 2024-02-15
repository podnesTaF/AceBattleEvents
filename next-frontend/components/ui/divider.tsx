type DividerProps = {
  horizontal?: boolean;
  size?: string;
  color?: any;
};

const Divider = ({
  horizontal = false,
  size = "2px",
  color,
}: DividerProps): JSX.Element => {
  return (
    <div
      className={`${
        horizontal ? `${size} w-full` : `${size} h-full`
      } bg-gray-400 ${color ?? ""}`}
    ></div>
  );
};

export default Divider;
