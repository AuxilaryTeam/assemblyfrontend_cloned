import React, { useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

export interface Column {
  header: string;
  accessor: string;
  align?: "left" | "center" | "right";
  width?: string;
  renderCell?: (value: any, row: any) => React.ReactNode;
  sortable?: boolean;
}

interface GenericTableProps {
  data: any[];
  columns: Column[];
  title?: string;
  defaultItemsPerPage?: number;
  itemsPerPageOptions?: number[];
  onRowClick?: (row: any) => void;
  rowClassName?: (row: any) => string;
  emptyMessage?: string;
  showPagination?: boolean;
  sortable?: boolean;
  onSort?: (field: string, direction: "asc" | "desc") => void;
}

const GenericTable: React.FC<GenericTableProps> = ({
  data,
  columns,
  title,
  defaultItemsPerPage = 10,
  itemsPerPageOptions = [5, 10, 20, 50],
  onRowClick,
  rowClassName,
  emptyMessage = "No data available",
  showPagination = true,
  sortable = false,
  onSort,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
  const [sortField, setSortField] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const handleSort = (field: string) => {
    if (!sortable) return;
    const newDirection =
      sortField === field && sortDirection === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortDirection(newDirection);
    if (onSort) onSort(field, newDirection);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pageNumbers.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pageNumbers;
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
      {/* Header */}
      {(title || showPagination) && (
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-6 py-4 border-b border-gray-200 gap-3">
          {title && (
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          )}

          {showPagination && data.length > 0 && (
            <div className="flex items-center space-x-2 sm:space-x-4">
              <span className="text-sm text-gray-600">Rows per page:</span>
              <select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="border border-gray-300 rounded px-6 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-500"
              >
                {itemsPerPageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.accessor}
                  onClick={() =>
                    sortable &&
                    column.sortable !== false &&
                    handleSort(column.accessor)
                  }
                  className={`px-4 py-2 text-left text-gray-700 font-medium text-sm ${
                    sortable && column.sortable !== false
                      ? "cursor-pointer hover:bg-gray-100"
                      : ""
                  }`}
                  style={{ width: column.width }}
                >
                  <div
                    className={`flex items-center ${
                      column.align === "center"
                        ? "justify-center"
                        : column.align === "right"
                        ? "justify-end"
                        : ""
                    }`}
                  >
                    {column.header}
                    {sortable &&
                      column.sortable !== false &&
                      sortField === column.accessor && (
                        <span className="ml-1 text-gray-500">
                          {sortDirection === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.length > 0 ? (
              currentItems.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`hover:bg-gray-50 transition-colors duration-150 ${
                    onRowClick ? "cursor-pointer" : ""
                  } ${rowClassName ? rowClassName(row) : ""}`}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {columns.map((column) => (
                    <td
                      key={column.accessor}
                      className={`px-4 py-2 whitespace-nowrap text-sm text-gray-700 ${
                        column.align === "center"
                          ? "text-center"
                          : column.align === "right"
                          ? "text-right"
                          : ""
                      }`}
                    >
                      {column.renderCell
                        ? column.renderCell(row[column.accessor], row)
                        : row[column.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-6 text-center text-gray-500 text-sm"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {showPagination && data.length > 0 && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{indexOfFirstItem + 1}</span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(indexOfLastItem, data.length)}
            </span>{" "}
            of <span className="font-medium">{data.length}</span> results
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className="p-1 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronDoubleLeftIcon className="h-4 w-4" />
            </button>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </button>

            {getPageNumbers().map((page, idx) => (
              <button
                key={idx}
                onClick={() =>
                  typeof page === "number" && handlePageChange(page)
                }
                disabled={page === "..."}
                className={`px-3 py-1 rounded-md border text-sm font-medium ${
                  currentPage === page
                    ? "border-custom-yellow bg-custom-yellow text-white"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                } ${page === "..." ? "cursor-default" : ""}`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-1 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </button>
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className="p-1 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronDoubleRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenericTable;
