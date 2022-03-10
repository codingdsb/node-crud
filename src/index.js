const express = require("express");
const cors = require("cors");
const router = require("./routes/user.routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", router);

const PORT = process.env.PORT || 5000;

app.listen(PORT);
