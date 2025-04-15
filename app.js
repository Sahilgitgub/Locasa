const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOveride = require("method-override");
const port = 8080;
const Listing = require("./models/listing.js");
const path = require("path");
const ejsMate = require("ejs-mate");

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

app.get("/", (req, res) => {
  res.send("Hi i am root");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

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

//index route
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("./listings/index.ejs", { allListings });
});

// create: new and create route
//new route
app.get("/listing/new", (req, res) => {
  res.render("./listings/new.ejs");
});

// create route
app.post("/listings", async (req, res) => {
  //   const { title, description, image, price, location, country } = req.body;

  // or this can be written as:
  let newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
});

// update:update and edit route
// edit
app.get("/listings/:id/edit", async (req, res) => {
  const id = req.params.id;
  const listing = await Listing.findById(id);
  res.render("./listings/edit.ejs", { listing });
});
//update
app.put("/listings/:id", async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing }); //this is known as destructuring
  res.redirect(`/listings/${id}`); //this will redirect it to the show route otherwise dhunda muskil h ki kisme update kia h
});

//delete route
app.delete("/listings/:id", async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
});

//show route (read operation)
app.get("/listings/:id", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("./listings/show.ejs", { listing }); //
});
