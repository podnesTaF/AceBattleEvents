import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { IconButton } from "@mui/material";
import { Link } from "@remix-run/react";
import { useState } from "react";
import TableSkeleton from "./TableSkeleton";

interface CustomTableProps {
  rows: any[];
  isLoading: boolean;
  onEdit?: (id: string) => void;
  titleColor?: string;
  isTitleStraight?: boolean;
  hightlightIdx?: number;
  deletableRows?: boolean;
  onDelete?: (ids: number[]) => Promise<void>;
  itemsName?: string;
  ids?: number[];
  height?: string;
}

const CustomTable: React.FC<CustomTableProps> = ({
  rows,
  isLoading,
  onEdit,
  titleColor,
  isTitleStraight,
  hightlightIdx,
  deletableRows,
  onDelete,
  height,
  itemsName,
  ids,
}) => {
  const [chosenItems, setChosenItems] = useState<number[]>([]);

  const handleDelete = async () => {
    if (onDelete) {
      await onDelete(chosenItems);
      setChosenItems([]);
    }
  };

  return (
    <div
      className={`relative sm:rounded-sm ${
        height ? height : "max-h-[500px]"
      } overflow-auto`}
    >
      {isLoading ? (
        <TableSkeleton />
      ) : rows.length < 1 ? (
        <div className="h-32 flex justify-center items-center border-gray-300 border-[1px] rounded-md shadow-md">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-300">
            No {itemsName} found.
          </h2>
        </div>
      ) : (
        <table className="w-full text-sm text-left border-separate border-spacing-y-1">
          <thead
            className={`text-md text-white uppercase ${
              titleColor || "bg-red-500"
            } ${!isTitleStraight && "clip-title-sm"}`}
          >
            <tr>
              {Object.keys(rows[0]).map((t, i) => (
                <th key={i} scope="col" className="px-6 py-3">
                  {t}
                </th>
              ))}
              {deletableRows && (
                <th scope="col" className="px-6 py-3">
                  <IconButton
                    onClick={handleDelete}
                    disabled={!chosenItems.length}
                  >
                    <RemoveCircleOutlineIcon className="text-white" />
                  </IconButton>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => {
              return (
                <tr
                  key={i}
                  className={`shadow-sm dark:bg-gray-900 dark:border-gray-700 uppercase ${
                    hightlightIdx === i ? "bg-red-300" : "bg-white"
                  }`}
                >
                  {Object.keys(rows[0]).map((t, i) => {
                    if (typeof r[t] === "object") {
                      if (onEdit && t === "edit") {
                        return (
                          <td key={i} className="p-2 md:p-5">
                            <button
                              onClick={() => onEdit(r[t]?.link)}
                              className="font-medium text-gray-400 dark:text-blue-500 hover:underline cursor-pointer"
                            >
                              {r[t]?.value}
                            </button>
                          </td>
                        );
                      }
                      return (
                        <td key={i} className="p-2 md:p-5">
                          <Link
                            to={r[t]?.link || "/error"}
                            className="font-medium text-gray-400 dark:text-blue-500 hover:underline cursor-pointer"
                          >
                            {r[t]?.value}
                          </Link>
                        </td>
                      );
                    } else if (i === 0) {
                      return (
                        <th
                          scope="row"
                          key={i}
                          className="p-2 md:p-5 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {r[t]}
                        </th>
                      );
                    } else {
                      return (
                        <td key={i} className="p-2 md:p-5">
                          {" "}
                          {r[t]}
                        </td>
                      );
                    }
                  })}
                  {deletableRows && ids?.length && (
                    <td className="px-6 py-4 flex justify-center">
                      <input
                        type="checkbox"
                        value={ids[i]}
                        checked={chosenItems.includes(ids[i])}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setChosenItems([...chosenItems, ids[i]]);
                          } else {
                            setChosenItems(
                              chosenItems.filter((id) => id !== ids[i])
                            );
                          }
                        }}
                      />
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CustomTable;
