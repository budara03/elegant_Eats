import { io } from "socket.io-client";

const API_BASE = "http://localhost:3000/api/chat";

async function authFetch(url, options = {}, token) {
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };
  const res = await fetch(url, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || "Request failed");
  }
  return res.json();
}

export const chatService = {
  getConversation: (token) => authFetch(`${API_BASE}/conversation`, {}, token),
  getMessages: (conversationId, token) =>
    authFetch(`${API_BASE}/${conversationId}/messages`, {}, token),
  sendMessage: (conversationId, body, token) =>
    authFetch(
      `${API_BASE}/${conversationId}/messages`,
      { method: "POST", body: JSON.stringify(body) },
      token
    ),
  getOwnerConversations: (token) =>
    authFetch(`${API_BASE}/owner/conversations`, {}, token),
  markRead: (conversationId, token) =>
    authFetch(`${API_BASE}/${conversationId}/read`, { method: "PATCH" }, token),
  resolveConversation: (conversationId, token) =>
    authFetch(
      `${API_BASE}/${conversationId}/resolve`,
      { method: "PATCH" },
      token
    ),
};

export function createSocket(token) {
  return io("http://localhost:3000", {
    auth: { token: token || "guest" },
    transports: ["websocket"],
    reconnectionAttempts: 5,
    reconnectionDelay: 2000,
  });
}
