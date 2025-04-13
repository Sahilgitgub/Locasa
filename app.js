const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8080;
const Listing = require("./models/listing.js");
const path = require("path");

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
app.use(express.urlencoded({ extended: true }));

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

//show route (read operation)
app.get("/listings/:id", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("./listings/show.ejs", { listing }); //
});
