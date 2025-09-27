import Head from 'next/head';
import { useEffect, useState } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000';

type HealthResponse = {
  status: string;
};

type PingResponse = {
  message: string;
};

export default function Home() {
  const [health, setHealth] = useState<string>('unknown');
  const [ping, setPing] = useState<string>('pending');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const healthRes = await fetch(`${API_BASE_URL}/health`);
        if (!healthRes.ok) {
          throw new Error(`health request failed (${healthRes.status})`);
        }
        const healthJson = (await healthRes.json()) as HealthResponse;
        setHealth(healthJson.status);

        const pingRes = await fetch(`${API_BASE_URL}/api/v1/ping`);
        if (!pingRes.ok) {
          throw new Error(`ping request failed (${pingRes.status})`);
        }
        const pingJson = (await pingRes.json()) as PingResponse;
        setPing(pingJson.message);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unexpected error');
      }
    };

    fetchStatus();
  }, []);

  return (
    <>
      <Head>
        <title>Life Plan Dashboard</title>
      </Head>
      <main>
        <h1>ライフプラン アプリ (仮)</h1>
        <p>バックエンドとの接続状態を確認できます。</p>
        <section>
          <h2>API Status</h2>
          <ul>
            <li>Health: {health}</li>
            <li>Ping: {ping}</li>
          </ul>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </section>
      </main>
    </>
  );
}
