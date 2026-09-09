import { HttpResponse } from '@angular/common/http';

/** Saves an HTTP blob response as a file, honouring the Content-Disposition filename. */
export function saveBlobResponse(response: HttpResponse<Blob>, fallbackName: string): void {
  const blob = response.body;
  if (!blob) return;

  const disposition = response.headers.get('Content-Disposition') ?? '';
  const match = /filename\*?=(?:UTF-8'')?"?([^";]+)"?/i.exec(disposition);
  const filename = match ? decodeURIComponent(match[1]) : fallbackName;

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
