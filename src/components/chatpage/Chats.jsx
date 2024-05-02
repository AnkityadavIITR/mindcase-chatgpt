"use client";
import React from "react";
import { useAuthStore } from "@/utils/authstore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

const Chats = ({ chats, loading }) => {
  const user = useAuthStore((state) => state.user);
  console.log(chats);
  console.log(user);

  return (
    <div className="flex flex-col gap-y-8 mx-auto  mt-[60px]">
      {chats?.map((chat) => {
        if (chat.role == "user") {
          return (
            <div className="flex gap-x-5 w-[700px] " key={chat}>
              <Avatar>
                <AvatarImage
                  src={user?.user_metadata.avatar_url}
                  className=""
                  alt="@shadcn"
                />
                <AvatarFallback>logo</AvatarFallback>
              </Avatar>
              <h1 className="max-w-[650px] my-auto">{chat?.parts[0]?.text}</h1>
            </div>
          );
        } else {
          return (
            <div className="flex gap-x-5 w-[700px]" key={chat}>
              <Avatar>
                <AvatarImage
                  src={"/Images/logo.jpg"}
                  className=""
                  alt="@shadcn"
                />
                <AvatarFallback>logo</AvatarFallback>
              </Avatar>
              <h1 className="max-w-[650px] my-auto">{chat.parts[0].text}</h1>
            </div>
          );
        }
      })}
      {loading ? (
        <div className="flex gap-x-5 w-[600px]">
          <Avatar>
            <AvatarImage src={"/Images/logo.jpg"} className="" alt="@shadcn" />
            <AvatarFallback>logo</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-y-2">
            <Skeleton className="h-6 w-[500px] dark:bg-[#282727] bg-[#d7e0eb]" />
            <Skeleton className="h-6 w-[500px] dark:bg-[#282727] bg-[#d7e0eb]" />
            <Skeleton className="h-6 w-[500px] dark:bg-[#282727] bg-[#d7e0eb]" />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Chats;
