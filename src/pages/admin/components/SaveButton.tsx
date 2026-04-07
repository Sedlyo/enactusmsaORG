interface SaveButtonProps {
  saving: boolean;
  onClick: () => void;
  label?: string;
}

export default function SaveButton({ saving, onClick, label = 'Save Changes' }: SaveButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={saving}
      className="px-6 py-2.5 bg-amber-400 text-black font-semibold rounded-lg hover:bg-amber-300 transition-colors disabled:opacity-50"
    >
      {saving ? 'Saving...' : label}
    </button>
  );
}
