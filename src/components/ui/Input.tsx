import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      containerClassName,
      type = "text",
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const isPassword = type === "password";

    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className={cn("w-full flex flex-col gap-2", containerClassName)}>
        {label && (
          <label className="text-sm font-medium text-zinc-700">{label}</label>
        )}

        <div
          className={cn(
            "flex gap-2 h-9 w-full items-center rounded-sm border bg-white transition-all p-3!",
            error
              ? "border-red-500 focus-within:ring-2 focus-within:ring-red-200"
              : "border-zinc-300 focus-within:border-black focus-within:ring-2 focus-within:ring-zinc-200",
            disabled && "cursor-not-allowed opacity-60",
          )}
        >
          {leftIcon && leftIcon}

          <input
            ref={ref}
            type={inputType}
            disabled={disabled}
            className={cn(
              "flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-zinc-400 disabled:cursor-not-allowed",
              className,
            )}
            {...props}
          />

          {isPassword ? (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword((prev) => !prev)}
              className="pr-3 text-zinc-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          ) : (
            rightIcon && rightIcon
          )}
        </div>

        {error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : hint ? (
          <p className="text-sm text-zinc-500">{hint}</p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
