const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const errorHandler = require("./middleware/error-handler");
const ErrorResponse = require("./utils/error-response");
const mongoose = require("mongoose");
//const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((conn) => console.log(`connected to db: ${conn.connection.name}`))
  .catch((e) => console.log(e.message || "db connection failed"));

const app = express();

//body parser

app.use("/uploads/images", express.static(path.join("uploads", "images")));
app.use(express.static(path.resolve("client", "dist")));

//CORS allow
// app.use(
//   cors({
//     credentials: true,
//     //origin: true,
//     //origin: "localhost:3000",
//     //allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
//     //methods: "DELETE, PUT, GET, PATCH, POST, OPTIONS",
//   })
// );
app.use(cookieParser());
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//temporary favicon solution
// app.use("/favicon.ico", (req, res) => {
//   res.sendFile(path.join(__dirname, "/uploads/images/default.png"));
// });

//routes: define and require
app.use("/api/v1/users", require("./routes/user-routes"));
app.use("/api/v1/auth", require("./routes/auth-routes"));
app.use("/api/v1/profile", require("./routes/profile-routes"));
app.use("/api/v1/posts", require("./routes/post-routes"));
app.use("/*", (_req, res) => {
  return res.sendFile(path.resolve("client", "dist", "index.html"));
});
app.use("*", (_req, _res, next) => next(new ErrorResponse("Content Not Found", 404)));

app.use(errorHandler);

app.listen(process.env.PORT || 5000, console.log(`Server running on port: ${process.env.PORT}`));
