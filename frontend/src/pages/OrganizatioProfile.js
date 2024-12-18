import React from 'react';
import { Card, Descriptions } from 'antd';

const OrganizationProfile = () => {
  const mockProfile = {
    name: 'Grant Writing Tool',
    mission: 'Empowering social change through technology and innovation.',
  };

  return (
    <Card title="Organization Profile">
      <Descriptions column={1}>
        <Descriptions.Item label="Name">{mockProfile.name}</Descriptions.Item>
        <Descriptions.Item label="Mission">{mockProfile.mission}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default OrganizationProfile;
