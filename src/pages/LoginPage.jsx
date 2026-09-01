import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import {
  ShieldCheck,
  User,
  Stethoscope,
  Building2,
  BarChart,
  UserCheck,
  ArrowRight,
  Lock,
  Phone,
  Info,
  CheckCircle2
} from 'lucide-react';

export const LoginPage = () => {
  const { switchRole, loginAsUser } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('health_worker');

  const handleManualLogin = (e) => {
    e.preventDefault();
    loginAsUser(username, password, selectedRole);
    navigateToRoleDashboard(selectedRole);
  };

  const handleDemoLaunch = (roleKey) => {
    switchRole(roleKey);
    navigateToRoleDashboard(roleKey);
  };

  const navigateToRoleDashboard = (roleKey) => {
    switch (roleKey) {
      case 'patient': navigate('/patient'); break;
      case 'health_worker': navigate('/health-worker'); break;
      case 'doctor': navigate('/doctor'); break;
      case 'facility_admin': navigate('/facility-admin'); break;
      case 'district_authority': navigate('/district-authority'); break;
      default: navigate('/health-worker'); break;
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0F2C59',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        backgroundImage: 'radial-gradient(circle at 50% 20%, #1E40AF 0%, #0F2C59 70%)'
      }}
    >
      {/* Top Banner Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem', color: '#ffffff' }}>
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#D97706',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontWeight: 'bold',
            fontSize: '1.8rem',
            margin: '0 auto 1rem',
            border: '3px solid #ffffff',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
          }}
        >
          महा
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', letterSpacing: '-0.02em' }}>
          महा-हेल्थ-कनेक्ट | MahaHealthConnect
        </h1>
        <p style={{ color: '#CBD5E1', fontSize: '0.9375rem', marginTop: '0.25rem' }}>
          Government of Maharashtra Digital Healthcare Coordination Platform
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          maxWidth: '1000px',
          width: '100%'
        }}
      >
        {/* SIH Judge Quick Demo Launcher Panel */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '14px',
            padding: '1.75rem',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
            borderTop: '5px solid #D97706'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <ShieldCheck size={24} style={{ color: '#D97706' }} />
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0F2C59' }}>
                SIH Judge Quick Demo Launcher
              </h2>
              <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                One-click instant role switching for presentation judges
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button
              onClick={() => handleDemoLaunch('health_worker')}
              className="gov-btn gov-btn-primary"
              style={{ justifyContent: 'space-between', padding: '0.875rem 1rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <UserCheck size={20} style={{ color: '#F59E0B' }} />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: '700' }}>Health Worker (ASHA / ANM)</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Sunita Shinde • PHC Mulshi</div>
                </div>
              </div>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => handleDemoLaunch('doctor')}
              className="gov-btn"
              style={{ justifyContent: 'space-between', padding: '0.875rem 1rem', backgroundColor: '#EFF6FF', color: '#1E40AF', borderColor: '#BFDBFE' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Stethoscope size={20} />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: '700' }}>Doctor / Specialist</div>
                  <div style={{ fontSize: '0.75rem', color: '#3B82F6' }}>Dr. Aniket Deshmukh • District Hospital Aundh</div>
                </div>
              </div>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => handleDemoLaunch('facility_admin')}
              className="gov-btn"
              style={{ justifyContent: 'space-between', padding: '0.875rem 1rem', backgroundColor: '#ECFDF5', color: '#065F46', borderColor: '#A7F3D0' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Building2 size={20} />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: '700' }}>Facility Administrator</div>
                  <div style={{ fontSize: '0.75rem', color: '#059669' }}>Rajesh Pawar • Hospital Capacity & Medicines</div>
                </div>
              </div>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => handleDemoLaunch('patient')}
              className="gov-btn"
              style={{ justifyContent: 'space-between', padding: '0.875rem 1rem', backgroundColor: '#FEF3C7', color: '#92400E', borderColor: '#FDE68A' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <User size={20} />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: '700' }}>Citizen / Patient</div>
                  <div style={{ fontSize: '0.75rem', color: '#D97706' }}>Ramesh Patil • Appointments & Prescriptions</div>
                </div>
              </div>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => handleDemoLaunch('district_authority')}
              className="gov-btn"
              style={{ justifyContent: 'space-between', padding: '0.875rem 1rem', backgroundColor: '#F3E8FF', color: '#6B21A8', borderColor: '#E9D5FF' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <BarChart size={20} />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: '700' }}>District Health Officer (DHO)</div>
                  <div style={{ fontSize: '0.75rem', color: '#7E22CE' }}>Dr. Meena Kulkarni • Pune District Overview</div>
                </div>
              </div>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Credentials Form Login */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '14px',
            padding: '1.75rem',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
          }}
        >
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0F2C59', marginBottom: '0.25rem' }}>
            Government Employee / Citizen Login
          </h2>
          <p style={{ fontSize: '0.8125rem', color: '#64748B', marginBottom: '1.25rem' }}>
            Enter ABHA ID, Mobile Number, or Government Employee ID
          </p>

          <form onSubmit={handleManualLogin}>
            <div className="gov-form-group">
              <label className="gov-label">Select Stakeholder Role</label>
              <select
                className="gov-select"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <option value="health_worker">Health Worker (ASHA / ANM)</option>
                <option value="doctor">Doctor / Specialist</option>
                <option value="facility_admin">Facility Administrator</option>
                <option value="patient">Citizen / Patient</option>
                <option value="district_authority">District Health Officer (DHO)</option>
              </select>
            </div>

            <div className="gov-form-group">
              <label className="gov-label">User Identifier (Phone / ABHA / Emp ID)</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  className="gov-input"
                  placeholder="e.g. 9822012345 or MHC-8841"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{ paddingLeft: '2.5rem' }}
                />
                <Phone size={16} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
              </div>
            </div>

            <div className="gov-form-group">
              <label className="gov-label">Password / OTP Passcode</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  className="gov-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingLeft: '2.5rem' }}
                />
                <Lock size={16} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
              </div>
            </div>

            <button type="submit" className="gov-btn gov-btn-saffron" style={{ width: '100%', marginTop: '1rem' }}>
              Sign In to Portal
            </button>

            <div
              style={{
                marginTop: '1.25rem',
                padding: '0.75rem',
                backgroundColor: '#F8FAFC',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                fontSize: '0.75rem',
                color: '#64748B',
                lineHeight: 1.4
              }}
            >
              <div style={{ fontWeight: '700', color: '#0F2C59', marginBottom: '0.25rem' }}>
                🔒 Secure Portal Notice
              </div>
              Role-based access controls (RBAC) active. All sensitive access attempts are logged in the District Security Audit Trail.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
