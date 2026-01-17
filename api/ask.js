export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "No message" });
    }

    const response = await fetch(
      "https://router.huggingface.co/hf-inference/models/mistralai/Mistral-7B-Instruct-v0.2",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: message,
          parameters: {
            max_new_tokens: 200,
            temperature: 0.7
          }
        })
      }
    );

    const data = await response.json();

    let reply = "No response";

    if (Array.isArray(data) && data[0]?.generated_text) {
      reply = data[0].generated_text;
    }

    if (data?.error) {
      reply = "HF Error: " + data.error;
    }

    return res.status(200).json({ reply });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}


