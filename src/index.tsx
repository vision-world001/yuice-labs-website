import ReactDOM from 'react-dom/client';
import { HomePage } from './pages/HomePage';
import './index.css';

const rootNode = document.getElementById('root');

if (!rootNode) {
  throw new Error('Root element "#root" was not found.');
}

const root = ReactDOM.createRoot(rootNode);

root.render(<HomePage />);
