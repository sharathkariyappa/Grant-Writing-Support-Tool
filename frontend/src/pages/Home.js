import React from "react";
import { Layout, Typography, Button, Row, Col, Card, Space } from "antd";
import {
  FileTextOutlined,
  TeamOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const Home = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ background: "#001529", padding: "0 20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Title level={3} style={{ color: "#fff", margin: 0 }}>
            Grant Writing Support Tool
          </Title>
          <Space>
            <Button type="primary" href="/GrantAssistant">
              Get Started
            </Button>
          </Space>
        </div>
      </Header>
      <Content style={{ padding: "50px 20px", background: "#f0f2f5" }}>
        <Row gutter={[16, 16]} justify="center">
          <Col span={24} style={{ textAlign: "center" }}>
            <Title>Welcome to the Grant Writing Support Tool</Title>
            <Paragraph style={{ fontSize: "16px" }}>
              Streamline your grant writing process with AI-powered tools for proposal assistance, organization profiling, and more.
            </Paragraph>
            <Button type="primary" size="large" href="/GrantAssistant">
              Start Grant Writing Now
            </Button>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: "40px" }} justify="center">
          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              title="Interactive Q&A"
              bordered={false}
              style={{ textAlign: "center" }}
              cover={
                <QuestionCircleOutlined
                  style={{ fontSize: "64px", color: "#1890ff", margin: "20px 0" }}
                />
              }
            >
              <Paragraph>
                Engage in interactive Q&A sessions to craft perfect grant proposals tailored to your needs.
              </Paragraph>
              <Button type="link" href="/GrantAssistant">
                Learn More
              </Button>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              title="Organization Profiling"
              bordered={false}
              style={{ textAlign: "center" }}
              cover={
                <TeamOutlined
                  style={{ fontSize: "64px", color: "#1890ff", margin: "20px 0" }}
                />
              }
            >
              <Paragraph>
                Build detailed profiles of your organization to enhance your grant applications.
              </Paragraph>
              <Button type="link" href="/OrganizationProfile">
                Learn More
              </Button>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              title="Grant Writing Resources"
              bordered={false}
              style={{ textAlign: "center" }}
              cover={
                <FileTextOutlined
                  style={{ fontSize: "64px", color: "#1890ff", margin: "20px 0" }}
                />
              }
            >
              <Paragraph>
                
                Explore a wide range of resources designed to streamline the grant writing process. Gain access to valuable tools.
              </Paragraph>
              <Button type="link" href="/GrantwritingResources">
                Learn More
              </Button>
            </Card>
          </Col>
        </Row>
      </Content>
      <Footer style={{ textAlign: "center", background: "#001529", color: "#fff" }}>
        Grant Writing Support Tool © {new Date().getFullYear()} | Empowering Social Change
      </Footer>
    </Layout>
  );
};

export default Home;
