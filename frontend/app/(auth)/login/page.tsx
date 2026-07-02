"use client";

import { FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/app/api/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [validationError, setValidationError] = useState("");
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
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit" disabled={loginMutation.isPending}>
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </button>
      </form>
      {validationError && <p>{validationError}</p>}
      {loginMutation.isError && <p>Invalid email or password.</p>}
    </div>
  );
}
