import { Button } from "@/shared/shadcn/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/settings/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-full w-full bg-pink-600 text-white ">
      Hello "/settings/"!
    </div>
  );
}
