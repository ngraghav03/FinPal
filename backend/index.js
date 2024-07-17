import express from "express";
import bodyParser from "body-parser";
import { connectionToDb, gettingDB } from "./db.js";
import env from "dotenv";
import bcrypt from "bcrypt";
import session from "express-session"
import passport from "passport";
import { Strategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";

import User from "./userSchema.js";

// Importing objectId to help us extract _id.
import { ObjectId } from "mongodb";

// app init
const app = express();
env.config();
const port = process.env.SERVER_PORT;
const saltRounds = parseInt(process.env.SALT_ROUNDS);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("public"))
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// db connection
let db;
connectionToDb((err) => {
    if (!err) {
        console.log("Successfully connected to database");
        // app.listen(port, () => {
        //     console.log("Server running on port " + port);
        // });
        db = gettingDB();
        // console.log(db);
    } else {
        console.log(err);
    }
    // createRecord();
});

app.get("/secrets", (req, res) => {
    // console.log(req);
    console.log(req.user);
    if (req.isAuthenticated()) {
        res.send( { mssg: "You are authenticated ! ", user: req.user});
    } else {
        res.send("You are not authenticated ! ");
    }
});

app.get("/auth/google", passport.authenticate("google", {
    scope: [ "profile", "email"],

}));

// TODO: This is the route where our home (dashboard page) should be located.
app.get("/auth/google/secrets", 
    passport.authenticate("google", {
        successRedirect: "/secrets",
        failureRedirect: "/login"
    }
));

// app.get("/login", (req, res) => {
//     res.render("login.ejs");
// })

// TODO: In our home (dashboard) and every other page, there should be a logout button in navigation where it routes to "/logout"
app.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err)
            console.log(err);
        res.redirect("/");
    })
})

app.post("/login", 
    passport.authenticate("local", {
        successRedirect: "/secrets",
        failureRedirect: "/login",
    })
);

app.post("/register", async (req, res) => {
    // console.log(req.body.username);
    // console.log(req.body.password);
    try {
        const result = await User.exists({ email: req.body.email });

        if (result == undefined) {
            // ! User not found
            try {
                
                bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
                    if(err) {
                        console.log("Error hashing the password: " + err.message);
                    } else {
                        const user = await User.create({
                            name: req.body.name, 
                            email: req.body.email, 
                            password: hash
                        });
                        console.log(user);
                        req.login(user, (err) => {
                            // TODO: Check if the uncommented code works properly, or else uncomment this and comment that
                            // if (err) {
                            //     console.log(err);
                            // } else {
                            //     res.redirect("/secrets");
                            // }
                            
                            console.log(err);
                            res.redirect("/secrets");
                                
                        });
                        // res.send("User registered!").status(200);
                        // console.log("User saved");
                        // console.log(user);

                        // ^ res.render("secrets.ejs")
                    }   
                });

            } catch (err) {
                console.log("Error saving user" + err.message);
                res.send(err).status(200);
            }
        } else {
            // ! User already exists
            res.send("User already exists!").status(404);
        }
    } catch(err) {
        console.log(err.message);
    }
        
});

// ? Local strategy
// TODO: Replace req.body.email and req.body.password with email and password after implementing the frontend i.e., after connecting the backend with the frontend login form.
passport.use("local", new Strategy(async function verify(username, password, cb) {
    
    // 
    
    console.log("From inside passport local strategy : " + username);
    console.log("From inside passport local strategy : " + password);

    try {
        // ! Check if user exists
        //  * Remove this if it works: const result = await User.exists({ email: req.body.email });
        const result = await User.exists({ email: username });

        if (result == undefined) {
            // & res.send("User does not exist! Try registering.")
            return cb("User does not exist! Try registering.");
        } else {
            const user = await User.findById(result._id);
            // console.log(user);
            const storedHashedPassword = user.password;
            // * Remove this if it works:bcrypt.compare(inputPassword, storedHashedPassword, (err, result) => {
            bcrypt.compare(password, storedHashedPassword, (err, result) => {
                if (err) {
                    // & console.log("Error comparing passwords: ", err);

                    return cb(err);
                } else {
                    if (result) {
                        // ^ res.render("secrets.ejs")
                        // & res.send("Password correct!");
                        console.log("Password correct !");
                        return cb(null, user);
                    } else {
                        // & res.send("Incorrect Password");

                        // User error - not really a error because of something wrong with Passport
                        return cb(null, false); 
                    }
                }
            })
        }
    } catch (err) {
        // & console.log(err.message);
        return cb(err);
    }
}));

// ? Google Login Strategy

passport.use("google", 
    new GoogleStrategy({
        clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
        clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/secrets",
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
    }, 
    async (accessToken, refreshToken, profile, cb) => {
        console.log("--------------GOOGLE PROFILE INFO-----------");
        // console.log(profile);
        console.log("------------------")
        try {
            // ! Check if this google user is registered already
            const result = await User.findOne({ email: profile.email });
            console.log("Result: " + result);
            // ! User not found
            if (result == undefined) {
                const user = await User.create({
                    name: profile.displayName, 
                    email: profile.email, 
                    password: "google"
                });
                console.log("User: " + user);
                // TODO: Check if it is cb(null, user) or return cb(null, user)
                return cb(null, user);
            } else {
                // ! user already exists
                // TODO: Check if it is cb(null, result) or return cb(null, result)
                return cb(null, result);
            }
        } catch (err) {
            // TODO: Check if it is cb(err) or return cb(err)
            return cb(err);
        }
    }
))

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((user, cb) => {
    cb(null, user);
});

app.listen(port, () => {
    console.log("Server running on port " + port);
});