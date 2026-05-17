import { ReactNode } from "react";

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="flex min-h-screen w-full overflow-hidden max-w-360 mx-auto bg-white">
      {children}
    </div>
  );
}
