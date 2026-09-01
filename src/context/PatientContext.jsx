import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_PATIENTS } from '../mockData';

const PatientContext = createContext();

const STORAGE_KEY = 'maha_health_connect_patients';

export const PatientProvider = ({ children }) => {
  const [patients, setPatients] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load patients from localStorage:', e);
    }
    return MOCK_PATIENTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
    } catch (e) {
      console.error('Failed to save patients to localStorage:', e);
    }
  }, [patients]);

  const generatePatientId = () => {
    const mhPatients = patients.filter(p => p.patient_id && p.patient_id.startsWith('PAT-MH-'));
    let maxNum = 127; // Default start index so next is 000128
    
    mhPatients.forEach(p => {
      const match = p.patient_id.match(/^PAT-MH-(\d+)$/);
      if (match) {
        const num = parseInt(match[1], 10);
        if (num > maxNum) maxNum = num;
      }
    });

    const nextNum = maxNum + 1;
    return `PAT-MH-${String(nextNum).padStart(6, '0')}`;
  };

  const addPatient = (patientData) => {
    const newPatient = {
      ...patientData,
      registered_at: patientData.registered_at || new Date().toISOString().replace('T', ' ').substring(0, 19),
    };

    setPatients(prev => [newPatient, ...prev]);
    return newPatient;
  };

  const getPatientById = (id) => {
    return patients.find(p => p.patient_id === id);
  };

  const findDuplicatePatient = ({ phone, name, dob }) => {
    const cleanPhone = phone ? phone.trim().replace(/\D/g, '') : '';
    const cleanName = name ? name.trim().toLowerCase() : '';

    return patients.find(p => {
      const pPhone = p.phone ? p.phone.trim().replace(/\D/g, '') : '';
      const pName = p.name ? p.name.trim().toLowerCase() : '';

      // Match 1: Same 10-digit mobile number
      if (cleanPhone && cleanPhone.length === 10 && pPhone.endsWith(cleanPhone)) {
        return true;
      }

      // Match 2: Same Name and Date of Birth
      if (cleanName && pName === cleanName && dob && p.dob === dob) {
        return true;
      }

      return false;
    });
  };

  return (
    <PatientContext.Provider
      value={{
        patients,
        addPatient,
        getPatientById,
        generatePatientId,
        findDuplicatePatient
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};

export const usePatients = () => useContext(PatientContext);
