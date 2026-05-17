// components/ui/Button.tsx

import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant =
  | "default"
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "success";

type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const buttonVariants: Record<ButtonVariant, string> = {
  default: "bg-zinc-900 text-white hover:bg-zinc-800 active:bg-zinc-950",

  primary: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",

  secondary: "bg-white text-zinc-900 active:bg-white disabled:bg-zinc-900",

  outline: "border border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-100",

  ghost: "bg-transparent text-zinc-900 hover:bg-zinc-100",

  danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",

  success: "bg-green-600 text-white hover:bg-green-700 active:bg-green-800",
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm rounded-sm",
  md: "h-11 px-4 text-sm rounded-sm",
  lg: "h-12 px-6 text-base rounded-sm",
  icon: "h-11 w-11 rounded-sm",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = "default",
      size = "md",
      loading = false,
      disabled,
      leftIcon,
      rightIcon,
      fullWidth = false,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium transition-all outline-none",
          "disabled:pointer-events-none disabled:opacity-50",
          "focus-visible:ring-2 focus-visible:ring-zinc-300",
          buttonVariants[variant],
          buttonSizes[size],
          fullWidth && "w-full",
          className,
        )}
        {...props}
      >
        {loading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          leftIcon
        )}

        {children}

        {!loading && rightIcon}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
