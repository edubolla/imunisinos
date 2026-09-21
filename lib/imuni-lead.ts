export type ChatRoleMessage = {
  role: "user" | "assistant";
  content: string;
};

const PHONE_RE = /\(?\d{2}\)?[\s.-]?\d{4,5}[\s.-]?\d{4}/;

export function conversationHasPhone(messages: ChatRoleMessage[]): boolean {
  return messages.some((message) => message.role === "user" && PHONE_RE.test(message.content));
}

export function countUserMessages(messages: ChatRoleMessage[]): number {
  return messages.filter((message) => message.role === "user").length;
}
