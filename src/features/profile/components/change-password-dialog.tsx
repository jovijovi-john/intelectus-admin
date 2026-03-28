import { useChangePassword } from "@/features/profile/use-admin-profile";
import {
  changePasswordSchema,
  type ChangePasswordFormValues,
} from "@/features/profile/validation/change-password-schema";
import { Button } from "@/shared/shadcn/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/shadcn/components/ui/dialog";
import { Input } from "@/shared/shadcn/components/ui/input";
import { Label } from "@/shared/shadcn/components/ui/label";
import { useId, useState } from "react";

export type ChangePasswordDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ChangePasswordDialog({
  open,
  onOpenChange,
}: ChangePasswordDialogProps) {
  const pwdCurrentId = useId();
  const pwdNewId = useId();
  const pwdConfirmId = useId();
  const { mutateAsync, isPending, isError, error, reset } = useChangePassword();

  const [values, setValues] = useState<ChangePasswordFormValues>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof ChangePasswordFormValues, string>>
  >({});

  function handleClose(next: boolean) {
    if (!next) {
      setValues({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setFieldErrors({});
      reset();
    }
    onOpenChange(next);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = changePasswordSchema.safeParse(values);
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      setFieldErrors({
        currentPassword: flat.currentPassword?.[0],
        newPassword: flat.newPassword?.[0],
        confirmPassword: flat.confirmPassword?.[0],
      });
      return;
    }
    setFieldErrors({});
    try {
      await mutateAsync({
        currentPassword: parsed.data.currentPassword,
        newPassword: parsed.data.newPassword,
      });
      handleClose(false);
    } catch {
      /* mutation error surfaced below */
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Alterar senha</DialogTitle>
          <DialogDescription>
            Informe sua senha atual e escolha uma nova senha segura.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={(e) => void handleSubmit(e)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={pwdCurrentId}>Senha atual</Label>
            <Input
              id={pwdCurrentId}
              type="password"
              autoComplete="current-password"
              value={values.currentPassword}
              onChange={(e) =>
                setValues((v) => ({ ...v, currentPassword: e.target.value }))
              }
              aria-invalid={!!fieldErrors.currentPassword}
            />
            {fieldErrors.currentPassword ? (
              <p className="text-sm text-red-600" role="alert">
                {fieldErrors.currentPassword}
              </p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor={pwdNewId}>Nova senha</Label>
            <Input
              id={pwdNewId}
              type="password"
              autoComplete="new-password"
              value={values.newPassword}
              onChange={(e) =>
                setValues((v) => ({ ...v, newPassword: e.target.value }))
              }
              aria-invalid={!!fieldErrors.newPassword}
            />
            {fieldErrors.newPassword ? (
              <p className="text-sm text-red-600" role="alert">
                {fieldErrors.newPassword}
              </p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor={pwdConfirmId}>Confirmar nova senha</Label>
            <Input
              id={pwdConfirmId}
              type="password"
              autoComplete="new-password"
              value={values.confirmPassword}
              onChange={(e) =>
                setValues((v) => ({ ...v, confirmPassword: e.target.value }))
              }
              aria-invalid={!!fieldErrors.confirmPassword}
            />
            {fieldErrors.confirmPassword ? (
              <p className="text-sm text-red-600" role="alert">
                {fieldErrors.confirmPassword}
              </p>
            ) : null}
          </div>
          {isError ? (
            <p className="text-sm text-red-600" role="alert">
              {error instanceof Error ? error.message : "Não foi possível alterar a senha."}
            </p>
          ) : null}
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleClose(false)}
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Salvando…" : "Salvar senha"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
