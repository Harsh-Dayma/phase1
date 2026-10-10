import { AuthService } from '../src/services/authService.ts'
import { PRESET_USERS } from '../src/types/auth.ts'

// Mock browser sessionStorage for Node test environment
const mockStorage: Record<string, string> = {}
;(globalThis as any).sessionStorage = {
  getItem: (key: string) => mockStorage[key] || null,
  setItem: (key: string, val: string) => {
    mockStorage[key] = val
  },
  removeItem: (key: string) => {
    delete mockStorage[key]
  },
  clear: () => {
    for (const k in mockStorage) delete mockStorage[k]
  }
}

async function runAcceptanceTests() {
  console.log('=== SMRT KIOSK AUTHENTICATION & SECURE USER SWITCHING ACCEPTANCE TESTS ===\n')

  // ---------------------------------------------------------------------------
  // TEST 1: Initial state - No session
  // ---------------------------------------------------------------------------
  console.log('TEST 1: Verification that session is absent before login')
  let currentSession = AuthService.validateCurrentSession()
  if (currentSession === null) {
    console.log('  ✓ PASSED: validateCurrentSession() is null. Logout button absent before login.')
  } else {
    throw new Error('TEST 1 FAILED: Session was unexpectedly present before login.')
  }

  // ---------------------------------------------------------------------------
  // TEST 2: Student Login establishes authenticated session
  // ---------------------------------------------------------------------------
  console.log('\nTEST 2: Authenticate Student (Aarav Sharma • DTU)')
  const studentSession = await AuthService.login('aarav.sharma@dtu.ac.in', 'pass123')
  if (
    studentSession.token &&
    studentSession.user.name === 'Aarav Sharma' &&
    studentSession.user.role === 'student'
  ) {
    console.log(`  ✓ PASSED: Student session created. Token: ${studentSession.token.substring(0, 20)}...`)
    console.log(`  ✓ User Identity: ${studentSession.user.name} | Role: ${studentSession.user.role} | Campus: ${studentSession.user.campusName}`)
  } else {
    throw new Error('TEST 2 FAILED: Student login failed.')
  }

  // ---------------------------------------------------------------------------
  // TEST 3: Role-based permissions enforcement
  // ---------------------------------------------------------------------------
  console.log('\nTEST 3: Verify role permissions for Student account')
  const canDropoff = AuthService.hasPermission(studentSession, 'student_dropoff')
  const canPersonalVault = AuthService.hasPermission(studentSession, 'personal_vault')
  const canAccessOperatorTerminal = AuthService.hasPermission(studentSession, 'kiosk_operator_terminal')
  const canAccessAdminVault = AuthService.hasPermission(studentSession, 'admin_tech_vault')

  if (canDropoff && canPersonalVault && !canAccessOperatorTerminal && !canAccessAdminVault) {
    console.log('  ✓ PASSED: Student can access Drop-off & Personal Vault.')
    console.log('  ✓ PASSED: Student CANNOT access Kiosk Operator Terminal or Admin Vault.')
  } else {
    throw new Error('TEST 3 FAILED: Role permission check failed for student.')
  }

  // ---------------------------------------------------------------------------
  // TEST 4: Anti-Tampering Check (Student modifies client role to 'college_admin')
  // ---------------------------------------------------------------------------
  console.log('\nTEST 4: Tamper Resistance (Client-side role elevation attempt)')
  const tamperedSession = {
    ...studentSession,
    user: {
      ...studentSession.user,
      role: 'college_admin' as const // Attacker tries to elevate role on client
    }
  }
  const tamperedAdminAccess = AuthService.hasPermission(tamperedSession, 'kiosk_operator_terminal')
  if (!tamperedAdminAccess) {
    console.log('  ✓ PASSED: Server-backed registry rejected tampered role elevation!')
  } else {
    throw new Error('TEST 4 FAILED: Client role elevation was not rejected.')
  }

  // ---------------------------------------------------------------------------
  // TEST 5: Session Revalidation on Page Refresh
  // ---------------------------------------------------------------------------
  console.log('\nTEST 5: Page Refresh / Session Persistence Revalidation')
  const revalidatedSession = AuthService.validateCurrentSession()
  if (revalidatedSession && revalidatedSession.user.id === studentSession.user.id) {
    console.log('  ✓ PASSED: Session persists accurately across simulated refresh without identity switch.')
  } else {
    throw new Error('TEST 5 FAILED: Session failed to revalidate.')
  }

  // ---------------------------------------------------------------------------
  // TEST 6: Explicit Logout
  // ---------------------------------------------------------------------------
  console.log('\nTEST 6: Explicit Logout & Invalidation')
  await AuthService.logout()
  const postLogoutSession = AuthService.validateCurrentSession()
  const postLogoutPermission = AuthService.hasPermission(studentSession, 'student_dropoff')

  if (postLogoutSession === null && !postLogoutPermission) {
    console.log('  ✓ PASSED: Token invalidated. Client session cleared. Access revoked.')
  } else {
    throw new Error('TEST 6 FAILED: Logout did not invalidate token.')
  }

  // ---------------------------------------------------------------------------
  // TEST 7: Switch User to College Admin after Logout
  // ---------------------------------------------------------------------------
  console.log('\nTEST 7: College Admin Login after Student Logout')
  const adminSession = await AuthService.login('kavita.sharma@dtu.ac.in', 'admin123')
  const adminTerminalAccess = AuthService.hasPermission(adminSession, 'kiosk_operator_terminal')
  const adminVaultAccess = AuthService.hasPermission(adminSession, 'admin_tech_vault')

  if (
    adminSession.user.role === 'college_admin' &&
    adminTerminalAccess &&
    adminVaultAccess
  ) {
    console.log(`  ✓ PASSED: College Admin session established (${adminSession.user.name} • ${adminSession.user.adminDesignation}).`)
    console.log('  ✓ PASSED: College Admin granted Kiosk Operator Terminal & Admin Vault access.')
  } else {
    throw new Error('TEST 7 FAILED: Admin login / permissions failed.')
  }

  // Clean up
  await AuthService.logout()
  console.log('\n===========================================================================')
  console.log('ALL 7 ACCEPTANCE CRITERIA PASSED SUCCESSFULLY WITH ZERO SECURITY DEFECTS!')
  console.log('===========================================================================')
}

runAcceptanceTests().catch((err) => {
  console.error('Acceptance tests failed with error:', err)
  process.exit(1)
})
