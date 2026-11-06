import React, { Suspense, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { useReducedMotion } from './components.jsx';
import { pages, homePage, retiredSlugs, SITE_URL } from './pages.js';
import './styles.css';
import './react.css';

const absolute = path => new URL(path, SITE_URL).href;

function setMeta(attr, key, content) {
  let tag = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) { tag = document.createElement('meta'); tag.setAttribute(attr, key); document.head.append(tag); }
  tag.content = content;
}

// Per-page SEO: canonical, Open Graph, Twitter, and schema.org JSON-LD.
// JSON-LD is written with textContent (never raw HTML). Site-wide Person/WebSite live in index.html.
function applySeo(page) {
  const url = absolute(page.path);
  const image = absolute(page.image || homePage.image);
  document.title = page.title;
  setMeta('name', 'description', page.description);
  setMeta('property', 'og:title', page.title);
  setMeta('property', 'og:description', page.description);
  setMeta('property', 'og:url', url);
  setMeta('property', 'og:image', image);
  setMeta('property', 'og:type', page.slug ? 'article' : 'website');
  setMeta('name', 'twitter:title', page.title);
  setMeta('name', 'twitter:description', page.description);
  setMeta('name', 'twitter:image', image);
  let canonical = document.head.querySelector('link[rel="canonical"]');
  if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.append(canonical); }
  canonical.href = url;

  document.getElementById('page-ld')?.remove();
  if (!page.slug) return;
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = 'page-ld';
  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CreativeWork',
        '@id': `${url}#case-study`,
        name: `${page.name} case study`,
        headline: page.title,
        description: page.description,
        url,
        image,
        keywords: page.keywords.join(', '),
        inLanguage: 'en',
        author: { '@id': `${SITE_URL}/#person` },
        creator: { '@id': `${SITE_URL}/#person` },
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@type': 'WebApplication', name: page.name, url: page.liveUrl, applicationCategory: 'WebApplication', operatingSystem: 'Web' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Work', item: `${SITE_URL}/#work` },
          { '@type': 'ListItem', position: 3, name: page.name, item: url },
        ],
      },
    ],
  });
  document.head.append(script);
}

function Page({ page }) {
  const { Component } = page;
  const location = useLocation();
  const reduced = useReducedMotion();
  useEffect(() => {
    applySeo(page);
    const main = document.getElementById('main');
    main?.setAttribute('tabindex', '-1');
    const targets = document.querySelectorAll('.reveal, .section:not(.hero), .case-hero, .case-snapshot, .case-cover, .case-section, .case-nav, .hire-card, .snapshot-card, .toolbox-card, .skills-grid span, .process-grid article, .insight-card, .ai-card, .process-shot, .final-screen, .case-meta div');
    const observer = !reduced && 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.12 }) : null;
    targets.forEach((item, index) => {
      item.classList.add('reveal');
      item.style.setProperty('--reveal-delay', `${Math.min((index % 6) * 55, 275)}ms`);
      if (observer) observer.observe(item);
      else item.classList.add('is-visible');
    });
    return () => observer?.disconnect();
  }, [page, reduced]);

  useEffect(() => {
    if (location.hash) {
      const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      target?.scrollIntoView({ behavior: 'instant' });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location.key]);
  return <Component />;
}

function NotFound() {
  useEffect(() => { document.title = 'Page not found | Espedro Neptune'; }, []);
  return <main id="main" className="section not-found">
    <p className="section-kicker">404</p>
    <h1>This page moved or no longer exists.</h1>
    <p>The case study you are looking for may have been retired. The current work is one click away.</p>
    <Link className="button primary" to="/#work">See current case studies</Link>
  </main>;
}

function App() {
  const location = useLocation();
  useEffect(() => {
    const update = () => {
      const links = [...document.querySelectorAll('.topnav a[href*="#"]')];
      const current = location.pathname === '/' || location.pathname === '/index.html'
        ? links.map(link => document.getElementById(link.hash.slice(1))).filter(Boolean).filter(section => section.getBoundingClientRect().top <= 120).pop()?.id
        : null;
      links.forEach(link => {
        const active = Boolean(current && link.hash === `#${current}`);
        link.classList.toggle('is-active', active);
        if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, [location.pathname]);
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Header />
    <Suspense fallback={<main id="main" className="section page-loading" aria-busy="true">Loading...</main>}>
      <Routes>
        {pages.map(page => <Route key={page.path} path={page.path} element={<Page key={page.path} page={page} />} />)}
        <Route path="/index.html" element={<Page page={homePage} />} />
        {retiredSlugs.map(slug => <Route key={slug} path={`/case-studies/${slug}.html`} element={<Navigate to="/#work" replace />} />)}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
    <Footer />
  </>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><BrowserRouter><App /></BrowserRouter></React.StrictMode>);
