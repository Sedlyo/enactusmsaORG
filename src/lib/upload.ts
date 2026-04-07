export async function uploadImage(file: File): Promise<string> {
  const form = new FormData();
  form.append('image', file);
  const res = await fetch('/api/upload', { method: 'POST', body: form });
  if (!res.ok) throw new Error('Upload failed');
  const data = await res.json();
  return data.path;
}

export async function deleteImage(path: string): Promise<void> {
  if (!path.startsWith('/assets/uploads/')) return;
  await fetch('/api/upload', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ path }),
  });
}
