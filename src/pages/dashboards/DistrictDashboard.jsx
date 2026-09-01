import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { MOCK_FACILITIES } from '../../mockData';
import { Building2, GitPullRequest, Pill, Activity, ShieldCheck, UserCheck, AlertTriangle, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DistrictDashboard = () => {
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
              District Health Officer Oversight • पुणे जिल्हा आरोग्य नियंत्रण
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '800', marginTop: '0.25rem' }}>
              {user?.name || 'डॉ. मीना कुलकर्णी'} (DHO)
            </h1>
            <p style={{ fontSize: '0.875rem', color: '#CBD5E1', marginTop: '0.25rem' }}>
              Jurisdiction: <strong>Pune District (14 Talukas)</strong> • 28 PHCs, 6 District & Sub-District Hospitals
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Link to="/district-authority/referral-analytics" className="gov-btn gov-btn-saffron">
              <GitPullRequest size={18} />
              <span>Referral Network Analytics</span>
            </Link>
            <Link to="/district-authority/audit-logs" className="gov-btn gov-btn-secondary">
              <ShieldCheck size={18} />
              <span>Security Audit Trail</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Grid Stats Overview */}
      <div className="grid-stats">
        <div className="stat-card">
          <div>
            <div className="stat-value">34</div>
            <div className="stat-label">Total Govt Healthcare Facilities</div>
          </div>
          <Building2 style={{ color: '#1E40AF' }} />
        </div>

        <div className="stat-card">
          <div>
            <div className="stat-value">33 / 34</div>
            <div className="stat-label">Facilities Online & Operational</div>
          </div>
          <UserCheck style={{ color: '#059669' }} />
        </div>

        <div className="stat-card">
          <div>
            <div className="stat-value">18</div>
            <div className="stat-label">Cross-Hospital Referrals Today</div>
          </div>
          <GitPullRequest style={{ color: '#D97706' }} />
        </div>

        <div className="stat-card">
          <div>
            <div className="stat-value">3</div>
            <div className="stat-label">Critical Medicine Shortage Alerts</div>
          </div>
          <AlertTriangle style={{ color: '#DC2626' }} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
        {/* District Facility Status Overview */}
        <div className="gov-card">
          <div className="gov-card-header">
            <div className="gov-card-title">
              <Building2 size={20} />
              <span>Facility Capacity & Referral Response</span>
            </div>
            <Link to="/district-authority/facilities" style={{ fontSize: '0.8125rem', color: '#1E40AF', fontWeight: '600' }}>
              View All Facilities
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {MOCK_FACILITIES.map((fac) => (
              <div key={fac.facility_id} style={{ padding: '0.75rem', border: '1px solid #E2E8F0', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '0.875rem', color: '#0F2C59' }}>{fac.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                      Taluka: {fac.taluka} • Doctors: {fac.doctor_count} • Beds: {fac.active_beds}
                    </div>
                  </div>
                  <StatusBadge status={fac.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* District Analytics Summary */}
        <div className="gov-card">
          <div className="gov-card-header">
            <div className="gov-card-title">
              <BarChart2 size={20} />
              <span>District Health Performance Metrics</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.875rem' }}>
            <div style={{ padding: '0.75rem', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontWeight: '700', color: '#0F172A' }}>Referral Resolution Time</div>
              <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#059669', marginTop: '0.25rem' }}>
                14.2 Mins Avg Response
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                Target: &lt; 30 Mins for Emergency Triage Cases
              </div>
            </div>

            <div style={{ padding: '0.75rem', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontWeight: '700', color: '#0F172A' }}>Maternal ANC 4-Visit Completion Rate</div>
              <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#1E40AF', marginTop: '0.25rem' }}>
                91.4% Coverage
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                Covering Mulshi, Haveli, and Baramati blocks
              </div>
            </div>

            <div style={{ padding: '0.75rem', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontWeight: '700', color: '#0F172A' }}>Medicine Stock Availability Index</div>
              <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#D97706', marginTop: '0.25rem' }}>
                88.5% Sufficient
              </div>
              <div style={{ fontSize: '0.75rem', color: '#DC2626' }}>
                Alert: IFA Red Supplement stock low in 4 rural PHCs
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
