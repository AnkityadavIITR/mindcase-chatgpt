import React from "react";
import { useAuthStore } from "@/utils/authstore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { Settings, } from "lucide-react";

const UserAvatar = () => {
  const user = useAuthStore((state) => state.user);
  const logOut=useAuthStore((state)=>state.signOut)
  const handleSignOut=async()=>{
    await logOut();
  }
  return (
    <div className="flex absolute bottom-3 left-3 right-3 flex-col gap-y-2">
      <Popover>
        <PopoverTrigger className="flex gap-x-2 dark:hover:bg-[#212121] hover:bg-[#d8e3f0] border-1 rounded-md p-2">
          <Avatar>
            <AvatarImage
              src={user?.user_metadata.avatar_url}
              className=""
              alt="@shadcn"
            />
            <AvatarFallback>logo</AvatarFallback>
          </Avatar>
          <h1 className="my-auto text-[13px]">
            {user?.user_metadata?.full_name}
          </h1>
        </PopoverTrigger>

        <PopoverContent className="w-[230px] dark:bg-[#2f2f2f] px-4 py-3 flex flex-col gap-y-1">
          <h1 className="overflow-hidden text-[14px]">{user?.email}</h1>
          <hr className="h-px my-3 bg-[#666363] border-0" />
          <Button
            variant="ghost"
            className="w-full hover:bg-[#f4eaea]  dark:hover:bg-[#424242] flex justify-start text-[15px] px-1"
          >
            <Settings size={20} strokeWidth={1.25} className="mr-2" />
            settings
          </Button>
          <hr className="h-px my-3 bg-[#666363] border-0 " />
          <Button
            variant="ghost"
            onClick={handleSignOut}
            className="w-full hover:bg-[#f4eaea]  dark:hover:bg-[#424242] flex justify-start"
          >
            <LogOut strokeWidth={1.25} className="mr-3" size={20} />
            Logout
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default UserAvatar;
