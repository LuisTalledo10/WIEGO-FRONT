/** RFC7807 ProblemDetails shape returned by the backend's exception handler. */
export interface ApiProblem {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
}

export function problemMessage(err: unknown, fallback = 'Ocurrió un error inesperado.'): string {
  const e = err as { error?: ApiProblem | string; message?: string };
  if (e?.error && typeof e.error === 'object') {
    return e.error.detail || e.error.title || fallback;
  }
  if (typeof e?.error === 'string' && e.error.trim()) return e.error;
  return e?.message || fallback;
}
