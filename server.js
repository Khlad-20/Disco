const express = require("express");
const session = require("express-session");
const passport = require("passport");
const DiscordStrategy = require("passport-discord").Strategy;
const path = require("path");
const app = express();

// إعداد الجلسة
app.use(session({
    secret: "prjbVJQ-jgyDmPsPmXBKDTlYHDbX4DCB", // غيّره لسر قوي
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// إعداد passport-discord
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(new DiscordStrategy({
    clientID: "1261839375738732684",
    clientSecret: "prjbVJQ-jgyDmPsPmXBKDTlYHDbX4DCB",
    callbackURL: "http://localhost:3000/auth/discord/callback",
    scope: ["identify", "email", "guilds"]
}, (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => {
        return done(null, profile);
    });
}));

// ملفات الواجهة (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// مسار تسجيل الدخول
app.get("/auth/discord", passport.authenticate("discord"));

// رد الاتصال بعد تسجيل الدخول
app.get("/auth/discord/callback",
    passport.authenticate("discord", { failureRedirect: "/" }),
    (req, res) => {
        // بعد تسجيل الدخول الناجح، يتم تحويله إلى لوحة التحكم
        res.redirect("/dashboard.html");
    }
);

// API تعرض بيانات المستخدم الحالي
app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ error: "غير مسجل الدخول" });
    res.json(req.user);
});

// تسجيل الخروج
app.get("/logout", (req, res) => {
    req.logout(() => {
        res.redirect("/");
    });
});

// بدء الخادم
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ الخادم يعمل على http://localhost:${PORT}`);
});
