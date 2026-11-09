const BASE_URL = 'https://api.github.com';

export async function fetchOrgRepos(org, signal) {
    const res = await fetch(
        `${BASE_URL}/orgs/${org}/repos?per_page=100&sort=updated`,
        { signal, headers: { Accept: 'application/vnd.github+json' } }
    );

    if (!res.ok) {
        if (res.status === 403) throw new Error('Перевищено ліміт запитів GitHub API (60/год без токена)');
        if (res.status === 404) throw new Error(`Організацію "${org}" не знайдено`);
        throw new Error(`Помилка API: ${res.status}`);
    }

    const data = await res.json();

    return data.map((r) => ({
        id: r.id,
        name: r.name,
        language: r.language ?? '—',
        stars: r.stargazers_count,
        forks: r.forks_count,
        issues: r.open_issues_count,
        url: r.html_url,
    }));
}