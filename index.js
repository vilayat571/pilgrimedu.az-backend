const express = require("express");
const db = require("./config/database.js");
const cors = require("cors");
const Questions = require("./routes/questions.js");
const Scholarships = require("./routes/scholarship.js");
const Blogs = require("./routes/blogs.js");
const Images = require("./routes/images.js");
const Users = require("./routes/userAuth.js");

const app = express();
app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use("/", Questions);
app.use("/", Scholarships);
app.use("/", Blogs);
app.use("/", Images);
app.use("/", Users);

db();

app.use("/medias", express.static("medias"));

const port = 3001;
app.listen(port, () => {
  console.log(`Server started to work on port ${port}`); 
});
