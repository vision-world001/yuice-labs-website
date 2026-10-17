import ReactDOM from 'react-dom/client';
import { AboutPage } from './pages/AboutPage';
import { CareersPage } from './pages/CareersPage';
import { HomePage } from './pages/HomePage';
import './index.css';

const rootNode = document.getElementById('root');

if (!rootNode) {
  throw new Error('Root element "#root" was not found.');
}

const root = ReactDOM.createRoot(rootNode);

// Minimal path routing: one extra page, so no router dependency is needed.
const path = window.location.pathname.replace(/\/+$/, '') || '/';
const pages: Record<string, () => React.JSX.Element> = { '/about': AboutPage, '/careers': CareersPage };
const Page = pages[path] ?? HomePage;
root.render(<Page />);
