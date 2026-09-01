// MahaHealthConnect Deterministic Rule-Based Triage Engine
// Strictly Rule-Based Logic — No AI / ML / Predictive Claims

export const IMMEDIATE_DANGER_KEYS = [
  'severeBreathingDifficulty',
  'severeChestDiscomfort',
  'lossOfConsciousness',
  'severeBleeding',
  'seriousInjury',
  'seizure',
  'otherImmediateDanger'
];

export function evaluateTriageRules(formData) {
  const triggeredEmergency = [];
  const triggeredHigh = [];

  const {
    immediateDanger = {},
    symptoms = {},
    vitals = {},
    context = {}
  } = formData;

  // 1. EVALUATE EMERGENCY RULES
  if (immediateDanger.severeBreathingDifficulty) triggeredEmergency.push('Severe breathing difficulty');
  if (immediateDanger.severeChestDiscomfort) triggeredEmergency.push('Severe chest discomfort');
  if (immediateDanger.lossOfConsciousness) triggeredEmergency.push('Loss of consciousness / altered responsiveness');
  if (immediateDanger.severeBleeding) triggeredEmergency.push('Severe bleeding');
  if (immediateDanger.seriousInjury) triggeredEmergency.push('Serious injury');
  if (immediateDanger.seizure) triggeredEmergency.push('Seizure episode');
  if (immediateDanger.otherImmediateDanger) triggeredEmergency.push('Other immediate danger indicator');

  if (triggeredEmergency.length > 0) {
    return {
      priority: 'EMERGENCY',
      statusLabel: 'EMERGENCY',
      color: '#DC2626',
      bgColor: '#FEF2F2',
      borderColor: '#FCA5A5',
      badgeClass: 'badge-emergency',
      triggeredIndicators: triggeredEmergency,
      descriptionText: 'Immediate clinical attention is required.',
      reasonSummary: 'Immediate priority indicator detected.',
      recommendedWorkflow: 'EMERGENCY',
      guidance: 'Route patient to emergency resuscitation or urgent specialist referral immediately.'
    };
  }

  // 2. EVALUATE HIGH PRIORITY RULES
  if (symptoms.breathingDifficulty) triggeredHigh.push('Breathing difficulty reported');
  if (symptoms.fever && (symptoms.cough || symptoms.vomiting || symptoms.diarrhea)) {
    triggeredHigh.push('High fever accompanied by systemic symptoms');
  }
  if (symptoms.dizziness && symptoms.weakness) triggeredHigh.push('Dizziness & systemic weakness');
  
  const spo2Num = parseFloat(vitals.spo2);
  if (!isNaN(spo2Num) && spo2Num < 94) {
    triggeredHigh.push(`Low Oxygen Saturation (${spo2Num}%)`);
  }

  const pulseNum = parseFloat(vitals.pulse);
  if (!isNaN(pulseNum) && (pulseNum > 110 || pulseNum < 50)) {
    triggeredHigh.push(`Abnormal Pulse Rate (${pulseNum} bpm)`);
  }

  const tempNum = parseFloat(vitals.temp);
  if (!isNaN(tempNum) && tempNum >= 102) {
    triggeredHigh.push(`High Body Temperature (${tempNum} °F)`);
  }

  if (vitals.bp) {
    const bpParts = vitals.bp.split('/');
    if (bpParts.length === 2) {
      const sys = parseInt(bpParts[0], 10);
      const dia = parseInt(bpParts[1], 10);
      if ((!isNaN(sys) && sys >= 160) || (!isNaN(dia) && dia >= 100)) {
        triggeredHigh.push(`Uncontrolled Blood Pressure (${vitals.bp} mmHg)`);
      }
    }
  }

  if (context.pregnancyConcern) triggeredHigh.push('Pregnancy-related health concern');
  if (context.chronicCondition) triggeredHigh.push('Existing chronic condition complication');

  if (triggeredHigh.length > 0) {
    return {
      priority: 'HIGH',
      statusLabel: 'HIGH PRIORITY',
      color: '#D97706',
      bgColor: '#FEF3C7',
      borderColor: '#FDE047',
      badgeClass: 'badge-low',
      triggeredIndicators: triggeredHigh,
      descriptionText: 'Additional clinical review is recommended.',
      reasonSummary: `High priority indicator(s) identified: ${triggeredHigh.join(', ')}`,
      recommendedWorkflow: 'HIGH',
      guidance: 'Prompt clinical assessment recommended. Priority consultation with Medical Officer or specialist referral.'
    };
  }

  // 3. NORMAL PRIORITY DEFAULT
  return {
    priority: 'NORMAL',
    statusLabel: 'NORMAL',
    color: '#059669',
    bgColor: '#ECFDF5',
    borderColor: '#A7F3D0',
    badgeClass: 'badge-available',
    triggeredIndicators: ['No high-priority indicators identified'],
    descriptionText: 'No immediate priority indicators detected.',
    reasonSummary: 'Routine clinical assessment pathway. No emergency or high-priority rules were triggered.',
    recommendedWorkflow: 'NORMAL',
    guidance: 'Routine clinical assessment / OPD follow-up pathway. Standard queue scheduling.'
  };
}
