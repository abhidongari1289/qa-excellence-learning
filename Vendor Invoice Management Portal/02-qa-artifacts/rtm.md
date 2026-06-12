# Requirements Traceability Matrix (RTM)

**Project:** Vendor Invoice Management Portal (B2B)
**Document Type:** Requirements Traceability Matrix
**Phase:** Ongoing — Updated throughout QA lifecycle
**Prepared By:** QA Team
**Date:** June 2026

---

## Purpose

The RTM links every requirement to its test scenarios and test cases, ensuring:
- Every requirement has at least one test case (no gaps)
- Every test case traces back to a requirement (no orphan tests)
- Full coverage is provable and auditable at any point in the project

> "If it's not in the RTM, it's not being tested."

---

## RTM — Forward Traceability (Requirements → Tests)

| Req ID | Requirement Description | Test Scenario IDs | Test Case IDs | Execution Status | Pass/Fail |
|--------|------------------------|-------------------|---------------|-----------------|-----------|
| **REQ-01** | Vendors can register and log in | TS-01-01 to TS-01-08, TS-02-01 to TS-02-09 | TC-001, TC-002, TC-003, TC-004, TC-005 | Not Executed | — |
| **REQ-02** | Vendors can submit invoices against POs | TS-03-01 to TS-03-17 | TC-010 to TC-019 | Not Executed | — |
| **REQ-03** | AP team can view, approve, or reject invoices | TS-04-01 to TS-04-12 | TC-020 to TC-029 | Not Executed | — |
| **REQ-04** | Approved invoices forwarded for payment | TS-05-01 to TS-05-08 | TC-030 to TC-039 | Not Executed | — |
| **REQ-05** | Email notifications on status changes | TS-06-01 to TS-06-10 | TC-040 to TC-049 | Not Executed | — |
| **REQ-06** | Monthly invoice activity reports | TS-07-01 to TS-07-08 | TC-060 to TC-064 | Not Executed | — |
| **REQ-07** | Only authorized users may access system | TS-08-01 to TS-08-10, TS-09-01 to TS-09-10 | TC-050, TC-065, TC-066, TC-067 | Not Executed | — |

---

## RTM — Detailed Mapping

### REQ-01: Vendor Registration & Login

| Test Case ID | Test Case Title | Test Type | Priority | Execution | Pass/Fail | Defect ID |
|-------------|----------------|-----------|----------|-----------|-----------|-----------|
| TC-001 | Successful vendor registration | Functional | P1 | Not Executed | — | — |
| TC-002 | Duplicate email registration blocked | Functional | P1 | Not Executed | — | — |
| TC-003 | Login with valid credentials | Functional | P1 | Not Executed | — | — |
| TC-004 | Account lockout after 5 failed attempts | Security | P1 | Not Executed | — | — |
| TC-005 | Session expiry on inactivity | Security | P1 | Not Executed | — | — |
| TC-006 | Forgot password flow | Functional | P1 | Not Executed | — | — |
| TC-007 | Logout terminates session completely | Security | P2 | Not Executed | — | — |
| TC-008 | Registration with invalid email format | Negative | P1 | Not Executed | — | — |
| TC-009 | Missing mandatory registration fields | Negative | P1 | Not Executed | — | — |

**Coverage:** 9 test cases for REQ-01

---

### REQ-02: Invoice Submission Against POs

| Test Case ID | Test Case Title | Test Type | Priority | Execution | Pass/Fail | Defect ID |
|-------------|----------------|-----------|----------|-----------|-----------|-----------|
| TC-010 | Successful invoice submission — happy path | Functional | P1 | Not Executed | — | — |
| TC-011 | Invoice amount exceeds PO value | Negative | P1 | Not Executed | — | — |
| TC-012 | Duplicate invoice number blocked | Negative | P1 | Not Executed | — | — |
| TC-013A | File upload at boundary (9.9 MB) — accepted | Boundary | P1 | Not Executed | — | — |
| TC-013B | File upload at boundary (10.0 MB) — accepted | Boundary | P1 | Not Executed | — | — |
| TC-013C | File upload above boundary (10.1 MB) — rejected | Boundary | P1 | Not Executed | — | — |
| TC-014 | Unsupported file format rejected | Security | P1 | Not Executed | — | — |
| TC-015 | Concurrent double-submission prevented | Race Condition | P1 | Not Executed | — | — |
| TC-016 | Invoice against closed/fully-invoiced PO blocked | Negative | P1 | Not Executed | — | — |
| TC-017 | Invoice with $0 amount blocked | Boundary | P2 | Not Executed | — | — |
| TC-018 | Partial invoice against PO (allowed) | Functional | P1 | Not Executed | — | — |
| TC-019 | Network failure mid-upload — graceful handling | Error Handling | P1 | Not Executed | — | — |

**Coverage:** 12 test cases for REQ-02

---

### REQ-03: AP Team Approval / Rejection Workflow

| Test Case ID | Test Case Title | Test Type | Priority | Execution | Pass/Fail | Defect ID |
|-------------|----------------|-----------|----------|-----------|-----------|-----------|
| TC-020 | AP approves valid invoice | Functional | P1 | Not Executed | — | — |
| TC-021 | AP rejects invoice with reason | Functional | P1 | Not Executed | — | — |
| TC-022 | Concurrent approval race condition | Race Condition | P1 | Not Executed | — | — |
| TC-023 | Vendor cannot access AP approval screens | Authorization | P1 | Not Executed | — | — |
| TC-024 | AP rejects without reason (if mandatory) | Negative | P2 | Not Executed | — | — |
| TC-025 | AP views invoice details and attached file | Functional | P1 | Not Executed | — | — |
| TC-026 | AP filters invoices by status | Functional | P2 | Not Executed | — | — |
| TC-027 | Audit log records all AP actions | Audit | P1 | Not Executed | — | — |
| TC-028 | AP cannot approve already-approved invoice | Negative | P1 | Not Executed | — | — |
| TC-029 | Invoice status updates immediately after action | Functional | P1 | Not Executed | — | — |

**Coverage:** 10 test cases for REQ-03

---

### REQ-04: Approved Invoices Forwarded for Payment

| Test Case ID | Test Case Title | Test Type | Priority | Execution | Pass/Fail | Defect ID |
|-------------|----------------|-----------|----------|-----------|-----------|-----------|
| TC-030 | Approved invoice auto-forwarded to payment | Integration | P1 | Not Executed | — | — |
| TC-031 | Correct data payload sent to payment system | Integration | P1 | Not Executed | — | — |
| TC-032 | Payment system down — invoice queued/retried | Error Handling | P1 | Not Executed | — | — |
| TC-033 | Invoice status reflects "Payment Pending" | Functional | P1 | Not Executed | — | — |
| TC-034 | Payment success — invoice marked "Paid" | Integration | P1 | Not Executed | — | — |
| TC-035 | Payment failure — invoice status reflects failure | Error Handling | P1 | Not Executed | — | — |
| TC-036 | Duplicate payment forwarding blocked | Idempotency | P1 | Not Executed | — | — |
| TC-037 | Payment forwarding event logged in audit | Audit | P1 | Not Executed | — | — |

**Coverage:** 8 test cases for REQ-04

---

### REQ-05: Email Notifications on Status Changes

| Test Case ID | Test Case Title | Test Type | Priority | Execution | Pass/Fail | Defect ID |
|-------------|----------------|-----------|----------|-----------|-----------|-----------|
| TC-040 | Vendor notified when invoice approved | Functional | P1 | Not Executed | — | — |
| TC-041 | Invalid email handled gracefully | Error Handling | P1 | Not Executed | — | — |
| TC-042 | AP notified when invoice submitted | Functional | P1 | Not Executed | — | — |
| TC-043 | Vendor notified when invoice rejected with reason | Functional | P1 | Not Executed | — | — |
| TC-044 | Vendor notified when payment processed | Functional | P1 | Not Executed | — | — |
| TC-045 | Notification fires only once per event | Idempotency | P1 | Not Executed | — | — |
| TC-046 | Email content has no sensitive data exposed | Security | P1 | Not Executed | — | — |
| TC-047 | Email link points to correct domain | Security | P1 | Not Executed | — | — |
| TC-048 | Notification retry logic on failure | Error Handling | P2 | Not Executed | — | — |
| TC-049 | No notification when no status change | Negative | P2 | Not Executed | — | — |

**Coverage:** 10 test cases for REQ-05

---

### REQ-06: Monthly Invoice Activity Reports

| Test Case ID | Test Case Title | Test Type | Priority | Execution | Pass/Fail | Defect ID |
|-------------|----------------|-----------|----------|-----------|-----------|-----------|
| TC-060 | AP admin generates monthly report | Functional | P1 | Not Executed | — | — |
| TC-061 | Vendor report shows only own data | Authorization | P1 | Not Executed | — | — |
| TC-062 | Report data accuracy verified against DB | Data Integrity | P1 | Not Executed | — | — |
| TC-063 | Report for month with zero invoices | Edge Case | P2 | Not Executed | — | — |
| TC-064 | Report generation performance (10,000 records) | Performance | P2 | Not Executed | — | — |

**Coverage:** 5 test cases for REQ-06

---

### REQ-07: Authorization & Access Control

| Test Case ID | Test Case Title | Test Type | Priority | Execution | Pass/Fail | Defect ID |
|-------------|----------------|-----------|----------|-----------|-----------|-----------|
| TC-050 | Unauthorized user cannot access any page | Authorization | P1 | Not Executed | — | — |
| TC-051 | Vendor cannot access AP screens | Authorization | P1 | Not Executed | — | — |
| TC-052 | AP cannot access admin screens | Authorization | P1 | Not Executed | — | — |
| TC-053 | Direct URL to restricted page — redirected | Authorization | P1 | Not Executed | — | — |
| TC-054 | API without auth token returns 401 | Authorization | P1 | Not Executed | — | — |
| TC-055 | API with wrong role returns 403 | Authorization | P1 | Not Executed | — | — |
| TC-056 | Vendor A cannot see Vendor B's invoices | Authorization | P1 | Not Executed | — | — |
| TC-057 | Deactivated account cannot log in | Authorization | P1 | Not Executed | — | — |
| TC-058 | Permissions enforced after role change | Authorization | P1 | Not Executed | — | — |
| TC-065 | SQL injection in form fields | Security | P1 | Not Executed | — | — |
| TC-066 | XSS in vendor name field | Security | P1 | Not Executed | — | — |
| TC-067 | IDOR via invoice ID manipulation | Security | P1 | Not Executed | — | — |
| TC-068 | CSRF token enforcement on actions | Security | P1 | Not Executed | — | — |

**Coverage:** 13 test cases for REQ-07

---

## RTM — Non-Functional Requirements

| NFR | Description | Test Scenario | Test Case | Status |
|-----|-------------|--------------|-----------|--------|
| NFR-01 | Invoice list loads < 2s for 1000 records | TS-10-01 | TC-070 | Not Executed |
| NFR-02 | 100 concurrent users — no degradation | TS-10-02 | TC-071 | Not Executed |
| NFR-03 | 500 users stress test (30 min) | TS-10-03 | TC-072 | Not Executed |
| NFR-04 | WCAG 2.1 AA accessibility compliance | TS-10-08 | TC-073 | Not Executed |
| NFR-05 | Cross-browser: Chrome, Firefox, Safari, Edge | TS-10-07 | TC-074 | Not Executed |
| NFR-06 | OWASP Top 10 — no critical vulnerabilities | TS-09-01 to TS-09-10 | TC-065 to TC-069 | Not Executed |

---

## Coverage Summary

| Requirement | Test Cases | Coverage % |
|-------------|------------|-----------|
| REQ-01: Registration & Login | 9 | 100% |
| REQ-02: Invoice Submission | 12 | 100% |
| REQ-03: AP Approval Workflow | 10 | 100% |
| REQ-04: Payment Forwarding | 8 | 100% |
| REQ-05: Email Notifications | 10 | 100% |
| REQ-06: Reports | 5 | 100% |
| REQ-07: Authorization / RBAC | 13 | 100% |
| **TOTAL** | **67** | **100%** |

---

## Traceability Completeness Check

| Check | Result |
|-------|--------|
| Every requirement has at least one test case | ✅ YES |
| Every test case traces to a requirement | ✅ YES |
| Security requirements tested at API level | ✅ YES |
| Negative paths covered | ✅ YES |
| Boundary conditions covered | ✅ YES |
| Integration points covered | ✅ YES |
| Non-functional requirements covered | ✅ YES |

---

## How to Read Execution Status

| Status | Meaning |
|--------|---------|
| Not Executed | Test case created but not yet run |
| In Progress | Currently being executed |
| Executed — Pass | Ran and passed expected result |
| Executed — Fail | Ran and failed (defect raised) |
| Blocked | Cannot execute due to environment/dependency issue |
| Deferred | Agreed to skip for current cycle |

---

**This is a LIVING document. Update after every test execution.**

**Related Documents:**
- [Test Cases](test-design/test-cases.md)
- [Test Scenarios](test-design/test-scenarios.md)
- [Test Execution Report](test-execution-report.md)
