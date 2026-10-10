export type UserRole = 'student' | 'college_admin'

export interface UserProfile {
  id: string
  name: string
  email: string
  role: UserRole
  campusId: string
  campusName: string
  studentRollNo?: string
  adminDesignation?: string
  department?: string
}

export interface AuthSession {
  token: string
  user: UserProfile
  issuedAt: number
  expiresAt: number
}

export const PRESET_USERS: Record<string, { user: UserProfile; passwordHash: string }> = {
  'aarav.sharma@dtu.ac.in': {
    user: {
      id: 'usr_student_dtu_01',
      name: 'Aarav Sharma',
      email: 'aarav.sharma@dtu.ac.in',
      role: 'student',
      campusId: 'dtu',
      campusName: 'Delhi Technological University',
      studentRollNo: '2023/EE/042',
      department: 'Electrical Engineering'
    },
    passwordHash: 'pass123'
  },
  'priya.verma@nsut.ac.in': {
    user: {
      id: 'usr_student_nsut_02',
      name: 'Priya Verma',
      email: 'priya.verma@nsut.ac.in',
      role: 'student',
      campusId: 'nsut',
      campusName: 'Netaji Subhas University of Technology',
      studentRollNo: '2023/CS/118',
      department: 'Computer Science'
    },
    passwordHash: 'pass123'
  },
  'kavita.sharma@dtu.ac.in': {
    user: {
      id: 'usr_admin_dtu_lead',
      name: 'Kavita Sharma',
      email: 'kavita.sharma@dtu.ac.in',
      role: 'college_admin',
      campusId: 'dtu',
      campusName: 'Delhi Technological University',
      adminDesignation: 'Lead Lab Tech & Facility Admin',
      department: 'Robotics & Hardware Labs'
    },
    passwordHash: 'admin123'
  },
  'deepak.joshi@nsut.ac.in': {
    user: {
      id: 'usr_admin_nsut_mgr',
      name: 'Deepak Joshi',
      email: 'deepak.joshi@nsut.ac.in',
      role: 'college_admin',
      campusId: 'nsut',
      campusName: 'Netaji Subhas University of Technology',
      adminDesignation: 'Circular Hub Operations Manager',
      department: 'Sustainability & Campus Logistics'
    },
    passwordHash: 'admin123'
  }
}
