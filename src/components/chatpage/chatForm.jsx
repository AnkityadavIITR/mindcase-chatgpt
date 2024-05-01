"use client";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Ellipsis, ArrowUp } from "lucide-react";
import { Button } from "../ui/button";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import useChatStore from "@/utils/chatstore";
import { useAuthStore } from "@/utils/authstore";
import supabase from "@/lib/supabase";

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_KEY;
const ChatForm = () => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [data, setData] = useState("");

  const chats = useChatStore((state) => state.chats);
  const chatId=useChatStore((state)=>state.id)
  const addId = useChatStore((state) => state.setId);

  const addChat = useChatStore((state) => state.addChat);
  const user = useAuthStore((state) => state.user);

  async function runChat() {
    console.log("uploading");
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: chats,
    });

    const result = await chat.sendMessage(query);
    const response = result.response;
    console.log(response.text());
    addChat({
      role: "model",
      parts: [{ text: response.text() }],
    });
    setData(response.text());
  }

  const uploadChat = async () => {


    if (!user || !user.id) {
      console.error("User ID is missing or invalid");
      return;
    }

    console.log("User ID is valid");

    if (!Array.isArray(chats)) {
      console.error("Invalid data for chats: expected an array");
      return;
    }

    console.log("Chats is a valid array");

    try {
      console.log("hey");
      if (chats.length > 2) {
        console.log(chatId);
        const { data, error } = await supabase
          .from("messages")
          .update({
            chats: [...chats],
          })
          .eq("id", chatId);
          // console.log("data",data);

          if (error) {
            console.error("Error inserting into Supabase:", error.message);
          } else {
            console.log("Data inserted successfully:", data);
          }

      } else {
        const { data, error } = await supabase
          .from("messages")
          .insert({
            user_id: user.id,
            chats: chats, // Ensure this is a valid array
          })
          .select();
        console.log("Data", data);
        addId(data[0].id);

        if (error) {
          console.error("Error inserting into Supabase:", error.message);
        } else {
          console.log("Data inserted successfully:", data);
        }
      }
    } catch (error) {
      console.error("Error inserting into Supabase:", error.message);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    addChat({
      role: "user",
      parts: [{ text: query }],
    });
    await runChat();
    if(user){
      await uploadChat();
    }
  };
  return (
    <div>
      <form
        className="fixed bottom-10 left-[100px] md:left-[300px] lg:left-[500px] h"
        onSubmit={onSubmit}
      >
        <div className="w-full relative flex">
          <textarea
            type="text"
            placeholder="Message ChatGpt.."
            my="2"
            name="name"
            rows={2}
            cols={80}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="py-2 px-3 rounded-xl mt-2 bg-inherit border-[#666363] dark:border-black border-2 dark:text-white text-black focus:outline-none focus:ring focus:ring-gray-200 focus:ring-opacity-50 shadow-sm disabled:bg-gray-100 block w-full placeholder:font-light"
          />
          <Button
            type="submit"
            className={
              loading == false
                ? "relative top-5 right-10 px-2 py-1"
                : "relative top-5 right-10 px-2 py-1 opacity-65 "
            }
            disabled={loading}
          >
            {loading ? (
              <Ellipsis strokeWidth={1.25} />
            ) : (
              <ArrowUp strokeWidth={1.25} size={15} />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatForm;
