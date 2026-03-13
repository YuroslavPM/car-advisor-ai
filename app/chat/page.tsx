'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ChatIndexPage() {
  const router = useRouter();

  useEffect(() => {
    // Just generate an ID and redirect — no localStorage write yet.
    // The session is only persisted once the first message is sent.
    router.replace(`/chat/${crypto.randomUUID()}`);
  }, [router]);

  return null;
}
