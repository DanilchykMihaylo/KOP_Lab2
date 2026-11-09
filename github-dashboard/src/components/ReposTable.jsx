
const COLUMNS = [
    { key: 'name', label: 'Назва' },
    { key: 'language', label: 'Мова' },
    { key: 'stars', label: '★ Stars', numeric: true },
    { key: 'forks', label: 'Forks', numeric: true },
    { key: 'issues', label: 'Issues', numeric: true },
];

export default function ReposTable({ repos, sortKey, sortDir, onSort }) {
    return (
        <table className="table">
            <thead>
            <tr>
                {COLUMNS.map((col) => {
                    const active = sortKey === col.key;
                    return (
                        <th
                            key={col.key}
                            className={col.numeric ? 'num' : undefined}
                            aria-sort={active ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
                        >
                            <button type="button" onClick={() => onSort(col.key)}>
                                {col.label} {active ? (sortDir === 'asc' ? '▲' : '▼') : ''}
                            </button>
                        </th>
                    );
                })}
            </tr>
            </thead>
            <tbody>
            {repos.map((repo) => (
                <tr key={repo.id}>
                    <td><a href={repo.url} target="_blank" rel="noreferrer">{repo.name}</a></td>
                    <td>{repo.language}</td>
                    <td className="num">{repo.stars.toLocaleString('uk-UA')}</td>
                    <td className="num">{repo.forks.toLocaleString('uk-UA')}</td>
                    <td className="num">{repo.issues.toLocaleString('uk-UA')}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}