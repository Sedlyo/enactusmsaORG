import { useState, useEffect } from 'react';
import { useContentState } from '@/context/ContentContext';
import { updateSection } from '@/lib/firestore';
import { uploadImage } from '@/lib/upload';
import FormField from '../components/FormField';
import SaveButton from '../components/SaveButton';
import ImageField from '../components/ImageField';

export default function HeroEditor() {
  const { content, refreshContent } = useContentState();
  const [form, setForm] = useState(content.hero);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [pendingFiles, setPendingFiles] = useState<Record<string, File | null>>({});

  useEffect(() => {
    setForm(content.hero);
    setPendingFiles({});
  }, [content.hero]);

  const update = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    const data = { ...form };
    for (const [key, file] of Object.entries(pendingFiles)) {
      if (file) {
        data[key as keyof typeof data] = await uploadImage(file);
      }
    }
    await updateSection('hero', data);
    await refreshContent();
    setPendingFiles({});
    setSaving(false);
    setSaved(true);
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Hero Section</h1>
      <div className="space-y-4">
        <FormField label="Subtitle" value={form.subtitle} onChange={(v) => update('subtitle', v)} type="textarea" />
        <ImageField
          label="Enactus Logo"
          value={form.enactusLogo}
          pendingFile={pendingFiles['enactusLogo'] ?? null}
          onFileSelect={(f) => { setPendingFiles((p) => ({ ...p, enactusLogo: f })); setSaved(false); }}
          onRemove={() => update('enactusLogo', '')}
        />
        <ImageField
          label="MSA Logo"
          value={form.msaLogo}
          pendingFile={pendingFiles['msaLogo'] ?? null}
          onFileSelect={(f) => { setPendingFiles((p) => ({ ...p, msaLogo: f })); setSaved(false); }}
          onRemove={() => update('msaLogo', '')}
        />
        <FormField label="MSA Subtitle" value={form.msaSubtitle} onChange={(v) => update('msaSubtitle', v)} />
      </div>
      <div className="mt-6 flex items-center gap-4">
        <SaveButton saving={saving} onClick={handleSave} />
        {saved && <span className="text-green-400 text-sm">Saved!</span>}
      </div>
    </div>
  );
}
