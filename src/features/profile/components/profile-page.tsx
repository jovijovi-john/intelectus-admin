import { AvatarCropDialog } from "@/features/profile/components/avatar-crop-dialog";
import { ChangePasswordDialog } from "@/features/profile/components/change-password-dialog";
import { profileEditSchema } from "@/features/profile/validation/profile-edit-schema";
import {
  useAdminProfile,
  useSaveProfileAvatar,
  useUpdateProfile,
} from "@/features/profile/use-admin-profile";
import { ListPageHeader } from "@/shared/components/list-page-header";
import { SingleDatePickerField } from "@/shared/components/single-date-picker-field";
import {
  formatCpf,
  formatDateTimePtBr,
} from "@/shared/lib/format-brasil";
import { Button } from "@/shared/shadcn/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/shadcn/components/ui/card";
import { Input } from "@/shared/shadcn/components/ui/input";
import { Label } from "@/shared/shadcn/components/ui/label";
import { format, subYears } from "date-fns";
import { Camera } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

function initialsFromParts(first: string, last: string): string {
  const a = first.trim()[0] ?? "";
  const b = last.trim()[0] ?? "";
  if (!a && !b) return "?";
  return `${a}${b}`.toUpperCase();
}

function isoDateToLocalDate(iso: string): Date | undefined {
  const parts = iso.split("-");
  if (parts.length !== 3) return undefined;
  const y = Number(parts[0]);
  const m = Number(parts[1]);
  const d = Number(parts[2]);
  if (!y || !m || !d) return undefined;
  return new Date(y, m - 1, d);
}

export function ProfilePage() {
  const { data, isPending, isError, error, refetch } = useAdminProfile();
  const updateMutation = useUpdateProfile();
  const saveAvatarMutation = useSaveProfileAvatar();

  const firstNameId = useId();
  const lastNameId = useId();
  const emailId = useId();
  const cpfId = useId();
  const birthId = useId();
  const roleId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [birthPicker, setBirthPicker] = useState<Date | undefined>(undefined);
  const [dirty, setDirty] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [cropOpen, setCropOpen] = useState(false);
  const [cropSrc, setCropSrc] = useState<string | null>(null);
  /** Se true, `cropSrc` foi criado com createObjectURL e deve ser revogado ao fechar/aplicar. */
  const [cropSrcDisposable, setCropSrcDisposable] = useState(false);

  const [fieldErrors, setFieldErrors] = useState<
    Partial<
      Record<
        "firstName" | "lastName" | "email" | "cpf" | "birthDate",
        string
      >
    >
  >({});

  const maxBirth = new Date();
  const minBirth = subYears(maxBirth, 120);

  useEffect(() => {
    if (!data || dirty) return;
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setEmail(data.email);
    setCpf(data.cpf.replace(/\D/g, ""));
    setBirthDate(data.birthDate);
    setBirthPicker(isoDateToLocalDate(data.birthDate));
  }, [data, dirty]);

  function revokeCropSrcIfNeeded() {
    if (cropSrcDisposable && cropSrc) {
      URL.revokeObjectURL(cropSrc);
    }
    setCropSrc(null);
    setCropSrcDisposable(false);
  }

  function handleCropDialogChange(open: boolean) {
    if (!open) {
      revokeCropSrcIfNeeded();
    }
    setCropOpen(open);
  }

  const displayAvatarSrc = data?.avatarUrl;

  function openCropWithFile(file: File) {
    revokeCropSrcIfNeeded();
    const url = URL.createObjectURL(file);
    setCropSrc(url);
    setCropSrcDisposable(true);
    setCropOpen(true);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    openCropWithFile(file);
  }

  function handleAvatarClick() {
    if (displayAvatarSrc) {
      setCropSrc(displayAvatarSrc);
      setCropSrcDisposable(false);
      setCropOpen(true);
      return;
    }
    fileInputRef.current?.click();
  }

  async function handleCroppedApplied(nextUrl: string) {
    try {
      await saveAvatarMutation.mutateAsync(nextUrl);
    } finally {
      URL.revokeObjectURL(nextUrl);
    }
  }

  function handleCpfChange(raw: string) {
    setDirty(true);
    const digits = raw.replace(/\D/g, "").slice(0, 11);
    setCpf(digits);
  }

  function handleBirthChange(d: Date | undefined) {
    setDirty(true);
    setBirthPicker(d);
    if (d) {
      setBirthDate(format(d, "yyyy-MM-dd"));
    } else {
      setBirthDate("");
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const parsed = profileEditSchema.safeParse({
      firstName,
      lastName,
      email,
      cpf,
      birthDate,
    });
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      setFieldErrors({
        firstName: flat.firstName?.[0],
        lastName: flat.lastName?.[0],
        email: flat.email?.[0],
        cpf: flat.cpf?.[0],
        birthDate: flat.birthDate?.[0],
      });
      return;
    }
    setFieldErrors({});
    try {
      await updateMutation.mutateAsync(parsed.data);
      setDirty(false);
    } catch {
      /* mutation error — surfaced below */
    }
  }

  const showSuccessBody = !isPending && !isError && data !== undefined;

  return (
    <div className="space-y-5 p-6">
      <ListPageHeader title="Meu perfil" />

      {isPending ? (
        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="h-6 w-48 animate-pulse rounded bg-zinc-200" />
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_180px]">
            <div className="space-y-4">
              <div className="h-10 animate-pulse rounded bg-zinc-100" />
              <div className="h-10 animate-pulse rounded bg-zinc-100" />
              <div className="h-10 animate-pulse rounded bg-zinc-100" />
            </div>
            <div className="h-48 animate-pulse rounded-xl bg-zinc-100" />
          </div>
        </div>
      ) : null}

      {isError ? (
        <div
          className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-900"
          role="alert"
        >
          <p className="font-medium">Não foi possível carregar seu perfil.</p>
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
      ) : null}

      {showSuccessBody && data ? (
        <form onSubmit={(e) => void handleSave(e)} className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_200px] lg:items-start">
            <div className="min-w-0 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Dados pessoais</CardTitle>
                  <CardDescription>
                    Atualize suas informações de contato e identificação.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor={firstNameId}>Nome</Label>
                    <Input
                      id={firstNameId}
                      value={firstName}
                      onChange={(e) => {
                        setDirty(true);
                        setFirstName(e.target.value);
                      }}
                      autoComplete="given-name"
                      aria-invalid={!!fieldErrors.firstName}
                    />
                    {fieldErrors.firstName ? (
                      <p className="text-sm text-red-600" role="alert">
                        {fieldErrors.firstName}
                      </p>
                    ) : null}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={lastNameId}>Sobrenome</Label>
                    <Input
                      id={lastNameId}
                      value={lastName}
                      onChange={(e) => {
                        setDirty(true);
                        setLastName(e.target.value);
                      }}
                      autoComplete="family-name"
                      aria-invalid={!!fieldErrors.lastName}
                    />
                    {fieldErrors.lastName ? (
                      <p className="text-sm text-red-600" role="alert">
                        {fieldErrors.lastName}
                      </p>
                    ) : null}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={cpfId}>CPF</Label>
                    <Input
                      id={cpfId}
                      inputMode="numeric"
                      value={formatCpf(cpf)}
                      onChange={(e) => handleCpfChange(e.target.value)}
                      aria-invalid={!!fieldErrors.cpf}
                    />
                    {fieldErrors.cpf ? (
                      <p className="text-sm text-red-600" role="alert">
                        {fieldErrors.cpf}
                      </p>
                    ) : null}
                  </div>
                  <SingleDatePickerField
                    id={birthId}
                    label="Data de nascimento"
                    value={birthPicker}
                    onChange={handleBirthChange}
                    minDate={minBirth}
                    maxDate={maxBirth}
                    startMonth={minBirth}
                    endMonth={maxBirth}
                  />
                  {fieldErrors.birthDate ? (
                    <p className="text-sm text-red-600 sm:col-span-2" role="alert">
                      {fieldErrors.birthDate}
                    </p>
                  ) : null}
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor={emailId}>E-mail</Label>
                    <Input
                      id={emailId}
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setDirty(true);
                        setEmail(e.target.value);
                      }}
                      autoComplete="email"
                      aria-invalid={!!fieldErrors.email}
                    />
                    {fieldErrors.email ? (
                      <p className="text-sm text-red-600" role="alert">
                        {fieldErrors.email}
                      </p>
                    ) : null}
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor={roleId}>Função</Label>
                    <Input
                      id={roleId}
                      readOnly
                      tabIndex={-1}
                      value={data.role}
                      className="cursor-not-allowed bg-zinc-50 text-zinc-600"
                    />
                    <p className="text-xs text-muted-foreground">
                      A função é definida pelo administrador da plataforma.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Conta</CardTitle>
                  <CardDescription>
                    Datas de cadastro e última atualização do perfil.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3 text-sm sm:grid-cols-2">
                  <div>
                    <p className="text-muted-foreground">Cadastrado em</p>
                    <p className="font-medium text-zinc-900">
                      {formatDateTimePtBr(data.createdAt)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Atualizado em</p>
                    <p className="font-medium text-zinc-900">
                      {formatDateTimePtBr(data.updatedAt)}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Senha</CardTitle>
                  <CardDescription>
                    Altere sua senha periodicamente para manter a conta segura.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setPasswordOpen(true)}
                  >
                    Alterar senha
                  </Button>
                </CardContent>
              </Card>

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  type="submit"
                  disabled={updateMutation.isPending || !dirty}
                >
                  {updateMutation.isPending ? "Salvando…" : "Salvar alterações"}
                </Button>
                {updateMutation.isError ? (
                  <p className="text-sm text-red-600" role="alert">
                    {updateMutation.error instanceof Error
                      ? updateMutation.error.message
                      : "Não foi possível salvar."}
                  </p>
                ) : null}
              </div>
            </div>

            <aside className="lg:sticky lg:top-6">
              <Card className="overflow-hidden">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Foto</CardTitle>
                  <CardDescription className="text-xs">
                    Clique na imagem para ajustar o recorte e o zoom.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-3 pt-0">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                  <button
                    type="button"
                    onClick={handleAvatarClick}
                    disabled={saveAvatarMutation.isPending}
                    className="group relative flex size-28 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-zinc-200 bg-zinc-100 text-2xl font-semibold text-zinc-500 shadow-sm transition hover:border-[#26A69A]/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#26A69A] disabled:pointer-events-none disabled:opacity-60"
                    aria-label={
                      displayAvatarSrc
                        ? "Abrir ajuste da foto de perfil"
                        : "Enviar foto de perfil"
                    }
                  >
                    {displayAvatarSrc ? (
                      <img
                        src={displayAvatarSrc}
                        alt=""
                        className="size-full object-cover"
                      />
                    ) : (
                      <span aria-hidden>
                        {initialsFromParts(firstName, lastName)}
                      </span>
                    )}
                    <span
                      className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100"
                      aria-hidden
                    >
                      <Camera className="size-8 text-white" />
                    </span>
                  </button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-auto py-1 text-xs text-muted-foreground"
                    disabled={saveAvatarMutation.isPending}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Carregar nova imagem
                  </Button>
                  {saveAvatarMutation.isError ? (
                    <p className="text-center text-xs text-red-600" role="alert">
                      {saveAvatarMutation.error instanceof Error
                        ? saveAvatarMutation.error.message
                        : "Não foi possível salvar a foto."}
                    </p>
                  ) : null}
                </CardContent>
              </Card>
            </aside>
          </div>
        </form>
      ) : null}

      <AvatarCropDialog
        open={cropOpen}
        onOpenChange={handleCropDialogChange}
        imageSrc={cropSrc}
        onCropApplied={handleCroppedApplied}
      />
      <ChangePasswordDialog open={passwordOpen} onOpenChange={setPasswordOpen} />
    </div>
  );
}
