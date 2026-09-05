// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <main style={{ textAlign: 'center', padding: '4rem' }}>
      <h1>404 - Page Not Found</h1>
      <p>Could not find the requested resource.</p>
      <Link href="/">Return to Home</Link>
    </main>
  );
}