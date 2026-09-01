// MahaHealthConnect Database-Ready Mock Architecture
// Entities map directly to backend database schemas: facility, doctor, patient, referral, medicine, etc.

export const MOCK_FACILITIES = [
  {
    facility_id: "FAC-101",
    name: "PHC Mulshi (Primary Health Centre)",
    type: "PHC",
    district: "Pune",
    taluka: "Mulshi",
    address: "Mulshi Village, Paud Road, Pune - 412108",
    contact: "+91 20 2738 1102",
    doctor_count: 3,
    active_beds: 12,
    distance_km: "4.2 km",
    last_verified: "10 mins ago",
    status: "AVAILABLE",
    latitude: 18.5089,
    longitude: 73.5098,
    specialties: ["General Medicine", "Maternal Care", "Immunization", "Basic Triage"]
  },
  {
    facility_id: "FAC-102",
    name: "BHC Haveli (Block Health Centre)",
    type: "BHC",
    district: "Pune",
    taluka: "Haveli",
    address: "Haveli Town Centre, Pune - 411024",
    contact: "+91 20 2891 0044",
    doctor_count: 6,
    active_beds: 30,
    distance_km: "11.5 km",
    last_verified: "5 mins ago",
    status: "AVAILABLE",
    latitude: 18.4512,
    longitude: 73.8123,
    specialties: ["General Medicine", "Pediatrics", "Obstetrics", "Basic Diagnostics"]
  },
  {
    facility_id: "FAC-103",
    name: "District Hospital Aundh",
    type: "District Hospital",
    district: "Pune",
    taluka: "Pune City",
    address: "Aundh Chest Hospital Campus, Pune - 411027",
    contact: "+91 20 2728 0100",
    doctor_count: 45,
    active_beds: 350,
    distance_km: "18.0 km",
    last_verified: "Just now",
    status: "AVAILABLE",
    latitude: 18.5612,
    longitude: 73.8090,
    specialties: ["Cardiology", "Neurology", "Orthopedics", "Emergency ICU", "Advanced Radiology", "Maternal ICU"]
  },
  {
    facility_id: "FAC-104",
    name: "Sub-District Hospital Baramati",
    type: "Sub-District Hospital",
    district: "Pune",
    taluka: "Baramati",
    address: "Bhigwan Road, Baramati - 413102",
    contact: "+91 2112 222104",
    doctor_count: 22,
    active_beds: 100,
    distance_km: "42.0 km",
    last_verified: "15 mins ago",
    status: "AVAILABLE",
    latitude: 18.1519,
    longitude: 74.5772,
    specialties: ["General Surgery", "Gynecology", "Pediatrics", "Dialysis"]
  },
  {
    facility_id: "FAC-105",
    name: "Sassoon General Hospital & Medical College",
    type: "Tertiary Govt Hospital",
    district: "Pune",
    taluka: "Pune City",
    address: "Near Pune Railway Station, Pune - 411001",
    contact: "+91 20 2612 8000",
    doctor_count: 120,
    active_beds: 1200,
    distance_km: "24.5 km",
    last_verified: "Just now",
    status: "CRITICAL_CAPACITY",
    latitude: 18.5284,
    longitude: 73.8739,
    specialties: ["Super-Specialty Trauma", "Neurosurgery", "Cardiothoracic", "Oncology", "Neonatal ICU"]
  }
];

export const MOCK_USERS = {
  patient: {
    user_id: "USR-PAT-001",
    role: "patient",
    name: "Ramesh Tukaram Patil",
    name_mr: "रमेश तुकाराम पाटील",
    patient_id: "PAT-10245",
    age: 48,
    gender: "Male",
    phone: "+91 98220 12345",
    village: "Mulshi Gaon",
    taluka: "Mulshi",
    district: "Pune",
    blood_group: "O+",
    nfc_token: "NFC-PAT-10245-MH",
    assigned_facility_id: "FAC-101",
    emergency_contact: "Sunita Patil (Wife) - +91 98220 54321"
  },
  health_worker: {
    user_id: "USR-HW-002",
    role: "health_worker",
    name: "Sunita Laxman Shinde",
    name_mr: "सुनिता लक्ष्मण शिंदे",
    designation: "Senior ASHA / ANM Coordinator",
    facility_id: "FAC-101",
    facility_name: "PHC Mulshi",
    district: "Pune",
    assigned_villages: ["Mulshi Gaon", "Bhukum", "Pirangut"]
  },
  doctor: {
    user_id: "USR-DOC-003",
    role: "doctor",
    name: "Dr. Aniket Deshmukh",
    name_mr: "डॉ. अनिकेत देशमुख",
    qualification: "MD (General Medicine), DNB Cardiology",
    specialty: "Cardiology & Internal Medicine",
    facility_id: "FAC-103",
    facility_name: "District Hospital Aundh",
    district: "Pune",
    license_no: "MHC-MED-2018-8841"
  },
  facility_admin: {
    user_id: "USR-ADM-004",
    role: "facility_admin",
    name: "Rajesh S. Pawar",
    name_mr: "राजेश एस. पवार",
    designation: "Chief Medical Administrative Officer",
    facility_id: "FAC-103",
    facility_name: "District Hospital Aundh",
    district: "Pune"
  },
  district_authority: {
    user_id: "USR-DHO-005",
    role: "district_authority",
    name: "Dr. Meena Kulkarni",
    name_mr: "डॉ. मीना कुलकर्णी",
    designation: "District Health Officer (DHO)",
    district: "Pune District",
    jurisdiction: "All 14 Talukas, 28 PHCs, 6 District/Sub-District Hospitals"
  }
};

export const MOCK_PATIENTS = [
  {
    patient_id: "PAT-10245",
    name: "Ramesh Tukaram Patil",
    age: 48,
    gender: "Male",
    phone: "+91 98220 12345",
    village: "Mulshi Gaon",
    district: "Pune",
    nfc_token: "NFC-PAT-10245-MH",
    vitals: { bp: "145/92", pulse: 84, temp: "98.6 °F", spo2: "97%", weight: "68 kg" },
    triage_status: "HIGH",
    triage_reason: "Acute Chest Tightness & Uncontrolled Hypertension",
    registered_by: "Sunita Shinde (HW)",
    registered_at: "2026-08-29 09:30 AM"
  },
  {
    patient_id: "PAT-10246",
    name: "Savita Dnyaneshwar Jadhav",
    age: 26,
    gender: "Female",
    phone: "+91 97654 88123",
    village: "Bhukum",
    district: "Pune",
    nfc_token: "NFC-PAT-10246-MH",
    vitals: { bp: "110/70", pulse: 76, temp: "98.4 °F", spo2: "99%", weight: "54 kg" },
    triage_status: "NORMAL",
    triage_reason: "Maternal Routine Antenatal Checkup (24 Weeks)",
    is_maternal: true,
    registered_by: "Sunita Shinde (HW)",
    registered_at: "2026-08-30 08:15 AM"
  },
  {
    patient_id: "PAT-10247",
    name: "Ganpat Rao More",
    age: 62,
    gender: "Male",
    phone: "+91 94210 33499",
    village: "Pirangut",
    district: "Pune",
    nfc_token: "NFC-PAT-10247-MH",
    vitals: { bp: "170/105", pulse: 102, temp: "99.1 °F", spo2: "93%", weight: "72 kg" },
    triage_status: "EMERGENCY",
    triage_reason: "Severe Shortness of Breath & ECG ST Elevation",
    registered_by: "Sunita Shinde (HW)",
    registered_at: "2026-08-30 10:45 AM"
  }
];

export const MOCK_APPOINTMENTS = [
  {
    appointment_id: "APT-8801",
    patient_id: "PAT-10245",
    patient_name: "Ramesh Tukaram Patil",
    doctor_id: "USR-DOC-003",
    doctor_name: "Dr. Aniket Deshmukh",
    facility_id: "FAC-103",
    facility_name: "District Hospital Aundh",
    date: "2026-08-31",
    time: "10:30 AM",
    type: "Cardiology Referral Consultation",
    status: "CONFIRMED",
    token_number: "C-14",
    triage_priority: "HIGH"
  },
  {
    appointment_id: "APT-8802",
    patient_id: "PAT-10246",
    patient_name: "Savita Dnyaneshwar Jadhav",
    doctor_id: "USR-DOC-Gyne",
    doctor_name: "Dr. Priyamvada Joshi",
    facility_id: "FAC-102",
    facility_name: "BHC Haveli",
    date: "2026-09-02",
    time: "11:00 AM",
    type: "Maternal ANC 2nd Trimester",
    status: "CONFIRMED",
    token_number: "ANC-08",
    triage_priority: "NORMAL"
  }
];

export const MOCK_REFERRALS = [
  {
    referral_id: "REF-9901",
    patient_id: "PAT-10245",
    patient_name: "Ramesh Tukaram Patil",
    age: 48,
    referring_facility_id: "FAC-101",
    referring_facility_name: "PHC Mulshi",
    referring_worker: "Sunita Shinde (HW)",
    specialty_required: "Cardiology",
    clinical_notes: "Elevated BP 145/92, recurring angina on exertion. Needs 2D Echo & Specialist Evaluation.",
    priority: "HIGH",
    target_hospitals: [
      { facility_id: "FAC-103", facility_name: "District Hospital Aundh", response_status: "ACCEPTED", distance: "18.0 km", prep_capacity: "Bed & Cardiac OPD reserved" },
      { facility_id: "FAC-105", facility_name: "Sassoon General Hospital", response_status: "CANCELLED", distance: "24.5 km", note: "Automatically cancelled upon Aundh acceptance" }
    ],
    status: "ACCEPTED",
    accepted_hospital: "District Hospital Aundh",
    created_at: "2026-08-30 09:15 AM"
  },
  {
    referral_id: "REF-9902",
    patient_id: "PAT-10247",
    patient_name: "Ganpat Rao More",
    age: 62,
    referring_facility_id: "FAC-101",
    referring_facility_name: "PHC Mulshi",
    referring_worker: "Sunita Shinde (HW)",
    specialty_required: "Super-Specialty Trauma & Cardiology ICU",
    clinical_notes: "Acute ST Elevation Myocardial Infarction. Requires immediate Cath Lab.",
    priority: "EMERGENCY",
    target_hospitals: [
      { facility_id: "FAC-105", facility_name: "Sassoon General Hospital", response_status: "NEED_TIME", distance: "24.5 km", note: "Checking Trauma ICU bed availability" },
      { facility_id: "FAC-103", facility_name: "District Hospital Aundh", response_status: "ACCEPTED", distance: "18.0 km", note: "ICU Team ready" }
    ],
    status: "ACCEPTED",
    accepted_hospital: "District Hospital Aundh",
    created_at: "2026-08-30 11:00 AM"
  }
];

export const MOCK_MEDICINES = [
  {
    medicine_id: "MED-501",
    name: "Amlodipine 5mg Tablets",
    category: "Antihypertensive",
    current_stock: 420,
    min_safety_stock: 500,
    daily_consumption: 60,
    status: "LOW",
    last_updated: "Today, 08:00 AM",
    dispensed_today: 45,
    unit: "tablets"
  },
  {
    medicine_id: "MED-502",
    name: "Metformin 500mg SR",
    category: "Antidiabetic",
    current_stock: 1800,
    min_safety_stock: 800,
    daily_consumption: 120,
    status: "AVAILABLE",
    last_updated: "Today, 08:00 AM",
    dispensed_today: 90,
    unit: "tablets"
  },
  {
    medicine_id: "MED-503",
    name: "Iron Folic Acid (IFA) Red",
    category: "Maternal Supplement",
    current_stock: 120,
    min_safety_stock: 600,
    daily_consumption: 90,
    status: "CRITICAL",
    last_updated: "Today, 08:00 AM",
    dispensed_today: 80,
    unit: "tablets"
  },
  {
    medicine_id: "MED-504",
    name: "Paracetamol 500mg",
    category: "Analgesic / Antipyretic",
    current_stock: 3500,
    min_safety_stock: 1000,
    daily_consumption: 250,
    status: "AVAILABLE",
    last_updated: "Today, 08:00 AM",
    dispensed_today: 180,
    unit: "tablets"
  },
  {
    medicine_id: "MED-505",
    name: "Oral Rehydration Salts (ORS)",
    category: "Essential Electrolyte",
    current_stock: 640,
    min_safety_stock: 300,
    daily_consumption: 40,
    status: "AVAILABLE",
    last_updated: "Today, 08:00 AM",
    dispensed_today: 25,
    unit: "sachets"
  }
];

export const MOCK_DIAGNOSTICS = [
  {
    test_id: "DIAG-101",
    name: "Complete Blood Count (CBC)",
    category: "Hematology",
    status: "AVAILABLE",
    daily_capacity: 50,
    completed_today: 32,
    remaining_capacity: 18,
    turnaround_hours: 4
  },
  {
    test_id: "DIAG-102",
    name: "2D Echocardiogram & ECG",
    category: "Cardiology",
    status: "LOW_CAPACITY",
    daily_capacity: 15,
    completed_today: 13,
    remaining_capacity: 2,
    turnaround_hours: 1
  },
  {
    test_id: "DIAG-103",
    name: "Obstetric Ultrasonography (USG)",
    category: "Radiology",
    status: "AVAILABLE",
    daily_capacity: 30,
    completed_today: 20,
    remaining_capacity: 10,
    turnaround_hours: 2
  },
  {
    test_id: "DIAG-104",
    name: "HbA1c Glycated Hemoglobin",
    category: "Biochemistry",
    status: "CRITICAL_SHORTAGE",
    daily_capacity: 20,
    completed_today: 20,
    remaining_capacity: 0,
    turnaround_hours: 24
  }
];

export const MOCK_PRESCRIPTIONS = [
  {
    prescription_id: "RX-4001",
    patient_id: "PAT-10245",
    patient_name: "Ramesh Tukaram Patil",
    doctor_name: "Dr. Aniket Deshmukh",
    date: "2026-08-25",
    facility_name: "District Hospital Aundh",
    items: [
      { medicine_name: "Amlodipine 5mg", dosage: "1 tablet", frequency: "Once daily (Morning)", duration: "30 days", instructions: "Take after breakfast with water" },
      { medicine_name: "Ecosprin 75mg", dosage: "1 tablet", frequency: "Once daily (Night)", duration: "30 days", instructions: "Take after dinner" }
    ],
    status: "ACTIVE",
    adherence_summary: "11 of 14 recorded interactions (3 expected medication events not recorded)"
  }
];

export const MOCK_MATERNAL_PROFILES = [
  {
    patient_id: "PAT-10246",
    name: "Savita Dnyaneshwar Jadhav",
    age: 26,
    lmp_date: "2026-03-12",
    edd_date: "2026-12-17",
    gestational_age_weeks: 24,
    trimester: 2,
    risk_category: "NORMAL",
    high_risk_factors: [],
    anc_visits_completed: 2,
    anc_visits_required: 4,
    next_due_visit: "2026-09-02",
    required_investigations: ["Hb Test", "USG Anomaly Scan", "TT Second Dose"],
    assigned_asha: "Sunita Shinde (PHC Mulshi)"
  }
];

export const MOCK_AUDIT_LOGS = [
  {
    log_id: "LOG-901",
    timestamp: "2026-08-30 11:20:15",
    user_name: "Dr. Aniket Deshmukh",
    role: "Doctor",
    action: "READ_PATIENT_FULL_RECORD",
    patient_id: "PAT-10245",
    facility: "District Hospital Aundh",
    access_grant: "Valid Referral REF-9901 (Expires in 72h)"
  },
  {
    log_id: "LOG-902",
    timestamp: "2026-08-30 10:45:02",
    user_name: "Sunita Shinde",
    role: "Health Worker",
    action: "CREATE_DIGITAL_TRIAGE",
    patient_id: "PAT-10247",
    facility: "PHC Mulshi",
    access_grant: "Emergency Triage Registration"
  },
  {
    log_id: "LOG-903",
    timestamp: "2026-08-30 09:16:40",
    user_name: "Rajesh Pawar",
    role: "Facility Admin",
    action: "ACCEPT_FACILITY_REFERRAL",
    patient_id: "PAT-10245",
    facility: "District Hospital Aundh",
    access_grant: "Admin Referral Capacity Override"
  }
];
