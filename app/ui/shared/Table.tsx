import React, { Key } from 'react';

type TableColumn<T> = {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  isHightlight: boolean;
  className?: string;
};

type TableProps<T> = {
  data: T[];
  columns: TableColumn<T>[];
  header: string;
  keyAccessor: keyof T | ((row: T) => Key); // Ensure React key compatibility
  onAction?: (action: string, row: T) => void;
  mobileRender?: (row: T) => React.ReactNode; // Render function for mobile view
};

export const Table = <T,>({
  data,
  columns,
  header,
  keyAccessor,
  onAction,
  mobileRender,
}: TableProps<T>) => {
  return (
    <div className="flex h-full w-full rounded-md bg-neutral-50 p-8">
      <div className="flow-root w-full rounded-3xl bg-white px-10 pt-20">
        <div className="flex justify-between items-end px-3 mb-7">
          <div className="text-2xl font-semibold text-secondary-500">{header}</div>
          <div className="flex font-bold">
            <div className="text-sm mr-2">Total Productos:</div>
            <div className="text-sm text-primary-500">{data.length}</div>
          </div>
        </div>
        <div className="inline-block min-w-full align-middle">
          <div className="bg-gray-50 rounded-lg md:pt-0">
            {/* Mobile View */}
            {mobileRender && (
              <div className="md:hidden">
                {data.map((row) => (
                  <div
                    key={
                      typeof keyAccessor === 'function'
                        ? keyAccessor(row)
                        : String(row[keyAccessor]) // Convert to string for React key
                    }
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    {mobileRender(row)}
                  </div>
                ))}
              </div>
            )}

            {/* Desktop View */}
            <table className="text-gray-900 hidden min-w-full md:table">
              <thead className="rounded-lg border-b border-neutral-200 bg-neutral-100 text-justify text-sm font-normal">
                <tr>
                  {columns.map((column, index) => (
                    <th
                      key={index}
                      className={`px-7 py-8 text-base font-bold text-color-4-650  ${column.className || ''}`}
                    >
                      {column.header}
                    </th>
                  ))}
                  {onAction && (
                    <th className="relative px-7 py-8 text-base font-bold text-color-4-650">Acciones</th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white">
                {data.map((row) => (
                  <tr
                    key={
                      typeof keyAccessor === 'function'
                        ? keyAccessor(row)
                        : String(row[keyAccessor]) // Convert to string for React key
                    }
                    className="border-b last-of-type:border-none"
                  >
                    {columns.map((column, index) => (
                      <td
                        key={index}
                        className={`whitespace-nowrap px-6 py-2 text-justify text-neutral-800 ${
                          column.className || ''
                        } ${column.isHightlight ? 'font-bold text-primary-500' : ''}`}
                      >
                        {typeof column.accessor === 'function'
                          ? column.accessor(row)
                          : (row[column.accessor] as React.ReactNode)}
                      </td>
                    ))}
                    {onAction && (
                      <td className="py-3 pl-6 pr-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => onAction('edit', row)}
                            className="text-blue-500"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => onAction('delete', row)}
                            className="text-red-500"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
