/**
 * RE—EARTH PHASE 2.1 ACCEPTANCE TEST SUITE
 * Sponsor–College Admin Integration & Access Control Verification
 *
 * Adheres to AWS "Build It" Open Source Local-First policy (zero cloud billing).
 */

// Mock browser localStorage for Node test runner
const mockLocalStorage: Record<string, string> = {}
;(globalThis as any).localStorage = {
  getItem: (key: string) => mockLocalStorage[key] || null,
  setItem: (key: string, val: string) => {
    mockLocalStorage[key] = val
  },
  removeItem: (key: string) => {
    delete mockLocalStorage[key]
  },
  clear: () => {
    for (const k in mockLocalStorage) delete mockLocalStorage[k]
  }
}
;(globalThis as any).window = globalThis
;(globalThis as any).import = { meta: { env: { MODE: 'test', DEV: true } } }

async function runAcceptanceTests() {
  console.log('=====================================================================')
  console.log('RE—EARTH PHASE 2.1: SPONSOR–COLLEGE ADMIN ACCEPTANCE TEST SUITE')
  console.log('=====================================================================\n')

  const { PRESET_USERS } = await import('../src/types/auth.js')
  const {
    createSponsorApplication,
    getApplicationsForUser,
    getApplicationMetrics,
    updateApplicationStatus,
    addApplicationInternalNote,
    canUserViewApplication,
    canUserManageApplication,
    resetApplicationsToSeed
  } = await import('../src/services/sponsorApplicationService.js')
  const { INITIAL_CAMPUSES } = await import('../src/data/campuses.js')

  // Prepare actors
  const dtuAdmin = PRESET_USERS['kavita.sharma@dtu.ac.in'].user
  const nsutAdmin = PRESET_USERS['dean.sustainability@nsut.ac.in'].user
  const centralAdmin = PRESET_USERS['central.admin@re-earth.eco'].user
  const dtuStudent = PRESET_USERS['aarav.sharma@dtu.ac.in'].user

  // Reset to seed data
  resetApplicationsToSeed()

  // ---------------------------------------------------------------------------
  // TEST 1: New Application Creation Starts with Pending Status
  // ---------------------------------------------------------------------------
  console.log('TEST 1: Public Sponsor Application Submission & Status Purity')
  const testApp = await createSponsorApplication({
    companyName: 'NVIDIA Climate Autonomous AI',
    contactPerson: 'Jensen H.',
    workEmail: 'jensen@nvidia.example.com',
    jobTitle: 'VP Climate Solutions',
    country: 'India',
    city: 'New Delhi',
    sponsorshipPathway: 'corporate_sustainability',
    targetScope: 'single_college',
    targetCampusIds: ['dtu'],
    proposedFundingInr: 600000,
    inKindResources: ['4x AI Compute Vision Sorting Modules'],
    proposedDuration: '1 Academic Year (2026–2027)',
    objectives: 'Equip DTU robotics workshop with e-waste component scanners.'
  })

  if (testApp.status === 'pending') {
    console.log('  ✓ PASSED: New application starts strictly with "pending" status.')
  } else {
    throw new Error(`TEST 1 FAILED: Expected status "pending", got ${testApp.status}`)
  }

  if (testApp.referenceCode && testApp.referenceCode.startsWith('SPN-')) {
    console.log(`  ✓ PASSED: Reference code generated successfully: ${testApp.referenceCode}`)
  } else {
    throw new Error('TEST 1 FAILED: Invalid reference code generated.')
  }

  // ---------------------------------------------------------------------------
  // TEST 2: Target College Admin Visibility & Confidentiality Isolation
  // ---------------------------------------------------------------------------
  console.log('\nTEST 2: College Admin Dashboard Visibility & Cross-Campus Privacy Isolation')
  const dtuApps = getApplicationsForUser(dtuAdmin)
  const nsutApps = getApplicationsForUser(nsutAdmin)

  const dtuHasNvidia = dtuApps.some((a: any) => a.id === testApp.id)
  const nsutHasNvidia = nsutApps.some((a: any) => a.id === testApp.id)

  if (dtuHasNvidia) {
    console.log('  ✓ PASSED: DTU College Admin can see application directed to DTU.')
  } else {
    throw new Error('TEST 2 FAILED: DTU admin cannot find application directed to DTU.')
  }

  if (!nsutHasNvidia) {
    console.log('  ✓ PASSED: NSUT College Admin CANNOT see confidential application directed to DTU.')
  } else {
    throw new Error('TEST 2 FAILED: Privacy breach! NSUT admin saw DTU application.')
  }

  // ---------------------------------------------------------------------------
  // TEST 3: Multi-Campus Applications Visibility
  // ---------------------------------------------------------------------------
  console.log('\nTEST 3: Multi-Campus Application Broadcasting')
  const multiApp = await createSponsorApplication({
    companyName: 'Qualcomm Wireless Green Hubs',
    contactPerson: 'Sanjay M.',
    workEmail: 'sanjay@qualcomm.example.com',
    country: 'India',
    city: 'Delhi-NCR',
    sponsorshipPathway: 'global_impact',
    targetScope: 'multiple_colleges',
    targetCampusIds: ['dtu', 'nsut'],
    proposedFundingInr: 1000000,
    inKindResources: ['Dual-Campus 5G IoT Scale Gateways'],
    proposedDuration: '2 Academic Years (Multi-Year)'
  })

  const dtuHasMulti = getApplicationsForUser(dtuAdmin).some((a: any) => a.id === multiApp.id)
  const nsutHasMulti = getApplicationsForUser(nsutAdmin).some((a: any) => a.id === multiApp.id)

  if (dtuHasMulti && nsutHasMulti) {
    console.log('  ✓ PASSED: Multi-campus application is visible to both DTU and NSUT administrators.')
  } else {
    throw new Error('TEST 3 FAILED: Multi-campus application failed to broadcast to all target admins.')
  }

  // ---------------------------------------------------------------------------
  // TEST 4: Central Administrator Scope & Unassigned Matching
  // ---------------------------------------------------------------------------
  console.log('\nTEST 4: Central Administrator Oversight & Unassigned Application Access')
  const centralApps = getApplicationsForUser(centralAdmin)
  const centralHasUnassigned = centralApps.some((a: any) => a.targetScope === 'unassigned_needs_matching')

  if (centralHasUnassigned && centralApps.length >= dtuApps.length) {
    console.log('  ✓ PASSED: Central Secretariat has full visibility over unassigned and cross-campus proposals.')
  } else {
    throw new Error('TEST 4 FAILED: Central administrator cannot see unassigned applications.')
  }

  // ---------------------------------------------------------------------------
  // TEST 5: Unauthorized Access & Mutation Protection
  // ---------------------------------------------------------------------------
  console.log('\nTEST 5: Authorization Enforcement on Status Mutations')
  let blocked = false
  try {
    // Student attempts to approve application
    await updateApplicationStatus(testApp.id, 'approved', dtuStudent)
  } catch (err: any) {
    blocked = true
    console.log(`  ✓ PASSED: Unauthorized student mutation blocked: "${err.message}"`)
  }

  if (!blocked) {
    throw new Error('TEST 5 FAILED: Security breach! Unauthorized student was able to update application.')
  }

  // ---------------------------------------------------------------------------
  // TEST 6: Admin Status Transitions & Mandatory Rejection Reason
  // ---------------------------------------------------------------------------
  console.log('\nTEST 6: Admin Status Transitions (Under Review & Rejection Reason)')
  const underReviewApp = await updateApplicationStatus(testApp.id, 'under_review', dtuAdmin, {
    notes: 'Forwarded to DTU campus environmental dean.'
  })

  if (underReviewApp.status === 'under_review' && underReviewApp.statusHistory.length > 1) {
    console.log('  ✓ PASSED: Status updated to "under_review" with appended audit history.')
  } else {
    throw new Error('TEST 6 FAILED: Status transition to under_review failed.')
  }

  let rejectionBlockedWithoutReason = false
  try {
    // Attempt rejection without providing a reason
    await updateApplicationStatus(testApp.id, 'rejected', dtuAdmin, { reason: '' })
  } catch (err: any) {
    rejectionBlockedWithoutReason = true
    console.log(`  ✓ PASSED: Rejection without mandatory reason blocked: "${err.message}"`)
  }

  if (!rejectionBlockedWithoutReason) {
    throw new Error('TEST 6 FAILED: Rejection allowed without mandatory reason.')
  }

  // ---------------------------------------------------------------------------
  // TEST 7: Partnership Approval Updates Campus Model
  // ---------------------------------------------------------------------------
  console.log('\nTEST 7: Approval Action Promotes to Verified Campus Partnership')
  const approvedApp = await updateApplicationStatus(testApp.id, 'approved', dtuAdmin, {
    notes: 'Formal MoU finalized and certified by DTU Dean.'
  })

  if (approvedApp.status === 'approved') {
    console.log('  ✓ PASSED: Application status updated to "approved".')
  } else {
    throw new Error('TEST 7 FAILED: Application status was not updated to approved.')
  }

  // Verify campus model was updated with partner
  const rawCampuses = mockLocalStorage['re_earth_campuses_v1']
  if (rawCampuses) {
    const campuses = JSON.parse(rawCampuses)
    const dtuCampus = campuses.find((c: any) => c.id === 'dtu')
    if (dtuCampus && dtuCampus.sponsorId.includes('nvidia')) {
      console.log(`  ✓ PASSED: DTU campus model registered active sponsor partner: "${dtuCampus.sponsorId}".`)
    } else {
      throw new Error(`TEST 7 FAILED: Campus model not updated with approved sponsor. SponsorId: ${dtuCampus?.sponsorId}`)
    }
  } else {
    throw new Error('TEST 7 FAILED: Campus storage dataset not found.')
  }

  // ---------------------------------------------------------------------------
  // TEST 8: Dynamic Metrics Calculation
  // ---------------------------------------------------------------------------
  console.log('\nTEST 8: Dynamic Real Database Summary Metrics Calculation')
  const metrics = getApplicationMetrics(dtuAdmin)

  if (metrics.total >= 3 && metrics.approved >= 1 && metrics.rejected >= 1) {
    console.log(`  ✓ PASSED: Real summary metrics calculated: Total=${metrics.total}, Approved=${metrics.approved}, Rejected=${metrics.rejected}, Pipeline=${metrics.totalProposedFundingInr}.`)
  } else {
    throw new Error(`TEST 8 FAILED: Metrics mismatch. Metrics: ${JSON.stringify(metrics)}`)
  }

  // ---------------------------------------------------------------------------
  // TEST 9: Internal Notes Persistence
  // ---------------------------------------------------------------------------
  console.log('\nTEST 9: Internal Administrative Committee Notes')
  const notedApp = await addApplicationInternalNote(
    testApp.id,
    'Facility review meeting confirmed 4 pod positions outside Mechanical Block.',
    dtuAdmin
  )

  if (notedApp.internalNotes && notedApp.internalNotes.includes('Facility review meeting confirmed')) {
    console.log('  ✓ PASSED: Internal administrative notes appended with reviewer attribution.')
  } else {
    throw new Error('TEST 9 FAILED: Internal notes failed to append.')
  }

  console.log('\n=====================================================================')
  console.log('ALL 9 ACCEPTANCE TESTS PASSED (100% SUCCESS RATE)')
  console.log('=====================================================================\n')
}

runAcceptanceTests().catch((err) => {
  console.error('\n❌ ACCEPTANCE TEST FAILED:', err)
  process.exit(1)
})
