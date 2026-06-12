# Test Plan

**Project:** Vendor Invoice Management Portal (B2B)
**Document Type:** Test Plan
**Version:** 1.0
**Phase:** Phase 2 — Test Planning
**Prepared By:** QA Team
**Date:** June 2026
**Status:** APPROVED

---

## 1. Introduction

### 1.1 Purpose
This Test Plan defines the scope, approach, resources, schedule, and deliverables for testing the Vendor Invoice Management Portal. It serves as the master guide for all QA activities across the project lifecycle.

### 1.2 Project Background
The Vendor Invoice Management Portal is a B2B SaaS application enabling:
- Vendors to register, log in, and submit invoices against purchase orders
- AP (Accounts Payable) teams to approve or reject those invoices
- Automated payment forwarding upon approval
- Email notification system for all status changes
- Monthly reporting for business intelligence

### 1.3 Objectives
- Verify all 7 stated requirements are correctly implemented
- Identify functional defects before they reach production
- Validate non-functional characteristics (performance, security, usability)
- Provide objective metrics for release readiness decision

---

## 2. Scope

### 2.1 Features In Scope

| Feature Area | What Will Be Tested |
|--------------|---------------------|
| Vendor Registration | Form validation, email verification, account creation |
| Vendor Login | Authentication, session management, 2FA (if applicable) |
| Invoice Submission | File upload, PO linkage, data validation, duplicate check |
| AP Approval Workflow | View invoices, approve, reject, rejection reasons |
| Payment Forwarding | Integration handoff, data mapping, error handling |
| Email Notifications | Trigger events, content, delivery, failure handling |
| Monthly Reports | Generation, accuracy, format, access control |
| Authorization / RBAC | Role-based access for all features |
| API Layer | Request validation, response contracts, authentication |
| Database Integrity | Data persistence, constraints, audit logs |
| Security | OWASP Top 10 checks, input validation, session security |
| Performance | Response times under normal and peak load |
| Usability | Workflow clarity, error messaging, first-time user experience |
| Accessibility | WCAG 2.1 AA compliance for key workflows |

### 2.2 Features Out of Scope

| Feature Area | Reason |
|--------------|--------|
| Payment gateway internals | Third-party system; tested by payment vendor |
| Email server SMTP configuration | Infrastructure; handled by DevOps |
| Cloud infrastructure / servers | Out of QA team mandate |
| Mobile native apps | Not in current release scope |

---

## 3. Testing Approach

### 3.1 Testing Levels

```
Level 4: Acceptance Testing (UAT)        ← Business/Client validates
Level 3: System Testing                  ← QA team, end-to-end
Level 2: Integration Testing             ← Dev + QA, API & DB layers
Level 1: Unit Testing                    ← Developer-owned
```

### 3.2 Testing Types

| Type | Description | Phase | Tools |
|------|-------------|-------|-------|
| Smoke Testing | Core flows work after each build | All phases | Manual + Postman |
| Functional Testing | All requirements met | Phase 5 | Selenium, Cypress, Manual |
| API Testing | Backend contracts correct | Phase 5 | Postman, RestAssured |
| Database Testing | Data integrity, constraints | Phase 5 | SQL, DBeaver |
| Regression Testing | Fixes don't break existing features | Each sprint | Automated suite |
| Performance Testing | Load, stress, response times | Phase 6 | JMeter, k6 |
| Security Testing | OWASP Top 10, auth, injection | Phase 6 | Burp Suite, Manual |
| Usability Testing | User journey clarity | Phase 6 | Manual exploration |
| Accessibility Testing | WCAG 2.1 AA | Phase 6 | Axe DevTools |
| Integration Testing | 3rd party: email, payment | Phase 7 | Postman, Mock servers |
| User Acceptance Testing | Business validation | Phase 8 | Manual with client |

### 3.3 Test Design Techniques

| Technique | Applied To |
|-----------|-----------|
| Equivalence Partitioning | File size limits, invoice amounts, user roles |
| Boundary Value Analysis | Max file size, PO amount limits, character limits |
| Decision Table Testing | Approval rules, notification triggers, RBAC matrix |
| State Transition Testing | Invoice lifecycle: Draft → Submitted → Approved → Paid |
| Exploratory Testing | Edge cases, usability, session behavior |
| Negative Testing | Invalid inputs, unauthorized access attempts, error states |

---

## 4. Entry Criteria

Testing on any phase will not begin until the following are satisfied:

| Criterion | Owner | Verified By |
|-----------|-------|-------------|
| Requirements reviewed and ambiguities clarified | Business Analyst | QA Lead |
| Test cases reviewed and signed off | QA Lead | PM |
| Test environment set up and accessible | DevOps | QA Team |
| Latest stable build deployed to QA environment | Dev Team | QA Team |
| Test data prepared and seeded | QA Team | QA Lead |
| Unit test coverage ≥ 80% | Dev Team | QA Lead |

---

## 5. Exit Criteria

Testing is complete and sign-off can be given when:

| Criterion | Target |
|-----------|--------|
| All test cases executed | 100% |
| Test cases passed | ≥ 95% |
| All CRITICAL severity defects closed | 100% |
| All HIGH severity defects closed | 100% |
| MEDIUM defects accepted or deferred with PM approval | 100% |
| RTM shows 100% requirement coverage | Yes |
| Performance benchmarks met | Yes |
| Security scan: no critical/high vulnerabilities | Yes |
| UAT sign-off from client | Yes |
| Regression suite passing | 100% |

---

## 6. Test Environments

| Environment | Purpose | Data Type | Managed By |
|-------------|---------|-----------|-----------|
| Development (DEV) | Developer unit/integration testing | Synthetic seed data | Development team |
| QA / Testing | Functional and system testing | Production-like (anonymized) | QA Team |
| Staging / Pre-prod | Regression, performance, UAT | Masked production data | DevOps |
| Production | Live system (smoke test only post-deploy) | Real data | Operations |

### Environment Configuration Requirements:
- QA environment must mirror production architecture (same OS, DB version, services)
- Email notifications routed to test email addresses (not real vendors)
- Payment gateway replaced with mock/sandbox
- Separate SMTP relay for QA to prevent real emails to real addresses

---

## 7. Test Data Requirements

| Data Category | Description | Source |
|---------------|-------------|--------|
| Vendor accounts | At least 5 vendors (active, inactive, suspended) | QA creates |
| Purchase Orders | 10+ POs in various states (open, closed, partially invoiced) | Dev seeds |
| Invoice files | PDF, Excel, image, oversized, corrupt — all formats to test | QA creates |
| AP user accounts | Multiple AP users, one without approval rights | Dev seeds |
| Admin account | Full admin access | Dev seeds |
| Payment gateway | Sandbox account with test credentials | DevOps |
| Email accounts | Test inboxes for vendors and AP team | QA creates |

---

## 8. Risk Assessment & Mitigation

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|-----------|
| Requirements not clarified before testing | Medium | High | Blocked until req sign-off; BA responsible |
| Test environment instability | Medium | High | Daily health check; alert process |
| Insufficient test data | Low | Medium | QA creates own seed scripts |
| Developer delays compress QA window | High | High | Risk-based testing prioritization |
| Payment gateway mock inaccurate | Medium | High | Confirm mock behavior with integration spec |
| Security testing expertise gap | Low | High | Engage security specialist for OWASP testing |

---

## 9. Resource Plan

| Role | Responsibility | Allocation |
|------|---------------|-----------|
| QA Lead | Strategy, planning, sign-off | 100% |
| QA Engineer 1 | Functional test design & execution | 100% |
| QA Engineer 2 | API, DB, security testing | 100% |
| QA Engineer 3 | Automation, regression | 100% |
| Business Analyst | Requirement clarifications, UAT facilitation | 25% |
| Dev Tech Lead | Unit test coverage, code review | 25% |
| Product Owner | Acceptance criteria, go/no-go | 10% |

---

## 10. Schedule / Timeline

| Phase | Activity | Duration | Dependencies |
|-------|---------|---------|-------------|
| Week 1 | Requirements analysis, test planning, risk review | 5 days | Req sign-off |
| Week 2 | Test case design, test data preparation | 5 days | Test plan approved |
| Week 3 | Functional testing (Phases 5-6) | 5 days | Build ready in QA |
| Week 4 | Integration testing, regression, performance, security | 5 days | All functional tests passed |
| Week 5 | UAT facilitation, defect retesting, sign-off | 5 days | All P1/P2 defects closed |

---

## 11. Defect Management

### Defect Lifecycle
```
New → Assigned → In Development → Fixed → Retest → Closed
                                        ↓
                                    Rejected → New (if QA disagrees)
```

### Severity Classification

| Severity | Definition | Example |
|----------|-----------|---------|
| CRITICAL | System crash, data loss, security breach, core feature broken | Login not working |
| HIGH | Feature broken, workaround exists, business impact | Invoice fails to submit |
| MEDIUM | Partial functionality, limited user impact | Filter on report incorrect |
| LOW | Cosmetic, minor UX, no functional impact | Wrong text alignment |

### Priority Classification

| Priority | Definition | Expected Fix Time |
|----------|-----------|-------------------|
| P1 | Fix immediately; blocks testing or release | Within 24 hours |
| P2 | Fix within current sprint | Within sprint |
| P3 | Fix in next sprint | Next sprint |
| P4 | Fix when capacity allows | Roadmap |

### Defect Triage Meetings
- Daily during testing phase (15 min)
- QA Lead, Dev Lead, PM attend
- All CRITICAL defects reviewed same day

---

## 12. Communication Plan

| Report | Frequency | Audience | Owner |
|--------|-----------|---------|-------|
| Test execution daily status | Daily | QA Lead, PM | QA Engineers |
| Weekly test report | Weekly | PM, Client | QA Lead |
| Defect status report | Weekly | Dev Lead, PM | QA Lead |
| Final test report | End of testing | All stakeholders | QA Lead |
| Go/No-Go recommendation | Pre-release | PM, PO, Client | QA Lead |

---

## 13. Deliverables

| Deliverable | Phase | Status |
|-------------|-------|--------|
| Ambiguous Requirements Document | Phase 1 | ✅ Complete |
| Clarifying Questions Document | Phase 1 | ✅ Complete |
| Test Strategy | Phase 2 | ✅ Complete |
| Test Plan (this document) | Phase 2 | ✅ Complete |
| Test Scenarios | Phase 3 | ✅ Complete |
| Test Cases (detailed) | Phase 3 | ✅ Complete |
| Test Data Set | Phase 3 | ✅ Complete |
| RTM (Requirements Traceability Matrix) | Ongoing | ✅ Complete |
| Risk Register | Phase 1 | ✅ Complete |
| Bug Report Template | Phase 3 | ✅ Complete |
| Test Execution Report | Phase 5-6 | ✅ Complete |
| Final QA Sign-off Report | Phase 8 | To be created post-execution |

---

## 14. Assumptions

- All 7 stated requirements will be clarified and frozen before Week 2
- QA test environment will be available and stable from Week 3
- Development team will provide release notes for each build delivered to QA
- Payment gateway will be accessible via sandbox/mock during testing
- Client/business team will be available for UAT in Week 5

---

## Approval

| Role | Name | Decision | Date |
|------|------|----------|------|
| QA Lead | | ☐ Approved / ☐ Rejected | |
| Project Manager | | ☐ Approved / ☐ Rejected | |
| Product Owner | | ☐ Approved / ☐ Rejected | |

---

**Related Documents:**
- [Test Strategy](test-strategy.md)
- [Test Scenarios](test-design/test-scenarios.md)
- [Test Cases](test-design/test-cases.md)
- [Risk Register](../03-risk-analysis/risks-and-mitigations.md)
- [RTM](rtm.md)
