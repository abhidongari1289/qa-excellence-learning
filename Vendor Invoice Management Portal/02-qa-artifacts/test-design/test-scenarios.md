# Test Scenarios

**Project:** Vendor Invoice Management Portal (B2B)
**Document Type:** Test Scenarios (What to Test)
**Phase:** Phase 3 — Test Design
**Prepared By:** QA Team
**Date:** June 2026

---

## What is a Test Scenario?

A test scenario is a high-level description of **what** needs to be tested — a user situation, workflow, or feature area. Each scenario maps to one or more detailed test cases.

> Test Scenario = "What to test"
> Test Case = "How to test it"

---

## TS-01: Vendor Registration

| # | Scenario | Priority | Requirement |
|---|----------|----------|-------------|
| TS-01-01 | Vendor successfully registers with valid required information | P1 | REQ-01 |
| TS-01-02 | Vendor attempts to register with an already-used email address | P1 | REQ-01 |
| TS-01-03 | Vendor attempts to register with missing mandatory fields | P1 | REQ-01 |
| TS-01-04 | Vendor receives email verification and completes it | P1 | REQ-01 |
| TS-01-05 | Vendor registration with invalid email format | P2 | REQ-01 |
| TS-01-06 | Vendor registration with special characters in name fields | P2 | REQ-01 |
| TS-01-07 | Admin creates vendor account on behalf of vendor | P2 | REQ-01 |
| TS-01-08 | Vendor receives welcome/confirmation email post-registration | P2 | REQ-01 |

---

## TS-02: Vendor Login & Session Management

| # | Scenario | Priority | Requirement |
|---|----------|----------|-------------|
| TS-02-01 | Vendor successfully logs in with valid credentials | P1 | REQ-01 |
| TS-02-02 | Vendor fails to log in with incorrect password | P1 | REQ-01 |
| TS-02-03 | Account locks after N consecutive failed login attempts | P1 | REQ-01, REQ-07 |
| TS-02-04 | Vendor uses "Forgot Password" to reset credentials | P1 | REQ-01 |
| TS-02-05 | Session expires after defined inactivity timeout | P1 | REQ-01, REQ-07 |
| TS-02-06 | Vendor cannot access portal without logging in | P1 | REQ-07 |
| TS-02-07 | Vendor is redirected to login if session expires mid-task | P2 | REQ-01 |
| TS-02-08 | Vendor logs out and session is fully terminated | P2 | REQ-01 |
| TS-02-09 | Vendor cannot access another vendor's data using URL manipulation | P1 | REQ-07 |

---

## TS-03: Invoice Submission

| # | Scenario | Priority | Requirement |
|---|----------|----------|-------------|
| TS-03-01 | Vendor submits valid invoice against an open PO | P1 | REQ-02 |
| TS-03-02 | Vendor submits invoice with amount exactly equal to PO value | P1 | REQ-02 |
| TS-03-03 | Vendor submits invoice with amount exceeding PO value | P1 | REQ-02 |
| TS-03-04 | Vendor submits invoice with amount below PO value (partial invoice) | P1 | REQ-02 |
| TS-03-05 | Vendor uploads valid PDF file with invoice | P1 | REQ-02 |
| TS-03-06 | Vendor uploads valid Excel file with invoice | P1 | REQ-02 |
| TS-03-07 | Vendor uploads file exceeding maximum size limit | P1 | REQ-02 |
| TS-03-08 | Vendor uploads unsupported file format | P1 | REQ-02 |
| TS-03-09 | Vendor attempts to submit duplicate invoice (same invoice number) | P1 | REQ-02 |
| TS-03-10 | Vendor submits invoice against a closed/fully-invoiced PO | P1 | REQ-02 |
| TS-03-11 | Vendor submits invoice without attaching any file | P2 | REQ-02 |
| TS-03-12 | Vendor submits invoice with zero amount | P2 | REQ-02 |
| TS-03-13 | Vendor submits invoice with negative amount | P2 | REQ-02 |
| TS-03-14 | Vendor views submission history after successful submission | P2 | REQ-02 |
| TS-03-15 | Vendor edits invoice before AP has viewed it (if feature exists) | P2 | REQ-02 |
| TS-03-16 | Network failure simulation during file upload | P1 | REQ-02 |
| TS-03-17 | Vendor submits invoice with valid invoice number that already exists | P1 | REQ-02 |

---

## TS-04: AP Team Approval Workflow

| # | Scenario | Priority | Requirement |
|---|----------|----------|-------------|
| TS-04-01 | AP user views list of pending invoices | P1 | REQ-03 |
| TS-04-02 | AP user approves a valid invoice | P1 | REQ-03 |
| TS-04-03 | AP user rejects an invoice with rejection reason | P1 | REQ-03 |
| TS-04-04 | AP user rejects an invoice without providing a reason | P2 | REQ-03 |
| TS-04-05 | Two AP users attempt to approve the same invoice simultaneously | P1 | REQ-03 |
| TS-04-06 | AP user views invoice details and attached file | P1 | REQ-03 |
| TS-04-07 | AP user filters invoices by status, date, vendor | P2 | REQ-03 |
| TS-04-08 | AP user cannot approve own submitted test invoices (conflict of interest) | P2 | REQ-03, REQ-07 |
| TS-04-09 | Vendor account cannot access AP approval screen | P1 | REQ-07 |
| TS-04-10 | Invoice status updates immediately after approval action | P1 | REQ-03 |
| TS-04-11 | AP user actions are logged in audit trail | P1 | REQ-03 |
| TS-04-12 | AP user attempts to approve an already-approved invoice | P1 | REQ-03 |

---

## TS-05: Payment Forwarding

| # | Scenario | Priority | Requirement |
|---|----------|----------|-------------|
| TS-05-01 | Approved invoice is automatically forwarded to payment system | P1 | REQ-04 |
| TS-05-02 | Correct invoice data is passed to payment system | P1 | REQ-04 |
| TS-05-03 | Payment system unavailable when forwarding is attempted | P1 | REQ-04 |
| TS-05-04 | Invoice status reflects "Payment Pending" after forwarding | P1 | REQ-04 |
| TS-05-05 | Payment system returns success — invoice marked as "Paid" | P1 | REQ-04 |
| TS-05-06 | Payment system returns failure — invoice status reflects failure | P1 | REQ-04 |
| TS-05-07 | Duplicate payment forwarding attempt is blocked | P1 | REQ-04 |
| TS-05-08 | Forwarding event is logged in audit trail | P1 | REQ-04 |

---

## TS-06: Email Notifications

| # | Scenario | Priority | Requirement |
|---|----------|----------|-------------|
| TS-06-01 | Vendor receives email when invoice is successfully submitted | P1 | REQ-05 |
| TS-06-02 | AP team receives email when new invoice is submitted for review | P1 | REQ-05 |
| TS-06-03 | Vendor receives email when invoice is approved | P1 | REQ-05 |
| TS-06-04 | Vendor receives email when invoice is rejected (with reason) | P1 | REQ-05 |
| TS-06-05 | Vendor receives email when payment is processed | P1 | REQ-05 |
| TS-06-06 | No notification sent when no status change occurs | P2 | REQ-05 |
| TS-06-07 | Email not delivered to invalid address — system handles gracefully | P1 | REQ-05 |
| TS-06-08 | Email content contains correct invoice details and portal link | P1 | REQ-05 |
| TS-06-09 | No sensitive data (passwords, bank details) in email body | P1 | REQ-05, REQ-07 |
| TS-06-10 | Notification trigger fires once per event, not multiple times | P1 | REQ-05 |

---

## TS-07: Monthly Invoice Reports

| # | Scenario | Priority | Requirement |
|---|----------|----------|-------------|
| TS-07-01 | AP admin generates monthly report for current month | P1 | REQ-06 |
| TS-07-02 | Report contains accurate invoice count, amounts, statuses | P1 | REQ-06 |
| TS-07-03 | Vendor can download report showing only their own invoices | P1 | REQ-06, REQ-07 |
| TS-07-04 | Vendor cannot access another vendor's report data | P1 | REQ-06, REQ-07 |
| TS-07-05 | Report generated in correct format (PDF/Excel) | P2 | REQ-06 |
| TS-07-06 | Report for a month with zero invoices generates correctly (empty state) | P2 | REQ-06 |
| TS-07-07 | Report generation with large data volume (performance) | P2 | REQ-06 |
| TS-07-08 | Auto-generated report triggers at start of each new month | P1 | REQ-06 |

---

## TS-08: Authorization & Role-Based Access Control

| # | Scenario | Priority | Requirement |
|---|----------|----------|-------------|
| TS-08-01 | Vendor cannot access AP approval screens | P1 | REQ-07 |
| TS-08-02 | AP user cannot access admin management screens | P1 | REQ-07 |
| TS-08-03 | Unauthorized user cannot access any protected page | P1 | REQ-07 |
| TS-08-04 | Direct URL access to restricted page redirects to login | P1 | REQ-07 |
| TS-08-05 | API calls without valid token return 401 Unauthorized | P1 | REQ-07 |
| TS-08-06 | API calls with wrong role return 403 Forbidden | P1 | REQ-07 |
| TS-08-07 | Vendor A cannot view Vendor B's invoices | P1 | REQ-07 |
| TS-08-08 | Admin can view all vendor invoices | P2 | REQ-07 |
| TS-08-09 | Deactivated account cannot log in or access API | P1 | REQ-07 |
| TS-08-10 | Permissions are enforced even after role change | P1 | REQ-07 |

---

## TS-09: Security Testing Scenarios

| # | Scenario | Priority | Type |
|---|----------|----------|------|
| TS-09-01 | SQL injection in invoice submission form fields | P1 | Security |
| TS-09-02 | XSS (Cross-Site Scripting) in vendor name, invoice description | P1 | Security |
| TS-09-03 | CSRF (Cross-Site Request Forgery) on approval action | P1 | Security |
| TS-09-04 | Brute force login attempt — lockout mechanism | P1 | Security |
| TS-09-05 | File upload — malicious executable disguised as PDF | P1 | Security |
| TS-09-06 | Session token reuse after logout | P1 | Security |
| TS-09-07 | Insecure direct object reference (IDOR) via invoice ID manipulation | P1 | Security |
| TS-09-08 | Sensitive data in URL query parameters | P1 | Security |
| TS-09-09 | API returns full stack trace on error | P2 | Security |
| TS-09-10 | Password stored in plain text (check API response) | P1 | Security |

---

## TS-10: Performance & Non-Functional Scenarios

| # | Scenario | Priority | Type |
|---|----------|----------|------|
| TS-10-01 | Invoice list page loads under 2 seconds for 1000 invoices | P1 | Performance |
| TS-10-02 | 100 concurrent users submit invoices simultaneously | P1 | Load |
| TS-10-03 | System handles peak load: 500 concurrent users for 30 minutes | P2 | Stress |
| TS-10-04 | Report generation completes under 60 seconds for 10,000 records | P2 | Performance |
| TS-10-05 | 10 MB file upload completes within acceptable time | P2 | Performance |
| TS-10-06 | AP approval workflow accessible on mobile browser | P2 | Compatibility |
| TS-10-07 | Portal is accessible on Chrome, Firefox, Safari, Edge | P1 | Compatibility |
| TS-10-08 | Key workflows pass WCAG 2.1 AA accessibility standard | P1 | Accessibility |
| TS-10-09 | All form fields navigable by keyboard only | P2 | Accessibility |

---

## TS-11: Integration Testing Scenarios

| # | Scenario | Priority | Integration Point |
|---|----------|----------|-------------------|
| TS-11-01 | Invoice submission writes correct data to database | P1 | App ↔ DB |
| TS-11-02 | Approval event triggers email notification within 2 minutes | P1 | App ↔ Email |
| TS-11-03 | Email service returns bounce — app logs and handles gracefully | P1 | App ↔ Email |
| TS-11-04 | Approved invoice payload sent to payment gateway is complete | P1 | App ↔ Payment |
| TS-11-05 | Payment gateway timeout — app retries and notifies if failed | P1 | App ↔ Payment |
| TS-11-06 | Report generation pulls correct data from all invoice states | P1 | App ↔ DB |
| TS-11-07 | Audit log records every state change with correct timestamp | P1 | App ↔ DB |

---

## TS-12: Deployment & Documentation Verification

| # | Scenario | Priority | Phase |
|---|----------|----------|-------|
| TS-12-01 | Smoke test — all core features work post-deployment | P1 | Phase 8 |
| TS-12-02 | Environment variables correctly configured in production | P1 | Phase 8 |
| TS-12-03 | Feature flags set correctly (no dev features exposed) | P1 | Phase 8 |
| TS-12-04 | DB migrations ran successfully | P1 | Phase 8 |
| TS-12-05 | User guide matches actual UI behavior | P2 | Phase 8 |
| TS-12-06 | API documentation matches actual API responses | P2 | Phase 8 |
| TS-12-07 | Error messages are user-friendly and accurate | P2 | Phase 8 |
| TS-12-08 | Rollback procedure tested and documented | P1 | Phase 8 |

---

## Scenario Coverage Summary

| Area | Scenario Count | Risk Level |
|------|---------------|-----------|
| Registration | 8 | Medium |
| Login & Session | 9 | High |
| Invoice Submission | 17 | Critical |
| AP Approval | 12 | Critical |
| Payment Forwarding | 8 | Critical |
| Email Notifications | 10 | Medium |
| Reports | 8 | Medium |
| Authorization / RBAC | 10 | Critical |
| Security | 10 | Critical |
| Performance / NFT | 9 | High |
| Integration | 7 | High |
| Deployment | 8 | High |
| **TOTAL** | **116** | |

---

**Related Documents:**
- [Test Cases (detailed)](test-cases.md)
- [RTM](../rtm.md)
- [Test Plan](../test-plan.md)
