import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { OfflineProvider } from './context/OfflineContext';
import { PatientProvider } from './context/PatientContext';
import { AuditProvider } from './context/AuditContext';
import { AppLayout } from './components/layout/AppLayout';
import { LoginPage } from './pages/LoginPage';

import { PatientDashboard } from './pages/dashboards/PatientDashboard';
import { HealthWorkerDashboard } from './pages/dashboards/HealthWorkerDashboard';
import { DoctorDashboard } from './pages/dashboards/DoctorDashboard';
import { FacilityAdminDashboard } from './pages/dashboards/FacilityAdminDashboard';
import { DistrictDashboard } from './pages/dashboards/DistrictDashboard';
import { CriticalWorkflowPage } from './pages/CriticalWorkflowPage';
import { SupportingWorkflowPage } from './pages/SupportingWorkflowPage';
import { PatientRegistration } from './pages/healthWorker/PatientRegistration';
import { PatientSearch } from './pages/healthWorker/PatientSearch';
import { DigitalTriage } from './pages/healthWorker/DigitalTriage';

const RoleBasedRedirect = () => {
  const { role, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  switch (role) {
    case 'patient': return <Navigate to="/patient" replace />;
    case 'health_worker': return <Navigate to="/health-worker" replace />;
    case 'doctor': return <Navigate to="/doctor" replace />;
    case 'facility_admin': return <Navigate to="/facility-admin" replace />;
    case 'district_authority': return <Navigate to="/district-authority" replace />;
    default: return <Navigate to="/login" replace />;
  }
};

export function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <OfflineProvider>
          <PatientProvider>
            <AuditProvider>
              <BrowserRouter>
              <Routes>
                <Route path="/login" element={<LoginPage />} />

                {/* Main Application Layout Wrapper */}
                <Route element={<AppLayout />}>
                  <Route path="/" element={<RoleBasedRedirect />} />
                  <Route path="/triage" element={<DigitalTriage />} />

                  {/* Patient / Citizen Routes */}
                  <Route path="/patient" element={<PatientDashboard />} />
                  <Route path="/patient/profile" element={<SupportingWorkflowPage />} />
                  <Route path="/patient/appointments" element={<CriticalWorkflowPage />} />
                  <Route path="/patient/referrals" element={<CriticalWorkflowPage />} />
                  <Route path="/patient/prescriptions" element={<CriticalWorkflowPage />} />
                  <Route path="/patient/followups" element={<CriticalWorkflowPage />} />
                  <Route path="/patient/maternal" element={<SupportingWorkflowPage />} />
                  <Route path="/patient/services" element={<CriticalWorkflowPage />} />
                  <Route path="/patient/nfc" element={<SupportingWorkflowPage />} />

                  {/* Health Worker Routes */}
                  <Route path="/health-worker" element={<HealthWorkerDashboard />} />
                  <Route path="/health-worker/register" element={<PatientRegistration />} />
                  <Route path="/health-worker/patients" element={<PatientSearch />} />
                  <Route path="/health-worker/triage" element={<DigitalTriage />} />
                <Route path="/health-worker/appointments" element={<CriticalWorkflowPage />} />
                <Route path="/health-worker/referrals" element={<CriticalWorkflowPage />} />
                <Route path="/health-worker/documents" element={<SupportingWorkflowPage />} />
                <Route path="/health-worker/followups" element={<CriticalWorkflowPage />} />
                <Route path="/health-worker/maternal" element={<SupportingWorkflowPage />} />
                <Route path="/health-worker/sync" element={<CriticalWorkflowPage />} />

                {/* Doctor / Specialist Routes */}
                <Route path="/doctor" element={<DoctorDashboard />} />
                <Route path="/doctor/queue" element={<CriticalWorkflowPage />} />
                <Route path="/doctor/patients" element={<CriticalWorkflowPage />} />
                <Route path="/doctor/history" element={<CriticalWorkflowPage />} />
                <Route path="/doctor/diagnostics" element={<CriticalWorkflowPage />} />
                <Route path="/doctor/prescription" element={<CriticalWorkflowPage />} />
                <Route path="/doctor/referrals" element={<CriticalWorkflowPage />} />
                <Route path="/doctor/followups" element={<CriticalWorkflowPage />} />

                {/* Facility Administrator Routes */}
                <Route path="/facility-admin" element={<FacilityAdminDashboard />} />
                <Route path="/facility-admin/attendance" element={<SupportingWorkflowPage />} />
                <Route path="/facility-admin/doctors" element={<CriticalWorkflowPage />} />
                <Route path="/facility-admin/medicines" element={<CriticalWorkflowPage />} />
                <Route path="/facility-admin/diagnostics" element={<CriticalWorkflowPage />} />
                <Route path="/facility-admin/referrals" element={<CriticalWorkflowPage />} />
                <Route path="/facility-admin/analytics" element={<SupportingWorkflowPage />} />
                <Route path="/facility-admin/staff" element={<SupportingWorkflowPage />} />

                {/* District Authority Routes */}
                <Route path="/district-authority" element={<DistrictDashboard />} />
                <Route path="/district-authority/facilities" element={<CriticalWorkflowPage />} />
                <Route path="/district-authority/referral-analytics" element={<SupportingWorkflowPage />} />
                <Route path="/district-authority/medicine-analytics" element={<SupportingWorkflowPage />} />
                <Route path="/district-authority/diagnostic-analytics" element={<SupportingWorkflowPage />} />
                <Route path="/district-authority/specialists" element={<SupportingWorkflowPage />} />
                <Route path="/district-authority/quality" element={<SupportingWorkflowPage />} />
                <Route path="/district-authority/audit-logs" element={<CriticalWorkflowPage />} />

                {/* Catch-all */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuditProvider>
      </PatientProvider>
      </OfflineProvider>
    </LanguageProvider>
  </AuthProvider>
  );
}

export default App;
