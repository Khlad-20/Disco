async function sendQuestion() {
  const question = document.getElementById("question").value;
  const resBox = document.getElementById("response");
  resBox.innerText = "جاري التحليل...";

  const response = await fetch("/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question })
  });

  const data = await response.json();
  resBox.innerText = data.answer;
}
