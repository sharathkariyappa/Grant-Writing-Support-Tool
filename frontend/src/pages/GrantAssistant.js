import React, { useState } from "react";
import axios from "axios";

const GrantAssistant = () => {
  const [grantText, setGrantText] = useState(""); 
  const [aiSuggestions, setAiSuggestions] = useState(""); 
  const [loading, setLoading] = useState(false); 

  const handleInputChange = (e) => {
    setGrantText(e.target.value);
  };

  const fetchSuggestions = async () => {
    if (!grantText.trim()) {
      alert("Please enter the grant content for suggestions.");
      return; 
    }

    setLoading(true); 
    setAiSuggestions(""); 

    try {
      const response = await axios.post("http://localhost:5000/api/suggestions", { grantText });
      const generatedText = response.data.suggestions || "No suggestions available."; 
      setAiSuggestions(generatedText); 
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setAiSuggestions("Failed to fetch suggestions. Please try again.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>AI Grant-Writing Enhancer</h1>
      </header>
      <main style={styles.main}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Enter Grant Details</h2>
          <textarea
            value={grantText}
            onChange={handleInputChange}
            placeholder="Enter your grant details here..."
            rows={8}
            style={styles.textarea}
          />
          <button onClick={fetchSuggestions} style={styles.button} disabled={loading}>
            {loading ? "Fetching Suggestions..." : "Get AI Suggestions"}
          </button>
        </div>
        {aiSuggestions && (
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>AI Suggestions</h2>
            <p style={styles.paragraph}>{aiSuggestions}</p> 
          </div>
        )}
      </main>
      <footer style={styles.footer}>
        AI Grant-Writing Enhancer ©2024 Created with ❤
      </footer>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Arial', sans-serif",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  header: {
    backgroundColor: "#001529",
    padding: "10px 20px",
    color: "white",
    textAlign: "center",
  },
  title: {
    margin: 0,
    fontSize: "24px",
  },
  main: {
    flex: 1,
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#f9f9f9",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    maxWidth: "600px",
    width: "100%",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
  },
  cardTitle: {
    marginBottom: "10px",
    fontSize: "20px",
    color: "#333",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
    resize: "vertical",
    marginBottom: "15px",
  },
  button: {
    width: "100%",
    padding: "10px 15px",
    backgroundColor: "#001529",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
  paragraph: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#555",
  },
  footer: {
    backgroundColor: "#001529",
    color: "white",
    textAlign: "center",
    padding: "10px",
    marginTop: "auto",
  },
};

export default GrantAssistant;
