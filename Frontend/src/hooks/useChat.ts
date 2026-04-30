import { useState, useCallback, useEffect, useMemo } from "react";
import { ChatMessage, Persona, PersonaId } from "../types/chat";

const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://100.129.164.192:4000";

const PERSONA_COLORS: Record<string, string> = {
  anshuman: "#1d4ed8",
  abhimanyu: "#047857",
  kshitij: "#b45309",
};

export const useChat = () => {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [activePersonaId, setActivePersonaId] = useState<PersonaId | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const activePersona = useMemo(
    () => personas.find((p) => p.id === activePersonaId) || null,
    [personas, activePersonaId]
  );

  const fetchPersonas = useCallback(async () => {
    try {
      setIsInitialLoading(true);
      const response = await fetch(`${API_URL}/api/personas`);
      if (!response.ok) throw new Error("Failed to fetch personas");
      const data = await response.json();
      const enrichedPersonas = data.personas.map((p: any) => ({
        ...p,
        color: PERSONA_COLORS[p.id] || "#3b82f6",
        backgroundImage: p.backgroundImage ? `${API_URL}${p.backgroundImage}` : undefined,
      }));
      setPersonas(enrichedPersonas);
      if (enrichedPersonas.length > 0 && !activePersonaId) {
        setActivePersonaId(enrichedPersonas[0].id);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load personas");
    } finally {
      setIsInitialLoading(false);
    }
  }, [activePersonaId]);

  useEffect(() => {
    fetchPersonas();
  }, []);

  const starterMessage = useCallback((persona: Persona): ChatMessage => ({
    id: `starter-${persona.id}`,
    role: "assistant",
    content: `Hi, I am simulating ${persona.name}'s public teaching style for this assignment. Ask me about career planning, DSA, projects, systems, or learning strategy.`,
    timestamp: Date.now(),
  }), []);

  useEffect(() => {
    if (activePersona && messages.length === 0) {
      setMessages([starterMessage(activePersona)]);
    }
  }, [activePersona, messages.length, starterMessage]);

  const switchPersona = useCallback((id: PersonaId) => {
    const nextPersona = personas.find((p) => p.id === id);
    if (!nextPersona || id === activePersonaId) return;

    setActivePersonaId(id);
    setMessages([starterMessage(nextPersona)]);
    setError(null);
  }, [activePersonaId, personas, starterMessage]);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || !activePersona || isLoading) return;

    const userMessage: ChatMessage = {
      id: `${Date.now()}-user`,
      role: "user",
      content: content.trim(),
      timestamp: Date.now(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personaId: activePersona.id,
          messages: updatedMessages.map(({ role, content }) => ({ role, content })),
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to get response");

      const assistantMessage: ChatMessage = {
        id: `${Date.now()}-assistant`,
        role: "assistant",
        content: data.reply,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [activePersona, isLoading, messages]);

  const resetChat = useCallback(() => {
    if (activePersona) {
      setMessages([starterMessage(activePersona)]);
      setError(null);
    }
  }, [activePersona, starterMessage]);

  return {
    personas,
    activePersona,
    messages,
    isLoading,
    isInitialLoading,
    error,
    switchPersona,
    sendMessage,
    resetChat,
    retryFetch: fetchPersonas,
  };
};
