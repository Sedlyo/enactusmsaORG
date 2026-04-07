interface FormFieldProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: 'text' | 'number' | 'email' | 'url' | 'textarea';
  placeholder?: string;
}

export default function FormField({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
}: FormFieldProps) {
  const baseClass =
    'w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-amber-400 transition-colors';

  return (
    <div>
      <label className="block text-sm text-zinc-400 mb-1">{label}</label>
      {type === 'textarea' ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className={baseClass + ' resize-y'}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={baseClass}
        />
      )}
    </div>
  );
}
