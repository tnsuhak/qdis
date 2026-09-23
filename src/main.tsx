import {hydrateRoot, createRoot} from 'react-dom/client';
import {App} from './App';
import './styles.css';

const el = document.getElementById('root')!;
const path = (window as any).__QDIS_PATH__ ?? window.location.pathname;
if (el.hasChildNodes()) hydrateRoot(el, <App path={path} />);
else createRoot(el).render(<App path={path} />);
