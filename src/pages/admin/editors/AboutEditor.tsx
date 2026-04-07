import { useState, useEffect } from 'react';
import { useContentState } from '@/context/ContentContext';
import { updateSection } from '@/lib/firestore';
import { uploadImage } from '@/lib/upload';
import FormField from '../components/FormField';
import SaveButton from '../components/SaveButton';
import ImageField from '../components/ImageField';
import { Plus } from 'lucide-react';

export default function AboutEditor() {
  const { content, refreshContent } = useContentState();
  const [form, setForm] = useState(content.about);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [pendingFiles, setPendingFiles] = useState<Record<number, File | null>>({});

  useEffect(() => {
    setForm(content.about);
    setPendingFiles({});
  }, [content.about]);

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

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
    await updateSection('about', { ...form, images });
    await refreshContent();
    setPendingFiles({});
    setSaving(false);
    setSaved(true);
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">About Section</h1>
      <div className="space-y-4">
        <FormField label="Heading" value={form.heading} onChange={(v) => update('heading', v)} />
        <FormField label="Paragraph 1" value={form.paragraph1} onChange={(v) => update('paragraph1', v)} type="textarea" />
        <FormField label="Paragraph 2" value={form.paragraph2} onChange={(v) => update('paragraph2', v)} type="textarea" />
        <FormField label="Paragraph 3" value={form.paragraph3} onChange={(v) => update('paragraph3', v)} type="textarea" />

        <div className="border-t border-zinc-800 pt-4 mt-4">
          <h2 className="text-lg font-semibold mb-3">Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Stat 1 Value" value={form.stat1Value} onChange={(v) => update('stat1Value', v)} />
            <FormField label="Stat 1 Label" value={form.stat1Label} onChange={(v) => update('stat1Label', v)} />
            <FormField label="Stat 2 Value" value={form.stat2Value} onChange={(v) => update('stat2Value', v)} />
            <FormField label="Stat 2 Label" value={form.stat2Label} onChange={(v) => update('stat2Label', v)} />
            <FormField label="Stat 3 Value" value={form.stat3Value} onChange={(v) => update('stat3Value', v)} />
            <FormField label="Stat 3 Label" value={form.stat3Label} onChange={(v) => update('stat3Label', v)} />
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-4 mt-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Images</h2>
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
