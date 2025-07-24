import { useState } from "react";

export default function KimiChatBot() {
  const [messages, setMessages] = useState([
    { role: "system", content: "Tu es un assistant propulsé par Kimi K2, qui présente le projet Solo Leveling." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/api/kimi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });
      const data = await res.json();
      if (data.reply?.content) {
        setMessages(prev => [...prev, { role: "assistant", content: data.reply.content }]);
      } else {
        setMessages(prev => [...prev, { role: "assistant", content: "Erreur de réponse Kimi." }]);
      }
    } catch (e) {
      setMessages(prev => [...prev, { role: "assistant", content: "Erreur de connexion au serveur Kimi." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full p-4 border rounded-lg shadow-lg bg-white dark:bg-gray-900">
      <div className="h-64 overflow-y-auto bg-gray-50 dark:bg-gray-800 p-3 mb-4 rounded">
        {messages.slice(1).map((m, i) => (
          <div key={i} className={`mb-2 ${m.role === "user" ? "text-right" : "text-left"}`}>
            <span className={`inline-block px-2 py-1 rounded ${m.role === "user" ? "bg-blue-100 dark:bg-blue-700 text-blue-900 dark:text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"}`}>
              {m.role === "user" ? "🧑" : "🤖"} {m.content}
            </span>
          </div>
        ))}
        {loading && (
          <div className="text-left">
            <span className="inline-block px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 animate-pulse">
              🤖 Kimi écrit...
            </span>
          </div>
        )}
      </div>
      <div className="flex">
        <input
          className="flex-1 border rounded-l px-3 py-2"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          placeholder="Écris un message…"
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 rounded-r disabled:opacity-50"
          disabled={loading || !input.trim()}
        >
          Envoyer
        </button>
      </div>
    </div>
  );
} 