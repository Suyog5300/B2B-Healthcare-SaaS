export const patientTrendData = [
  { month: 'Jan', admissions: 145, discharges: 132, critical: 18 },
  { month: 'Feb', admissions: 168, discharges: 155, critical: 22 },
  { month: 'Mar', admissions: 192, discharges: 178, critical: 25 },
  { month: 'Apr', admissions: 175, discharges: 169, critical: 19 },
  { month: 'May', admissions: 210, discharges: 198, critical: 28 },
  { month: 'Jun', admissions: 234, discharges: 220, critical: 31 },
  { month: 'Jul', admissions: 256, discharges: 240, critical: 34 },
  { month: 'Aug', admissions: 245, discharges: 232, critical: 29 },
  { month: 'Sep', admissions: 268, discharges: 251, critical: 36 },
  { month: 'Oct', admissions: 289, discharges: 270, critical: 38 },
  { month: 'Nov', admissions: 275, discharges: 262, critical: 33 },
  { month: 'Dec', admissions: 298, discharges: 281, critical: 41 },
];

export const departmentData = [
  { name: 'Cardiology', value: 285, color: '#0ea5e9' },
  { name: 'Neurology', value: 198, color: '#8b5cf6' },
  { name: 'Orthopedics', value: 234, color: '#10b981' },
  { name: 'Pediatrics', value: 312, color: '#f59e0b' },
  { name: 'Oncology', value: 156, color: '#ef4444' },
  { name: 'General', value: 421, color: '#64748b' },
];

export const ageDistribution = [
  { range: '0-18', count: 245 },
  { range: '19-30', count: 412 },
  { range: '31-45', count: 538 },
  { range: '46-60', count: 487 },
  { range: '61-75', count: 356 },
  { range: '75+', count: 178 },
];

export const appointmentData = [
  { day: 'Mon', scheduled: 45, completed: 42, cancelled: 3 },
  { day: 'Tue', scheduled: 52, completed: 48, cancelled: 4 },
  { day: 'Wed', scheduled: 48, completed: 45, cancelled: 3 },
  { day: 'Thu', scheduled: 58, completed: 54, cancelled: 4 },
  { day: 'Fri', scheduled: 61, completed: 56, cancelled: 5 },
  { day: 'Sat', scheduled: 42, completed: 39, cancelled: 3 },
  { day: 'Sun', scheduled: 28, completed: 25, cancelled: 3 },
];

export const dashboardKpis = {
  totalPatients: 2216,
  activePatients: 1840,
  criticalCases: 47,
  recoveredThisMonth: 312,
  totalDoctors: 84,
  appointmentsToday: 156,
  bedsOccupied: 78,
  bedsTotal: 120,
};