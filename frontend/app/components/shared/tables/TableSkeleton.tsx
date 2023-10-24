import Skeleton from "@mui/material/Skeleton";

const TableSkeleton = () => {
  return (
    <div className="relative sm:rounded-sm max-h-[500px] overflow-auto">
      <table className="w-full text-sm text-left border-separate border-spacing-y-2">
        <thead className="text-md text-white uppercase bg-red-500 clip-title-sm">
          <tr>
            {Array.from({ length: 4 }).map((t, i) => (
              <th key={i} scope="col" className="px-6 py-3">
                <Skeleton variant="text" width={100} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, i) => (
            <tr
              key={i}
              className="bg-white drop-shadow dark:bg-gray-900 dark:border-gray-700 uppercase"
            >
              {Array.from({ length: 4 }).map((t, i) => (
                <td key={i} className="px-6 py-4">
                  <Skeleton variant="text" width={100} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
