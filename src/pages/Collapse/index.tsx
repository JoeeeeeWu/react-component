import React from 'react';
import Collapse from '@/components/Collapse';

const { Panel } = Collapse;

const CollapsePage: React.FC = () => {
  return (
    <Collapse>
      <Panel></Panel>
      <Panel></Panel>
    </Collapse>
  );
};

export default CollapsePage;
