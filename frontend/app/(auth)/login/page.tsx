"use client";

import { FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/app/api/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [validationError, setValidationError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
  });
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidationError("");
    loginMutation.reset();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    if (typeof email !== "string" || typeof password !== "string") {
      setValidationError("Please provide both email and password.");
      return;
    }

    try {
      await loginMutation.mutateAsync({ email, password });
      router.push("/");
    } catch {
      // Error UI is rendered from mutation state below.
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center px-margin-mobile md:px-margin-desktop">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="font-headline-md text-headline-md text-on-surface mb-3">Welcome Back</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Sign in to your Samiksha Closet account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label htmlFor="email" className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant block mb-3">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full bg-transparent border-0 border-b border-outline-variant py-4 px-0 font-body-md focus:ring-0 focus:border-primary transition-all outline-none text-on-surface placeholder:text-outline/50"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant block mb-3">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                required
                className="w-full bg-transparent border-0 border-b border-outline-variant py-4 pr-10 px-0 font-body-md focus:ring-0 focus:border-primary transition-all outline-none text-on-surface placeholder:text-outline/50"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <span className="material-symbols-outlined text-lg">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          {validationError && (
            <div className="flex items-center gap-2 font-body-md text-sm text-error">
              <span className="material-symbols-outlined text-base">error</span>
              {validationError}
            </div>
          )}
          {loginMutation.isError && (
            <div className="flex items-center gap-2 font-body-md text-sm text-error">
              <span className="material-symbols-outlined text-base">error</span>
              Invalid email or password.
            </div>
          )}

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full bg-primary text-on-primary py-5 font-label-caps text-label-caps uppercase tracking-widest hover:bg-neutral-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-3"
          >
            {loginMutation.isPending ? (
              <>
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="mt-8 text-center font-body-md text-sm text-on-surface-variant">
          Don&apos;t have an account?{" "}
          <a href="/register" className="underline hover:text-on-surface transition-colors font-medium">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
}
