import openAiClient from "@/utils/openai";

export default async function handler(req, res) {

  if (req.method === "POST") {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    const { prompt } = req.body;
    console.log(prompt);

    try {
      const completion = await openAiClient.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        stream: true,
      });

      for await (const { choices } of completion) {
        if (choices) {
          for (const { delta } of choices) {
            if (delta.content) {
              res.write(`data: ${JSON.stringify(delta)}\n\n`);
              await res.flush();
            }
          }
        }
      }

      res.write("data: [DONE]\n\n");
      res.end();
    } catch (error) {
      console.error(error);
      res.status(500).end("Error generating response");
    }
  } else {
    res.status(405).end("Method Not Allowed");
  }
}
