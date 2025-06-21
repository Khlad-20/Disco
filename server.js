// server.js
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const DiscordStrategy = require("passport-discord").Strategy;
const path = require("path");

const app = express();

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(new DiscordStrategy({
    clientID: '1261839375738732684',
    clientSecret: 'prjbVJQ-jgyDmPsPmXBKDTlYHDbX4DCB',
    callbackURL: 'https://khaledali.vercel.app/',
    scope: ['identify', 'guilds', 'email']
}, (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => done(null, profile));
}));

app.use(session({
    secret: '28a20a51f18cd33bf0e075e0bce294f2b4143e7bbd9436bcb017eb13a901f5cc',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("public"));

app.get("/auth/discord", passport.authenticate("discord"));
app.get("/auth/discord/callback", passport.authenticate("discord", {
    failureRedirect: "/"
}), (req, res) => res.redirect("/dashboard"));

app.get("/dashboard", (req, res) => {
    if (!req.isAuthenticated()) return res.redirect("/");
    res.sendFile(path.join(__dirname, "public/dashboard.html"));
});

app.get("/user", (req, res) => {
    if (!req.isAuthenticated()) return res.json({ error: "Not logged in" });
    res.json(req.user);
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
