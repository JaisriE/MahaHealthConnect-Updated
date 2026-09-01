import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { MOCK_MEDICINES, MOCK_DIAGNOSTICS, MOCK_REFERRALS } from '../../mockData';
import { Building2, Pill, Activity, UserCheck, GitPullRequest, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FacilityAdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      {/* Welcome Banner */}
      <div
        className="gov-card"
        style={{
          backgroundColor: '#0F2C59',
          color: '#ffffff',
          marginBottom: '1.5rem',
          backgroundImage: 'linear-gradient(135deg, #0F2C59 0%, #1E3A8A 100%)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.8125rem', color: '#F59E0B', fontWeight: '700', textTransform: 'uppercase' }}>
              Hospital Administration & Resource Operations
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '800', marginTop: '0.25rem' }}>
              {user?.name || 'राजेश पवार'}
            </h1>
            <p style={{ fontSize: '0.875rem', color: '#CBD5E1', marginTop: '0.25rem' }}>
              Facility: <strong>{user?.facility_name || 'District Hospital Aundh'}</strong> • Active Beds: 350 (280 Occupied)
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Link to="/facility-admin/referrals" className="gov-btn gov-btn-saffron">
              <GitPullRequest size={18} />
              <span>Referrals Inbox (2)</span>
            </Link>
            <Link to="/facility-admin/medicines" className="gov-btn gov-btn-secondary">
              <Pill size={18} />
              <span>Medicine Stock</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid-stats">
        <div className="stat-card">
          <div>
            <div className="stat-value">45 / 48</div>
            <div className="stat-label">Doctors Present Today</div>
          </div>
          <UserCheck style={{ color: '#059669' }} />
        </div>

        <div className="stat-card">
          <div>
            <div className="stat-value">2</div>
            <div className="stat-label">Critical Medicine Stock Alerts</div>
          </div>
          <AlertTriangle style={{ color: '#DC2626' }} />
        </div>

        <div className="stat-card">
          <div>
            <div className="stat-value">80%</div>
            <div className="stat-label">Bed Occupancy Rate</div>
          </div>
          <Building2 style={{ color: '#1E40AF' }} />
        </div>

        <div className="stat-card">
          <div>
            <div className="stat-value">65 / 115</div>
            <div className="stat-label">Diagnostic Capacity Used</div>
          </div>
          <Activity style={{ color: '#D97706' }} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
        {/* Incoming Referral Coordination Panel */}
        <div className="gov-card">
          <div className="gov-card-header">
            <div className="gov-card-title">
              <GitPullRequest size={20} />
              <span>Incoming PHC Referrals Inbox</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {MOCK_REFERRALS.map((ref) => (
              <div key={ref.referral_id} style={{ padding: '0.75rem', border: '1px solid #E2E8F0', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                  <div style={{ fontWeight: '700', fontSize: '0.875rem', color: '#0F2C59' }}>
                    {ref.patient_name} ({ref.specialty_required})
                  </div>
                  <StatusBadge status={ref.status} />
                </div>
                <div style={{ fontSize: '0.8125rem', color: '#475569', marginBottom: '0.5rem' }}>
                  From: <strong>{ref.referring_facility_name}</strong> • Notes: {ref.clinical_notes}
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <button className="gov-btn gov-btn-primary gov-btn-sm" disabled>
                    ✓ ACCEPTED (Capacity Flagged)
                  </button>
                  <button className="gov-btn gov-btn-secondary gov-btn-sm">
                    Re-route / Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Medicine Inventory Threshold Alerts */}
        <div className="gov-card">
          <div className="gov-card-header">
            <div className="gov-card-title">
              <Pill size={20} />
              <span>Medicine Stock Threshold Alerts</span>
            </div>
            <Link to="/facility-admin/medicines" style={{ fontSize: '0.8125rem', color: '#1E40AF', fontWeight: '600' }}>
              Full Stock
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {MOCK_MEDICINES.map((med) => (
              <div key={med.medicine_id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0.75rem', border: '1px solid #E2E8F0', borderRadius: '6px' }}>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '0.875rem', color: '#0F172A' }}>{med.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                    Stock: {med.current_stock} {med.unit} (Min: {med.min_safety_stock})
                  </div>
                </div>
                <StatusBadge status={med.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Diagnostic Lab Capacities */}
        <div className="gov-card">
          <div className="gov-card-header">
            <div className="gov-card-title">
              <Activity size={20} />
              <span>Diagnostic Lab Capacities Today</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {MOCK_DIAGNOSTICS.map((diag) => (
              <div key={diag.test_id} style={{ padding: '0.625rem', border: '1px solid #E2E8F0', borderRadius: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ fontWeight: '700', fontSize: '0.875rem', color: '#0F2C59' }}>{diag.name}</span>
                  <StatusBadge status={diag.status} />
                </div>
                <div style={{ fontSize: '0.75rem', color: '#475569' }}>
                  Capacity: {diag.completed_today} / {diag.daily_capacity} completed ({diag.remaining_capacity} remaining today)
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
