"use client";

import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "@/store/features/auth/authSlice";
import Button from "@/components/ui/Button";
import { apiFetch } from "@/lib/api/apiFetch";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await apiFetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      localStorage.removeItem("accessToken");

      dispatch(logout());

      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button type="submit" variant="primary" fullWidth onClick={handleLogout}>
      Logout
    </Button>
  );
}
