import {renderToString} from 'react-dom/server';
import {App} from './App';
export {ROUTES, NOT_FOUND, routeFor} from '@/lib/qdis/routes';
export function render(path: string) {
  return renderToString(<App path={path} />);
}
export {PHOTOS} from '@/lib/qdis/photos';
