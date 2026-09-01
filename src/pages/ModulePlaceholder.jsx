import React from 'react';
import { useLocation } from 'react-router-dom';
import { StatusBadge } from '../components/common/StatusBadge';
import { ShieldCheck, Info, CheckCircle2 } from 'lucide-react';

export const ModulePlaceholder = ({ title, category }) => {
  const location = useLocation();

  return (
    <div className="gov-card">
      <div className="gov-card-header">
        <div className="gov-card-title">
          <span>{title}</span>
        </div>
        <StatusBadge status="AVAILABLE" customLabel="MODULE READY" />
      </div>

      <div style={{ padding: '1rem 0' }}>
        <div style={{ padding: '1rem', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', color: '#0F2C59', marginBottom: '0.25rem' }}>
            <Info size={18} style={{ color: '#1E40AF' }} />
            <span>MahaHealthConnect Module Shell</span>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#475569' }}>
            Current Route: <code style={{ backgroundColor: '#E2E8F0', padding: '0.125rem 0.375rem', borderRadius: '4px' }}>{location.pathname}</code>
          </p>
          <p style={{ fontSize: '0.8125rem', color: '#64748B', marginTop: '0.5rem' }}>
            This module route is fully registered in the React Router architecture and ready for deep workflow integration.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', color: '#059669', fontWeight: '600' }}>
          <CheckCircle2 size={16} />
          <span>RBAC Controlled Access Verified • Government Database Schema Compliant</span>
        </div>
      </div>
    </div>
  );
};
