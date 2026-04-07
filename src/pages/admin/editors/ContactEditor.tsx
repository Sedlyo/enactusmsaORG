import { useState, useEffect } from 'react';
import { useContentState } from '@/context/ContentContext';
import { updateSection } from '@/lib/firestore';
import FormField from '../components/FormField';
import SaveButton from '../components/SaveButton';

export default function ContactEditor() {
  const { content, refreshContent } = useContentState();
  const [form, setForm] = useState(content.contact);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm(content.contact);
  }, [content.contact]);

  const update = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    await updateSection('contact', form);
    await refreshContent();
    setSaving(false);
    setSaved(true);
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Contact</h1>
      <div className="space-y-4">
        <FormField label="Heading" value={form.heading} onChange={(v) => update('heading', v)} />
        <FormField label="Subheading" value={form.subheading} onChange={(v) => update('subheading', v)} type="textarea" />
        <FormField label="Email" value={form.email} onChange={(v) => update('email', v)} type="email" />
        <FormField label="Phone" value={form.phone} onChange={(v) => update('phone', v)} />
        <FormField label="Address" value={form.address} onChange={(v) => update('address', v)} />
      </div>
      <div className="mt-6 flex items-center gap-4">
        <SaveButton saving={saving} onClick={handleSave} />
        {saved && <span className="text-green-400 text-sm">Saved!</span>}
      </div>
    </div>
  );
}
