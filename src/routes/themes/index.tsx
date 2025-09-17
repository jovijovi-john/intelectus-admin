import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/themes/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/themes/"!</div>
}
