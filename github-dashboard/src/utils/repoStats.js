export function sortRepos(repos, key, dir) {
    const factor = dir === 'asc' ? 1 : -1;
    return [...repos].sort((a, b) => {
        const x = a[key];
        const y = b[key];
        const cmp =
            typeof x === 'number' && typeof y === 'number'
                ? x - y
                : String(x).localeCompare(String(y));
        return cmp * factor;
    });
}

const fmt = (n) => n.toLocaleString('uk-UA');

export function computeKpis(repos) {
    const sum = (field) => repos.reduce((acc, r) => acc + r[field], 0);
    return [
        { id: 1, title: 'Stars', value: fmt(sum('stars')) },
        { id: 2, title: 'Forks', value: fmt(sum('forks')) },
        { id: 3, title: 'Repositories', value: fmt(repos.length) },
        { id: 4, title: 'Open issues', value: fmt(sum('issues')) },
    ];
}