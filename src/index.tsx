import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import { SiteLayout } from './layouts/SiteLayout';
import { ABOUT_PAGE_ENABLED } from './lib/features';
import { AboutPage } from './pages/AboutPage';
import { CareersPage } from './pages/CareersPage';
import { HomePage } from './pages/HomePage';
import { JobRoute } from './pages/JobPage';
import './index.css';

const rootNode = document.getElementById('root');

if (!rootNode) {
  throw new Error('Root element "#root" was not found.');
}

// Every page renders inside SiteLayout (header, footer, scroll handling) via its <Outlet />.
const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    children: [
      { index: true, element: <HomePage /> },
      ...(ABOUT_PAGE_ENABLED ? [{ path: 'about', element: <AboutPage /> }] : []),
      { path: 'careers', element: <CareersPage /> },
      { path: 'careers/:roleId', element: <JobRoute /> },
      // Unknown addresses fall back to the home page.
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);

ReactDOM.createRoot(rootNode).render(<RouterProvider router={router} />);
