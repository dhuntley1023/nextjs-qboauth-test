'use client';

import { redirect } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleConnect = () => {
    redirect('/api/auth/connect');
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1>QuickBooks Integration</h1>
      <button onClick={handleConnect}>
        Connect to QuickBooks
      </button>
    </main>
  );
}