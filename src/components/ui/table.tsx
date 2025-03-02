import React from "react";

interface TableColumn<T> {
  key: keyof T;
  label: string;
}

interface TableProps<T> {
    columns: ReadonlyArray<TableColumn<T>>; // Perbolehkan readonly
    data: T[];
    className?: string;
  }
  

export default function Table<T>({ columns, data, className }: TableProps<T>) {
  return (
    <div className={`overflow-x-auto rounded-lg shadow-md ${className}`}>
      <table className="min-w-full bg-white text-sm">
        <thead className="bg-indigo-600 text-white">
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} className="px-4 py-3 text-left">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b hover:bg-gray-100 transition">
                {columns.map((col) => (
                  <td key={String(col.key)} className="px-4 py-2">
                    {String(row[col.key])}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
