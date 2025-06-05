const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const flash = require("flash-message");
// const cookieParser = require("cookie-parser");
const session = require("express-session");
// send sighned cookie
const sessionOptions = {
  secret: "mysupersecret",
  resave: false,
  saveUninitialized: true,
};

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(session(sessionOptions));

app.get("/register", (req, res) => {
  let { name = "anonymous" } = req.query;
  req.session.name = name;
  req.flash("sucess", "user register successfully"); //success key ka use jha jha hoga vha vha user register succefu;;y msg show hoga.
  // req.flash se sirf ek baar msg flash hoga jbb new user register hoga
});

app.get("/hello", (req, res) => {
  res.locals.messages = req.flash("sucess");
  res.render("page.ejs", { name: req.session.name });
});

// app.get("/reqcount", (req, res) => {
//   if (req.session.count) {
//     //it keeps the count how many times a user visits the site
//     req.session.count++;
//   } else {
//     req.session.count = 1;
//   }
//   res.send(`you sent a request ${req.session.count} times`);
// });
// browser m jake inspect m application m coookies prr dekhoge toh ek sid bnn gyi hogi which is knoen as session id .

// app.use(cookieParser("secretcode")); //this can be any string.

// app.get("/getSignedCookie", (req, res) => {
//   res.cookie("made-in", "india", { signed: true });
//   res.send("sighned cookie send");
// });

// app.get("/verify", (req, res) => {
//   res.send("verify");
//   //   console.log(req.cookies); //for unsigned cookies
//   console.log(req.signedCookies); //for signed cookies
// });

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
