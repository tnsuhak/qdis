import {useEffect, useState, type ReactNode} from 'react';
import {NAV} from '@/lib/qdis/routes';
import site from '@/data/site.json';

function Brand() {
  return (
    <a className="brand" href="/" aria-label="청도대원학교 QDIS 한국어 안내 홈">
      <span className="brand-mark" aria-hidden="true">QD</span>
      <span className="brand-text">
        <b>청도대원학교</b>
        <small>QINGDAO DAEWON INTERNATIONAL SCHOOL</small>
      </span>
    </a>
  );
}

export function Header({section}: {section?: string}) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);
  return (
    <>
      <header className="site-header">
        <div className="wrap">
          <Brand />
          <nav className="main-nav" aria-label="주 메뉴">
            {NAV.map(item => (
              <div key={item.href} className={`nav-item${section === item.section ? ' active' : ''}`}>
                <a href={item.href} aria-current={section === item.section ? 'page' : undefined}>{item.label}</a>
                {item.children && (
                  <div className="nav-drop">
                    {item.children.map(c => <a key={c.href} href={c.href}>{c.label}</a>)}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <a className="btn header-cta desk" href="/consultation">입학상담</a>
          <button className="menu-btn" type="button" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? '메뉴 닫기' : '메뉴 열기'} onClick={() => setOpen(v => !v)}>
            <span /><span /><span />
          </button>
        </div>
      </header>
      <div id="mobile-menu" className={`mobile-panel${open ? ' open' : ''}`} aria-hidden={!open}>
        {NAV.map(item => (
          <div className="group" key={item.href}>
            <a href={item.href} tabIndex={open ? 0 : -1}>{item.label}</a>
            {item.children && (
              <ul>{item.children.map(c => <li key={c.href}><a href={c.href} tabIndex={open ? 0 : -1}>{c.label}</a></li>)}</ul>
            )}
          </div>
        ))}
        <a className="btn arrow" href="/consultation" tabIndex={open ? 0 : -1}>입학상담 신청</a>
      </div>
    </>
  );
}

export function Footer() {
  const t = site.tns;
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="top">
          <div>
            <a className="brand" href="/" aria-label="홈">
              <span className="brand-mark" aria-hidden="true">QD</span>
              <span className="brand-text"><b>청도대원학교</b><small>QINGDAO DAEWON INTERNATIONAL SCHOOL</small></span>
            </a>
            <p className="tns">
              이 사이트는 <b>{t.name}</b>({t.legal})가 청도대원학교 한국 입학상담 지원을 위해 운영하는 한국어 안내 사이트입니다. 학교 공식 자료를 바탕으로 작성하며, 학교 공식 홈페이지와 별도로 운영됩니다.
            </p>
            <p className="tns">입학상담 {t.phone} · <a href={t.kakao_channel} target="_blank" rel="noopener noreferrer">카카오톡 채널</a><br />{t.address}</p>
          </div>
          <div className="cols">
            <div>
              <h4>학교</h4>
              <ul>
                <li><a href="/about">학교소개</a></li>
                <li><a href="/academics">교육과정</a></li>
                <li><a href="/sat-ap">SAT·AP 시험센터</a></li>
              </ul>
            </div>
            <div>
              <h4>대학진학</h4>
              <ul>
                <li><a href="/university-results">대학 합격 결과</a></li>
                <li><a href="/college-counseling">진학지도·특례</a></li>
              </ul>
            </div>
            <div>
              <h4>학교생활</h4>
              <ul>
                <li><a href="/boarding">기숙사</a></li>
                <li><a href="/daily-life">하루 일과</a></li>
                <li><a href="/meals">이번 주 급식</a></li>
              </ul>
            </div>
            <div>
              <h4>입학</h4>
              <ul>
                <li><a href="/tuition">학비 계산기</a></li>
                <li><a href="/scholarships">장학금</a></li>
                <li><a href="/admissions">입학 절차</a></li>
                <li><a href="/faq">자주 묻는 질문</a></li>
                <li><a href="/news">소식</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bottom">
          <span>© 2026 {t.name}. 청도대원학교 한국어 입학 정보 안내. · <a href={t.privacy_url} target="_blank" rel="noopener noreferrer">개인정보처리방침</a></span>
          <span>자료 확인일 {site.data_reviewed_on.replaceAll('-', '.')} · 학비·모집 정보는 2026–27 모집요강 기준</span>
        </div>
      </div>
    </footer>
  );
}

export function Dock() {
  return (
    <nav className="dock" aria-label="빠른 메뉴">
      <a href="/admissions">입학안내</a>
      <a href="/tuition">학비</a>
      <a className="primary" href="/consultation">상담</a>
    </nav>
  );
}

export function Layout({section, children}: {section?: string; children: ReactNode}) {
  return (
    <>
      <a className="skip" href="#main">본문으로 건너뛰기</a>
      <Header section={section} />
      <main id="main">{children}</main>
      <Footer />
      <Dock />
    </>
  );
}
