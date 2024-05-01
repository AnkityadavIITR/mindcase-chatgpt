import openAiClient from "@/utils/openai"

export async function GET(request) {
  const chatCompletion = await openAiClient.chat.completions.create({
    messages: [{ role: 'user', content: 'Say this is a test' }],
    model: 'gpt-3.5-turbo',
  });
  console.log(chatCompletion);
 
  return Response.json({ product })
}