
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path"); // Needed to serve React build

const app = express();
const port = process.env.PORT || 5000;

// Allow requests from frontend (React)
app.use(cors());

// Root test route
app.get("/", (req, res) => {
  res.send("Hebcal Zmanim API Backend is running!");
});

// Main endpoint to fetch Zmanim
app.get("/api/zmanim", async (req, res) => {
  try {
    let apiUrl = "https://www.hebcal.com/zmanim?cfg=json";

    // Check query params and append to Hebcal API URL
    if (req.query.city) {
      apiUrl += `&city=${encodeURIComponent(req.query.city)}`;
    } else if (req.query.zip) {
      apiUrl += `&zip=${encodeURIComponent(req.query.zip)}`;
    } else if (req.query.lat && req.query.lon) {
      apiUrl += `&latitude=${req.query.lat}&longitude=${req.query.lon}`;
    } else {
      return res.status(400).json({ error: "Missing city, zip, or coordinates" });
    }

    // Optional: you can add &tzid=America/New_York or let Hebcal auto-detect timezone
    const response = await axios.get(apiUrl);

    // Return only the "times" object from Hebcal API
    res.json({ times: response.data.times });
  } catch (error) {
    console.error("Error fetching zmanim:", error.message);
    res.status(500).json({ error: "Failed to fetch zmanim" });
  }
});

// --- Serve React frontend ---
// This must come AFTER all API routes
app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
