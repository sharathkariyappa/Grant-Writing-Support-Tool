import React from 'react';
import { Card, Col, Row, Typography} from 'antd';

const { Title, Text } = Typography;

const resources = [
  {
    title: 'Grant Writing Basics',
    description: 'Learn the fundamentals of writing a successful grant proposal.',
    link: 'https://example.com/grant-writing-basics',
  },
  {
    title: 'Understanding Grant Funding',
    description: 'Explore how grant funding works and what funders look for.',
    link: 'https://example.com/understanding-grant-funding',
  },
  {
    title: 'How to Write a Strong Proposal',
    description: 'A guide to writing compelling grant proposals that get noticed.',
    link: 'https://example.com/strong-proposal',
  },
  {
    title: 'Budgeting for Grants',
    description: 'Understand how to create an effective budget for your grant application.',
    link: 'https://example.com/budgeting-for-grants',
  },
  {
    title: 'Common Grant Writing Mistakes',
    description: 'Avoid common pitfalls and mistakes in the grant writing process.',
    link: 'https://example.com/common-grant-writing-mistakes',
  },
];

const GrantWritingResources = () => {
  return (
    <div style={{ padding: '30px' }}>
      <Title level={2}>Grant Writing Resources</Title>
      <Row gutter={[16, 16]}>
        {resources.map((resource, index) => (
          <Col span={8} key={index}>
            <Card
              title={resource.title}
              bordered={false}
              style={{ width: '100%' }}
              extra={<a href={resource.link} target="_blank" rel="noopener noreferrer">Learn More</a>}
            >
              <Text>{resource.description}</Text>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default GrantWritingResources;
