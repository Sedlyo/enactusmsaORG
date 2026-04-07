import { useRef, useState, useEffect } from 'react';
import { ImageOff, Upload, Trash2 } from 'lucide-react';

interface ImageFieldProps {
  label: string;
  value: string;
  pendingFile: File | null;
  onFileSelect: (file: File | null) => void;
  onRemove: () => void;
}

export default function ImageField({ label, value, pendingFile, onFileSelect, onRemove }: ImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [broken, setBroken] = useState(false);

  useEffect(() => {
    if (!pendingFile) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(pendingFile);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [pendingFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBroken(false);
      onFileSelect(file);
    }
    e.target.value = '';
  };

  const handleRemove = () => {
    onFileSelect(null);
    onRemove();
  };

  const displaySrc = preview || (value && !broken ? value : null);

  return (
    <div>
      <label className="block text-sm text-zinc-400 mb-1.5">{label}</label>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {displaySrc ? (
        <div className="relative group w-24 h-24 rounded-xl overflow-hidden border border-zinc-700 bg-zinc-800">
          <img
            src={displaySrc}
            alt={label}
            className="w-full h-full object-cover"
            onError={() => {
              if (!preview) setBroken(true);
            }}
          />
          {pendingFile && (
            <div className="absolute top-1 left-1 bg-amber-400 text-black text-[9px] font-bold px-1.5 py-0.5 rounded">
              NEW
            </div>
          )}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="p-1.5 bg-zinc-700 rounded-lg hover:bg-zinc-600 transition-colors"
              title="Replace"
            >
              <Upload size={14} className="text-white" />
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="p-1.5 bg-zinc-700 rounded-lg hover:bg-red-500 transition-colors"
              title="Remove"
            >
              <Trash2 size={14} className="text-white" />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-24 h-24 rounded-xl border-2 border-dashed border-zinc-700 hover:border-amber-400/50 bg-zinc-800/50 flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <ImageOff size={20} className="text-zinc-500" />
          <span className="text-[11px] text-zinc-500">Upload</span>
        </button>
      )}
    </div>
  );
}
