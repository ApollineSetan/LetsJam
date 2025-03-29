const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = {
    origin:['http://localhost:5173'], // Port used by Vite
}; 

app.use(cors(corsOptions)); // Enable CORS for the specified origin

app.get("/api", (req, res) => {
  res.json({ fruits: ["apple", "orange", "pineapple"] }); // Data to be sent to the client
});

app.listen(8080, () => {
    console.log("Server is running on port 8080");
    });