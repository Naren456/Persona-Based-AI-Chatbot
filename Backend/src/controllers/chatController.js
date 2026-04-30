import { openai, DEFAULT_MODEL } from "../config/openai.js";
import { personas } from "../personas/personas.js";
import { normalizeMessages } from "../utils/normalizers.js";

export const handleChat = async (req, res) => {
  try {
    if (!openai) {
      return res.status(500).json({
        error: "The server is missing OPENAI_API_KEY. Add it to Backend/.env or the deployment environment."
      });
    }

    const { personaId, messages } = req.body || {};
    const persona = personas[personaId];

    if (!persona) {
      return res.status(400).json({ error: "Choose a valid persona before sending a message." });
    }

    const conversation = normalizeMessages(messages);
    if (!conversation.length) {
      return res.status(400).json({ error: "Send at least one user message." });
    }

    const completion = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      temperature: 0.75,
      max_tokens: 1024,
      messages: [
        { role: "system", content: persona.systemPrompt },
        ...conversation
      ],
      extra_body: {
        reasoning: { enabled: true }
      }
    });

    const reply = completion.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return res.status(502).json({ error: "The model returned an empty response. Please try again." });
    }

    return res.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return res.status(500).json({
      error: error.message || "The AI service is temporarily unavailable. Please try again in a moment."
    });
  }
};
