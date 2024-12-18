const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config(); 

const app = express();

app.use(cors());
app.use(express.json());

const HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/gpt2"; 
const TIMEOUT = 10000; 
const MAX_RETRIES = 3; 


if (!process.env.HUGGINGFACE_API_KEY) {
  console.error("Hugging Face API key is missing");
  process.exit(1); 
}


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

   
    const generatedText = response.data[0]?.generated_text || "No suggestions available.";

    
    const inputText = `Analyze this grant content and suggest improvements:\n${grantText}`;
    const cleanGeneratedText = generatedText.replace(inputText, "").trim(); 

    return cleanGeneratedText || "No suggestions available."; 
  } catch (error) {
    if (error.response) {
      if (error.response.status === 503 && retries > 0) {
        const estimatedTime = error.response.data.estimated_time || 30; 
        console.log(`Model is currently loading. Retrying in ${Math.ceil(estimatedTime)} seconds... (${MAX_RETRIES - retries + 1}/${MAX_RETRIES})`);
        await new Promise(resolve => setTimeout(resolve, estimatedTime * 1000)); 
        return fetchSuggestions(grantText, retries - 1); 
      }
    }
    throw error; 
  }
};


app.post("/api/suggestions", async (req, res) => {
  const { grantText } = req.body;

  if (!grantText) {
    return res.status(400).json({ error: "Grant text is required." });
  }

  try {
    const generatedText = await fetchSuggestions(grantText);
    res.json({ suggestions: generatedText }); 
  } catch (error) {
    console.error("Error fetching suggestions:", error.response?.data || error.message);
    res.status(500).json({ error: "Error fetching suggestions." });
  }
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
