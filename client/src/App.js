
import { useState } from "react";
import axios from "axios";
import "./App.css";

const cityOptions = [
  "Abu Dhabi", "Ahmedabad", "Albuquerque", "Aleppo", "Amman", "Amsterdam",
  "Ankara", "Antwerp", "Athens", "Atlanta", "Auckland", "Austin",
  "Baghdad", "Baku", "Bangkok", "Barcelona", "Basel", "Beirut", "Belgrade",
  "Berlin", "Bern", "Birmingham", "Bogotá", "Boston", "Brasília", "Bratislava",
  "Brisbane", "Brussels", "Bucharest", "Budapest", "Buenos Aires", "Cairo",
  "Calgary", "Cambridge", "Cape Town", "Casablanca", "Chennai", "Chicago",
  "Cincinnati", "Copenhagen", "Dallas", "Damascus", "Dar es Salaam", "Delhi",
  "Denver", "Detroit", "Dhaka", "Doha", "Dublin", "Durban", "Edinburgh",
  "Frankfurt", "Geneva", "Glasgow", "Guangzhou", "Hanoi", "Helsinki",
  "Honolulu", "Houston", "Istanbul", "Jakarta", "Jerusalem", "Johannesburg",
  "Juba", "Karachi", "Kathmandu", "Khartoum", "Kiev", "Kigali", "Kinshasa",
  "Kuala Lumpur", "Las Vegas", "London", "Los Angeles", "Luanda", "Lusaka",
  "Madrid", "Manila", "Melbourne", "Mexico City", "Miami", "Milan", "Montreal",
  "Moscow", "Mumbai", "Munich", "Muscat", "Nairobi", "Naples", "New Orleans",
  "New York", "Nice", "Osaka", "Oslo", "Ottawa", "Palma", "Paris", "Perth",
  "Philadelphia", "Phoenix", "Portland", "Prague", "Quebec City", "Quito",
  "Rabat", "Reykjavik", "Riyadh", "Rio de Janeiro", "Rome", "San Diego",
  "San Francisco", "San Jose", "Santiago", "São Paulo", "Seattle", "Seoul",
  "Shanghai", "Singapore", "Stockholm", "Sydney", "Taipei", "Tampa",
  "Tel Aviv", "Tokyo", "Toronto", "Valencia", "Vancouver", "Venice",
  "Vienna", "Warsaw", "Washington", "Wellington", "Zagreb", "Zurich",
  "Brooklyn", "Lakewood"
];

const splitZmanName = (name) => {
  return name.replace(/([A-Z0-9])/g, ' $1').trim();
};

function App() {
  const [mode, setMode] = useState("city");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [zmanim, setZmanim] = useState(null);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const fetchZmanim = async (query) => {
    setLoading(true);
    setZmanim(null);
    try {
      const res = await axios.get(`/api/zmanim?${query}`);
      setZmanim(res.data.times);
    } catch {
      alert("Failed to load zmanim");
    }
    setLoading(false);
  };

  const handleCitySearch = () => fetchZmanim(`city=${city}`);
  const handleZipSearch = () => fetchZmanim(`zip=${zip}`);
  const handleLocationSearch = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      fetchZmanim(`lat=${latitude}&lon=${longitude}`);
    });
  };

  const handleCityInputChange = (value) => {
    setCity(value);
    if (value.length > 0) {
      const filtered = cityOptions
        .filter(c => c.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 10);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="app">
      <h1>Hebcal Zmanim</h1>

      <div className="mode-buttons">
        <button onClick={() => { setMode("city"); setSuggestions([]); }}>City</button>
        <button onClick={() => setMode("zip")}>ZIP</button>
        <button onClick={() => setMode("location")}>My Location</button>
      </div>

      {mode === "city" && (
        <div className="controls">
          <div className="input-wrapper">
            <input
              placeholder="Enter city"
              value={city}
              onChange={(e) => handleCityInputChange(e.target.value)}
            />
            {suggestions.length > 0 && (
              <ul className="suggestions">
                {suggestions.map((c) => (
                  <li key={c} onClick={() => { setCity(c); setSuggestions([]); }}>
                    {c}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button disabled={!city} onClick={handleCitySearch}>
            Get Zmanim
          </button>
        </div>
      )}

      {mode === "zip" && (
        <div className="controls">
          <input
            placeholder="Enter ZIP code"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
          <button disabled={!zip} onClick={handleZipSearch}>
            Get Zmanim
          </button>
        </div>
      )}

      {mode === "location" && (
        <div className="controls">
          <button onClick={handleLocationSearch}>
            Use My Location
          </button>
        </div>
      )}

      {loading && <p className="loading">Loading zmanim...</p>}

      {zmanim && (
        <div className="grid">
          {Object.entries(zmanim).map(([name, time]) => (
            <div key={name} className="card">
              <h3>{splitZmanName(name)}</h3>
              <p>{new Date(time).toLocaleTimeString()} EST</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;





