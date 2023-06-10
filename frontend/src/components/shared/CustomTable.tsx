import Link from "next/link";

interface CustomTableProps {
  rows: any[];
  isLoading: boolean;
}

const CustomTable: React.FC<CustomTableProps> = ({ rows, isLoading }) => {
  return (
    <div className="relative sm:rounded-sm max-h-[500px] overflow-auto">
      {isLoading ? (
        <h3>Loading...</h3>
      ) : rows.length < 1 ? (
        <div>
          <h2>No events found.</h2>
        </div>
      ) : (
        <table className="w-full text-sm text-left border-separate border-spacing-y-2">
          <thead className="text-md text-white uppercase bg-red-500 clip-title-sm">
            <tr>
              {Object.keys(rows[0]).map((t, i) => (
                <th key={i} scope="col" className="px-6 py-3">
                  {t}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr
                key={i}
                className="bg-white drop-shadow dark:bg-gray-900 dark:border-gray-700 uppercase"
              >
                {Object.keys(rows[0]).map((t, i) => {
                  if (typeof r[t] === "object") {
                    return (
                      <td key={i} className="px-6 py-4">
                        <Link
                          href={r[t].link}
                          className="font-medium text-gray-400 dark:text-blue-500 hover:underline cursor-pointer"
                        >
                          {r[t].value}
                        </Link>
                      </td>
                    );
                  } else if (i === 0) {
                    return (
                      <th
                        scope="row"
                        key={i}
                        className="p-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {r[t]}
                      </th>
                    );
                  } else {
                    return (
                      <td key={i} className="p-6">
                        {" "}
                        {r[t]}
                      </td>
                    );
                  }
                })}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CustomTable;
