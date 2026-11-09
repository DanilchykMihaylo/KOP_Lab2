import { useEffect, useState } from 'react';
import { fetchOrgRepos } from '../api/github';

export function useRepos(org) {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        setError(null);

        fetchOrgRepos(org, controller.signal)
            .then(setRepos)
            .catch((e) => {
                if (e.name !== 'AbortError') setError(e.message);
            })
            .finally(() => {
                if (!controller.signal.aborted) setLoading(false);
            });

        return () => controller.abort();
    }, [org, reloadKey]);

    const reload = () => setReloadKey((k) => k + 1);

    return { repos, loading, error, reload };
}