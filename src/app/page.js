"use client"
import { ThemeSwitcher } from "@/components/tooglebtn";
import { useAuthStore } from "@/utils/authstore";
import { useState } from "react";
import Sidebar from "@/components/chatpage/sidebar";

export default function Home() {

  const [loading,setLoading]=useState(false);
  const signInwithGoogle = useAuthStore((state) => state.signInwithGoogle);
  const signUp = useAuthStore((state) => state.signUp);
  const user=useAuthStore((state)=>state.user)


  
  return (
    <main className="flex min-h-screen items-center justify-between">
      <Sidebar/>
      <ThemeSwitcher/>
    </main>
  );
}
