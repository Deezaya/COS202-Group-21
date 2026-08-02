import React, { useState } from 'react';
import { LogIn, AlertCircle, Mail, Lock } from 'lucide-react';
import { loginAccount, ApiError } from '../services/api';

interface LoginViewProps {
  onAuthenticated: (token: string) => void;
  onNavigateToSignup: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onAuthenticated, onNavigateToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { token } = await loginAccount(email, password);
      onAuthenticated(token);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-6 sm:py-12">
      <div className="bg-white border border-[#E5E5E5] rounded-3xl shadow-warm p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[#FFE4E6] text-[#E11D48] flex items-center justify-center mx-auto">
            <LogIn className="w-7 h-7" />
          </div>
          <h1 className="font-display font-extrabold text-2xl text-[#18181B]">Welcome Back</h1>
          <p className="text-xs text-[#52525B] font-body">
            Sign in to save vendors, leave reviews, and manage your listings.
          </p>
        </div>

        {error && (
          <div className="flex items-start gap-2 bg-[#FEF2F2] border border-[#FECACA] text-[#B91C1C] text-xs font-body p-3 rounded-xl">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-[#18181B] block mb-1 font-display">Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="you@student.unilag.edu.ng"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#E5E5E5] rounded-xl text-xs text-[#18181B] focus:outline-none focus:border-[#E11D48]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#18181B] block mb-1 font-display">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#E5E5E5] rounded-xl text-xs text-[#18181B] focus:outline-none focus:border-[#E11D48]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#E11D48] hover:bg-[#BE123C] disabled:opacity-60 disabled:cursor-not-allowed text-white font-display font-extrabold text-sm py-3 rounded-2xl shadow-md transition"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="text-xs text-center text-[#52525B] font-body">
          New to UniVendor?{' '}
          <button onClick={onNavigateToSignup} className="font-bold text-[#E11D48] hover:underline">
            Create an account
          </button>
        </p>
      </div>
    </div>
  );
};
