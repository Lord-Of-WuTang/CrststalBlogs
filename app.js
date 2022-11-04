const express = require("express");

const passport = require("passport");

const bodyParser = require("body-parser");

const jwt = require("jsonwebtoken");

const cors = require("cors");

const Database = require("./database/db");

const blogRouter = require("./routes/blog.route");

const authRouter = require("./routes/auth.route");

const app = express();

require("dotenv").config();

// Initializing passport middleware
app.use(passport.initialize());

require("./Auth/JwtPass")(passport);

const PORT = process.env.PORT || 3001;

Database.connectToMongoDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", authRouter);

app.use(
  "/api/blogs",
  passport.authenticate("jwt", { session: false }),
  blogRouter
);

app.get("/", function (req, res, next) {
  return res.send("Testing Server");
});

app.get("/api", (req, res) => {
  return res.json({ message: "CrystalBlog Online.", status: true });
});

app.use("*", (req, res) => {
  return res.status(404).json({ message: "Not Found" });
});

app.use((error, req, res) => {
  return res.status(500).json({ message: "Server Failure" });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
