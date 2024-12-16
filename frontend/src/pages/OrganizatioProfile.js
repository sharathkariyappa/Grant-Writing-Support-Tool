import React from 'react';
import { Card, Descriptions } from 'antd';

const OrganizationProfile = () => {
  const mockProfile = {
    name: 'Catalyst Community Foundation',
    mission: 'Empowering social change through education and innovation.',
    achievements: ['Raised $2M in grants', 'Impacted 10,000 students', 'Built 5 community centers'],
  };

  return (
    <Card title="Organization Profile">
      <Descriptions column={1}>
        <Descriptions.Item label="Name">{mockProfile.name}</Descriptions.Item>
        <Descriptions.Item label="Mission">{mockProfile.mission}</Descriptions.Item>
        <Descriptions.Item label="Achievements">
          <ul>
            {mockProfile.achievements.map((ach, index) => (
              <li key={index}>{ach}</li>
            ))}
          </ul>
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default OrganizationProfile;
