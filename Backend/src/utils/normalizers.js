export function normalizeMessages(messages) {
  if (!Array.isArray(messages)) {
    return [];
  }

  // Pass through messages without strict character limits to avoid stripping context
  return messages
    .filter((message) => message && ["user", "assistant"].includes(message.role))
    .map((message) => ({
      role: message.role,
      content: String(message.content || "")
    }))
    .filter((message) => message.content.trim());
}
