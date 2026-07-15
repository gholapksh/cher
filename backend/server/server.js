require("dotenv").config();
const express = require("express");
const cors = require("cors");
const outfitsRouter = require("./routes/outfits");

const app = express();
app.use(cors()); // dev-only: allow requests from the Vite frontend (localhost:5173)
app.use(express.json());

app.use("/api", outfitsRouter);

app.get("/", (req, res) => {
  res.send("CHER + FitFindr agent server is running. Try POST /api/outfits/generate");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
