'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';

function RevealSection({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add('active'); },
      { threshold: 0.1 }
    );
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);
  return <div ref={ref} className="reveal">{children}</div>;
}

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('http://localhost:5000/api/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMessage('Thanks for subscribing!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong');
      }
    } catch {
      setStatus('error');
      setMessage('Could not connect to server');
    }
  };

  return (
    <section className="py-section-gap border-t border-outline-variant/30">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center">
        <RevealSection>
          <div className="max-w-2xl mx-auto">
            <span className="material-symbols-outlined text-4xl mb-6 inline-block">mail</span>
            <h3 className="font-headline-md text-headline-md mb-4">Join the Circle</h3>
            <p className="font-body-md text-body-md mb-12 text-on-surface-variant">
              Receive exclusive previews of new collections and invitations to private trunk shows.
            </p>
            <form className="flex flex-col md:flex-row gap-4 items-center justify-center" onSubmit={handleSubmit}>
              <input
                className="w-full md:w-96 bg-transparent border-0 border-b border-primary py-4 px-0 font-body-md focus:ring-0 focus:border-primary-container transition-all outline-none"
                placeholder="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                className="w-full md:w-auto bg-primary text-on-primary px-12 py-4 font-label-caps text-label-caps uppercase tracking-widest hover:bg-neutral-800 transition-all disabled:opacity-50"
                type="submit"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Sending...' : 'Subscribe'}
              </button>
            </form>
            {status === 'success' && (
              <p className="mt-4 text-sm text-green-700">{message}</p>
            )}
            {status === 'error' && (
              <p className="mt-4 text-sm text-red-600">{message}</p>
            )}
            <p className="mt-6 text-[11px] text-outline tracking-wider font-label-caps uppercase">
              By subscribing you agree to our Privacy Policy
            </p>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
