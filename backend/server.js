import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { databaseConfigured, databaseHealth, initializeDatabase } from './database.js';
import { MOCK_FACILITIES, MOCK_PATIENTS, MOCK_USERS, MOCK_APPOINTMENTS, MOCK_REFERRALS, MOCK_MEDICINES, MOCK_DIAGNOSTICS } from '../src/mockData/index.js';

const app = express();
const port = Number(process.env.PORT || 4000);
const jwtSecret = process.env.JWT_SECRET || 'maha-health-connect-demo-secret';
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || true }));
app.use(express.json({ limit: '1mb' }));

const demoPasswords = {
  patient: 'patient123',
  health_worker: 'worker123',
  doctor: 'doctor123',
  facility_admin: 'admin123',
  district_authority: 'district123'
};
const users = Object.values(MOCK_USERS).map((user) => ({
  ...user,
  passwordHash: bcrypt.hashSync(demoPasswords[user.role], 10)
}));
const store = {
  patients: [...MOCK_PATIENTS],
  triage: [],
  referrals: [...MOCK_REFERRALS],
  appointments: [...MOCK_APPOINTMENTS],
  audit: [],
  facilities: [...MOCK_FACILITIES],
  medicines: [...MOCK_MEDICINES],
  diagnostics: [...MOCK_DIAGNOSTICS]
  ,consultations: [], prescriptions: [], diagnosticOrders: [], followups: []
};

const publicUser = (user) => Object.fromEntries(Object.entries(user).filter(([key]) => key !== 'passwordHash'));
const signToken = (user) => jwt.sign({ sub: user.user_id, role: user.role }, jwtSecret, { expiresIn: '8h' });
const audit = (user, action, result, patientId = null, reason = '') => {
  store.audit.unshift({ id: `LOG-${Date.now()}`, user_id: user?.user_id || 'anonymous', user_name: user?.name || 'Anonymous', role: user?.role || 'unknown', action, result, patient_id: patientId, facility_id: user?.facility_id || null, reason, timestamp: new Date().toISOString() });
};
const authenticate = (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Authentication required' });
  try {
    const payload = jwt.verify(token, jwtSecret);
    req.user = users.find((user) => user.user_id === payload.sub);
    if (!req.user) throw new Error('Unknown user');
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired session' });
  }
};
const allow = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    audit(req.user, `${req.method} ${req.path}`, 'DENIED', req.params.patientId, 'Role is not permitted');
    return res.status(403).json({ error: 'You are not authorized for this action' });
  }
  next();
};
const findPatient = (id) => store.patients.find((patient) => patient.patient_id === id);
const canAccessPatient = (user, patient, clinical = false) => {
  if (!patient) return false;
  if (user.role === 'patient') return user.patient_id === patient.patient_id;
  if (user.role === 'health_worker') return !clinical && (!user.facility_id || user.facility_id === (patient.registered_facility_id || 'FAC-101'));
  if (user.role === 'doctor') return store.appointments.some((appointment) => appointment.patient_id === patient.patient_id && appointment.doctor_id === user.user_id && appointment.status !== 'CANCELLED');
  return user.role === 'facility_admin' ? user.facility_id === patient.registered_facility_id : false;
};

app.get('/api/health', async (_req, res) => res.json({ status: 'ok', service: 'Maha Health Connect API', persistence: databaseConfigured ? await databaseHealth() : { configured: false, connected: false, mode: 'demo-memory' } }));
app.post('/api/auth/login', async (req, res) => {
  const { username, password, role } = req.body || {};
  const user = users.find((candidate) => candidate.role === role && (candidate.user_id === username || candidate.name.toLowerCase() === String(username || '').toLowerCase()));
  if (!user || !(await bcrypt.compare(password || '', user.passwordHash))) {
    audit(null, 'LOGIN', 'DENIED', null, 'Invalid demo credentials');
    return res.status(401).json({ error: 'Invalid username, password, or role' });
  }
  audit(user, 'LOGIN', 'AUTHORIZED');
  res.json({ token: signToken(user), user: publicUser(user) });
});
app.post('/api/auth/logout', authenticate, (req, res) => { audit(req.user, 'LOGOUT', 'AUTHORIZED'); res.status(204).end(); });
app.get('/api/me', authenticate, (req, res) => res.json({ user: publicUser(req.user) }));

app.get('/api/patients', authenticate, (req, res) => {
  const query = String(req.query.q || '').toLowerCase();
  const visible = store.patients.filter((patient) => canAccessPatient(req.user, patient) && (!query || [patient.patient_id, patient.name, patient.phone].some((value) => String(value || '').toLowerCase().includes(query))));
  audit(req.user, 'PATIENT_SEARCH', 'AUTHORIZED');
  res.json({ patients: visible.map((patient) => Object.fromEntries(Object.entries(patient).filter(([key]) => key !== 'medical_info'))) });
});
app.post('/api/patients', authenticate, allow('health_worker'), (req, res) => {
  const payload = req.body || {};
  const cleanPhone = String(payload.phone || '').replace(/\D/g, '');
  const duplicate = store.patients.find((patient) => cleanPhone && String(patient.phone || '').replace(/\D/g, '').endsWith(cleanPhone));
  if (duplicate) return res.status(409).json({ error: 'A patient with this phone number already exists', patient: duplicate });
  const patient = { ...payload, patient_id: `PAT-MH-${String(store.patients.length + 128).padStart(6, '0')}`, registered_facility_id: req.user.facility_id, registered_by: req.user.name, registered_at: new Date().toISOString(), record_version: 1 };
  store.patients.unshift(patient);
  audit(req.user, 'PATIENT_REGISTRATION', 'AUTHORIZED', patient.patient_id);
  res.status(201).json({ patient });
});
app.get('/api/patients/:patientId', authenticate, (req, res) => {
  const patient = findPatient(req.params.patientId);
  const clinical = req.query.dataType === 'CLINICAL_FULL';
  if (!patient || !canAccessPatient(req.user, patient, clinical)) { audit(req.user, 'RECORD_ACCESS', 'DENIED', req.params.patientId, 'No active care relationship'); return res.status(403).json({ error: 'Patient record access denied' }); }
  audit(req.user, 'RECORD_ACCESS', 'AUTHORIZED', patient.patient_id, clinical ? 'Clinical access window verified' : 'Operational access');
  res.json({ patient });
});
app.post('/api/triage', authenticate, allow('health_worker'), (req, res) => {
  const { patient_id, priority, indicators = [], vitals = {}, reason } = req.body || {};
  const patient = findPatient(patient_id);
  if (!patient || !canAccessPatient(req.user, patient)) return res.status(403).json({ error: 'Patient is outside your facility scope' });
  const record = { triage_id: `TRG-${Date.now().toString().slice(-6)}`, patient_id, priority, indicators, vitals, reason, facility_id: req.user.facility_id, health_worker_id: req.user.user_id, created_at: new Date().toISOString(), sync_status: 'SYNCED' };
  store.triage.unshift(record);
  audit(req.user, 'TRIAGE', 'AUTHORIZED', patient_id, priority);
  res.status(201).json({ triage: record });
});

const scoreFacility = (facility, { specialty = '', diagnostic = '', emergency = false, equipment = '', bedRequired = false } = {}) => {
  const reasons = [];
  const hasSpecialty = !specialty || facility.specialties.some((item) => item.toLowerCase().includes(specialty.toLowerCase()));
  const hasDiagnostic = !diagnostic || facility.specialties.some((item) => item.toLowerCase().includes(diagnostic.toLowerCase())) || facility.type !== 'PHC';
  const emergencyReady = !emergency || facility.specialties.some((item) => /emergency|icu|trauma/i.test(item));
  const equipmentReady = !equipment || facility.specialties.some((item) => item.toLowerCase().includes(equipment.toLowerCase())) || facility.type !== 'PHC';
  const bedsReady = !bedRequired || facility.active_beds > 0;
  const score = Math.round((hasSpecialty ? 25 : 0) + (hasDiagnostic ? 20 : 0) + (emergencyReady ? 20 : 0) + (equipmentReady ? 15 : 0) + (bedsReady ? 10 : 0) + 5 + (facility.status === 'AVAILABLE' ? 5 : 0));
  if (hasSpecialty) reasons.push('Specialty available');
  if (hasDiagnostic) reasons.push('Diagnostic capacity available');
  if (emergencyReady) reasons.push('Emergency capability available');
  if (bedsReady) reasons.push(`${facility.active_beds} active beds reported`);
  return { facility_id: facility.facility_id, facility: facility.name, distance: facility.distance_km, match_score: score, reasons, specialty_available: hasSpecialty, diagnostic_available: hasDiagnostic, emergency_ready: emergencyReady, beds_available: bedsReady };
};
app.post('/api/facilities/match', authenticate, (req, res) => { const matches = store.facilities.map((facility) => scoreFacility(facility, req.body)).sort((a, b) => b.match_score - a.match_score); audit(req.user, 'FACILITY_MATCH_REQUESTED', 'AUTHORIZED'); res.json({ weights: { specialty: 25, diagnostic: 20, emergency: 20, equipment: 15, beds: 10, medicines: 5, distance: 5 }, matches }); });
app.get('/api/facilities', authenticate, (_req, res) => res.json({ facilities: store.facilities }));
app.patch('/api/facilities/:facilityId/resources', authenticate, allow('facility_admin'), (req, res) => { const facility = store.facilities.find((item) => item.facility_id === req.params.facilityId); if (!facility || facility.facility_id !== req.user.facility_id) return res.status(403).json({ error: 'Facility resource access denied' }); Object.assign(facility, { ...req.body, last_verified: 'Just now' }); audit(req.user, 'FACILITY_RESOURCES_UPDATED', 'AUTHORIZED', null, 'Beds, medicines, equipment, diagnostics, or doctor availability'); res.json({ facility }); });
app.get('/api/appointments', authenticate, (req, res) => res.json({ appointments: store.appointments.filter((appointment) => req.user.role === 'patient' ? appointment.patient_id === req.user.patient_id : true) }));
app.post('/api/appointments', authenticate, allow('patient', 'health_worker'), (req, res) => { const appointment = { ...req.body, appointment_id: `APT-${Date.now().toString().slice(-6)}`, status: 'BOOKED', created_at: new Date().toISOString() }; store.appointments.unshift(appointment); audit(req.user, 'APPOINTMENT_CREATED', 'AUTHORIZED', appointment.patient_id); res.status(201).json({ appointment }); });
app.get('/api/queue', authenticate, allow('doctor'), (req, res) => res.json({ queue: store.appointments.filter((appointment) => appointment.doctor_id === req.user.user_id && appointment.status !== 'CANCELLED') }));
app.patch('/api/queue/:appointmentId', authenticate, allow('doctor'), (req, res) => { const appointment = store.appointments.find((item) => item.appointment_id === req.params.appointmentId); if (!appointment) return res.status(404).json({ error: 'Queue entry not found' }); appointment.status = req.body.status || appointment.status; res.json({ appointment }); });
app.post('/api/consultations', authenticate, allow('doctor'), (req, res) => { const patient = findPatient(req.body.patient_id); if (!canAccessPatient(req.user, patient, true)) return res.status(403).json({ error: 'Clinical access window is not active' }); const consultation = { ...req.body, consultation_id: `CON-${Date.now().toString().slice(-6)}`, doctor_id: req.user.user_id, facility_id: req.user.facility_id, created_at: new Date().toISOString() }; store.consultations.unshift(consultation); audit(req.user, 'CONSULTATION_CREATED', 'AUTHORIZED', consultation.patient_id); res.status(201).json({ consultation }); });
app.post('/api/prescriptions', authenticate, allow('doctor'), (req, res) => { const prescription = { ...req.body, prescription_id: `RX-${Date.now().toString().slice(-6)}`, doctor_id: req.user.user_id, created_at: new Date().toISOString() }; store.prescriptions.unshift(prescription); audit(req.user, 'PRESCRIPTION_CREATED', 'AUTHORIZED', prescription.patient_id); res.status(201).json({ prescription }); });
app.get('/api/prescriptions', authenticate, (req, res) => res.json({ prescriptions: store.prescriptions.filter((item) => req.user.role !== 'patient' || item.patient_id === req.user.patient_id) }));
app.post('/api/diagnostics/orders', authenticate, allow('doctor'), (req, res) => { const order = { ...req.body, order_id: `DOR-${Date.now().toString().slice(-6)}`, status: 'ORDERED', doctor_id: req.user.user_id, created_at: new Date().toISOString() }; store.diagnosticOrders.unshift(order); audit(req.user, 'DIAGNOSTIC_ORDER_CREATED', 'AUTHORIZED', order.patient_id); res.status(201).json({ order }); });
app.get('/api/diagnostics/orders', authenticate, (req, res) => res.json({ orders: store.diagnosticOrders.filter((order) => req.user.role !== 'patient' || order.patient_id === req.user.patient_id) }));
app.patch('/api/diagnostics/orders/:orderId', authenticate, allow('facility_admin', 'doctor'), (req, res) => { const order = store.diagnosticOrders.find((item) => item.order_id === req.params.orderId); if (!order) return res.status(404).json({ error: 'Diagnostic order not found' }); order.status = req.body.status || order.status; order.result = req.body.result || order.result; audit(req.user, 'DIAGNOSTIC_RESULT_UPDATED', 'AUTHORIZED', order.patient_id); res.json({ order }); });
app.post('/api/followups', authenticate, allow('doctor', 'health_worker'), (req, res) => { const followup = { ...req.body, followup_id: `FUP-${Date.now().toString().slice(-6)}`, status: 'SCHEDULED', created_at: new Date().toISOString() }; store.followups.unshift(followup); audit(req.user, 'FOLLOWUP_CREATED', 'AUTHORIZED', followup.patient_id); res.status(201).json({ followup }); });
app.get('/api/followups', authenticate, (req, res) => res.json({ followups: store.followups.filter((item) => req.user.role !== 'patient' || item.patient_id === req.user.patient_id) }));
app.get('/api/referrals', authenticate, (req, res) => res.json({ referrals: store.referrals.filter((referral) => req.user.role === 'patient' ? referral.patient_id === req.user.patient_id : true) }));
app.post('/api/referrals', authenticate, allow('health_worker', 'doctor'), (req, res) => { const referral = { ...req.body, referral_id: `REF-${Date.now().toString().slice(-6)}`, status: 'SENT', created_at: new Date().toISOString(), referring_facility_id: req.user.facility_id }; store.referrals.unshift(referral); audit(req.user, 'REFERRAL_CREATION', 'AUTHORIZED', referral.patient_id); res.status(201).json({ referral }); });
app.patch('/api/referrals/:referralId/decision', authenticate, allow('facility_admin'), (req, res) => { const referral = store.referrals.find((item) => item.referral_id === req.params.referralId); if (!referral) return res.status(404).json({ error: 'Referral not found' }); referral.status = req.body.status === 'ACCEPTED' ? 'ACTIVE' : 'REJECTED'; referral.decision_reason = req.body.reason || ''; audit(req.user, `REFERRAL_${referral.status}`, 'AUTHORIZED', referral.patient_id); res.json({ referral }); });
app.get('/api/medicines', authenticate, (_req, res) => res.json({ medicines: store.medicines }));
app.get('/api/diagnostics', authenticate, (_req, res) => res.json({ diagnostics: store.diagnostics }));
app.get('/api/audit', authenticate, allow('district_authority', 'facility_admin'), (_req, res) => res.json({ logs: store.audit }));
app.post('/api/sync', authenticate, async (req, res) => { const items = Array.isArray(req.body?.items) ? req.body.items : []; const results = items.map((item) => ({ local_id: item.local_id, status: 'SYNCED' })); audit(req.user, 'SYNC', 'AUTHORIZED', null, `${results.length} item(s)`); res.json({ results, synced_at: new Date().toISOString() }); });

app.use((error, _req, res, _next) => { console.error(error); res.status(500).json({ error: 'Unexpected server error' }); });
initializeDatabase()
  .then(() => app.listen(port, () => console.log(`Maha Health Connect API listening on http://localhost:${port}`)))
  .catch((error) => { console.error(`PostgreSQL initialization failed: ${error.message}`); process.exitCode = 1; });
