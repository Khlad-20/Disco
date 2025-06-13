// ai.js (تحتاج مفتاح API آمن وليس علني)
async function askOpenAI(question) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer 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",
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
