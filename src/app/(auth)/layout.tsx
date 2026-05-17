import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen w-full overflow-hidden max-w-360 mx-auto bg-white">
      {children}
    </div>
  );
}
