import { Link } from 'react-router';

export function Brand() {
  return (
    <Link className="brand" to="/" aria-label="Yuice Labs home">
      <img className="brand-mark" src="/yuice-mark.png" alt="" />
      <span>Yuice Labs</span>
    </Link>
  );
}
