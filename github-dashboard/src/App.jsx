import { useMemo, useState } from 'react';
import Section from './components/Section';
import KpiCard from './components/KpiCard';
import Counter from './components/Counter';
import Toggle from './components/Toggle';
import ReposContainer from './components/ReposContainer';
import { useRepos } from './hooks/useRepos';
import { computeKpis } from './utils/repoStats';

const ORG = 'spotify';

export default function App() {
    const [isDark, setIsDark] = useState(false);
    const [topN, setTopN] = useState(5);

    const { repos, loading, error, reload } = useRepos(ORG);
    const kpis = useMemo(() => computeKpis(repos), [repos]);

    return (
        <div className={isDark ? 'app dark' : 'app'}>
            <header>
                <h1>GitHub Dashboard · {ORG}</h1>
                <Toggle label="Тема" checked={isDark} onChange={setIsDark} />
            </header>

            <Section title="KPI">
                {loading || error ? (
                    <p className="status">{loading ? 'Завантаження…' : 'KPI недоступні через помилку'}</p>
                ) : (
                    <div className="grid">
                        {kpis.map((k) => (
                            <KpiCard key={k.id} title={k.title} value={k.value} />
                        ))}
                    </div>
                )}
            </Section>

            <Section title="Налаштування вибірки">
                <Counter label="Top N репозиторіїв" value={topN} onChange={setTopN} initial={5} min={1} max={20} />
            </Section>

            <Section title="Репозиторії організації">
                <ReposContainer repos={repos} loading={loading} error={error} onRetry={reload} limit={topN} />
            </Section>
        </div>
    );
}