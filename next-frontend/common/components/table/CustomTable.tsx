import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/common/components/ui/table";

interface CustomTableProps {
  rows?: any[];
  isLoading: boolean;
  titleColor?: string;
  hightlightIdx?: number;
  itemsName?: string;
  ids?: number[];
  height?: string;
}

const CustomTable = ({
  rows,
  isLoading,
  titleColor,
  hightlightIdx,
  itemsName,
  ids,
  height,
}: CustomTableProps): JSX.Element => {
  return (
    <div
      className={`relative sm:rounded-sm ${
        height ? height : "max-h-[500px]"
      } overflow-auto`}
    >
      {isLoading || !rows ? (
        <div className="h-32 flex justify-center items-center border-gray-300 border-[1px] rounded-md shadow-md">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-300">
            Loading...
          </h2>
        </div>
      ) : rows.length < 1 ? (
        <div className="h-32 flex justify-center items-center border-gray-300 border-[1px] rounded-md shadow-md">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-300">
            {itemsName} not found.
          </h2>
        </div>
      ) : (
        <Table>
          <TableHeader
            className={`text-md text-white uppercase ${
              titleColor || "bg-red-500"
            }`}
          >
            <TableRow>
              {Object.keys(rows[0]).map((t, i) => (
                <TableHead key={i} className="px-6 py-3">
                  {t}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r, i) => {
              return (
                <TableRow
                  key={i}
                  className={`shadow-sm dark:bg-gray-900 dark:border-gray-700 uppercase ${
                    hightlightIdx === i ? "bg-red-300" : "bg-white"
                  }`}
                >
                  {Object.keys(rows[0]).map((t, i) => (
                    <TableCell key={i} className="px-6 py-4">
                      {r[t]}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default CustomTable;
