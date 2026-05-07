const axios = require("axios");

const analyze = async (inputText) => {
  try {
    console.log("🔄 Analyzing with Groq:", inputText);

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "mixtral-8x7b-32768",
        messages: [
          {
            role: "user",
            content: `Tu sei un assistente per automatizzare azioni. 
            Analizza questo testo e rispondi SOLO in JSON valido:
            {
              "action": "send_email",
              "client_name": "nome",
              "subject": "soggetto",
              "message": "messaggio",
              "urgency": "high"
            }
            
            Testo: "${inputText}"`,
          },
        ],
        temperature: 0.7,
        max_tokens: 1024,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
      },
    );

    console.log("✅ Groq Response:", response.data);
    const content = response.data.choices[0].message.content;
    return JSON.parse(content);
  } catch (error) {
    console.error("❌ Groq Error:", error.response?.data || error.message);
    throw error;
  }
};

module.exports = { analyze };
