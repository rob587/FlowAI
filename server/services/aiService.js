const axios = require("axios");

const analyze = async (InputText) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `Tu sei un assistente per automatizzare azioni. 
            Analizza il testo e rispondi SEMPRE in JSON con questo formato:
            {
              "action": "send_email" | "update_client" | "create_task",
              "client_name": "nome",
              "subject": "soggetto",
              "message": "messaggio",
              "urgency": "high" | "medium" | "low"
            }`,
          },
          {
            role: "user",
            content: inputText,
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      },
    );

    const content = response.data.choice[0].message.content;
    return JSON.parse(content);
  } catch (error) {
    console.error("❌ OpenAI Error:", error.message);
    throw error;
  }
};

module.exports = { analyze };
