// /api/callback.js
export default async function handler(req, res) {
  const code = req.query.code;

  if (!code) return res.status(400).send('No code provided');

  const params = new URLSearchParams();
  params.append('client_id', '1261839375738732684');
  params.append('client_secret', process.env.DISCORD_SECRET);
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', 'https://khaledali.vercel.app/api/callback');
  params.append('scope', 'identify email guilds');

  const tokenRes = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    body: params,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });

  const tokenData = await tokenRes.json();
  if (!tokenData.access_token) return res.status(500).send('Token exchange failed');

  const userRes = await fetch('https://discord.com/api/users/@me', {
    headers: { Authorization: `Bearer ${tokenData.access_token}` }
  });

  const userData = await userRes.json();
  const { username, discriminator, id, avatar } = userData;

  return res.redirect(`/dashboard.html?username=${username}#${discriminator}&avatar=${avatar}&id=${id}`);
}
