const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config(); // For API key storage

const app = express();

app.use(cors());
app.use(express.json());

const HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/gpt2"; // Change to a faster model
const TIMEOUT = 10000; // Timeout in milliseconds
const MAX_RETRIES = 3; // Maximum number of retries

// Check for required environment variables
if (!process.env.HUGGINGFACE_API_KEY) {
  console.error("Hugging Face API key is missing");
  process.exit(1); // Exit the application if the API key is missing
}

// Function to fetch suggestions with retry logic
const fetchSuggestions = async (grantText, retries = MAX_RETRIES) => {
  try {
    const response = await axios.post(
      HUGGINGFACE_API_URL,
      {
        inputs: `Analyze this grant content and suggest improvements:\n${grantText}`,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        },
        timeout: TIMEOUT,
      }
    );

    // Extract the generated text from the response
    const generatedText = response.data[0]?.generated_text || "No suggestions available.";

    // Strip the input text from the generated response
    const inputText = `Analyze this grant content and suggest improvements:\n${grantText}`;
    const cleanGeneratedText = generatedText.replace(inputText, "").trim(); // Remove the input text

    return cleanGeneratedText || "No suggestions available."; // Return cleaned text only
  } catch (error) {
    if (error.response) {
      if (error.response.status === 503 && retries > 0) {
        const estimatedTime = error.response.data.estimated_time || 30; // Default to 30 seconds if not provided
        console.log(`Model is currently loading. Retrying in ${Math.ceil(estimatedTime)} seconds... (${MAX_RETRIES - retries + 1}/${MAX_RETRIES})`);
        await new Promise(resolve => setTimeout(resolve, estimatedTime * 1000)); // Wait for the estimated time before retrying
        return fetchSuggestions(grantText, retries - 1); // Retry
      }
    }
    throw error; // Rethrow the error if it's not a 503 or if retries are exhausted
  }
};

// Route for suggestions
app.post("/api/suggestions", async (req, res) => {
  const { grantText } = req.body;

  if (!grantText) {
    return res.status(400).json({ error: "Grant text is required." });
  }

  try {
    const generatedText = await fetchSuggestions(grantText);
    res.json({ suggestions: generatedText }); // Send only the generated text
  } catch (error) {
    console.error("Error fetching suggestions:", error.response?.data || error.message);
    res.status(500).json({ error: "Error fetching suggestions." });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
