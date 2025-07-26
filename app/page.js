'use client'

import { authenticate } from './actions/authenticate';
import { redirect, RedirectType } from 'next/navigation';

export default function Root() {
  const handleConnect = async () => {
    //const authUrl = await authenticate();
    redirect(await authenticate(), RedirectType.push);
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1>QuickBooks Integration</h1>
      <button className='bg-white text-black' onClick={handleConnect}>
        Connect to QuickBooks
      </button>
    </main>
  );
}