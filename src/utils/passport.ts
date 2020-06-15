import { Strategy as OAuth2Strategy } from 'passport-google-oauth20';
import passport from 'passport';
passport.serializeUser(function (user: any, done) {
    done(null, user.id);
    // where is this user.id going? Are we supposed to access this anywhere?
});

// used to deserialize the user
passport.deserializeUser(function (id: string, done) {
    done(null, {})
});
passport.use(new OAuth2Strategy({
    // authorizationURL: 'http://localhost:1234/oauth2/authorize',
    // tokenURL: 'http://localhost:1234/oauth2/token',
    clientID: '854383743115-6julpju6cuhj7aeouimlrtp8p9m9gd99.apps.googleusercontent.com',
    clientSecret: 'v2MMH_aZ4ypAEEOhcIV2Mfl6',
    callbackURL: "http://localhost:8080"
},
    function (accessToken: string, refreshToken: string, profile: any, cb: any) {
        console.info(profile, refreshToken, accessToken)
        cb(null, profile)
    }
));

export default passport