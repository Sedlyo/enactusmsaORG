import { useState, useEffect } from 'react';
import { useContentState } from '@/context/ContentContext';
import { updateSection } from '@/lib/firestore';
import { uploadImage } from '@/lib/upload';
import FormField from '../components/FormField';
import SaveButton from '../components/SaveButton';
import ImageField from '../components/ImageField';
import { Plus } from 'lucide-react';

export default function SponsorsEditor() {
  const { content, refreshContent } = useContentState();
  const [form, setForm] = useState(content.sponsors);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [pendingFiles, setPendingFiles] = useState<Record<number, File | null>>({});

  useEffect(() => {
    setForm(content.sponsors);
    setPendingFiles({});
  }, [content.sponsors]);

  const updateLogo = (index: number, value: string) => {
    if (!value) {
      setForm((prev) => ({
        ...prev,
        logos: prev.logos.filter((_, i) => i !== index),
      }));
      setPendingFiles((p) => {
        const next = { ...p };
        delete next[index];
        return next;
      });
    } else {
      setForm((prev) => {
        const logos = [...prev.logos];
        logos[index] = value;
        return { ...prev, logos };
      });
    }
    setSaved(false);
  };

  const addLogo = () => {
    setForm((prev) => ({ ...prev, logos: [...prev.logos, ''] }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    const logos = [...form.logos];
    for (const [idx, file] of Object.entries(pendingFiles)) {
      if (file) {
        logos[Number(idx)] = await uploadImage(file);
      }
    }
    await updateSection('sponsors', { ...form, logos });
    await refreshContent();
    setPendingFiles({});
    setSaving(false);
    setSaved(true);
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Sponsors</h1>
      <div className="space-y-4">
        <FormField
          label="Title"
          value={form.title}
          onChange={(v) => {
            setForm((prev) => ({ ...prev, title: v }));
            setSaved(false);
          }}
        />
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
            <h2 className="text-lg font-semibold">Sponsor Logos</h2>
            <button onClick={addLogo} className="flex items-center gap-1 text-amber-400 hover:text-amber-300 text-sm">
              <Plus size={16} /> Add Logo
            </button>
          </div>
          <div className="flex flex-wrap gap-4">
            {form.logos.map((logo, i) => (
              <ImageField
                key={i}
                label={`Logo #${i + 1}`}
                value={logo}
                pendingFile={pendingFiles[i] ?? null}
                onFileSelect={(f) => { setPendingFiles((p) => ({ ...p, [i]: f })); setSaved(false); }}
                onRemove={() => updateLogo(i, '')}
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
