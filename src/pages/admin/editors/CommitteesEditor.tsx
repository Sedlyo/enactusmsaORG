import { useState, useEffect } from 'react';
import { useContentState } from '@/context/ContentContext';
import { setCommittees } from '@/lib/firestore';
import { uploadImage } from '@/lib/upload';
import type { Committee } from '@/context/ContentContext';
import FormField from '../components/FormField';
import SaveButton from '../components/SaveButton';
import ImageField from '../components/ImageField';
import { Plus, Trash2, GripVertical } from 'lucide-react';

export default function CommitteesEditor() {
  const { content, refreshContent } = useContentState();
  const [items, setItems] = useState<Committee[]>(content.committees);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [pendingFiles, setPendingFiles] = useState<Record<number, File | null>>({});

  useEffect(() => {
    setItems(content.committees);
    setPendingFiles({});
  }, [content.committees]);

  const updateItem = (index: number, key: keyof Committee, value: string) => {
    setItems((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [key]: value };
      return next;
    });
    setSaved(false);
  };

  const addItem = () => {
    setItems((prev) => [...prev, { name: '', tagline: '', description: '', image: '' }]);
    setSaved(false);
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
    setPendingFiles((p) => {
      const next = { ...p };
      delete next[index];
      return next;
    });
    setSaved(false);
  };

  const moveItem = (from: number, to: number) => {
    if (to < 0 || to >= items.length) return;
    setItems((prev) => {
      const next = [...prev];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return next;
    });
    setPendingFiles((p) => {
      const next = { ...p };
      const tmp = next[from];
      next[from] = next[to];
      next[to] = tmp;
      return next;
    });
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    const committees = [...items];
    for (const [idx, file] of Object.entries(pendingFiles)) {
      if (file) {
        committees[Number(idx)] = {
          ...committees[Number(idx)],
          image: await uploadImage(file),
        };
      }
    }
    await setCommittees(committees);
    await refreshContent();
    setPendingFiles({});
    setSaving(false);
    setSaved(true);
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Committees</h1>
        <button onClick={addItem} className="flex items-center gap-1 text-amber-400 hover:text-amber-300 text-sm">
          <Plus size={16} /> Add Committee
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <GripVertical size={16} className="text-zinc-600" />
                <span className="text-sm text-zinc-400">#{i + 1}</span>
                <button
                  onClick={() => moveItem(i, i - 1)}
                  disabled={i === 0}
                  className="text-zinc-500 hover:text-white disabled:opacity-30 text-xs"
                >
                  Up
                </button>
                <button
                  onClick={() => moveItem(i, i + 1)}
                  disabled={i === items.length - 1}
                  className="text-zinc-500 hover:text-white disabled:opacity-30 text-xs"
                >
                  Down
                </button>
              </div>
              <button onClick={() => removeItem(i)} className="text-zinc-500 hover:text-red-400">
                <Trash2 size={16} />
              </button>
            </div>
            <div className="space-y-3">
              <ImageField
                label="Background Image"
                value={item.image}
                pendingFile={pendingFiles[i] ?? null}
                onFileSelect={(f) => { setPendingFiles((p) => ({ ...p, [i]: f })); setSaved(false); }}
                onRemove={() => updateItem(i, 'image', '')}
              />
              <FormField label="Name" value={item.name} onChange={(v) => updateItem(i, 'name', v)} />
              <FormField label="Tagline" value={item.tagline} onChange={(v) => updateItem(i, 'tagline', v)} />
              <FormField label="Description" value={item.description} onChange={(v) => updateItem(i, 'description', v)} type="textarea" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-4">
        <SaveButton saving={saving} onClick={handleSave} />
        {saved && <span className="text-green-400 text-sm">Saved!</span>}
      </div>
    </div>
  );
}
