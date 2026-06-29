const axios = require("axios");

const analyze = async (inputText) => {
  try {
    console.log("🔄 Analyzing with Groq:", inputText);

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `
You are an AI automation assistant.

Return ONLY valid JSON.
Do not use markdown.
Do not use triple backticks.
`,
          },
          {
            role: "user",
            content: `
Analizza questo testo e rispondi con JSON valido.

Formato:
{
  "action": "send_email" | "create_task" | "schedule_call" | "send_reminder",
  "client_name": "nome",
  "subject": "soggetto",
  "message": "messaggio",
  "urgency": "low" | "medium" | "high"
}

Scegli l'azione più appropriata:
- send_email: per comunicazioni formali, pagamenti, preventivi
- create_task: per attività da fare, follow-up, problemi tecnici
- schedule_call: per appuntamenti, riunioni, chiamate
- send_reminder: per scadenze, rinnovi, promemoria

Testo: "${inputText}"
`,
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

    const content = response.data.choices[0].message.content;

    // Pulizia markdown eventuale
    const cleanContent = content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // Parse JSON
    const parsed = JSON.parse(cleanContent);

    console.log("✅ Parsed JSON:", parsed);

    return parsed;
  } catch (error) {
    console.error("❌ Groq Error:", error.response?.data || error.message);

    throw error;
  }
};

module.exports = { analyze };
