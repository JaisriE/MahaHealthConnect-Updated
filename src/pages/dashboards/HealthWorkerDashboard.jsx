import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useOffline } from '../../context/OfflineContext';
import { usePatients } from '../../context/PatientContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { MOCK_REFERRALS, MOCK_FACILITIES } from '../../mockData';
import {
  Users,
  Activity,
  GitPullRequest,
  Clock,
  Wifi,
  Radio,
  PlusCircle,
  Search,
  CheckCircle2,
  AlertTriangle,
  Building2
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const HealthWorkerDashboard = () => {
  const { user } = useAuth();
  const { isOnline, pendingSyncCount, triggerSync, isSyncing } = useOffline();
  const { patients } = usePatients();

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
              Field Health Worker Portal • ASHA / ANM Coordinator
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '800', marginTop: '0.25rem' }}>
              सुप्रभात, {user?.name || 'सुनिता शिंदे'}
            </h1>
            <p style={{ fontSize: '0.875rem', color: '#CBD5E1', marginTop: '0.25rem' }}>
              Facility: <strong>{user?.facility_name || 'PHC Mulshi'}</strong> • District: {user?.district || 'Pune'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Link to="/health-worker/register" className="gov-btn gov-btn-saffron">
              <PlusCircle size={18} />
              <span>Register Patient</span>
            </Link>
            <Link to="/health-worker/triage" className="gov-btn gov-btn-secondary">
              <Activity size={18} />
              <span>Digital Triage</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid-stats">
        <div className="stat-card">
          <div>
            <div className="stat-value">{patients.length}</div>
            <div className="stat-label">Patients Registered</div>
          </div>
          <Users style={{ color: '#1E40AF' }} />
        </div>

        <div className="stat-card">
          <div>
            <div className="stat-value">3</div>
            <div className="stat-label">Pending Digital Triage</div>
          </div>
          <Activity style={{ color: '#D97706' }} />
        </div>

        <div className="stat-card">
          <div>
            <div className="stat-value">2</div>
            <div className="stat-label">Active Referrals Sent</div>
          </div>
          <GitPullRequest style={{ color: '#059669' }} />
        </div>

        <div className="stat-card">
          <div>
            <div className="stat-value">5</div>
            <div className="stat-label">Follow-ups Due This Week</div>
          </div>
          <Clock style={{ color: '#6B21A8' }} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
        {/* Offline Sync Status Panel */}
        <div className="gov-card">
          <div className="gov-card-header">
            <div className="gov-card-title">
              <Wifi size={20} />
              <span>Offline & Sync Status</span>
            </div>
            <StatusBadge status={isOnline ? 'ONLINE' : 'OFFLINE'} />
          </div>

          <div style={{ fontSize: '0.875rem' }}>
            <div style={{ padding: '0.75rem', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: '700', color: '#0F172A' }}>
                    {pendingSyncCount > 0 ? `${pendingSyncCount} Local Records Pending Sync` : 'All Local Data Synced'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.25rem' }}>
                    {isOnline ? 'Connected to Govt Cloud Server' : 'Working Offline - Data Saved to Local Device Storage'}
                  </div>
                </div>

                <button
                  onClick={triggerSync}
                  disabled={pendingSyncCount === 0 || isSyncing}
                  className="gov-btn gov-btn-primary gov-btn-sm"
                >
                  {isSyncing ? 'Syncing...' : 'Sync Now'}
                </button>
              </div>
            </div>

            <div style={{ fontSize: '0.8125rem', color: '#475569' }}>
              <strong>Recent Action Log:</strong> Registered PAT-10247 (Ganpat More) with ST Elevation Triage priority.
            </div>
          </div>
        </div>

        {/* Priority Triage Patients Queue */}
        <div className="gov-card">
          <div className="gov-card-header">
            <div className="gov-card-title">
              <Activity size={20} />
              <span>Registered Patient Queue</span>
            </div>
            <Link to="/health-worker/patients" style={{ fontSize: '0.8125rem', color: '#1E40AF', fontWeight: '600' }}>
              View All
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {patients.slice(0, 4).map((pt) => (
              <div
                key={pt.patient_id}
                style={{
                  display: 'flex',
                  justify: 'space-between',
                  alignItems: 'center',
                  padding: '0.625rem 0.75rem',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  backgroundColor: '#ffffff'
                }}
              >
                <div>
                  <div style={{ fontWeight: '700', fontSize: '0.875rem', color: '#0F2C59' }}>
                    {pt.name} ({pt.age} yrs)
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                    ID: {pt.patient_id} • Village: {pt.village} {pt.vitals?.bp ? `• BP: ${pt.vitals.bp}` : ''}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#DC2626', fontWeight: '500', marginTop: '0.125rem' }}>
                    Reason: {pt.triage_reason || 'Registered Record'}
                  </div>
                </div>

                <StatusBadge status={pt.triage_status || 'NORMAL'} />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Referral Requests */}
        <div className="gov-card">
          <div className="gov-card-header">
            <div className="gov-card-title">
              <GitPullRequest size={20} />
              <span>Multi-Hospital Referrals Sent</span>
            </div>
            <Link to="/health-worker/referrals" style={{ fontSize: '0.8125rem', color: '#1E40AF', fontWeight: '600' }}>
              New Referral
            </Link>
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
                <div style={{ fontSize: '0.8125rem', color: '#475569' }}>
                  Accepted by: <strong>{ref.accepted_hospital}</strong>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#059669', marginTop: '0.25rem' }}>
                  ✓ Secondary hospital requests automatically cancelled upon acceptance.
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Facility Service Status */}
        <div className="gov-card">
          <div className="gov-card-header">
            <div className="gov-card-title">
              <Building2 size={20} />
              <span>PHC Mulshi Facility Status</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.375rem 0' }}>
              <span>OPD Doctors On Duty:</span>
              <strong>2 Available</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.375rem 0', borderTop: '1px solid #E2E8F0' }}>
              <span>IFA Supplement Stock:</span>
              <StatusBadge status="CRITICAL" customLabel="CRITICAL STOCK" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.375rem 0', borderTop: '1px solid #E2E8F0' }}>
              <span>Emergency Ambulance Service:</span>
              <StatusBadge status="AVAILABLE" customLabel="READY 24/7" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
