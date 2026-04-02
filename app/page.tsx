'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // prototype/の内容をルートで表示するため、index.htmlにリダイレクト
    window.location.replace('/index.html');
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <p>Loading...</p>
    </div>
  );
}
