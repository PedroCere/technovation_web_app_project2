const DATA_CALCULATOR_API_BASE = "http://localhost:8080/api/data"; // Data Calculator service base URL
const PREDICTION_API_BASE = "http://localhost:8082"; // Prediction service base URL

export const getPredictionsByUser = async (userId) => {
  if (!userId || userId === "PUT-USER-ID-HERE") {
    throw new Error("Invalid userId provided");
  }
  const response = await fetch(`${PREDICTION_API_BASE}/user/${userId}`);
  if (!response.ok) throw new Error("Failed to fetch predictions");
  return await response.json();
};

export const submitPrediction = async (data) => {
  const response = await fetch(`${PREDICTION_API_BASE}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Prediction failed");
  return await response.json();
};

export const submitDataEntry = async (data) => {
  const response = await fetch(`${DATA_CALCULATOR_API_BASE}/entry`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Data entry submission failed");
  return await response.json();
};

export const fetchEmissionData = async (userId) => {
  if (!userId) {
    throw new Error("UserId is required to fetch emission data");
  }
  const response = await fetch(`${DATA_CALCULATOR_API_BASE}/emissions/calculate?userId=${userId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch emission data");
  }
  return await response.json();
};
