import site from '@/data/site.json';

export function Channels() {
  const t = site.tns;
  return (
    <div className="contact-cards" aria-label="TNS 상담 채널">
      <a className="contact-card kakao" href={t.kakao_channel} target="_blank" rel="noopener noreferrer">
        <span className="contact-icon" aria-hidden="true">💬</span>
        <b>카카오톡 1:1 상담</b>
        <small>1:1 실시간 문의</small>
      </a>
      <a className="contact-card phone" href={t.phone_href}>
        <span className="contact-icon" aria-hidden="true">📞</span>
        <b>전화 상담</b>
        <small>{t.phone}</small>
      </a>
      <a className="contact-card openchat" href={t.kakao_openchat} target="_blank" rel="noopener noreferrer">
        <span className="contact-icon" aria-hidden="true">💬</span>
        <b>중국 글로벌 오픈채팅</b>
        <small>{t.kakao_openchat_members}</small>
      </a>
      <a className="contact-card cafe" href={t.cafe} target="_blank" rel="noopener noreferrer">
        <span className="contact-icon naver" aria-hidden="true">N</span>
        <b>네이버 유학카페</b>
        <small>{t.cafe_members}</small>
      </a>
    </div>
  );
}
