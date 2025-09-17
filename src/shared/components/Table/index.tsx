import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnHelper,
  type VisibilityState,
} from "@tanstack/react-table"
import { X } from "lucide-react"

interface GenericTableProps<T> {
  data: T[]
  columns: ColumnDef<T, any>[]
  columnHelper: ColumnHelper<T>
}

export function GenericTable<T>({
  data,
  columns,
  columnHelper,
}: GenericTableProps<T>) {
  const [open, setOpen] = React.useState(false)

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})

  const table = useReactTable({
    data,
    columns,
    state: { columnVisibility },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
  })

  const allColumns = table.getAllLeafColumns()

  return (
    <div className="space-y-4">
      {/* 🔹 Multi-select dropdown */}
      <div className="relative inline-block text-left">
        <button
          onClick={() => setOpen(!open)}
          className="border rounded px-3 py-2 bg-white shadow-sm hover:bg-gray-50 cursor-pointer"
        >
          Selecionar colunas
        </button>

        {open && (
          <div className="absolute mt-2 w-56 bg-white border rounded shadow-lg z-10 p-2">
            {allColumns.map(column => (
              <label
                key={column.id}
                className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 cursor-pointer rounded"
              >
                <input
                  type="checkbox"
                  checked={column.getIsVisible()}
                  onChange={column.getToggleVisibilityHandler()}
                  className="accent-secondary w-4 h-4"
                />
                {column.columnDef.header as string}
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {allColumns
          .filter(col => col.getIsVisible())
          .map(col => (
            <span
              key={col.id}
              className="flex bg-secondary text-white px-3 py-2 rounded-full  items-center gap-2"
            >
              {col.columnDef.header as string}
              <button
                onClick={() => col.toggleVisibility(false)}
                className="text-white font-bold cursor-pointer "
              >
                <X/>
              </button>
            </span>
          ))}
      </div>

      <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
        <thead className="text-left">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="px-4 py-2 font-semibold border-b border-gray-300"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="hover:bg-gray-50 transition-colors">
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className="px-4 py-2 border-b border-gray-200"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
