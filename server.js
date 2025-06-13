const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Configuration, OpenAIApi } = require('openai');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY
}));

app.post('/ask', async (req, res) => {
  const question = req.body.question;

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'أنت مساعد ذكي لمادة العلوم للصف الثالث متوسط ف3.' },
        { role: 'user', content: question }
      ]
    });

    const answer = completion.data.choices[0].message.content;
    res.json({ answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "حدث خطأ في الذكاء الاصطناعي." });
  }
});

app.listen(3000, () => {
  console.log('✅ الخادم يعمل على http://localhost:3000');
});
