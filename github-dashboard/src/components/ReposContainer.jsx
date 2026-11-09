import { useMemo, useState } from 'react';
import ReposTable from './ReposTable';
import { sortRepos } from '../utils/repoStats';

export default function ReposContainer({ repos, loading, error, onRetry, limit }) {
    const [sortKey, setSortKey] = useState('stars');
    const [sortDir, setSortDir] = useState('desc');

    const handleSort = (key) => {
        if (key === sortKey) {
            setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortKey(key);
            setSortDir(key === 'name' || key === 'language' ? 'asc' : 'desc');
        }
    };

    const visible = useMemo(
        () => sortRepos(repos, sortKey, sortDir).slice(0, limit),
        [repos, sortKey, sortDir, limit]
    );

    if (loading) return <p className="status" role="status">Завантаження…</p>;

    if (error) {
        return (
            <div className="status error" role="alert">
                <p>Не вдалося завантажити дані: {error}</p>
                <button onClick={onRetry}>Спробувати ще раз</button>
            </div>
        );
    }

    if (repos.length === 0) return <p className="status">У цій організації немає репозиторіїв</p>;

    return <ReposTable repos={visible} sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />;
}