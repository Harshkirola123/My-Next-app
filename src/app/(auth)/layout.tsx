// import { getCurrentUser } from "@/lib/api/get-user";
import { ReactNode } from "react";
interface AuthLayoutProps {
  children: ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  // const user = await getCurrentUser();

  // console.log(user);

  return (
    <div className="flex min-h-screen w-full overflow-hidden max-w-360 mx-auto bg-white">
      {children}
    </div>
  );
}
