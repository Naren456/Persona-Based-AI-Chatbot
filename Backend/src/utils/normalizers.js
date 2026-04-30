const MAX_MESSAGE_CHARS = 1000;
const MAX_TOTAL_CHARS = 4000;

export function normalizeMessages(messages) {
  if (!Array.isArray(messages)) {
    return [];
  }

  // Basic normalization and per-message limit
  const cleaned = messages
    .filter((message) => message && ["user", "assistant"].includes(message.role))
    .map((message) => ({
      role: message.role,
      content: String(message.content || "").slice(0, MAX_MESSAGE_CHARS)
    }))
    .filter((message) => message.content.trim());

  // Sliding window based on total characters to optimize tokens
  const optimized = [];
  let currentTotal = 0;

  // We iterate backwards to keep the most recent context
  for (let i = cleaned.length - 1; i >= 0; i--) {
    const msg = cleaned[i];
    if (currentTotal + msg.content.length > MAX_TOTAL_CHARS) {
      break;
    }
    optimized.unshift(msg);
    currentTotal += msg.content.length;
  }

  // Hard cap at 10 messages for prompt efficiency
  return optimized.slice(-10);
}
