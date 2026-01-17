export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  try {
    const { message } = req.body;

    const response = await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: message
        })
      }
    );

    const data = await response.json();

    const reply =
      data?.[0]?.generated_text ||
      "No response";

    res.status(200).json({ reply });

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
