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
import { ModulePlaceholder } from './pages/ModulePlaceholder';
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
                  <Route path="/patient/profile" element={<ModulePlaceholder title="Patient Profile & Emergency Contacts" />} />
                  <Route path="/patient/appointments" element={<ModulePlaceholder title="My OPD Appointments" />} />
                  <Route path="/patient/referrals" element={<ModulePlaceholder title="Hospital Referral Status Tracker" />} />
                  <Route path="/patient/prescriptions" element={<ModulePlaceholder title="Digital Prescription Records" />} />
                  <Route path="/patient/followups" element={<ModulePlaceholder title="Follow-up Reminders" />} />
                  <Route path="/patient/maternal" element={<ModulePlaceholder title="Maternal Care & ANC Tracker" />} />
                  <Route path="/patient/services" element={<ModulePlaceholder title="Healthcare Service Finder" />} />
                  <Route path="/patient/nfc" element={<ModulePlaceholder title="NFC Card Identification Interface" />} />

                  {/* Health Worker Routes */}
                  <Route path="/health-worker" element={<HealthWorkerDashboard />} />
                  <Route path="/health-worker/register" element={<PatientRegistration />} />
                  <Route path="/health-worker/patients" element={<PatientSearch />} />
                  <Route path="/health-worker/triage" element={<DigitalTriage />} />
                <Route path="/health-worker/appointments" element={<ModulePlaceholder title="OPD Appointment Booking" />} />
                <Route path="/health-worker/referrals" element={<ModulePlaceholder title="Multi-Hospital Referral System" />} />
                <Route path="/health-worker/documents" element={<ModulePlaceholder title="Secure Patient Document Upload" />} />
                <Route path="/health-worker/followups" element={<ModulePlaceholder title="Follow-up Tracking" />} />
                <Route path="/health-worker/maternal" element={<ModulePlaceholder title="Maternal Care Protocol Workflow" />} />
                <Route path="/health-worker/sync" element={<ModulePlaceholder title="Offline Local Sync Center" />} />

                {/* Doctor / Specialist Routes */}
                <Route path="/doctor" element={<DoctorDashboard />} />
                <Route path="/doctor/queue" element={<ModulePlaceholder title="Live OPD Patient Queue" />} />
                <Route path="/doctor/patients" element={<ModulePlaceholder title="Authorized Patient Records" />} />
                <Route path="/doctor/history" element={<ModulePlaceholder title="Patient Clinical History" />} />
                <Route path="/doctor/diagnostics" element={<ModulePlaceholder title="Diagnostic Test Orders" />} />
                <Route path="/doctor/prescription" element={<ModulePlaceholder title="Structured Digital Prescription" />} />
                <Route path="/doctor/referrals" element={<ModulePlaceholder title="Specialist Referral Review" />} />
                <Route path="/doctor/followups" element={<ModulePlaceholder title="Follow-up Scheduling" />} />

                {/* Facility Administrator Routes */}
                <Route path="/facility-admin" element={<FacilityAdminDashboard />} />
                <Route path="/facility-admin/attendance" element={<ModulePlaceholder title="Staff Attendance Log" />} />
                <Route path="/facility-admin/doctors" element={<ModulePlaceholder title="Doctor Availability & Duty Roster" />} />
                <Route path="/facility-admin/medicines" element={<ModulePlaceholder title="Medicine Inventory Management" />} />
                <Route path="/facility-admin/diagnostics" element={<ModulePlaceholder title="Diagnostic Test Capacities" />} />
                <Route path="/facility-admin/referrals" element={<ModulePlaceholder title="Incoming Hospital Referrals Inbox" />} />
                <Route path="/facility-admin/analytics" element={<ModulePlaceholder title="Facility Operations Analytics" />} />
                <Route path="/facility-admin/staff" element={<ModulePlaceholder title="Staff & Department Roster" />} />

                {/* District Authority Routes */}
                <Route path="/district-authority" element={<DistrictDashboard />} />
                <Route path="/district-authority/facilities" element={<ModulePlaceholder title="District Healthcare Facility Network" />} />
                <Route path="/district-authority/referral-analytics" element={<ModulePlaceholder title="Cross-Hospital Referral Analytics" />} />
                <Route path="/district-authority/medicine-analytics" element={<ModulePlaceholder title="District Medicine Inventory Analytics" />} />
                <Route path="/district-authority/diagnostic-analytics" element={<ModulePlaceholder title="District Diagnostic Capacities" />} />
                <Route path="/district-authority/specialists" element={<ModulePlaceholder title="Specialist Doctor Distribution" />} />
                <Route path="/district-authority/quality" element={<ModulePlaceholder title="Quality & Service Delivery Metrics" />} />
                <Route path="/district-authority/audit-logs" element={<ModulePlaceholder title="Security & Patient Data Audit Logs" />} />

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
