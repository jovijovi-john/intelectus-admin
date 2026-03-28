import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/shadcn/components/ui/card";

import { LoginForm } from "./login-form";

export function LoginPage() {
  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4 py-10">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(38,166,154,0.35),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(38, 166, 154, 0.5) 0%, transparent 45%),
            radial-gradient(circle at 80% 20%, rgba(15, 118, 110, 0.35) 0%, transparent 40%),
            radial-gradient(circle at 50% 90%, rgba(45, 212, 191, 0.25) 0%, transparent 50%)
          `,
        }}
        aria-hidden
      />
      <div className="from-[#e8f5f3] via-[#d4ebe8] to-[#b8ddd8] absolute inset-0 -z-10 bg-gradient-to-br" />

      <Card className="relative z-10 w-full max-w-md border-white/60 bg-white/95 shadow-lg backdrop-blur-sm">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl text-foreground">Entrar na conta</CardTitle>
          <CardDescription>
            Informe seu e-mail e senha para continuar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
