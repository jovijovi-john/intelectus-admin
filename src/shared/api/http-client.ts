function normalizeBaseUrl(base: string | undefined): string {
  if (!base) return "";
  return base.endsWith("/") ? base.slice(0, -1) : base;
}

function joinUrl(base: string, path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return base ? `${base}${p}` : p;
}

export class HttpError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "HttpError";
    this.status = status;
  }
}

async function parseBody<T>(response: Response): Promise<T> {
  if (response.status === 204) {
    return undefined as T;
  }
  const text = await response.text();
  if (!text) {
    return undefined as T;
  }
  return JSON.parse(text) as T;
}

export async function request<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const base = normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL);
  const url = joinUrl(base, path);

  const headers = new Headers(init?.headers);
  headers.set("Content-Type", "application/json");

  const response = await fetch(url, {
    ...init,
    headers,
  });

  if (!response.ok) {
    let message = `HTTP ${response.status}`;
    try {
      const text = await response.text();
      if (text) message = text;
    } catch {
      /* ignore */
    }
    throw new HttpError(message, response.status);
  }

  return parseBody<T>(response);
}

async function requestForm<T>(path: string, form: FormData): Promise<T> {
  const base = normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL);
  const url = joinUrl(base, path);

  const response = await fetch(url, {
    method: "POST",
    body: form,
  });

  if (!response.ok) {
    let message = `HTTP ${response.status}`;
    try {
      const text = await response.text();
      if (text) message = text;
    } catch {
      /* ignore */
    }
    throw new HttpError(message, response.status);
  }

  return parseBody<T>(response);
}

export const httpClient = {
  get: <T>(path: string) => request<T>(path, { method: "GET" }),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, {
      method: "POST",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    }),
  postForm: <T>(path: string, form: FormData) => requestForm<T>(path, form),
  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, {
      method: "PATCH",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    }),
};
