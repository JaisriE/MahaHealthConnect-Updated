import React from 'react';
import { StatusBadge } from '../components/common/StatusBadge';

export const ModulePlaceholder = ({ title }) => {

  return (
    <div className="gov-card">
      <div className="gov-card-header">
        <div className="gov-card-title">
          <span>{title}</span>
        </div>
        <StatusBadge status="AVAILABLE" customLabel="AVAILABLE" />
      </div>

      <div style={{ padding: '1rem 0' }}>
        <p style={{ padding: '1rem', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', color: '#475569' }}>
          {title} is available from the current application workflow.
        </p>
      </div>
    </div>
  );
};
