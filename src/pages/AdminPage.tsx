import { useState } from 'react';
import { useContent } from '../context/ContentContext';
import type { SiteContent, TeamMember, Committee } from '../context/ContentContext';
import { LogOut, Save, RotateCcw, Eye, ChevronDown, ChevronUp, Upload } from 'lucide-react';

const ADMIN_USERNAME = 'enactus';
const ADMIN_PASSWORD = 'msa2026';

function ImageUploader({ value, onChange, label }: { value: string; onChange: (val: string) => void; label: string }) {
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-white/60 text-xs uppercase tracking-wider">{label}</label>
      <div className="flex gap-3 items-center">
        {value && (
          <img src={value} alt="" className="w-16 h-16 object-cover rounded-lg border border-white/20" />
        )}
        <div className="flex flex-col gap-2 flex-1">
          <label className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg cursor-pointer hover:border-amber-400/50 transition-colors text-sm text-white/70">
            <Upload size={14} />
            Upload image
            <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
          </label>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Or paste image URL..."
            className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/30 outline-none focus:border-amber-400/50 transition-colors"
          />
        </div>
      </div>
    </div>
  );
}

function TextField({ label, value, onChange, multiline = false }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-white/60 text-xs uppercase tracking-wider">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/30 outline-none focus:border-amber-400/50 transition-colors resize-none"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/30 outline-none focus:border-amber-400/50 transition-colors"
        />
      )}
    </div>
  );
}

function SectionPanel({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-white/10 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 bg-white/5 hover:bg-white/10 transition-colors"
      >
        <span className="text-white font-bold uppercase tracking-wider text-sm">{title}</span>
        {open ? <ChevronUp size={16} className="text-amber-400" /> : <ChevronDown size={16} className="text-amber-400" />}
      </button>
      {open && <div className="px-6 py-6 flex flex-col gap-6">{children}</div>}
    </div>
  );
}

export default function AdminPage() {
  const { content, updateContent, resetContent } = useContent();
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [saved, setSaved] = useState(false);
  const [draft, setDraft] = useState<SiteContent>(content);

  const handleLogin = () => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setLoggedIn(true);
      setDraft(content);
    } else {
      setLoginError('Invalid username or password.');
    }
  };

  const handleSave = async () => {
  await updateContent(draft);
  setSaved(true);
  setTimeout(() => setSaved(false), 3000);
};
  const handleReset = async () => {
  if (confirm('Reset all content to defaults? This cannot be undone.')) {
    await resetContent();
    setDraft(content);
  }
};


  const updateDraft = (path: string[], value: unknown) => {
    setDraft((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      let obj: Record<string, unknown> = next;
      for (let i = 0; i < path.length - 1; i++) {
        obj = obj[path[i]] as Record<string, unknown>;
      }
      obj[path[path.length - 1]] = value;
      return next;
    });
  };

  const updateTeamMember = (index: number, field: keyof TeamMember, value: string) => {
    const updated = [...draft.team];
    updated[index] = { ...updated[index], [field]: value };
    setDraft({ ...draft, team: updated });
  };

  const updateCommittee = (index: number, field: keyof Committee, value: string) => {
    const updated = [...draft.committees];
    updated[index] = { ...updated[index], [field]: value };
    setDraft({ ...draft, committees: updated });
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-full max-w-sm mx-4">
          <div className="text-center mb-8">
            <img src="/assets/enactusMSA2.png" alt="Enactus MSA" className="h-12 w-auto mx-auto mb-4" />
            <h1 className="text-2xl font-black text-white">Staff Admin</h1>
            <p className="text-white/40 text-sm mt-1">Enactus MSA Content Manager</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-white/60 text-xs uppercase tracking-wider">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-amber-400/50 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-white/60 text-xs uppercase tracking-wider">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-amber-400/50 transition-colors"
              />
            </div>
            {loginError && <p className="text-red-400 text-sm">{loginError}</p>}
            <button
              onClick={handleLogin}
              className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-black font-bold rounded-xl transition-colors"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/assets/enactusMSA2.png" alt="" className="h-8 w-auto" />
          <span className="text-white font-bold text-sm">Admin Panel</span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-lg text-white/60 hover:text-white text-sm transition-colors"
          >
            <Eye size={14} />
            View Site
          </a>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-lg text-white/60 hover:text-red-400 text-sm transition-colors"
          >
            <RotateCcw size={14} />
            Reset
          </button>
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-black font-bold text-sm transition-all ${
              saved ? 'bg-green-400' : 'bg-amber-400 hover:bg-amber-300'
            }`}
          >
            <Save size={14} />
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
          <button
            onClick={() => setLoggedIn(false)}
            className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-lg text-white/60 hover:text-white text-sm transition-colors"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-10 flex flex-col gap-4">

        {/* Hero */}
        <SectionPanel title="Hero Section" defaultOpen>
          <TextField label="Subtitle (Enactus logo)" value={draft.hero.subtitle} onChange={(v) => updateDraft(['hero', 'subtitle'], v)} />
          <TextField label="Subtitle (MSA logo)" value={draft.hero.msaSubtitle} onChange={(v) => updateDraft(['hero', 'msaSubtitle'], v)} />
          <ImageUploader label="Enactus Center Logo" value={draft.hero.enactusLogo} onChange={(v) => updateDraft(['hero', 'enactusLogo'], v)} />
          <ImageUploader label="MSA Center Logo" value={draft.hero.msaLogo} onChange={(v) => updateDraft(['hero', 'msaLogo'], v)} />
        </SectionPanel>

        {/* About */}
        <SectionPanel title="About Section">
          <TextField label="Section Heading" value={draft.about.heading} onChange={(v) => updateDraft(['about', 'heading'], v)} />
          <TextField label="Paragraph 1" value={draft.about.paragraph1} onChange={(v) => updateDraft(['about', 'paragraph1'], v)} multiline />
          <TextField label="Paragraph 2" value={draft.about.paragraph2} onChange={(v) => updateDraft(['about', 'paragraph2'], v)} multiline />
          <TextField label="Paragraph 3" value={draft.about.paragraph3} onChange={(v) => updateDraft(['about', 'paragraph3'], v)} multiline />
          <div className="grid grid-cols-3 gap-4">
            <TextField label="Stat 1 Value" value={draft.about.stat1Value} onChange={(v) => updateDraft(['about', 'stat1Value'], v)} />
            <TextField label="Stat 1 Label" value={draft.about.stat1Label} onChange={(v) => updateDraft(['about', 'stat1Label'], v)} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <TextField label="Stat 2 Value" value={draft.about.stat2Value} onChange={(v) => updateDraft(['about', 'stat2Value'], v)} />
            <TextField label="Stat 2 Label" value={draft.about.stat2Label} onChange={(v) => updateDraft(['about', 'stat2Label'], v)} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <TextField label="Stat 3 Value" value={draft.about.stat3Value} onChange={(v) => updateDraft(['about', 'stat3Value'], v)} />
            <TextField label="Stat 3 Label" value={draft.about.stat3Label} onChange={(v) => updateDraft(['about', 'stat3Label'], v)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {draft.about.images.map((img, i) => (
              <ImageUploader
                key={i}
                label={`Image ${i + 1}`}
                value={img}
                onChange={(v) => {
                  const updatedImages = [...draft.about.images];
                  updatedImages[i] = v;
                  setDraft({ ...draft, about: { ...draft.about, images: updatedImages } });
                }}
              />
            ))}
          </div>
        </SectionPanel>

        {/* Committees */}
        <SectionPanel title="Committees / Services">
          {draft.committees.map((c, i) => (
            <div key={i} className="border border-white/10 rounded-xl p-4 flex flex-col gap-3">
              <p className="text-amber-400 text-xs font-bold uppercase tracking-wider">{c.name}</p>
              <TextField label="Committee Name" value={c.name} onChange={(v) => updateCommittee(i, 'name', v)} />
              <TextField label="Tagline" value={c.tagline} onChange={(v) => updateCommittee(i, 'tagline', v)} />
              <TextField label="Description" value={c.description} onChange={(v) => updateCommittee(i, 'description', v)} multiline />
            </div>
          ))}
        </SectionPanel>

        {/* Team */}
        <SectionPanel title="Team Members">
          {draft.team.map((member, i) => (
            <div key={i} className="border border-white/10 rounded-xl p-4 flex flex-col gap-3">
              <p className="text-amber-400 text-xs font-bold uppercase tracking-wider">Member {i + 1}</p>
              <TextField label="Name" value={member.name} onChange={(v) => updateTeamMember(i, 'name', v)} />
              <TextField label="Role" value={member.role} onChange={(v) => updateTeamMember(i, 'role', v)} />
              <TextField label="Achievement" value={member.achievement} onChange={(v) => updateTeamMember(i, 'achievement', v)} />
              <ImageUploader label="Photo" value={member.image} onChange={(v) => updateTeamMember(i, 'image', v)} />
            </div>
          ))}
          <button
            onClick={() => setDraft({ ...draft, team: [...draft.team, { id: Date.now(), name: 'New Member', role: 'ROLE', image: '/assets/placeholder.png', achievement: 'Achievement' }] })}
            className="px-4 py-2 border border-dashed border-amber-400/40 rounded-xl text-amber-400 text-sm hover:border-amber-400 transition-colors"
          >
            + Add Team Member
          </button>
        </SectionPanel>

        {/* Sponsors */}
        <SectionPanel title="Sponsors Section">
          <TextField label="Section Title" value={draft.sponsors.title} onChange={(v) => updateDraft(['sponsors', 'title'], v)} />
          <TextField label="Description" value={draft.sponsors.description} onChange={(v) => updateDraft(['sponsors', 'description'], v)} multiline />
          <div className="flex flex-col gap-3">
            <label className="text-white/60 text-xs uppercase tracking-wider">Sponsor Logos</label>
            {draft.sponsors.logos.map((logo, i) => (
              <div key={i} className="flex gap-2 items-center">
                <ImageUploader label={`Logo ${i + 1}`} value={logo} onChange={(v) => {
                  const updated = [...draft.sponsors.logos];
                  updated[i] = v;
                  setDraft({ ...draft, sponsors: { ...draft.sponsors, logos: updated } });
                }} />
                <button
                  onClick={() => {
                    const updated = draft.sponsors.logos.filter((_, idx) => idx !== i);
                    setDraft({ ...draft, sponsors: { ...draft.sponsors, logos: updated } });
                  }}
                  className="text-red-400 hover:text-red-300 text-xs mt-4"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={() => setDraft({ ...draft, sponsors: { ...draft.sponsors, logos: [...draft.sponsors.logos, ''] } })}
              className="px-4 py-2 border border-dashed border-amber-400/40 rounded-xl text-amber-400 text-sm hover:border-amber-400 transition-colors"
            >
              + Add Sponsor Logo
            </button>
          </div>
        </SectionPanel>

        {/* Contact */}
        <SectionPanel title="Contact Section">
          <TextField label="Heading" value={draft.contact.heading} onChange={(v) => updateDraft(['contact', 'heading'], v)} />
          <TextField label="Subheading" value={draft.contact.subheading} onChange={(v) => updateDraft(['contact', 'subheading'], v)} multiline />
          <TextField label="Email" value={draft.contact.email} onChange={(v) => updateDraft(['contact', 'email'], v)} />
          <TextField label="Phone" value={draft.contact.phone} onChange={(v) => updateDraft(['contact', 'phone'], v)} />
          <TextField label="Address" value={draft.contact.address} onChange={(v) => updateDraft(['contact', 'address'], v)} />
        </SectionPanel>

        <div className="pb-10" />
      </div>
    </div>
  );
}