import { CalendarView } from "@/features/calendar/components/calendar-view";
import { useCalendarMonth } from "@/features/calendar/use-calendar-month";
import { Button } from "@/shared/shadcn/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/calendar/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [month, setMonth] = useState(new Date());
  const [showErrorToast, setShowErrorToast] = useState(false);
  const year = month.getFullYear();
  const monthNumber = month.getMonth() + 1;
  const { data, isPending, isFetching, isError, error, refetch } =
    useCalendarMonth({
      year,
      month: monthNumber,
    });

  const hasData = data !== undefined;
  const itemsByDate = data ?? {};
  const isLoadingDays = isPending || isFetching;
  const isEmpty = Object.keys(itemsByDate).length === 0;
  const isCriticalError = isError && !hasData;
  const isNonBlockingError = isError && hasData;
  const wasNonBlockingErrorRef = useRef(false);

  useEffect(() => {
    if (isNonBlockingError && !wasNonBlockingErrorRef.current) {
      setShowErrorToast(true);
    }

    wasNonBlockingErrorRef.current = isNonBlockingError;
  }, [isNonBlockingError]);

  if (isCriticalError) {
    return (
      <div className="space-y-4 p-8">
        <h1 className="text-2xl font-semibold text-zinc-900">Calendário</h1>
        <div
          className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-900"
          role="alert"
        >
          <p className="font-medium">Não foi possível carregar o calendário.</p>
          <p className="mt-1 text-sm text-red-800">
            {error instanceof Error ? error.message : "Erro desconhecido."}
          </p>
          <Button
            type="button"
            variant="outline"
            className="mt-4"
            onClick={() => void refetch()}
          >
            Tentar novamente
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-8">
      {showErrorToast && (
        <div className="fixed top-4 right-4 z-50 w-full max-w-sm rounded-lg border border-amber-300 bg-amber-50 p-4 text-amber-900 shadow-lg">
          <p className="text-sm font-semibold">
            Não foi possível atualizar este mês.
          </p>
          <p className="mt-1 text-xs text-amber-800">
            Mantivemos os dados em cache para você continuar usando.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="h-7 border-amber-300 bg-white text-amber-900 hover:bg-amber-100"
              onClick={() => void refetch()}
            >
              Tentar novamente
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="h-7 text-amber-900 hover:bg-amber-100"
              onClick={() => setShowErrorToast(false)}
            >
              Fechar
            </Button>
          </div>
        </div>
      )}
      <h1 className="text-2xl font-semibold text-zinc-900">Calendário</h1>
      <div className="space-y-3">
        {isEmpty && !isLoadingDays && (
          <div className="rounded-lg border border-dashed border-zinc-300 bg-white p-4 text-sm text-zinc-600">
            Nenhum item encontrado para este mês.
          </div>
        )}
        <div className="relative">
          <CalendarView
            month={month}
            onMonthChange={setMonth}
            itemsByDate={itemsByDate}
          />
          {isLoadingDays && (
            <div className="pointer-events-none absolute inset-0 z-10 rounded-xl bg-white/45 backdrop-blur-[2px]">
              <div className="flex h-full items-center justify-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-sm text-zinc-700 shadow-sm">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent" />
                  Carregando dias...
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
