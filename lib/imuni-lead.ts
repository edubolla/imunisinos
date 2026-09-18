export type ChatRoleMessage = {
  role: "user" | "assistant";
  content: string;
};

export type LeadCanal = "widget" | "site";

const PHONE_RE = /\(?\d{2}\)?[\s.-]?\d{4,5}[\s.-]?\d{4}/;
const LEAD_REGISTERED_RE = /dados (foram )?registrados/i;

export function isLeadCanal(value: unknown): value is LeadCanal {
  return value === "widget" || value === "site";
}

export function conversationHasPhone(messages: ChatRoleMessage[]): boolean {
  return messages.some((message) => message.role === "user" && PHONE_RE.test(message.content));
}

export function conversationAlreadySentLead(messages: ChatRoleMessage[]): boolean {
  return messages.some(
    (message) => message.role === "assistant" && LEAD_REGISTERED_RE.test(message.content),
  );
}
