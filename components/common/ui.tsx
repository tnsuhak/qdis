import type {ReactNode} from 'react';
import {photo as getPhoto, type Photo} from '@/lib/qdis/photos';

export function Img({id, className, ratio, priority, caption, sizes}: {id: string; className?: string; ratio?: '4x3' | '3x2' | '16x9' | '4x5' | '21x9'; priority?: boolean; caption?: boolean; sizes?: string}) {
  const p: Photo = getPhoto(id);
  return (
    <figure className={`photo ${ratio ? `r-${ratio}` : ''} ${className ?? ''}`} style={{margin: 0}}>
      <img
        src={p.src}
        data-fallback={p.fallback}
        alt={p.alt}
        width={p.width}
        height={p.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        sizes={sizes}
        style={p.position ? {objectPosition: p.position} : undefined}
        fetchPriority={priority ? 'high' : undefined}
      />
      {caption && <figcaption className="sr-only">{p.alt} · 사진 {p.credit}</figcaption>}
    </figure>
  );
}

export function SecHead({no, eyebrow, title, lede, action, id}: {no?: string; eyebrow: string; title: ReactNode; lede?: ReactNode; action?: ReactNode; id?: string}) {
  return (
    <div className="sec-head">
      <div>
        {no && <span className="sec-no">{no}</span>}
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="h2" id={id}>{title}</h2>
        {lede && <p className="lede">{lede}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

export function Source({children, href, label = '자료 출처'}: {children: ReactNode; href?: string; label?: string}) {
  const visibleHref = href && !/^https?:\/\/(?:www\.)?qdis\.org\//i.test(href) ? href : undefined;
  return (
    <p className="source">
      {label}: {children}
      {visibleHref && <> · <a href={visibleHref} target="_blank" rel="noopener noreferrer">원문</a></>}
    </p>
  );
}

export function TLink({href, children, light}: {href: string; children: ReactNode; light?: boolean}) {
  return <a className={`tlink${light ? ' light' : ''}`} href={href}>{children}</a>;
}

export function PageHead({eyebrow, title, lede, crumb, photoId, children}: {eyebrow: string; title: ReactNode; lede?: ReactNode; crumb: string; photoId?: string; children?: ReactNode}) {
  const p = photoId ? getPhoto(photoId) : null;
  return (
    <header className={`page-head${p ? ' has-photo' : ''}`}>
      {p && <div className="bg" aria-hidden="true"><img src={p.src} alt="" style={p.position ? {objectPosition: p.position} : undefined} /></div>}
      <div className="wrap">
        <nav className="crumbs" aria-label="현재 위치"><a href="/">홈</a><span aria-hidden="true">/</span><span>{crumb}</span></nav>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {lede && <p className="lede">{lede}</p>}
        {children}
      </div>
    </header>
  );
}

export function Toc({items}: {items: Array<[string, string]>}) {
  return (
    <nav className="page-toc" aria-label="이 페이지의 내용">
      <div className="wrap">{items.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</div>
    </nav>
  );
}

export function CtaBand({title, text, primary = {href: '/consultation', label: '입학상담'}, secondary}: {title: ReactNode; text?: ReactNode; primary?: {href: string; label: string}; secondary?: {href: string; label: string}}) {
  return (
    <section className="cta-band" aria-label="상담 안내">
      <div className="wrap">
        <div>
          <h2>{title}</h2>
          {text && <p>{text}</p>}
        </div>
        <div className="actions">
          {secondary && <a className="btn ghost-light" href={secondary.href}>{secondary.label}</a>}
          <a className="btn light arrow" href={primary.href}>{primary.label}</a>
        </div>
      </div>
    </section>
  );
}

