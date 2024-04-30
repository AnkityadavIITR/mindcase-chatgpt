"use client"
import { ThemeSwitcher } from "@/components/tooglebtn";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useAuthStore } from "@/utils/authstore";
import { useState } from "react";

export default function Home() {

  const [loading,setLoading]=useState(false);
  const signInwithGoogle = useAuthStore((state) => state.signInwithGoogle);
  const signUp = useAuthStore((state) => state.signUp);
  const user=useAuthStore((state)=>state.user)
  // console.log(user);

  const handleClick=async()=>{
    await signInwithGoogle(setLoading);
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ThemeSwitcher/>
      <Button variant="outline" disabled={loading} onClick={handleClick} >sign in with google</Button>
    </main>
  );
}
