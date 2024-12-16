import React, { useState } from "react";
import { Input, Button, Typography, Layout, Spin, Card } from "antd";
import axios from "axios";

const { TextArea } = Input;
const { Title, Paragraph } = Typography;
const { Header, Content, Footer } = Layout;

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
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are an expert grant-writing assistant.",
            },
            {
              role: "user",
              content: `Analyze this grant content and suggest improvements:\n${grantText}`,
            },
          ],
          temperature: 0.7,
          max_tokens: 500,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`, // Ensure this is set correctly
          },
        }
      );

      setAiSuggestions(response.data.choices[0].message.content);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setAiSuggestions("Failed to fetch suggestions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ background: "#001529", padding: "0 20px" }}>
        <Title style={{ color: "#fff", margin: 0 }} level={3}>
          AI Grant-Writing Enhancer
        </Title>
      </Header>
      <Content style={{ padding: "20px 50px" }}>
        <Card
          title="Enter Grant Details"
          bordered={false}
          style={{ maxWidth: "800px", margin: "0 auto", marginTop: "20px" }}
        >
          <TextArea
            value={grantText}
            onChange={handleInputChange}
            placeholder="Enter your grant details here..."
            rows={8}
          />
          <Button
            type="primary"
            onClick={fetchSuggestions}
            style={{ marginTop: "20px" }}
            block
          >
            {loading ? <Spin /> : "Get AI Suggestions"}
          </Button>
        </Card>
        {aiSuggestions && (
          <Card
            title="AI Suggestions"
            bordered={false}
            style={{ maxWidth: "800px", margin: "20px auto" }}
          >
            <Paragraph>{aiSuggestions}</Paragraph>
          </Card>
        )}
      </Content>
      <Footer style={{ textAlign: "center" }}>
        AI Grant-Writing Enhancer ©2024 Created with Ant Design
      </Footer>
    </Layout>
  );
};

export default GrantAssistant;
