import { useAuth } from "@/features/auth/hooks/use-auth";
import { Button } from "@/shared/shadcn/components/ui/button";
import { Checkbox } from "@/shared/shadcn/components/ui/checkbox";
import { Input } from "@/shared/shadcn/components/ui/input";
import { Label } from "@/shared/shadcn/components/ui/label";
import { useId, useState } from "react";

export function LoginForm() {
  const { loginAndGoDashboard } = useAuth();
  const emailId = useId();
  const passwordId = useId();
  const rememberId = useId();
  const [remember, setRemember] = useState(true);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    loginAndGoDashboard();
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor={emailId}>E-mail</Label>
        <Input
          id={emailId}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="seu@email.com"
          className="bg-zinc-50 dark:bg-input/20"
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <Label htmlFor={passwordId}>Senha</Label>
          <a
            href="#"
            className="text-muted-foreground hover:text-primary text-xs font-normal underline-offset-4 hover:underline"
            onClick={(e) => e.preventDefault()}
          >
            Esqueceu a senha?
          </a>
        </div>
        <Input
          id={passwordId}
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          className="bg-zinc-50 dark:bg-input/20"
        />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox
          id={rememberId}
          checked={remember}
          onCheckedChange={(v) => setRemember(v === true)}
        />
        <Label
          htmlFor={rememberId}
          className="font-normal text-muted-foreground"
        >
          Lembrar de mim
        </Label>
      </div>
      <Button
        type="submit"
        className="h-11 w-full rounded-lg bg-[#26A69A] text-base font-medium text-white shadow-sm hover:bg-[#1f8c82]"
      >
        Entrar
      </Button>
    </form>
  );
}
