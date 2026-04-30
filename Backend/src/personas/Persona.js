export class Persona {
  constructor({ id, name, role, accent, suggestions, systemPrompt, backgroundImage }) {
    this.id = id;
    this.name = name;
    this.role = role;
    this.accent = accent;
    this.suggestions = suggestions;
    this.systemPrompt = systemPrompt;
    this.backgroundImage = backgroundImage;
  }

  toPublicJSON() {
    return {
      id: this.id,
      name: this.name,
      role: this.role,
      accent: this.accent,
      suggestions: this.suggestions,
      backgroundImage: this.backgroundImage
    };
  }
}
