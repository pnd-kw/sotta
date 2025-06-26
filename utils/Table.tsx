import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
  MouseEvent,
  JSX,
} from "react";
import { DateTime } from "./DateTime";
import Pagination from "./Pagination";
import RowsPerPageSelector from "./RowsPerPageSelector";
import { Button } from "@/components/ui/button";
import { MdPushPin } from "react-icons/md";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

interface IconButton<T> {
  name: string;
  value: boolean;
  icon: React.ReactNode;
  variant?:
    | "default"
    | "full"
    | "whiteRedText"
    | "transRedText"
    | "whiteAmberText"
    | "transAmberText"
    | "green"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  disabled?: boolean;
  onClick: (row: T) => void;
}

interface PinnedColumn {
  column: string;
  position: "left" | "right";
}

interface TableProps<T> {
  data: T[];
  defaultSortBy?: string;
  defaultPinned?: PinnedColumn;
  page?: number;
  perPage?: number;
  listIconButton?: IconButton<T>[];
  customWidths?: Record<string, string>;
  totalPage?: number;
  onPageChange?: (page: number) => void;
  onRowsPerPageChange?: (page: number) => void;
  customBooleanRender?: {
    [K in keyof T]?: (value: boolean, row: T) => React.ReactNode;
  }
}

function formatHeader(key: string): string {
  return key.replace(/_/g, " ").toUpperCase();
}

function isDateField(key: string): boolean {
  return /tanggal|created_at|updated_at/i.test(key);
}

function getComparator<T extends Record<string, unknown>>(
  order: "asc" | "desc",
  orderBy: keyof T
): (a: T, b: T) => number {
  return (a, b) => {
    const aValue = a[orderBy];
    const bValue = b[orderBy];

    // Jika nilai undefined atau null, tempatkan di belakang
    if (aValue == null && bValue != null) return 1;
    if (aValue != null && bValue == null) return -1;
    if (aValue == null && bValue == null) return 0;

    // Bandingkan sebagai tanggal jika bisa
    const dateA = new Date(String(aValue));
    const dateB = new Date(String(bValue));
    const isValidDate = !isNaN(dateA.getTime()) && !isNaN(dateB.getTime());

    if (isValidDate) {
      return order === "desc"
        ? dateB.getTime() - dateA.getTime()
        : dateA.getTime() - dateB.getTime();
    }

    // Bandingkan string atau number
    if (typeof aValue === "number" && typeof bValue === "number") {
      return order === "desc" ? bValue - aValue : aValue - bValue;
    }

    const aStr = String(aValue).toLowerCase();
    const bStr = String(bValue).toLowerCase();

    if (aStr < bStr) return order === "desc" ? 1 : -1;
    if (aStr > bStr) return order === "desc" ? -1 : 1;
    return 0;
  };
}

export function Table<T extends Record<string, unknown>>({
  data = [],
  defaultSortBy = "",
  defaultPinned = { column: "", position: "left" },
  page = 1,
  perPage = 10,
  listIconButton = [
    {
      name: "edit",
      value: false,
      icon: null,
      variant: "transAmberText",
      onClick: () => {},
    },
  ],
  customWidths = {},
  totalPage = 1,
  onPageChange,
  onRowsPerPageChange,
  customBooleanRender = {},
}: TableProps<T>): JSX.Element {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>(defaultSortBy);
  const [hoveredColumn, setHoveredColumn] = useState<string | null>(null);
  const [pinnedColumn, setPinnedColumn] = useState<PinnedColumn[]>([
    defaultPinned,
  ]);
  const tableContainerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);

  const headers = Object.keys(data?.[0] || {});
  const isEvenNumber = (num: number) => num % 2 === 0;
  const splitIndex = Math.floor(headers.length / 2);
  const leftColumn = headers.slice(0, splitIndex);

  useEffect(() => {
    const handleMouseUpGlobal = () => setIsDragging(false);
    document.addEventListener("mouseup", handleMouseUpGlobal);
    return () => {
      document.removeEventListener("mouseup", handleMouseUpGlobal);
    };
  }, []);

  const visibleData = useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) return [];
    return [...data].sort(getComparator(order, orderBy));
  }, [data, order, orderBy]);

  const activeIconButtons = useMemo(
    () => listIconButton.filter((btn: IconButton<T>) => btn.value === true),
    [listIconButton]
  );

  function getActionColMinWidth(
    activeIconButtons: IconButton<T>[] = []
  ): string {
    const length = activeIconButtons.length;

    const widths: Record<number, string> = {
      7: "min-w-[16rem]",
      6: "min-w-[14rem]",
      5: "min-w-[12rem]",
      4: "min-w-[10rem]",
      3: "min-w-[8rem]",
      2: "min-w-[6rem]",
      1: "min-w-[4.5rem]",
    };

    return widths[length] || "min-w-[4rem]";
  }

  const togglePinColumn = useCallback(
    (column: string) => {
      setPinnedColumn((prev) =>
        prev.length > 0 && prev[0].column === column
          ? []
          : [
              {
                column,
                position: leftColumn.includes(column) ? "left" : "right",
              },
            ]
      );
    },
    [leftColumn]
  );

  const handleSortColumn = useCallback(
    (column: string) => {
      if (!column) return;
      setOrder((prevOrder) =>
        orderBy === column && prevOrder === "asc" ? "desc" : "asc"
      );
      setOrderBy(column);
    },
    [orderBy]
  );

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!tableContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - tableContainerRef.current.offsetLeft);
    setScrollLeft(tableContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !tableContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - tableContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    tableContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (!data || data.length === 0) {
    return (
      <p className="flex items-center justify-center text-xl text-stone-800">
        No Data Available
      </p>
    );
  }

  return (
    <>
      <div
        ref={tableContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
        onMouseUp={handleMouseUp}
        className="overflow-x-auto max-h-[84vh] relative cursor-grab active:cursor-grabbing select-none"
      >
        <table>
          <thead>
            <tr className="min-h-[2rem] h-[4rem] px-2 py-2">
              <th className="bg-[#85582c] text-white border-r border-stone-300 sticky top-0 px-2 py-2">
                <span className="font-normal">{formatHeader("no")}</span>
              </th>
              {listIconButton.some(
                (btn: IconButton<T>) => btn.value === true
              ) ? (
                <th
                  className={`bg-[#85582c] sticky top-0 px-2 py-2 border-r border-stone-300
                    ${getActionColMinWidth(activeIconButtons)}`}
                >
                  <span className="flex items-center justify-center text-white font-normal">
                    {formatHeader("act")}
                  </span>
                </th>
              ) : null}
              {headers.map((key) => {
                const pinned = pinnedColumn.find((col) => col.column === key);
                let pinnedClass =
                  "bg-[#996515] text-stone-200 sticky border-b border-r border-stone-100 top-0 pr-10 font-normal px-2 py-2";

                if (pinned?.position === "left") {
                  pinnedClass += " left-0 z-[20]";
                } else if (pinned?.position === "right") {
                  pinnedClass += " right-0 z-[20]";
                }
                return (
                  <th
                    key={key}
                    className={
                      pinned
                        ? pinnedClass
                        : "bg-[#85582c] text-white border-r border-stone-300 sticky top-0 pr-10 font-normal px-2 py-2"
                    }
                    onMouseEnter={() => setHoveredColumn(key)}
                    onMouseLeave={() => setHoveredColumn(null)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="truncate">{formatHeader(key)}</span>
                      {hoveredColumn === key && (
                        <div className="flex gap-0 absolute right-0 top-1/2 -translate-y-1/2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className={`p-2 cursor-pointer ${
                              pinned ? "pinned-icon" : ""
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              togglePinColumn(key);
                            }}
                          >
                            <MdPushPin />
                          </Button>
                          {orderBy === key && order === "asc" ? (
                            <Button
                              variant="ghost"
                              size="icon"
                              className={`p-2 cursor-pointer ${
                                pinned ? "pinned-icon" : ""
                              }`}
                              onClick={() => handleSortColumn(key)}
                            >
                              <FaArrowUp />
                            </Button>
                          ) : (
                            <Button
                              variant="ghost"
                              size="icon"
                              className={`p-2 cursor-pointer ${
                                pinned ? "pinned-icon" : ""
                              }`}
                              onClick={() => handleSortColumn(key)}
                            >
                              <FaArrowDown />
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {visibleData.map((item, index) => {
              return (
                <tr
                  key={index}
                  className={`px-2 py-2 ${
                    isEvenNumber(index) ? "" : "bg-amber-100"
                  }`}
                >
                  <td
                    className="text-center text-stone-800 whitespace-normal 
                  break-words max-w-[10rem]"
                  >
                    {page * perPage + index + 1}
                  </td>
                  {listIconButton.some(
                    (btn: IconButton<T>) => btn.value === true
                  ) ? (
                    <td
                      className="whitespace-normal break-words 
                    max-w-[10rem] px-2 py-2"
                    >
                      <div className="flex items-center justify-center">
                        {listIconButton.map((btn: IconButton<T>) =>
                          btn.value ? (
                            <Button
                              key={btn.name}
                              variant={btn.variant}
                              size="icon"
                              disabled={btn.disabled}
                              onClick={() => btn.onClick(item)}
                            >
                              {btn.icon}
                            </Button>
                          ) : null
                        )}
                      </div>
                    </td>
                  ) : null}
                  {headers.map((key, index) => {
                    const pinned = pinnedColumn.find(
                      (col) => col.column === key
                    );

                    let pinnedClass = `sticky text-stone-200 bg-[#996515] border border-stone-300 
                    whitespace-normal break-words max-w-[10rem] px-2 py-2 text-left ${
                      customWidths[key] || ""
                    }`;
                    if (pinned?.position === "left") {
                      pinnedClass += " left-0 z-10";
                    } else if (pinned?.position === "right") {
                      pinnedClass += " right-0 z-10";
                    }

                    return (
                      <td
                        key={index}
                        className={
                          pinned
                            ? pinnedClass
                            : `text-stone-800 whitespace-normal break-words 
                            max-w-[10rem] px-2 py-2 text-left ${
                              customWidths[key] || ""
                            }`
                        }
                      >
                        {isDateField(key) ? (
                          <DateTime date={item[key] as string} />
                        ) : typeof item[key] === "boolean" && customBooleanRender?.[key] ? (
                          customBooleanRender[key]?.(item[key] as boolean, item)
                        ) : typeof item[key] === "string" ||
                          typeof item[key] === "number" ||
                          React.isValidElement(item[key]) ? (
                          (item[key] as React.ReactNode)
                        ) : (
                          <span className="italic text-gray-400">N/A</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between">
        <RowsPerPageSelector
          value={perPage}
          onChange={(newVal) => {
            onRowsPerPageChange?.(newVal);
          }}
          total={data.length}
          options={[10, 20, 50, 100]}
        />
        <Pagination
          page={page + 1}
          totalPages={totalPage}
          onPageChange={(p) => {
            onPageChange?.(p);
          }}
        />
      </div>
    </>
  );
}
