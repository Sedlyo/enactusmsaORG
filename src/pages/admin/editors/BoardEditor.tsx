import { useState, useEffect } from 'react';
import { useContentState } from '@/context/ContentContext';
import { updateSection } from '@/lib/firestore';
import { uploadImage } from '@/lib/upload';
import FormField from '../components/FormField';
import SaveButton from '../components/SaveButton';
import ImageField from '../components/ImageField';
import { Plus } from 'lucide-react';

export default function BoardEditor() {
  const { content, refreshContent } = useContentState();
  const [form, setForm] = useState(content.board);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [pendingFiles, setPendingFiles] = useState<Record<number, File | null>>({});

  useEffect(() => {
    setForm(content.board);
    setPendingFiles({});
  }, [content.board]);

  const updateImage = (index: number, value: string) => {
    if (!value) {
      setForm((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      }));
      setPendingFiles((p) => {
        const next = { ...p };
        delete next[index];
        return next;
      });
    } else {
      setForm((prev) => {
        const images = [...prev.images];
        images[index] = value;
        return { ...prev, images };
      });
    }
    setSaved(false);
  };

  const addImage = () => {
    setForm((prev) => ({ ...prev, images: [...prev.images, ''] }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    const images = [...form.images];
    for (const [idx, file] of Object.entries(pendingFiles)) {
      if (file) {
        images[Number(idx)] = await uploadImage(file);
      }
    }
    await updateSection('board', { ...form, images });
    await refreshContent();
    setPendingFiles({});
    setSaving(false);
    setSaved(true);
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Board Section</h1>
      <div className="space-y-4">
        <FormField
          label="Description"
          value={form.description}
          onChange={(v) => {
            setForm((prev) => ({ ...prev, description: v }));
            setSaved(false);
          }}
          type="textarea"
        />

        <div className="border-t border-zinc-800 pt-4 mt-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Board Images</h2>
            <button onClick={addImage} className="flex items-center gap-1 text-amber-400 hover:text-amber-300 text-sm">
              <Plus size={16} /> Add Image
            </button>
          </div>
          <div className="flex flex-wrap gap-4">
            {form.images.map((img, i) => (
              <ImageField
                key={i}
                label={`Image #${i + 1}`}
                value={img}
                pendingFile={pendingFiles[i] ?? null}
                onFileSelect={(f) => { setPendingFiles((p) => ({ ...p, [i]: f })); setSaved(false); }}
                onRemove={() => updateImage(i, '')}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center gap-4">
        <SaveButton saving={saving} onClick={handleSave} />
        {saved && <span className="text-green-400 text-sm">Saved!</span>}
      </div>
    </div>
  );
}
