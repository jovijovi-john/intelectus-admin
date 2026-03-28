import { getCroppedImg } from "@/features/profile/lib/crop-image";
import { Button } from "@/shared/shadcn/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/shadcn/components/ui/dialog";
import { cn } from "@/shared/shadcn/lib/utils";
import { useCallback, useEffect, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";

export type AvatarCropDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Object URL (blob:) ou URL http(s). */
  imageSrc: string | null;
  onCropApplied: (croppedObjectUrl: string) => void | Promise<void>;
};

export function AvatarCropDialog({
  open,
  onOpenChange,
  imageSrc,
  onCropApplied,
}: AvatarCropDialogProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [applying, setApplying] = useState(false);

  const onCropComplete = useCallback(
    (_croppedArea: Area, croppedPixels: Area) => {
      setCroppedAreaPixels(croppedPixels);
    },
    [],
  );

  useEffect(() => {
    if (open) {
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedAreaPixels(null);
    }
  }, [open, imageSrc]);

  async function handleApply() {
    if (!imageSrc || !croppedAreaPixels) return;
    setApplying(true);
    try {
      const url = await getCroppedImg(imageSrc, croppedAreaPixels);
      await Promise.resolve(onCropApplied(url));
      onOpenChange(false);
    } finally {
      setApplying(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Ajustar foto</DialogTitle>
          <DialogDescription>
            Arraste para posicionar e use o zoom para enquadrar o rosto. A foto
            será recortada em formato circular no perfil.
          </DialogDescription>
        </DialogHeader>
        {imageSrc ? (
          <div className="space-y-2">
            <div className="relative mx-auto h-[280px] w-full max-w-[320px] overflow-hidden rounded-lg bg-zinc-100">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            <div className="flex items-center gap-3 px-1">
              <span className="text-xs text-muted-foreground">Zoom</span>
              <input
                type="range"
                min={1}
                max={3}
                step={0.05}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className={cn(
                  "h-2 w-full cursor-pointer appearance-none rounded-full bg-zinc-200",
                  "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#26A69A]",
                )}
                aria-label="Zoom do recorte"
              />
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Nenhuma imagem selecionada.</p>
        )}
        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={applying}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={() => void handleApply()}
            disabled={!imageSrc || !croppedAreaPixels || applying}
          >
            {applying ? "Aplicando…" : "Aplicar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
