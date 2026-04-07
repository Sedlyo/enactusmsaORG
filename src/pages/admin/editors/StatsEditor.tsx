import { useState, useEffect } from 'react';
import { useContentState } from '@/context/ContentContext';
import { updateSection } from '@/lib/firestore';
import FormField from '../components/FormField';
import SaveButton from '../components/SaveButton';

export default function StatsEditor() {
  const { content, refreshContent } = useContentState();
  const [form, setForm] = useState(content.stats);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm(content.stats);
  }, [content.stats]);

  const update = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: Number(value) || 0 }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    await updateSection('stats', form);
    await refreshContent();
    setSaving(false);
    setSaved(true);
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Stats</h1>
      <div className="space-y-4">
        <FormField label="Years of Experience" value={form.yearsOfExperience} onChange={(v) => update('yearsOfExperience', v)} type="number" />
        <FormField label="Projects Completed" value={form.projectsCompleted} onChange={(v) => update('projectsCompleted', v)} type="number" />
      </div>
      <div className="mt-6 flex items-center gap-4">
        <SaveButton saving={saving} onClick={handleSave} />
        {saved && <span className="text-green-400 text-sm">Saved!</span>}
      </div>
    </div>
  );
}
