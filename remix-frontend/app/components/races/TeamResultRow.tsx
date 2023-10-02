import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Collapse, IconButton } from "@mui/material";
import { Link } from "@remix-run/react";
import React, { useState } from "react";

interface TeamResultRowProps {
  row: any;
  i: number;
}

const TeamResultRow: React.FC<TeamResultRowProps> = ({ row, i }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <tr
        key={i}
        className={`border-b-[1px] border-gray-400 
        uppercase bg-white`}
      >
        {Object.keys(row).map((key: any, i) =>
          key !== "expand" ? (
            typeof row[key] === "object" ? (
              <td key={i} className={`px-4 py-2`}>
                <Link
                  to={row[key].link}
                  className="font-medium text-gray-400 hover:underline cursor-pointer"
                >
                  {row[key].value}
                </Link>
              </td>
            ) : (
              <td
                key={i}
                className={`${
                  key === "records"
                    ? "hidden lg:table-cell"
                    : key === "pace"
                    ? "hidden md:table-cell"
                    : ""
                } px-4 py-2 
              `}
              >
                <p
                  className={
                    key === "records" && (row as any)[key] === "PB"
                      ? "text-green-500 font-semibold"
                      : key === "rank"
                      ? "text-center"
                      : ""
                  }
                >
                  {(row as any)[key]}
                </p>
              </td>
            )
          ) : (
            <td key={i} className="px-4 py-2 text-center w-20">
              <IconButton
                onClick={() => setIsOpen(!isOpen)}
                aria-label="expand row"
                size="small"
              >
                {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </td>
          )
        )}
      </tr>
      <tr>
        <td colSpan={7}>
          <Collapse in={isOpen}>
            {typeof row.expand !== "string" && row.expand.component}
          </Collapse>
        </td>
      </tr>
    </>
  );
};

export default TeamResultRow;
