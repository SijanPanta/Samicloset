'use client';

import { useState, FormEvent } from 'react';
import api from '@/lib/api';
import RevealSection from './RevealSection';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await api.post('/subscribers', { email });
      setStatus('success');
      setMessage('Thanks for subscribing!');
      setEmail('');
    } catch (err: unknown) {
      setStatus('error');
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { error?: string } } };
        setMessage(axiosErr.response?.data?.error || 'Something went wrong');
      } else {
        setMessage('Could not connect to server');
      }
    }
  };

  return (
    <section className="py-section-gap border-t border-outline-variant/30">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center">
        <RevealSection>
          <div className="max-w-2xl mx-auto">
            <span className="material-symbols-outlined text-4xl mb-6 inline-block text-on-surface">mail</span>
            <h3 className="font-headline-md text-headline-md mb-4">Join the Circle</h3>
            <p className="font-body-md text-body-md mb-12 text-on-surface-variant">
              Receive exclusive previews of new collections and invitations to private trunk shows.
            </p>
            <form className="flex flex-col md:flex-row gap-4 items-center justify-center" onSubmit={handleSubmit}>
              <div className="relative w-full md:w-96">
                <input
                  className={`w-full bg-transparent border-0 border-b py-4 px-0 font-body-md focus:ring-0 transition-all outline-none text-on-surface ${
                    status === 'error' ? 'border-error' : 'border-primary'
                  } ${status === 'success' ? 'border-green-700' : ''}`}
                  placeholder="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button
                className="w-full md:w-auto bg-primary text-on-primary px-12 py-4 font-label-caps text-label-caps uppercase tracking-widest hover:bg-neutral-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                type="submit"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>
            {status === 'success' && (
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-green-700">
                <span className="material-symbols-outlined text-base">check_circle</span>
                {message}
              </div>
            )}
            {status === 'error' && (
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-error">
                <span className="material-symbols-outlined text-base">error</span>
                {message}
              </div>
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
