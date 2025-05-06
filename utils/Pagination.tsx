import { JSX, useMemo } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

type PaginationProps = {
  page: number; // 1-based index
  totalPages: number;
  onPageChange: (page: number) => void;
  renderButton?: (props: {
    key: number;
    pageNumber: number | "...";
    isActive: boolean;
    onClick: () => void;
    disabled: boolean;
  }) => JSX.Element;
};

export default function Pagination({
  page,
  totalPages,
  onPageChange,
  renderButton,
}: PaginationProps) {
  const pageNumbers = useMemo<(number | "...")[]>(() => {
    if (totalPages <= 6) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (page <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }

    if (page >= totalPages - 3) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [1, "...", page - 1, page + 1, "...", totalPages];
  }, [page, totalPages]);

  const defaultRenderButton = ({
    key,
    pageNumber,
    isActive,
    onClick,
    disabled,
  }: {
    key: number;
    pageNumber: number | "...";
    isActive: boolean;
    onClick: () => void;
    disabled: boolean;
  }) => (
    <button
      key={key}
      disabled={disabled}
      onClick={onClick}
      className={`px-3 py-1 border rounded hover:text-white ${
        isActive ? "bg-[#996515] font-bold text-white" : "bg-white"
      } ${disabled ? "text-gray-400 cursor-default" : "hover:bg-[#996515]"}`}
    >
      {pageNumber}
    </button>
  );

  const render = renderButton ?? defaultRenderButton;

  return (
    <div className="flex items-center space-x-2">
      {/* Previous button */}
      <button
        onClick={() => onPageChange(Math.max(0, page - 2))}
        disabled={page === 1}
        className="p-1 rounded border disabled:text-gray-300 disabled:cursor-not-allowed disabled:hover:bg-white hover:bg-[#996515]"
      >
        <MdArrowBackIos />
      </button>

      {pageNumbers.map((p, i) =>
        render({
          key: i,
          pageNumber: p,
          isActive: p === page,
          onClick: () => {
            if (typeof p === "number") onPageChange(p - 1);
          },
          disabled: p === "...",
        })
      )}

      {/* Next button */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, page))}
        disabled={page === totalPages}
        className="p-1 rounded border disabled:text-gray-300 disabled:cursor-not-allowed disabled:hover:bg-white hover:bg-[#996515] hover:text-white"
      >
        <MdArrowForwardIos />
      </button>
    </div>
  );
}
