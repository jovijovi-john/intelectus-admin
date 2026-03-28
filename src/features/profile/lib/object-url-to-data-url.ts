/** Lê um blob (object URL ou http) e devolve data URL base64. */
export async function objectUrlToDataUrl(objectUrl: string): Promise<string> {
  const res = await fetch(objectUrl);
  const blob = await res.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const r = reader.result;
      if (typeof r !== "string") {
        reject(new Error("Falha ao ler imagem."));
        return;
      }
      resolve(r);
    };
    reader.onerror = () => reject(reader.error ?? new Error("Falha ao ler imagem."));
    reader.readAsDataURL(blob);
  });
}
