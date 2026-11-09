export default function Toggle({ label, checked, onChange }) {
    return (
        <label className="toggle">
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
            />
            <span>{label}: {checked ? 'Темна' : 'Світла'}</span>
        </label>
    );
}