export type PersonaId = string;

export interface Persona {
  id: PersonaId;
  name: string;
  role: string;
  accent: string;
  suggestions: string[];
  color?: string; // Optional, can be derived or provided by backend
  backgroundImage?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface ChatState {
  messages: ChatMessage[];
  activePersonaId: PersonaId | null;
  isLoading: boolean;
  error: string | null;
}
