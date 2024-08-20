const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect(
  "mongodb+srv://vocuctt102:dung@assignment-2njs.kxnolld.mongodb.net/assigment2-njs?retryWrites=true&w=majority"
);

const accountRouter = require("./router/account");
const cityRouter = require("./router/hotel");
const adminRouter = require("./router/admin");
app.use(accountRouter);
app.use(cityRouter);
app.use("/admin", adminRouter);
app.use((req, res, next) => {
  res.status(404).send("<h1>Route Not Found</h1>");
});

app.listen(process.env.port);
