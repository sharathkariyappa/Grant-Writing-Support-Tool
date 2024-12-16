import  OpenAI  from "openai";

const openai = new OpenAI({
  apiKey:process.env.OPEN_AI_KEY
});

async function getCompletion() {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      ...conversation.map((item) => ({
        role: item.role,
        content: item.text,
      })),
      { role: 'user', content: userInput },
    ],
  });
  
  // const aiResponse = response.choices[0].message.content;
  
}

getCompletion();
