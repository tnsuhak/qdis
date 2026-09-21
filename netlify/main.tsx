import React from 'react';
import {createRoot} from 'react-dom/client';
import {Site} from '../app/site';
import '../app/globals.css';

const page = window.location.pathname.split('/').filter(Boolean)[0] || 'home';
const supported = new Set(['home','about','academics','results','boarding','admissions','fees','resources','faq','contact']);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Site page={supported.has(page) ? page : 'home'} />
  </React.StrictMode>,
);
