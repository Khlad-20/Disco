// ai.js (تحتاج مفتاح API آمن وليس علني)
async function askOpenAI(question) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer YOUR_API_KEY",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: question }]
    })
  });

  const data = await response.json();
  return data.choices[0].message.content;
}
