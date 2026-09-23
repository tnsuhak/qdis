import {useEffect, useState, type FormEvent} from 'react';
import site from '@/data/site.json';

const FORM = 'qdis-consultation';

/** Netlify Forms로 접수되는 TNS 입학상담 신청 */
export function ConsultForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const [grade, setGrade] = useState('');
  const [program, setProgram] = useState('');
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (p.get('grade')) setGrade(`G${p.get('grade')}`);
    if (p.get('program')) setProgram(p.get('program')!);
  }, []);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus('sending');
    try {
      const body = new URLSearchParams(data as any).toString();
      const r = await fetch('/', {method: 'POST', headers: {'Content-Type': 'application/x-www-form-urlencoded'}, body});
      if (!r.ok) throw new Error(String(r.status));
      setStatus('ok');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'ok') {
    return (
      <div className="consult-form">
        <div className="ok">
          <b>상담 신청이 접수되었습니다.</b>
          <p style={{marginTop: 6}}>TNS 상담팀이 남겨 주신 연락처로 연락드리겠습니다. 급한 문의는 카카오톡 채널이나 {site.tns.phone}로 연락해 주세요.</p>
        </div>
      </div>
    );
  }

  return (
    <form className="consult-form" name={FORM} method="POST" data-netlify="true" netlify-honeypot="company" onSubmit={submit} action="/consultation?sent=1">
      <input type="hidden" name="form-name" value={FORM} />
      <p className="sr-only"><label>회사명(입력하지 마세요) <input name="company" tabIndex={-1} autoComplete="off" /></label></p>
      <div className="grid">
        <div className="field"><label htmlFor="c-name">학부모 성함 *</label><input id="c-name" name="name" type="text" required autoComplete="name" /></div>
        <div className="field"><label htmlFor="c-phone">연락처 *</label><input id="c-phone" name="phone" type="tel" required autoComplete="tel" placeholder="010-0000-0000" /></div>
        <div className="field full"><label htmlFor="c-email">이메일</label><input id="c-email" name="email" type="email" autoComplete="email" /></div>
        <div className="field">
          <label htmlFor="c-grade">입학 희망 학년</label>
          <select id="c-grade" name="grade" value={grade} onChange={e => setGrade(e.target.value)}>
            <option value="">선택</option>
            {Array.from({length: 12}, (_, i) => <option key={i} value={`G${i + 1}`}>G{i + 1}</option>)}
            <option value="미정">아직 모르겠어요</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="c-when">입학 희망 시기</label>
          <select id="c-when" name="when" defaultValue="">
            <option value="">선택</option>
            <option>2027년 3월 (2학기)</option>
            <option>2027년 9월 (1학기)</option>
            <option>2028년 이후</option>
            <option>정보 수집 중</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="c-program">관심 과정</label>
          <select id="c-program" name="program" value={program} onChange={e => setProgram(e.target.value)}>
            <option value="">선택</option>
            <option value="GLP">GLP 국제반 (한국·해외 대학)</option>
            <option value="CLP">CLP 중국유학반 (중국 대학)</option>
            <option value="미정">상담 후 결정</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="c-now">현재 상황</label>
          <select id="c-now" name="current" defaultValue="">
            <option value="">선택</option>
            <option>한국 거주 · 학생 혼자 유학</option>
            <option>중국 거주 (주재원·사업)</option>
            <option>제3국 거주 · 귀국 예정</option>
            <option>기타</option>
          </select>
        </div>
        <div className="field full"><label htmlFor="c-msg">궁금한 점</label><textarea id="c-msg" name="message" placeholder="예: 3년 특례 자격 여부, 영어 준비 수준, 기숙사 생활, 학교 방문 투어 등" /></div>
        <label className="agree full"><input type="checkbox" name="privacy" value="동의" required /> <span>상담을 위한 개인정보(성함·연락처·이메일·상담 내용) 수집·이용에 동의합니다. 수집한 정보는 입학상담 외의 목적으로 사용하지 않습니다. <a href={site.tns.privacy_url} target="_blank" rel="noopener noreferrer">개인정보처리방침</a></span></label>
        <div className="full">
          <button className="btn arrow" type="submit" disabled={status === 'sending'}>{status === 'sending' ? '보내는 중…' : '상담 신청하기'}</button>
          {status === 'error' && <p className="small" style={{color: 'var(--red)', marginTop: 10}}>전송에 실패했습니다. 잠시 후 다시 시도하시거나 카카오톡 채널로 문의해 주세요.</p>}
        </div>
      </div>
    </form>
  );
}

export function Channels() {
  const t = site.tns;
  return (
    <div className="contact-cards" aria-label="TNS 상담 채널">
      <a className="contact-card primary kakao" href={t.kakao_channel} target="_blank" rel="noopener noreferrer">
        <span className="contact-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M12 4C6.9 4 3 7.1 3 10.9c0 2.5 1.7 4.7 4.3 5.9L6.5 20l3.8-2.2c.6.1 1.1.2 1.7.2 5.1 0 9-3.1 9-7.1S17.1 4 12 4Z"/></svg>
        </span>
        <span className="contact-copy">
          <small>가장 빠른 상담</small>
          <b>카카오톡 1:1 상담</b>
          <span>성적표·서류 사진도 바로 보내주세요</span>
        </span>
        <span className="contact-arrow" aria-hidden="true">→</span>
      </a>

      <a className="contact-card phone" href={t.phone_href}>
        <span className="contact-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M7.1 3.8 9.4 8 7.9 9.5c1 2 2.6 3.6 4.6 4.6l1.5-1.5 4.2 2.3-.6 3.1c-.2 1-1.1 1.7-2.1 1.7C9.2 19.7 4.3 14.8 4.3 8.5c0-1 .7-1.9 1.7-2.1l1.1-2.6Z"/></svg>
        </span>
        <span className="contact-copy">
          <small>전화 상담</small>
          <b>{t.phone}</b>
          <span>TNS Worldwide 서울 강남</span>
        </span>
        <span className="contact-arrow" aria-hidden="true">→</span>
      </a>

      <a className="contact-card openchat" href={t.kakao_openchat} target="_blank" rel="noopener noreferrer">
        <span className="contact-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M5 5h14v10H9l-4 4V5Zm4 4h6v2H9V9Z"/></svg>
        </span>
        <span className="contact-copy">
          <small>간단한 문의</small>
          <b>TNS 오픈채팅</b>
          <span>중국 국제학교·청도대원 입학 질문</span>
        </span>
        <span className="contact-arrow" aria-hidden="true">→</span>
      </a>

      <a className="contact-card cafe" href={t.cafe} target="_blank" rel="noopener noreferrer">
        <span className="contact-icon text-icon" aria-hidden="true">N</span>
        <span className="contact-copy">
          <small>후기·정보</small>
          <b>네이버 카페 TNS유학</b>
          <span>조기유학 후기와 설명회 소식 확인</span>
        </span>
        <span className="contact-arrow" aria-hidden="true">→</span>
      </a>
    </div>
  );
}
