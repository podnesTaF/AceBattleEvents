type DividerProps = {
  horizontal?: boolean;
  size?: string;
  color?: any;
  className?: string;
};

const Divider = ({
  horizontal = false,
  size = "2px",
  color,
  className,
}: DividerProps): JSX.Element => {
  return (
    <div
      className={`${
        horizontal ? `${size} w-full` : `${size} h-full`
      } bg-gray-400 ${color ?? ""} ${className ?? ""}`}
    ></div>
  );
};

export default Divider;
