import { useState, useEffect } from 'react';
import { useContentState } from '@/context/ContentContext';
import { updateSection, seedDefaults } from '@/lib/firestore';
import { uploadImage } from '@/lib/upload';
import FormField from '../components/FormField';
import SaveButton from '../components/SaveButton';
import ImageField from '../components/ImageField';

export default function SettingsPage() {
  const { content, refreshContent } = useContentState();
  const [form, setForm] = useState(content.settings);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [pendingFiles, setPendingFiles] = useState<Record<string, File | null>>({});

  // Seed state
  const [seeding, setSeeding] = useState(false);
  const [confirmSeed, setConfirmSeed] = useState(false);

  useEffect(() => {
    setForm(content.settings);
    setPendingFiles({});
  }, [content.settings]);

  const handleSave = async () => {
    setSaving(true);
    const data = { ...form };
    for (const [key, file] of Object.entries(pendingFiles)) {
      if (file) {
        data[key as keyof typeof data] = await uploadImage(file);
      }
    }
    await updateSection('settings', data);
    await refreshContent();
    setPendingFiles({});
    setSaving(false);
    setSaved(true);
  };

  const handleSeed = async () => {
    setSeeding(true);
    try {
      await seedDefaults();
      await refreshContent();
    } catch (err) {
      console.error('Seed failed:', err);
    } finally {
      setSeeding(false);
      setConfirmSeed(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      {/* Site Info */}
      <div className="space-y-4 mb-8">
        <FormField
          label="Site Name"
          value={form.siteName}
          onChange={(v) => { setForm((p) => ({ ...p, siteName: v })); setSaved(false); }}
          placeholder="Enactus MSA"
        />
        <ImageField
          label="Site Logo"
          value={form.logo}
          pendingFile={pendingFiles['logo'] ?? null}
          onFileSelect={(f) => { setPendingFiles((p) => ({ ...p, logo: f })); setSaved(false); }}
          onRemove={() => { setForm((p) => ({ ...p, logo: '' })); setSaved(false); }}
        />
        <ImageField
          label="Favicon"
          value={form.favicon}
          pendingFile={pendingFiles['favicon'] ?? null}
          onFileSelect={(f) => { setPendingFiles((p) => ({ ...p, favicon: f })); setSaved(false); }}
          onRemove={() => { setForm((p) => ({ ...p, favicon: '' })); setSaved(false); }}
        />
      </div>

      <div className="flex items-center gap-4 mb-10">
        <SaveButton saving={saving} onClick={handleSave} />
        {saved && <span className="text-green-400 text-sm">Saved!</span>}
      </div>

      {/* Danger Zone */}
      <div className="border-t border-zinc-800 pt-8">
        <h2 className="text-lg font-semibold text-red-400 mb-2">Danger Zone</h2>
        <div className="bg-zinc-900 border border-red-500/20 rounded-xl p-6">
          <h3 className="font-medium mb-1">Reset to Default Content</h3>
          <p className="text-zinc-400 text-sm mb-4">
            This will overwrite <strong>all</strong> content in the database with the original placeholder defaults. This action cannot be undone.
          </p>
          {!confirmSeed ? (
            <button
              onClick={() => setConfirmSeed(true)}
              className="px-4 py-2 text-sm border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/10 transition-colors"
            >
              Reset All Content
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={handleSeed}
                disabled={seeding}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {seeding ? 'Resetting...' : 'Yes, Reset Everything'}
              </button>
              <button
                onClick={() => setConfirmSeed(false)}
                className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
