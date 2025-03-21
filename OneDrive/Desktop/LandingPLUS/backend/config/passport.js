import passport from "passport";
import LinkedInStrategy from "passport-linkedin-oauth2";
import User from "./models/User.js";

passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: "/auth/linkedin/callback",
    scope: ["r_emailaddress", "r_liteprofile"]
}, async (accessToken, refreshToken, profile, done) => {
    let user = await User.findOne({ linkedinId: profile.id });

    if (!user) {
        user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            linkedinId: profile.id,
            isVerified: true
        });
        await user.save();
    }

    return done(null, user);
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)));
