"use client";
import React, { use, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/utils/authstore";
import { Button } from "../ui/button";
import ChatArray from "./chatArray";
import Link from "next/link";
import UserAvatar from "./userAvatar";
import supabase from "@/lib/supabase";
import { NotebookPen } from "lucide-react";
import useChatStore from "@/utils/chatstore";

const Sidebar = () => {
  const user = useAuthStore((state) => state.user);
  const chats = useChatStore((state) => state.chats);
  const clearChats = useChatStore((state) => state.clearChats);


  const [globalChat, setGlobalChat] = useState(null);
  const fetchChats = async () => {
    try {
      let { data: messages, error } = await supabase
        .from("messages")
        .select("*")
        .eq("user_id", user.id);
      setGlobalChat(messages);
      console.log(messages);
    } catch (e) {
      console.log(e);
    }
  };

  const handleClear = () => {
    clearChats();
  };

  useEffect(() => {
    if (user) {
      fetchChats();
    }
    console.log("hey");
  }, [user]);
  return (
    <div className="hidden md:flex  flex-col w-[250px] dark:bg-[#171717] bg-[#E2E8F0] border-r h-screen p-4 relative">
      <div className="flex justify-between">
        <div className="flex gap-2 h-fit">
          <Avatar>
            <AvatarImage src="/Images/logo.jpg" className="" alt="@shadcn" />
            <AvatarFallback>logo</AvatarFallback>
          </Avatar>
          <h1 className="my-auto text-[14px] dark:text-white text-black font-semibold">
            New chat
          </h1>
        </div>
        <button onClick={handleClear} className="w-fit my-auto">
            <NotebookPen strokeWidth={1.25} />
        </button>
      </div>
      {user && <ChatArray />}
      {user ? (
        <UserAvatar />
      ) : (
        <div className="flex absolute bottom-3 left-3 right-3 flex-col gap-y-2">
          <h2 className="text-[13px] dark:text-white font-semibold">
            {" "}
            Sign up or log in
          </h2>
          <p className="text-[13px] dark:text-[#CDCDCD]">
            Save your chat history, share chats, and personalize your
            experience.
          </p>
          <div className="flex flex-col gap-y-2">
            <Button
              className="bg-customGreen text-white text-[13px] font-semibold hover:bg-customGreen hover:opacity-75"
              asChild
            >
              <Link href={"/auth/signup"}>Sign up</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="dark:bg-[#212121] text-[13px] dark:hover:bg-[#212121] hover:bg-customGreen hover:text-white"
            >
              <Link href={"/auth/login"}>Log in</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
