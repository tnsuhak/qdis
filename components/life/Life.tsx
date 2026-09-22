import {useEffect, useState} from 'react';
import schedule from '@/data/life/schedule.json';
import mealsSnapshot from '@/data/meals/latest.json';
import {koDate} from '@/lib/qdis/format';

type Track = 'high' | 'middle' | 'elementary';
const TRACK_LABEL: Record<Track, string> = {high: '고등 G9–G12', middle: '중등 G6–G8', elementary: '초등 G1–G5'};

export function DayTimeline({initial = 'high', compact = false}: {initial?: Track; compact?: boolean}) {
  const [track, setTrack] = useState<Track>(initial);
  const t = (schedule.tracks as any)[track] as {label: string; summary: string; items: Array<{start: string; end: string; title: string; detail: string; kind: string}>};
  return (
    <div>
      <div className="day-switch" role="group" aria-label="과정 선택">
        {(Object.keys(TRACK_LABEL) as Track[]).map(k => (
          <button key={k} type="button" aria-pressed={track === k} onClick={() => setTrack(k)}>{TRACK_LABEL[k]}</button>
        ))}
      </div>
      <p className="small" style={{marginBottom: 26, maxWidth: '40em'}}>{t.summary}</p>
      <ol className="timeline">
        {t.items.map((it, i) => (
          <li key={i} data-kind={it.kind}>
            <time className="num">{it.start}<small>~ {it.end}</small></time>
            <span className="dot" aria-hidden="true" />
            <div>
              <h4>{it.title}</h4>
              {!compact && it.detail && <p>{it.detail}</p>}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Weekend() {
  return (
    <div className="cols-2">
      {([['토요일', schedule.weekend.saturday], ['일요일', schedule.weekend.sunday]] as const).map(([d, items]) => (
        <div key={d}>
          <h3 className="h3" style={{marginBottom: 14}}>{d}</h3>
          <ul className="ruled">
            {(items as any[]).map((it, i) => (
              <li key={i} style={{gridTemplateColumns: '120px minmax(0,1fr)', padding: '14px 0'}}>
                <span className="num" style={{fontWeight: 700}}>{it.time}</span>
                <div><b style={{fontWeight: 600}}>{it.title}</b>{it.detail && <p style={{fontSize: 14.5, marginTop: 2}}>{it.detail}</p>}</div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

type MealDay = {date: string; weekday: string; meals: Partial<Record<'breakfast' | 'lunch' | 'dinner' | 'snack', string[]>>};
type MealWeek = {week: {start: string; end: string}; days: MealDay[]; fetched_at?: string; source: {url: string}};
const MEAL_LABEL: Array<['breakfast' | 'lunch' | 'dinner' | 'snack', string, string]> = [
  ['breakfast', 'BREAKFAST', '조식'], ['lunch', 'LUNCH', '중식'], ['dinner', 'DINNER', '석식'], ['snack', 'SNACK', '간식'],
];

function kstToday() {
  const d = new Date(Date.now() + 9 * 3600 * 1000);
  return d.toISOString().slice(0, 10);
}

/** 주 1회 자동 동기화된 공식 급식 스냅샷을 표시합니다. */
export function useMeals(): MealWeek {
  return mealsSnapshot as MealWeek;
}

export function MealsWeek({showWeekTable = false}: {showWeekTable?: boolean}) {
  const week = useMeals();
  const [sel, setSel] = useState(0);
  const [today, setToday] = useState<string | null>(null);
  useEffect(() => {
    const t = kstToday();
    setToday(t);
    const i = week.days.findIndex(d => d.date === t);
    if (i >= 0) setSel(i);
  }, [week]);
  const day = week.days[sel] ?? week.days[0];
  return (
    <div>
      <p className="small" style={{marginBottom: 14}}>
        <b style={{color: 'var(--ink)'}}>{koDate(week.week.start)} – {koDate(week.week.end).slice(5)}</b> 주간 식단 · 학교 공식 급식 메뉴 기준
      </p>
      <div className="meal-days" role="tablist" aria-label="요일 선택">
        {week.days.map((d, i) => (
          <button key={d.date} type="button" role="tab" aria-selected={i === sel} onClick={() => setSel(i)}>
            {d.weekday}{today === d.date && <span className="today">오늘</span>}
            <small>{d.date.slice(5).replace('-', '.')}</small>
          </button>
        ))}
      </div>
      <div className="meal-grid" role="tabpanel" aria-label={`${day.weekday}요일 식단`}>
        {MEAL_LABEL.map(([k, en, ko]) => (
          <div key={k}>
            <h4>{en}<span>{ko}</span></h4>
            {day.meals[k]?.length ? (
              <ul>{day.meals[k]!.map((m, i) => <li key={i}>{m}</li>)}</ul>
            ) : (
              <p className="none">{k === 'snack' ? '이날은 간식 없음' : '제공 없음'}</p>
            )}
          </div>
        ))}
      </div>
      {showWeekTable && (
        <div className="table-wrap week-table-wrap" style={{marginTop: 56}}>
          <table className="week-table" style={{minWidth: 900}}>
            <caption className="sr-only">주간 식단표</caption>
            <thead>
              <tr><th scope="col">구분</th>{week.days.map(d => <th scope="col" key={d.date}>{d.weekday} {d.date.slice(5).replace('-', '.')}</th>)}</tr>
            </thead>
            <tbody>
              {MEAL_LABEL.map(([k, , ko]) => (
                <tr key={k}>
                  <th scope="row">{ko}</th>
                  {week.days.map(d => <td key={d.date}>{d.meals[k]?.length ? <ul>{d.meals[k]!.map((m, i) => <li key={i}>{m}</li>)}</ul> : <span className="small">–</span>}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="source">식단은 식자재 수급 등 사정에 따라 바뀔 수 있습니다. 출처: <a href={week.source.url} target="_blank" rel="noopener noreferrer">청도대원학교 학교생활 &gt; 급식 메뉴</a></p>
    </div>
  );
}

export const CARE_ITEMS: Array<[string, string, string]> = [
  ['CLASS', '수업', '08:20부터 16:15까지 45분 수업 8교시. 점심 뒤 40분 Q&A 세션에서 과목 선생님에게 직접 질문합니다.'],
  ['AFTER SCHOOL', '방과후', '18:00–19:50 SAT·AP·TOEFL·HSK 등 수준별 강좌. 학기마다 수요 조사로 개설합니다.'],
  ['MEALS', '식사', '학교 직영 식당에서 하루 세 끼, 월~금 저녁 간식. 주말·공휴일에도 세 끼를 제공합니다.'],
  ['STUDY HALL', '야간 자율학습', '기숙생 전용 자습실에서 감독 교사 지도. G9–G12는 20:30–23:00 두 차례 모두 참여합니다.'],
  ['DORMITORY', '기숙사', '4인 1실, 남·여 층 분리, 남녀 사감이 각각 관리. 점호·소등, 무단 이동 금지 등 생활 규정이 있습니다.'],
  ['PHONE', '휴대전화', '평일 16:40–17:50, 토 12:00–22:30, 일 07:30–17:50에만 사용. 그 외 시간은 수거·보관합니다.'],
  ['WEEKEND', '주말', '토요일 오전 Project Creativity·동아리, 일요일 18:00–21:00 Study Hall. 방학 외 주말에도 학교가 운영됩니다.'],
  ['OFF-CAMPUS', '외출·외박', '보호자 동의서를 금요일 17:00까지 제출. 외출은 당일, 외박은 귀소일 17:00까지 돌아옵니다.'],
  ['LAUNDRY', '세탁', '물세탁 의류는 학교가 무료 세탁. 속옷·양말은 직접, 드라이클리닝은 주 1회 외부 업체 수거.'],
  ['HEALTH', '건강관리', '수업 중에는 보건실, 방과후 발병 시 사감이 인근 병원 진료에 동행. 재학생 전원 단체상해보험 가입.'],
  ['EMERGENCY', '응급상황', '사감이 즉시 병원 이송에 동행하고 담임·보호자에게 동시에 연락합니다. 매 학기 대피 훈련을 합니다.'],
  ['PARENTS', '학부모 소통', 'Thinkwave로 성적·출결 확인, 담임·기숙사 WeChat 채널로 학부모와 소통합니다.'],
];

export function CareGrid({items = CARE_ITEMS}: {items?: Array<[string, string, string]>}) {
  return (
    <div className="care-grid">
      {items.map(([k, t, d]) => (
        <div key={k}>
          <span className="k">{k}</span>
          <h4>{t}</h4>
          <p>{d}</p>
        </div>
      ))}
    </div>
  );
}

/** 학부모가 가장 먼저 묻는 기숙 핵심 5가지 */
export const KEY_BOARDING: Array<{v: string; t: string; d: string}> = [
  {v: 'G6–8 선택 · G9–12 의무', t: '누가 기숙하나요', d: '중등은 기숙·통학 선택, 고등은 전원 기숙사 생활. 초등은 통학 과정입니다.'},
  {v: '4인 1실', t: '방', d: '남·여 층 분리. 이불·베개·시트는 학교가 1인 1세트 지급합니다.'},
  {v: '20:30–23:00', t: '야간 자율학습', d: '기숙사와 분리된 자습실에서 감독 교사 지도. 고등은 두 차례 모두 참여합니다.'},
  {v: '평일 16:40–17:50', t: '휴대전화', d: '그 외 시간은 수거·보관. 주말은 토 12:00–22:30, 일 07:30–17:50.'},
  {v: '남녀 사감', t: '사감 · 응급대응', d: '야간 발병 시 사감이 응급조치 후 병원에 동행하고 담임·보호자에게 바로 연락합니다.'},
];

export function KeyBoarding() {
  return (
    <ol className="key5">
      {KEY_BOARDING.map(k => (
        <li key={k.t}>
          <span className="kicker">{k.t}</span>
          <b>{k.v}</b>
          <p>{k.d}</p>
        </li>
      ))}
    </ol>
  );
}

/** 핵심 5가지 외의 생활 규정 */
export const OTHER_CARE: Array<[string, string]> = [
  ['수업', '08:20–16:15 45분 수업 8교시. 점심 뒤 40분 Q&A 세션에서 과목 선생님에게 질문합니다.'],
  ['방과후', '18:00–19:50 SAT·AP·TOEFL·HSK 등 수준별 강좌. 학기마다 수요 조사로 개설합니다.'],
  ['식사', '학교 직영 식당에서 하루 세 끼와 월~금 저녁 간식. 방학 외 주말·공휴일에도 세 끼.'],
  ['주말', '토요일 오전 Project Creativity·동아리, 일요일 18:00–21:00 Study Hall.'],
  ['외출·외박', '보호자 동의서를 금요일 17:00까지 제출. 외출은 당일, 외박은 귀소일 17:00까지 귀소.'],
  ['세탁', '물세탁 의류는 학교 무료 세탁. 속옷·양말은 직접, 드라이클리닝은 주 1회 외부 업체.'],
  ['건강', '수업 중에는 보건실. 재학생 전원 단체상해보험(연 300위안) 가입.'],
  ['학부모 소통', 'Thinkwave로 성적·출결 확인, 담임·기숙사 WeChat으로 소통합니다.'],
];
