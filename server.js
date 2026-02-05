const express = require("express");
const path = require("path");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

// Allow cross-origin requests (optional)
app.use(cors());

// --- API endpoint ---
app.get("/api/zmanim", async (req, res) => {
  try {
    let apiUrl = "https://www.hebcal.com/zmanim?cfg=json";

    if (req.query.city) apiUrl += `&city=${encodeURIComponent(req.query.city)}`;
    else if (req.query.zip) apiUrl += `&zip=${encodeURIComponent(req.query.zip)}`;
    else if (req.query.lat && req.query.lon) apiUrl += `&latitude=${req.query.lat}&longitude=${req.query.lon}`;
    else return res.status(400).json({ error: "Missing city, zip, or coordinates" });

    const response = await axios.get(apiUrl);
    res.json({ times: response.data.times });
  } catch (err) {
    console.error("Error fetching zmanim:", err.message);
    res.status(500).json({ error: "Failed to fetch zmanim" });
  }
});

// --- Serve React frontend from client/build ---
app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// --- Start server ---
app.listen(port, () => console.log(`Server running on port ${port}`));