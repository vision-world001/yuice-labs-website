import ReactDOM from 'react-dom/client';
import { AboutPage } from './pages/AboutPage';
import { CareersPage } from './pages/CareersPage';
import { HomePage } from './pages/HomePage';
import { JobPage } from './pages/JobPage';
import { findRole } from './data/careersPage';
import './index.css';

const rootNode = document.getElementById('root');

if (!rootNode) {
  throw new Error('Root element "#root" was not found.');
}

const root = ReactDOM.createRoot(rootNode);

// Minimal path routing: a few fixed pages plus one page per open role (/careers/<role-id>).
const path = window.location.pathname.replace(/\/+$/, '') || '/';
const pages: Record<string, () => React.JSX.Element> = { '/about': AboutPage, '/careers': CareersPage };
const role = path.startsWith('/careers/') ? findRole(decodeURIComponent(path.slice('/careers/'.length))) : undefined;

if (role) {
  root.render(<JobPage role={role} />);
} else if (path.startsWith('/careers/')) {
  // Unknown or closed role: send people back to the list of openings.
  window.location.replace('/careers#open-positions');
} else {
  const Page = pages[path] ?? HomePage;
  root.render(<Page />);
}
