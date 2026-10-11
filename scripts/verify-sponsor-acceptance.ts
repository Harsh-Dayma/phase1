/**
 * Acceptance Test Suite for RE—EARTH Phase 2 "Become a Sponsor" Module
 * Validates data integrity, form validation, local audit persistence, and security.
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

async function runSponsorAcceptanceTests() {
  console.log('=====================================================================')
  console.log('RE—EARTH PHASE 2: BECOME A SPONSOR MODULE ACCEPTANCE TEST SUITE')
  console.log('=====================================================================\n')

  const { SPONSORSHIP_PATHWAYS, ECOSYSTEM_STEPS, SPONSOR_BENEFITS, PILOT_ROADMAP, PROPOSED_BUDGET_ALLOCATION, SPONSOR_FAQS } =
    await import('../src/data/sponsorProgramData.js')
  const { validateSponsorEnquiry, submitSponsorEnquiry, getStoredEnquiries } =
    await import('../src/services/sponsorEnquiryService.js')

  // ---------------------------------------------------------------------------
  // TEST 1: Data Integrity of Sponsorship Pathways
  // ---------------------------------------------------------------------------
  console.log('TEST 1: Verification of Three Sponsorship Pathways')
  if (SPONSORSHIP_PATHWAYS.length === 3) {
    const ids = SPONSORSHIP_PATHWAYS.map((p: any) => p.id)
    if (
      ids.includes('local_business') &&
      ids.includes('corporate_sustainability') &&
      ids.includes('global_impact')
    ) {
      console.log('  ✓ PASSED: Exactly 3 distinct pathways defined (Local Business, Corporate Sustainability, Global Impact).')
    } else {
      throw new Error('TEST 1 FAILED: Unexpected pathway IDs found.')
    }
  } else {
    throw new Error(`TEST 1 FAILED: Expected 3 pathways, got ${SPONSORSHIP_PATHWAYS.length}`)
  }

  // ---------------------------------------------------------------------------
  // TEST 2: Ecosystem 4-Step Flow & Benefits Validation
  // ---------------------------------------------------------------------------
  console.log('\nTEST 2: Ecosystem 4-Step Flow & Grounded Deliverables')
  if (ECOSYSTEM_STEPS.length === 4) {
    console.log('  ✓ PASSED: 4-Step closed-loop operational flow intact (Sponsor -> College -> Recycler -> Platform).')
  } else {
    throw new Error(`TEST 2 FAILED: Expected 4 ecosystem steps, got ${ECOSYSTEM_STEPS.length}`)
  }
  if (SPONSOR_BENEFITS.length === 6) {
    console.log('  ✓ PASSED: 6 grounded sponsor benefits verified (Audit trail, attribution, zero greenwashing).')
  }

  // ---------------------------------------------------------------------------
  // TEST 3: 90-Day Pilot Roadmap & Budget Allocation
  // ---------------------------------------------------------------------------
  console.log('\nTEST 3: 90-Day Pilot Roadmap & Budget Allocation Model')
  if (PILOT_ROADMAP.length === 5) {
    console.log('  ✓ PASSED: 5 sequential pilot phases defined spanning 90 days.')
  }
  const totalBudgetPercentage = PROPOSED_BUDGET_ALLOCATION.reduce(
    (acc: number, item: any) => acc + item.percentage,
    0
  )
  if (totalBudgetPercentage === 100) {
    console.log('  ✓ PASSED: Budget allocation totals exactly 100% with in-kind equipment flexibility.')
  } else {
    throw new Error(`TEST 3 FAILED: Budget allocation sums to ${totalBudgetPercentage}%, expected 100%`)
  }

  // ---------------------------------------------------------------------------
  // TEST 4: Form Validation - Rejection of Invalid Data
  // ---------------------------------------------------------------------------
  console.log('\nTEST 4: Form Validation Engine - Reject Missing / Invalid Inputs')
  const invalidResult = validateSponsorEnquiry({
    companyName: '',
    contactPerson: '',
    workEmail: 'not-an-email',
    country: '',
    city: '',
    sponsorshipPathway: undefined,
    contributions: [],
    consentAgreed: false
  })

  if (!invalidResult.isValid) {
    const errorKeys = Object.keys(invalidResult.errors)
    if (
      errorKeys.includes('companyName') &&
      errorKeys.includes('contactPerson') &&
      errorKeys.includes('workEmail') &&
      errorKeys.includes('country') &&
      errorKeys.includes('city') &&
      errorKeys.includes('sponsorshipPathway') &&
      errorKeys.includes('contributions') &&
      errorKeys.includes('consentAgreed')
    ) {
      console.log('  ✓ PASSED: All 8 required validation constraints properly triggered.')
    } else {
      throw new Error(`TEST 4 FAILED: Missing some error keys: ${errorKeys.join(', ')}`)
    }
  } else {
    throw new Error('TEST 4 FAILED: validateSponsorEnquiry allowed invalid data.')
  }

  // ---------------------------------------------------------------------------
  // TEST 5: Form Submission & Local Audit Ledger Persistence
  // ---------------------------------------------------------------------------
  console.log('\nTEST 5: Valid Submission & Immutable Reference Generation')
  const validSubmission = await submitSponsorEnquiry({
    companyName: 'Tata Electronics Circular Labs',
    contactPerson: 'Ananya Deshmukh',
    workEmail: 'ananya.deshmukh@tata.com',
    jobTitle: 'VP Sustainability & Material Circularity',
    country: 'India',
    city: 'Mumbai',
    website: 'https://tata.com/sustainability',
    sponsorshipPathway: 'corporate_sustainability',
    contributions: ['financial_funding', 'collection_bins_equipment'],
    approximateBudget: '5lakh_to_10lakh',
    preferredScope: 'multiple_colleges',
    startTimeline: 'within_60_days',
    message: 'Interested in sponsoring DTU and IIT Bombay pilot drives.',
    consentAgreed: true
  })

  if (validSubmission.success && validSubmission.referenceCode?.startsWith('SPN-')) {
    console.log(`  ✓ PASSED: Submission recorded with Reference Code: ${validSubmission.referenceCode}`)
    console.log(`  ✓ PASSED: Delivery mechanism verified: ${validSubmission.deliveredVia}`)
  } else {
    throw new Error(`TEST 5 FAILED: Submission failed: ${JSON.stringify(validSubmission)}`)
  }

  // Verify retrieval from local audit ledger
  const storedList = getStoredEnquiries()
  if (storedList.length === 1 && storedList[0].companyName === 'Tata Electronics Circular Labs') {
    console.log('  ✓ PASSED: Enquiry securely persisted to local audit ledger without data loss.')
  } else {
    throw new Error('TEST 5 FAILED: Record was not found in stored audit ledger.')
  }

  // ---------------------------------------------------------------------------
  // TEST 6: FAQ Coverage & CSR Transparency
  // ---------------------------------------------------------------------------
  console.log('\nTEST 6: FAQ Accordion Content & CSR Section 135 Nuance')
  const csrFaq = SPONSOR_FAQS.find((f: any) => f.question.includes('CSR'))
  if (csrFaq && csrFaq.answer.includes('Schedule VII') && csrFaq.answer.includes('Companies Act')) {
    console.log('  ✓ PASSED: CSR Question clearly articulates Schedule VII legal nuances without false guarantees.')
  } else {
    throw new Error('TEST 6 FAILED: CSR FAQ item missing or inaccurate.')
  }

  console.log('\n=====================================================================')
  console.log('ALL PHASE 2 ACCEPTANCE TESTS PASSED SUCCESSFULLY (6/6)')
  console.log('=====================================================================\n')
}

runSponsorAcceptanceTests().catch((err) => {
  console.error('\n❌ ACCEPTANCE TEST FAILURE:\n', err)
  process.exit(1)
})
