import {useState} from 'react';
import news from '@/data/news/news.json';
import {koDate} from '@/lib/qdis/format';

type Item = (typeof news.items)[number];
const CAT = news.categories as Record<string, string>;

export function NewsList({limit, filterable = false}: {limit?: number; filterable?: boolean}) {
  const [cat, setCat] = useState('all');
  const items = [...news.items]
    .filter(i => i.status === 'published')
    .sort((a, b) => b.date.localeCompare(a.date))
    .filter(i => cat === 'all' || i.category === cat)
    .slice(0, limit ?? 999);
  return (
    <div>
      {filterable && (
        <div className="chip-row" role="group" aria-label="분류" style={{marginBottom: 24}}>
          <button type="button" className="chip" aria-pressed={cat === 'all'} onClick={() => setCat('all')}>전체</button>
          {Object.entries(CAT).map(([k, v]) => <button key={k} type="button" className="chip" aria-pressed={cat === k} onClick={() => setCat(k)}>{v}</button>)}
        </div>
      )}
      <div className="news-list">
        {items.map((i: Item) => (
          <a className="news-item" key={i.id} href={i.source_url} target="_blank" rel="noopener noreferrer">
            <time dateTime={i.date}>{koDate(i.date)}</time>
            <span className="cat">{CAT[i.category]}</span>
            <div className="body">
              <h3>{i.title}</h3>
              <p>{i.summary}</p>
            </div>
            <span className="src">{i.source_board} 원문 ↗</span>
          </a>
        ))}
      </div>
    </div>
  );
}
