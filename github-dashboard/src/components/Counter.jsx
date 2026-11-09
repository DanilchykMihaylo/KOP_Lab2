export default function Counter({ label, value, onChange, min = 0, max = 100, step = 1, initial = value }) {
    const increment = () => onChange(Math.min(value + step, max));
    const decrement = () => onChange(Math.max(value - step, min));
    const reset = () => onChange(initial);

    return (
        <div className="card">
            <div className="card-title">{label}</div>
            <div className="card-value">{value}</div>
            <div className="btn-row">
                <button onClick={decrement} disabled={value <= min}>−</button>
                <button onClick={increment} disabled={value >= max}>+</button>
                <button onClick={reset}>Скинути</button>
            </div>
        </div>
    );
}