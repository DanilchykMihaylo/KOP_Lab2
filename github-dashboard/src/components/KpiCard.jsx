export default function KpiCard({ title, value, change }) {
    const isPositive = change?.startsWith('+');
    return (
        <div className="card">
            <div className="card-title">{title}</div>
            <div className="card-value">{value}</div>
            {change && <div className={isPositive ? 'change up' : 'change down'}>{change}</div>}
        </div>
    );
}