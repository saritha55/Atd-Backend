const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Mock data for sensor data
const sensorData = [
  { sensorId: 1, timestamp: "2023-01-01T00:00:00Z", value: 0.5 },
  { sensorId: 2, timestamp: "2023-01-01T00:00:00Z", value: 0.7 },
  { sensorId: 1, timestamp: "2023-01-01T00:00:10Z", value: 0.6 },
  { sensorId: 2, timestamp: "2023-01-01T00:00:10Z", value: 0.8 },
];

// API endpoint to fetch sensor data
app.get('/api/sensor-data', (req, res) => {
  const { sensorIds, startTime, endTime } = req.query;

  // Filter data based on query parameters
  const filteredData = sensorData.filter((data) => {
    const isSensorMatch = sensorIds.includes(data.sensorId.toString());
    const isTimeMatch = data.timestamp >= startTime && data.timestamp <= endTime;
    return isSensorMatch && isTimeMatch;
  });

  res.json({ data: filteredData });
});

// Start the server
app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});