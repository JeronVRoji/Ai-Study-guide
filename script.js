const input = document.getElementById("input");
const send = document.getElementById("send");
const chat = document.getElementById("chat");

send.onclick = async () => {
  const msg = input.value.trim();
  if (!msg) return;

  chat.innerHTML += `<div>You: ${msg}</div>`;
  input.value = "";

  const res = await fetch("/api/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: msg })
  });

  const data = await res.json();
  chat.innerHTML += `<div>AI: ${data.reply}</div>`;
};
