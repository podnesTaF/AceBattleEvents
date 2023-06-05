import Link from "next/link";

interface CustomTableProps {
  titles: string[];
  rows: any[];
}

const CustomTable: React.FC<CustomTableProps> = ({ titles, rows }) => {
  return (
    <div className="relative overflow-x-auto sm:rounded-sm">
      <table className="w-full text-sm text-left border-separate border-spacing-y-2">
        <thead className="text-md text-white uppercase bg-red-500 clip-title-sm">
          <tr>
            {titles.map((t, i) => (
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
              className="bg-white shadow dark:bg-gray-900 dark:border-gray-700 uppercase"
            >
              {titles.map((t, i) => {
                if (typeof r[t] === "object") {
                  return (
                    <td className="px-6 py-4">
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
    </div>
  );
};

export default CustomTable;
