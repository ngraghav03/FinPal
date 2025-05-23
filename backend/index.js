import express from "express";
import bodyParser from "body-parser";
import { connectionToDb, gettingDB } from "./db.js";
import env from "dotenv";
import bcrypt from "bcrypt";
import session from "express-session";
// import cookieSession from "cookie-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import { Strategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import cors from "cors";
import axios from "axios";

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
app.use(bodyParser.json());

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
}));

/*
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        allowHeaders: ['Content-Type']
    })
);
*/

// app.use(
//     cookieSession({
//         name: "session",
//         keys: [process.env.SECRET],
//         maxAge: 1000 * 60 * 60 * 24,
//     }
// ))

app.use(cookieParser());

// app.use(express.static("public"))
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        secure: false,
        httpOnly: true,
        sameSite: "strict"
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
    // console.log("Inside GET /secrets");
    // console.log("Cookies : ", req.cookies);
    // console.log("Session : ", req.session);
    console.log("User : ", req.user);
    // console.log(req.user);
    if (req.isAuthenticated()) {
        res.send( { mssg: "You are authenticated ! ", user: req.user});
    } else {
        res.send( { mssg: "You are not authenticated ! ", user: null});
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
    // req.logout((err) => {
    //     if (err)
    //         console.log(err);
    //     res.redirect("/");
    // })
    req.session = null;
    req.user = null;
    res.send({message: "Successfully logged out", data: req.session, user: req.user});

})

// app.post("/login", 
//     passport.authenticate("local", {
//         successRedirect: "/secrets",
//         failureRedirect: "/login",
//     })
// );

app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            return res.json({ message: "Invalid credentials", isAuthenticated: false }); 
        }
      
    req.logIn(user, (err) => {
        if (err) return next(err);
        // On successful login, respond with a success message
        return res.status(200).send({ message: "Login successful", isAuthenticated: true });
    });
    })(req, res, next);
});
  

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

app.post("/newtransaction", async (req, res) => {
    // console.log("Form elements");
    // console.log(req.body);
    // console.log("Inside /newtransaction -> user");
    // console.log(req.user);
    const id = req.user.id
    // console.log("Id: " + id);

    // ? Updating account balance
    if (req.body.transactionType == "expense") {
        const result = await User.updateOne(
            { _id: id, "accounts.name": req.body.from },
            { $inc: { "accounts.$.balance": -req.body.amount } }
        )

        // console.log("....................");
        // console.log(result);
    } else if(req.body.transactionType == "income") {
        const result = await User.updateOne(
            { _id: id, "accounts.name": req.body.to },
            { $inc: { "accounts.$.balance": req.body.amount } }
        )

    } else {
        await User.updateOne(
            { _id: id, "accounts.name": req.body.from },
            { $inc: { "accounts.$.balance": -req.body.amount } }
        );

        await User.updateOne(
            { _id: id, "accounts.name": req.body.to },
            { $inc: { "accounts.$.balance": req.body.amount } }
        );
    }
    

    // ? Adding transaction to DB
    try {
        const result = await User.findByIdAndUpdate(
        id,
        { $push: { transactions: req.body }},
        { new: true, runValidators: true }
        );
        res.send("Success");
    } catch (err) {
        res.send(err.message);
    }
    
    // console.log("result: " + result);

});

app.post("/newaccount", async (req, res) => {
    // console.log("req.body = " + JSON.stringify(req.body));
    // console.log("Inside /newaccount -> user");
    // console.log(req.user);
    const id = req.user.id
    // console.log("Id: " + id);

    try {
        const result = await User.findByIdAndUpdate(
            id,
            { $push: { accounts: {...req.body, 
                incl_networth: req.body.incl_networth || "off", 
                balance: parseInt(req.body.balance) 
            }}},
            { new: true, runValidators: true }
        );
        res.send("Success")
    } catch(err) {
        res.send(err.message)
    }
    
    // console.log("result: " + result);

});

app.post("/newinvestment", async (req, res) => {
    const id = req.user.id;

    
    switch(req.body.type) {
        // * FD added to DB
        case "FD":
            
            if(!(req.body.debitAccount == null || req.body.debitAccount == "")) {
                // ^ If a debit account is given, then adjust the debit account balance and add the details to the DB
                try {
                    const result = await User.updateOne(
                        { _id: id, "accounts.name": req.body.debitAccount },
                        { $inc: { "accounts.$.balance": -parseInt(req.body.amount) } }
                    );
                } catch(error) {
                    console.log(error);
                    res.send({message: error.message});
                }
            }
                // ^ If there is no debit account given, just add the details to the DB
                // ^ We need to add the details to the DB irrespective of whether a debit account is given or not.
            try {
                const result = await User.findByIdAndUpdate(
                    id,
                    {
                        $push: {
                            investments: {
                                type: req.body.type,
                                amount: parseInt(req.body.amount),
                                maturityDate: req.body.maturityDate,
                                creditAccount: req.body.creditAccount,
                                incl_networth: req.body.incl_networth
                            }
                        }
                    }
                )
            } catch (error) {
                console.log(error);
                res.send({message: error.message});
            }

            res.send({message: "success"});
            
            break;

        case "MF":
            // console.log("---------MF----------");
            // console.log(req.body);
            var shares = parseFloat(req.body.value);
                
            try {
                // * Find the number of shares held given the value
                const response = await axios.get(`https://api.mfapi.in/mf/${req.body.fundId}/latest`);
                console.log("response data " + JSON.stringify(response.data));
                
                let nav = response.data.data[0].nav;
                if(req.body.valueType) {
                    shares = parseFloat(req.body.value) / nav;
                    // console.log("shares: " + shares);
                }
                
                
                // * Insert investment into DB
                try {
                    const result = await User.findByIdAndUpdate(
                        id,
                        {
                            $push: {
                                investments: {
                                    type: req.body.type,
                                    fundId: req.body.fundId,
                                    shares: shares,
                                    lastNav: nav,
                                    lastUpdatedAt: req.body.lastUpdatedAt,
                                    incl_networth: req.body.incl_networth,
                                }
                            }
                        }
                    );
                    res.send({ message: "Success"});
                } catch (error) {
                    res.send({message: error.message});
                    console.log(error);
                }

            } catch(error) {
                res.send({message: error.message, info: "Error from API"});
                console.log(error);
            }
                

            break;

        case "Stocks":
            var shares = parseFloat(req.body.value);
            var latestStockValue;
            
            // * Find the latest stock price from external API
            // TODO: Modify the codebase for better error handling. 
            // TODO: Also, external API error can eradicated using Search Endpoint and Select List instead of manually typing symbols.

            try {
                const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${req.body.symbol}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`);
                let lastRefreshedAt = response.data["Meta Data"]["3. Last Refreshed"];

                latestStockValue = response.data["Time Series (Daily)"][lastRefreshedAt]["4. close"];
                console.log("latest " + latestStockValue);

                // * If the given data is currently held worth of stock
                if(req.body.valueType) {
                    // * Find the number of shares held given the value  
                    
                    shares = parseFloat(req.body.value) / latestStockValue;
                }
                
                // * Insert investment into DB
                try {
                    
                    const result = await User.findByIdAndUpdate(
                        id,
                        {
                            $push: {
                                investments: {
                                    type: req.body.type,
                                    symbol: req.body.symbol,
                                    shares: shares,
                                    latestStockValue: latestStockValue,
                                    lastUpdatedAt: req.body.lastUpdatedAt,
                                    incl_networth: req.body.incl_networth,
                                }
                            }
                        }
                    )

                    res.send({message: "success"});
                } catch(error) {
                    console.log(error);
                    res.send({message: error.message});
                }
            
            // * Error from external API
            } catch(error) {
                console.log(error);
                res.send({message: error.message, info: "Error from API"});
            }
            
            break;

        case "Crypto":
            // console.log("----------Crypto---------");
            // console.log(req.body);
            var coins = parseFloat(req.body.value);
            var latestCoinValue;

            // * Find the latest stock price from external API
            try {
                const response = await axios.get(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${req.body.symbol}&to_currency=USD&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`)
                console.log(response.data);
                
                latestCoinValue = response.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]
                console.log("latest: " + latestCoinValue);
            
                // * If the given data is currently held worth of cryptocurrency
                if(req.body.valueType) {
                    // * Find the number of shares held given the value  
                    coins = parseFloat(req.body.value) / latestCoinValue;
                }
                
                console.log("No of coins held = " + coins);
                
                // * Insert investment into DB
                try {
                    const result = await User.findByIdAndUpdate(
                        id,
                        {
                            $push: {
                                investments: {
                                    type: req.body.type,
                                    symbol: req.body.symbol,
                                    coins: coins,
                                    latestCoinValue: latestCoinValue,
                                    toCurrency: response.data['Realtime Currency Exchange Rate']['3. To_Currency Code'],
                                    lastUpdatedAt: req.body.lastUpdatedAt,
                                    incl_networth: req.body.incl_networth,
                                }
                            }
                        }
                    )

                    res.send({message: "success"});
                } catch(error) {
                    console.log(error);
                    res.send({message: error.message});
                }

            } catch(error) {
                console.log(error);
                res.send({message: error.message, info: "Error from API"});
            }

    }
       
});

app.post("/newgoal", async (req, res) => {
    const id = req.user.id;

    try {
        const result = await User.findByIdAndUpdate(
            id,
            { $push: { goals: 
                {...req.body, }
                }
            },
            { new: true, runValidators: true }
        );
        res.send({message: "Success"})
    } catch(err) {
        res.send(err.message)
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
            return cb(null, false, { mssg: "User does not exist! Try registering." });
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
                        return cb(null, false, {mssg: "Incorrect Password"}); 
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
        console.log(profile);
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
                    password: "google",
                    picture: profile.picture,
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
    console.log("Serializing user...", user._id);
    cb(null, user._id);
});

passport.deserializeUser(async (id, cb) => {
    try {
        const user = await User.findById(id);
        console.log("Deserializing user...", user._id);
        cb(null, user);
    } catch (err) {
        cb(err, null);
    }
});

app.listen(port, () => {
    console.log("Server running on port " + port);
});