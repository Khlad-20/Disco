function askAI() {
  const input = document.getElementById('userInput').value;
  const responseDiv = document.getElementById('aiResponse');

  // استجابة وهمية
  responseDiv.innerHTML = "🤖 جاري تحليل سؤالك...";

  setTimeout(() => {
    responseDiv.innerHTML = `سؤالك: "${input}"<br>الإجابة: سيتم دعم هذا مستقبلاً بواسطة الذكاء الاصطناعي الحقيقي.`;
  }, 1500);
}
