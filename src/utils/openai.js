import {  OpenAI } from "openai";

const openAiClient = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_CHATGPT_KEY,
});

export default openAiClient;