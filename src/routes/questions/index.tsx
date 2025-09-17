import { createFileRoute } from "@tanstack/react-router"
import { GenericTable } from "@/shared/components/Table/index"
import { createColumnHelper, type ColumnHelper } from "@tanstack/react-table"
import { FileText } from "lucide-react"

export const Route = createFileRoute("/questions/")({
  component: RouteComponent,
})

type Question = {
  id: number
  title: string
  difficulty: string
  status: string
}

const data: Question[] = [
  { id: 1, title: "What is React?", difficulty: "Easy", status: "Active" },
  { id: 2, title: "Explain useEffect", difficulty: "Medium", status: "Active" },
  { id: 3, title: "What is a closure?", difficulty: "Hard", status: "Inactive" },
]

const columnHelper: ColumnHelper<Question> = createColumnHelper<Question>()

const columns = [
  columnHelper.accessor("id", { header: "ID" }),
  columnHelper.accessor("title", { header: "Title" }),
  columnHelper.accessor("difficulty", { header: "Difficulty" }),
  columnHelper.accessor("status", { header: "Status" }),
]

function RouteComponent() {
  return (
    <div className="p-16 py-8 bg-zinc-100 flex flex-col gap-y-8">
      <div className="flex items-center gap-x-4 pb-4 border-b border-b-primary">
        <FileText className="w-12 h-12 text-primary"/>
        <h1 className="text-3xl font-bold text-primary">Questões</h1>
      </div>

      <GenericTable<Question>
        data={data}
        columns={columns}
        columnHelper={columnHelper}
      />
    </div>
  )
}
