if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
// console.log(process.env.SECRET);

express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOveride = require("method-override");
const port = 8080;
const path = require("path");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const listingRoutes = require("./routes/listing.js");

MONGO_URL = "mongodb://127.0.0.1:27017/Locasa";
const main = async () => {
  await mongoose.connect(MONGO_URL);
};

main()
  .then(() => {
    console.log("Connected to mongo Db");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOveride("_method"));
app.engine("ejs", ejsMate);

const sessionOptions = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    //ye hafte m kitne milliseconds hote h vo h hmara login current date itne 7*24*60*60*1000 millisecons m logout hoga isme cookie expires ka use hota h
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session()); // these two lines are required to implement passport session..
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// user se related information store krana is serilize and session m se remove krna is deserialize
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

app.use("/listings", listingRouter); //jo common hota h usse likh lete h jaise /listings hrr route m common tha toh usse /se replace krr dia
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// Error-handling middleware (should be after all routes)
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong!" } = err;
  res.render("./listings/eror.ejs", { message });
  // res.status(statusCode).send(message);
});

app.use("/listings", listingRoutes);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

// Catch-all route handler for undefined routes
// app.all("*", (req, res, next) => {
//   next(new ExpressError("Page Not Found!", 404));
// });

// listing
// app.get("/testListing", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "my new villa",
//     description: "by the beach",
//     price: 1000000,
//     location: "Dubai",
//     country: "india",
//   });
//   //   sampleListing
//   //     .save()
//   //     .then((res) => {
//   //       console.log(res);
//   //     })
//   //     .catch((err) => {
//   //       console.log(err);
//   //     });
//   // or

//   await sampleListing.save();
//   console.log("sample was saved");
//   res.send("successfull testings");
// });
