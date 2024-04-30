import openAiClient from "@/utils/openai";

export async function postHandler(req, res) {
  try {
    console.log("hey");
    const completion = await openAiClient.chat.completions.create({
      messages: [{ role: "user", content: req.prompt }],
      model: "gpt-3.5-turbo",
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

      res.write("data: [DONE]\n\n");
      res.end();
    }
  } catch (error) {
    console.error("Error generating response:", error);
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
}

export default {
  post: postHandler,
};
