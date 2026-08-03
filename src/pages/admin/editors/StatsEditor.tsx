import { useState, useEffect } from 'react';
import { useContentState } from '@/context/ContentContext';
import FormField from '../components/FormField';
import SaveButton from '../components/SaveButton';

export default function StatsEditor() {
  const { content, updateContentSection } = useContentState();
  const [form, setForm] = useState(content.stats);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm(content.stats);
  }, [content.stats]);

  const update = (key: keyof typeof form, value: string | number) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    await updateContentSection('stats', form);
    setSaving(false);
    setSaved(true);
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Impact In Numbers</h1>
      <div className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-amber-400">Header Text</h2>
          <FormField
            label="Section Eyebrow"
            value={form.eyebrow}
            onChange={(v) => update('eyebrow', v)}
            placeholder="What We've Achieved"
          />
          <FormField
            label="Section Heading"
            value={form.heading}
            onChange={(v) => update('heading', v)}
            placeholder="Impact In Numbers"
          />
          <FormField
            label="Section Description"
            value={form.description}
            onChange={(v) => update('description', v)}
            type="textarea"
          />
        </div>

        <div className="border-t border-zinc-800 pt-6 space-y-4">
          <h2 className="text-lg font-semibold text-amber-400">Stat Card #1</h2>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Card 1 Title"
              value={form.stat1Title}
              onChange={(v) => update('stat1Title', v)}
            />
            <FormField
              label="Card 1 Number Value"
              value={form.stat1Value}
              onChange={(v) => update('stat1Value', Number(v) || 0)}
              type="number"
            />
          </div>
          <FormField
            label="Card 1 Label / Suffix"
            value={form.stat1Suffix}
            onChange={(v) => update('stat1Suffix', v)}
            placeholder="Years"
          />
          <FormField
            label="Card 1 Description"
            value={form.stat1Description}
            onChange={(v) => update('stat1Description', v)}
            type="textarea"
          />
        </div>

        <div className="border-t border-zinc-800 pt-6 space-y-4">
          <h2 className="text-lg font-semibold text-amber-400">Stat Card #2</h2>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Card 2 Title"
              value={form.stat2Title}
              onChange={(v) => update('stat2Title', v)}
            />
            <FormField
              label="Card 2 Number Value"
              value={form.stat2Value}
              onChange={(v) => update('stat2Value', Number(v) || 0)}
              type="number"
            />
          </div>
          <FormField
            label="Card 2 Label / Suffix"
            value={form.stat2Suffix}
            onChange={(v) => update('stat2Suffix', v)}
            placeholder="Initiatives"
          />
          <FormField
            label="Card 2 Description"
            value={form.stat2Description}
            onChange={(v) => update('stat2Description', v)}
            type="textarea"
          />
        </div>
      </div>

      <div className="mt-8 flex items-center gap-4">
        <SaveButton saving={saving} onClick={handleSave} />
        {saved && <span className="text-green-400 text-sm">Saved!</span>}
      </div>
    </div>
  );
}

