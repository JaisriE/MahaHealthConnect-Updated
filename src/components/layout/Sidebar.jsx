import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  LayoutDashboard,
  Users,
  Calendar,
  Activity,
  GitPullRequest,
  FileText,
  Stethoscope,
  Pill,
  Clock,
  ClipboardList,
  BarChart3,
  Search,
  Upload,
  Wifi,
  Radio,
  UserCheck,
  ShieldCheck,
  Building,
  Baby
} from 'lucide-react';

export const Sidebar = ({ mobileOpen, closeMobileSidebar }) => {
  const { role } = useAuth();
  const { t } = useLanguage();

  const getNavItems = () => {
    switch (role) {
      case 'patient':
        return [
          { to: '/patient', label: t('dashboard'), icon: <LayoutDashboard size={18} /> },
          { to: '/patient/profile', label: 'My Health Profile', icon: <UserCheck size={18} /> },
          { to: '/patient/appointments', label: t('appointments'), icon: <Calendar size={18} /> },
          { to: '/patient/referrals', label: 'Referral Status', icon: <GitPullRequest size={18} /> },
          { to: '/patient/prescriptions', label: t('prescriptions'), icon: <FileText size={18} /> },
          { to: '/patient/followups', label: t('followups'), icon: <Clock size={18} /> },
          { to: '/patient/maternal', label: 'Maternal Healthcare', icon: <Baby size={18} /> },
          { to: '/patient/services', label: 'Service Finder', icon: <Search size={18} /> },
          { to: '/patient/nfc', label: 'NFC Card Identification', icon: <Radio size={18} /> }
        ];

      case 'health_worker':
        return [
          { to: '/health-worker', label: t('dashboard'), icon: <LayoutDashboard size={18} /> },
          { to: '/health-worker/register', label: t('patientRegistration'), icon: <Users size={18} /> },
          { to: '/health-worker/patients', label: t('patientSearch'), icon: <Search size={18} /> },
          { to: '/health-worker/triage', label: t('digitalTriage'), icon: <Activity size={18} /> },
          { to: '/health-worker/appointments', label: t('appointments'), icon: <Calendar size={18} /> },
          { to: '/health-worker/referrals', label: t('referrals'), icon: <GitPullRequest size={18} /> },
          { to: '/health-worker/documents', label: t('documentUpload'), icon: <Upload size={18} /> },
          { to: '/health-worker/followups', label: t('followUps'), icon: <Clock size={18} /> },
          { to: '/health-worker/maternal', label: t('maternalCare'), icon: <Baby size={18} /> },
          { to: '/health-worker/sync', label: t('offlineSync'), icon: <Wifi size={18} /> }
        ];

      case 'doctor':
        return [
          { to: '/doctor', label: t('dashboard'), icon: <LayoutDashboard size={18} /> },
          { to: '/doctor/queue', label: t('queue'), icon: <ClipboardList size={18} /> },
          { to: '/doctor/patients', label: 'Authorized Patients', icon: <ShieldCheck size={18} /> },
          { to: '/doctor/diagnostics', label: t('diagnostics'), icon: <Stethoscope size={18} /> },
          { to: '/doctor/prescription', label: t('prescriptions'), icon: <FileText size={18} /> },
          { to: '/doctor/referrals', label: t('referrals'), icon: <GitPullRequest size={18} /> },
          { to: '/doctor/followups', label: t('followups'), icon: <Clock size={18} /> }
        ];

      case 'facility_admin':
        return [
          { to: '/facility-admin', label: t('dashboard'), icon: <LayoutDashboard size={18} /> },
          { to: '/facility-admin/attendance', label: t('attendance'), icon: <UserCheck size={18} /> },
          { to: '/facility-admin/doctors', label: 'Doctor Availability', icon: <Stethoscope size={18} /> },
          { to: '/facility-admin/medicines', label: t('medicines'), icon: <Pill size={18} /> },
          { to: '/facility-admin/diagnostics', label: 'Diagnostic Capacity', icon: <Activity size={18} /> },
          { to: '/facility-admin/referrals', label: 'Hospital Referrals Inbox', icon: <GitPullRequest size={18} /> },
          { to: '/facility-admin/analytics', label: t('reports'), icon: <BarChart3 size={18} /> }
        ];

      case 'district_authority':
        return [
          { to: '/district-authority', label: 'District Overview', icon: <LayoutDashboard size={18} /> },
          { to: '/district-authority/facilities', label: 'Facility Network', icon: <Building size={18} /> },
          { to: '/district-authority/referral-analytics', label: 'Referral Analytics', icon: <GitPullRequest size={18} /> },
          { to: '/district-authority/medicine-analytics', label: 'Medicine Stocks', icon: <Pill size={18} /> },
          { to: '/district-authority/diagnostic-analytics', label: 'Diagnostic Capacities', icon: <Activity size={18} /> },
          { to: '/district-authority/specialists', label: 'Specialist Distribution', icon: <Stethoscope size={18} /> },
          { to: '/district-authority/audit-logs', label: 'Security & Audit Logs', icon: <ShieldCheck size={18} /> }
        ];

      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <aside className={`gov-sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-nav">
        <div style={{ padding: '0.5rem 0.875rem', fontSize: '0.75rem', fontWeight: '700', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {t('navigationModule')}
        </div>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to.split('/').length <= 2}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={closeMobileSidebar}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </aside>
  );
};
