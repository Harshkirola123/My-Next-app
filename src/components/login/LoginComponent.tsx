"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Mail, Lock } from "lucide-react";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

import { loginSchema } from "@/validation/auth.validation";
import { LoginFormData } from "@/types/auth.types";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hook";
import { setCredentials } from "@/store/features/auth/authSlice";
import { apiFetch } from "@/lib/api/apiFetch";

export default function LoginComponents() {
  const dispatch = useAppDispatch();

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await apiFetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Login failed");
      }

      localStorage.setItem("accessToken", result.accessToken);

      dispatch(
        setCredentials({
          accessToken: result.accessToken,
          user: result.user,
        }),
      );

      // Redirect
      router.push("/dashboard");
    } catch (error) {
      console.error(error);

      alert(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 max-w-xl p-4! overflow-hidden rounded-2xl border border-[#EAEAEB] bg-white shadow-sm">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-zinc-900">Welcome Back</h1>

        <p className="mt-2 text-sm text-zinc-500">
          Login to continue to your account
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4!">
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          leftIcon={<Mail size={18} />}
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          leftIcon={<Lock size={18} />}
          error={errors.password?.message}
          {...register("password")}
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-zinc-600">
            <input type="checkbox" className="rounded border-zinc-300" />
            Remember me
          </label>

          <Link
            href="/login"
            className="font-medium text-zinc-900 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={isSubmitting}
          className="text-sm"
        >
          Login
        </Button>
      </form>

      <p className="text-center text-sm text-zinc-500">
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          className="font-semibold text-zinc-900 hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}
