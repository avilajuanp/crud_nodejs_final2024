import "reflect-metadata";
import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import { router } from "./routes";
import { userRoutes } from "./routes/UserRoutes";
import { categoryRoutes } from "./routes/CategoryRoutes";
import { routerAuth } from "./routes/LoginRoutes";
import { clientRouter } from "./routes/ClientRoutes";
import "./database";
import session from "express-session";
import flash from "connect-flash"
import passport from "passport";
import morgan from "morgan";
import { invoiceRoutes } from "./routes/InvoiceRoutes";
import { productRouter } from "./routes/ProductRoutes";

const app = express();

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))
app.use(passport.initialize());
app.use(passport.session());
require('./utils/passport');
app.use(flash())

//Variables Globales
app.use((request, response, next) => {
  app.locals.success = request.flash("success");
  app.locals.error = request.flash("error");
  app.locals.user = request.user
  next()
});

//Routes
app.use(router);
app.use(productRouter);
app.use(userRoutes);
app.use(categoryRoutes);
app.use(routerAuth);
app.use(invoiceRoutes);
app.use(clientRouter);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return response.status(400).json({
      error: err.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});

app.use(express.static(path.join(__dirname, "..", "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
