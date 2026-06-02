require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const purchasedRoutes = require("./routes/purchasedStock");
const soldRoutes = require("./routes/soldStock");
const reportsRoutes = require("./routes/reports");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/purchased", purchasedRoutes);
app.use("/api/sold", soldRoutes);
app.use("/api/reports", reportsRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server Running");
});