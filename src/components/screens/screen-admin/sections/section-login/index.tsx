import { FormEvent, useCallback, useState } from 'react';

import { signIn } from '../../../../../apis/admin';
import BrandLogo from '../../../../_commons/brand-logo';

const SectionLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setBusy(true);
      setError('');
      try {
        await signIn(email.trim(), password);
        // Success: the auth listener in the admin shell swaps the view.
      } catch (e) {
        setError(
          e instanceof Error && e.message === 'Invalid login credentials'
            ? 'Wrong email or password.'
            : e instanceof Error
              ? e.message
              : 'Sign-in failed.'
        );
      } finally {
        setBusy(false);
      }
    },
    [email, password]
  );

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col justify-center items-center px-6">
      <form
        className="card-premium w-full max-w-[400px] p-8 gap-y-5 flex flex-col justify-start items-stretch"
        onSubmit={onSubmit}
      >
        <div className="self-center">
          <BrandLogo height={64} />
        </div>
        <h1 className="text-xl font-semibold text-text-main text-center">
          Content Manager
        </h1>
        <label className="gap-y-1.5 flex flex-col">
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
            Email
          </span>
          <input
            className="w-full rounded-lg border border-sep-light px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            required
          />
        </label>
        <label className="gap-y-1.5 flex flex-col">
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
            Password
          </span>
          <input
            className="w-full rounded-lg border border-sep-light px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </label>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          className="btn-caas disabled:opacity-60"
          type="submit"
          disabled={busy}
        >
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
        <p className="text-xs text-title-pale text-center">
          Accounts are created by your administrator in the Supabase dashboard
          (Authentication → Users).
        </p>
      </form>
    </div>
  );
};

export default SectionLogin;
