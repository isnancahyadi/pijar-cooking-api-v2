require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const swaggerjsdoc = require("swagger-jsdoc");
const swaggerui = require("swagger-ui-express");

const response = require("./utils/response");

const indexRouter = require("./routes/index");

const app = express();

const swaggerOption = {
  swaggerDefinition: {
    openapi: "3.1.0",
    info: {
      version: "1.0.0",
      title: "Pijar Cooking API",
      description:
        "This is API docs for Pijar Cooking mobile and web aplication",
      contact: {
        name: "Isnan A. Cahyadi",
        email: "isnan.arifc@gmail.com",
      },
    },
    schemes: ["http", "https"],
    servers: [
      {
        url: "http://localhost:8000/",
        description: "Development Server",
      },
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
        },
      },
    },
    // security: [
    //   {
    //     ApiKeyAuth: [],
    //   },
    // ],
  },
  apis: ["./docs/*.js", "./docs/*/*.js"],
};

const swaggerDocs = swaggerjsdoc(swaggerOption);
app.use("/api/docs", swaggerui.serve, swaggerui.setup(swaggerDocs));

app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// grant access to upload file
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(response(404, "ERROR", "WHAT ARE YOU DOING!", null, res));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
