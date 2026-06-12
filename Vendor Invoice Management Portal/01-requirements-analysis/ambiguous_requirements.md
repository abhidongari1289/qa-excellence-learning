# Ambiguous Requirements Analysis

**Project:** Vendor Invoice Management Portal (B2B)
**Document Type:** Requirements Ambiguity Register
**Phase:** Phase 1 — Requirements Analysis
**Prepared By:** QA Team
**Date:** June 2026

---

## Purpose

This document systematically identifies every ambiguity, gap, and implicit assumption present in the client-provided requirements before a single line of code is written. Finding a flaw here costs nothing. Finding the same flaw in production costs 100× more.

> "The most valuable bug you will ever find is in the requirements." — QA Excellence Training

---

## Requirements Under Analysis

The client provided 7 high-level requirements for the Vendor Invoice Management Portal:

1. Vendors can register and log in to the portal
2. Vendors can submit invoices against purchase orders
3. The AP team can view, approve, or reject invoices
4. Approved invoices are forwarded for payment processing
5. Both parties receive email notifications on status changes
6. The system generates monthly invoice activity reports
7. Only authorized users may access the system

---

## Ambiguity Identification Framework

For each requirement, the QA team applied the following five questions:

| Question | Why It Matters |
|----------|----------------|
| What does success look like? | Defines the pass condition |
| What happens when it fails? | Error handling, user feedback |
| Who are all the users affected? | Role-based behavior coverage |
| What data is involved? | Data types, validation, edge cases |
| What are the boundaries/limits? | Boundary value analysis |

---

## REQ-01: Vendor Registration & Login

**Original Statement:** "Vendors can register and log in to the portal"

### Ambiguities Identified

| ID | Ambiguity | Type | Risk if Unresolved |
|----|-----------|------|-------------------|
| AMB-01-A | No clarity on self-registration vs admin-invite flow | Process | Wrong UX built |
| AMB-01-B | No specification of required registration fields | Data | Incomplete vendor profiles |
| AMB-01-C | Authentication method unspecified (password, SSO, 2FA) | Security | Compliance failure |
| AMB-01-D | Session timeout not defined | Security | Security vulnerability |
| AMB-01-E | Multiple users per vendor account — allowed or not? | Access Control | RBAC design flaw |
| AMB-01-F | Forgot password / account recovery flow missing | Process | Users locked out |
| AMB-01-G | Account deactivation behavior undefined | Process | Data leak risk |

**Impact Level:** 🔴 HIGH — Core entry point into the system

---

## REQ-02: Invoice Submission Against Purchase Orders

**Original Statement:** "Vendors can submit invoices against purchase orders"

### Ambiguities Identified

| ID | Ambiguity | Type | Risk if Unresolved |
|----|-----------|------|-------------------|
| AMB-02-A | PO discovery mechanism not specified (dropdown, search, manual entry?) | UX | Vendors can't find their POs |
| AMB-02-B | Accepted file formats not specified | Technical | Wrong parser built |
| AMB-02-C | Maximum file size not specified | Technical | Server performance issues |
| AMB-02-D | Whether partial invoicing against a PO is allowed | Business Rule | Incorrect payment |
| AMB-02-E | Invoice number uniqueness constraint undefined | Data Integrity | Duplicate invoices |
| AMB-02-F | Multi-currency support requirement missing | Technical | Wrong amount processing |
| AMB-02-G | Behaviour when invoice amount exceeds PO value | Business Rule | Financial loss |
| AMB-02-H | Can a submitted invoice be edited before AP review? | Process | Incorrect data sent to AP |
| AMB-02-I | Duplicate submission prevention mechanism | Data Integrity | Duplicate payments |
| AMB-02-J | Submission limit per vendor per day/month | Performance | System abuse |

**Impact Level:** 🔴 HIGH — Core business transaction

---

## REQ-03: AP Team Approval / Rejection Workflow

**Original Statement:** "The AP team can view, approve, or reject invoices"

### Ambiguities Identified

| ID | Ambiguity | Type | Risk if Unresolved |
|----|-----------|------|-------------------|
| AMB-03-A | Single approver or multi-level approval not defined | Process | Wrong workflow built |
| AMB-03-B | Approval SLA / deadline not specified | Process | Invoices stall indefinitely |
| AMB-03-C | Rejection reason — mandatory or optional? | Communication | Vendors don't know why |
| AMB-03-D | Can vendor re-submit after rejection? (how many times?) | Process | Infinite rejection loops |
| AMB-03-E | Can AP request amendment without full rejection? | Process | Extra round trips |
| AMB-03-F | Batch approval (approve multiple at once) — needed? | UX | Productivity bottleneck |
| AMB-03-G | Can AP modify invoice amounts or only approve/reject? | Authorization | Financial data corruption |

**Impact Level:** 🟠 MEDIUM-HIGH — Core business workflow

---

## REQ-04: Approved Invoices Forwarded to Payment Processing

**Original Statement:** "Approved invoices are forwarded for payment processing"

### Ambiguities Identified

| ID | Ambiguity | Type | Risk if Unresolved |
|----|-----------|------|-------------------|
| AMB-04-A | "Forwarded" — manual or automated integration? | Architecture | Wrong integration built |
| AMB-04-B | Payment processing system name/API not specified | Technical | Cannot build integration |
| AMB-04-C | Timing of forwarding — immediate or batched (EOD)? | Process | Unexpected payment delays |
| AMB-04-D | Error handling if payment system is unavailable | Resilience | Approved invoices lost |
| AMB-04-E | Can an approved invoice be cancelled before payment? | Process | No recall mechanism |
| AMB-04-F | What data fields does payment system require? | Technical | Integration failures |

**Impact Level:** 🟠 HIGH — Financial transaction execution

---

## REQ-05: Email Notifications on Status Changes

**Original Statement:** "Both parties receive email notifications on status changes"

### Ambiguities Identified

| ID | Ambiguity | Type | Risk if Unresolved |
|----|-----------|------|-------------------|
| AMB-05-A | Exact list of "status changes" that trigger notifications not defined | Scope | Over- or under-notification |
| AMB-05-B | Email content spec missing (summary or full details?) | UX | Confusing emails |
| AMB-05-C | What if vendor email is invalid — fallback mechanism? | Resilience | Silent notification failure |
| AMB-05-D | User notification preferences — configurable or fixed? | UX | Notification spam |
| AMB-05-E | Notification timing — real-time or batched daily digest? | Performance | Outdated status info |
| AMB-05-F | Email branding/template ownership — client or system default? | UX | Brand inconsistency |

**Impact Level:** 🟡 MEDIUM — Communication layer

---

## REQ-06: Monthly Invoice Activity Reports

**Original Statement:** "The system generates monthly invoice activity reports"

### Ambiguities Identified

| ID | Ambiguity | Type | Risk if Unresolved |
|----|-----------|------|-------------------|
| AMB-06-A | Who can access reports — AP, vendors, admin, all? | Authorization | Confidential data exposed |
| AMB-06-B | Report content not specified (which metrics/columns?) | Scope | Reports don't meet business need |
| AMB-06-C | Report format not specified (PDF, Excel, both?) | Technical | Wrong format built |
| AMB-06-D | Auto-generated or on-demand? | Process | Incorrect trigger built |
| AMB-06-E | "Monthly" — calendar month or rolling 30 days? | Business Rule | Wrong date range calculated |
| AMB-06-F | Timezone for month calculation | Technical | Cross-region data issues |
| AMB-06-G | Data retention for generated reports | Compliance | Storage and audit failures |

**Impact Level:** 🟡 MEDIUM — Reporting / analytics layer

---

## REQ-07: Authorization & Access Control

**Original Statement:** "Only authorized users may access the system"

### Ambiguities Identified

| ID | Ambiguity | Type | Risk if Unresolved |
|----|-----------|------|-------------------|
| AMB-07-A | User roles not defined (Admin, AP, Vendor, Finance Manager?) | Security | Incomplete RBAC |
| AMB-07-B | Permission matrix for each role missing | Security | Unauthorized data access |
| AMB-07-C | Can vendors see other vendors' invoices? | Security | Privacy breach |
| AMB-07-D | Role assignment process (self-service, admin-managed?) | Process | Unauthorized role escalation |
| AMB-07-E | Access review/recertification cadence undefined | Compliance | Stale access persists |
| AMB-07-F | API-level authorization enforcement not mentioned | Security | RBAC bypass via API |

**Impact Level:** 🔴 HIGH — Security and compliance foundation

---

## Cross-Cutting Ambiguities

These apply across multiple requirements:

| ID | Topic | Gap | Impact |
|----|-------|-----|--------|
| AMB-X-01 | Data retention | How long are invoices retained? (1yr, 7yr?) | Compliance |
| AMB-X-02 | Audit trail | What actions are logged? Who can view logs? | Compliance |
| AMB-X-03 | Compliance requirements | SOX, GDPR, local tax laws applicable? | Legal risk |
| AMB-X-04 | Browser/device support | Which browsers/devices must be supported? | Compatibility |
| AMB-X-05 | Concurrent users | Expected peak concurrency? | Performance sizing |
| AMB-X-06 | Localization | Multi-language support required? | Accessibility |
| AMB-X-07 | API versioning | Will external systems call APIs? | Integration design |

---

## Ambiguity Priority Matrix

| Requirement | Ambiguity Count | Risk Level | Priority to Clarify |
|-------------|-----------------|-----------|---------------------|
| REQ-01: Registration & Login | 7 | 🔴 HIGH | P1 — Before any design |
| REQ-02: Invoice Submission | 10 | 🔴 HIGH | P1 — Before any design |
| REQ-07: Authorization | 6 | 🔴 HIGH | P1 — Before any design |
| REQ-04: Payment Forwarding | 6 | 🟠 MEDIUM-HIGH | P2 — Before dev starts |
| REQ-03: AP Approval | 7 | 🟠 MEDIUM-HIGH | P2 — Before dev starts |
| REQ-05: Notifications | 6 | 🟡 MEDIUM | P3 — Before integration |
| REQ-06: Reports | 7 | 🟡 MEDIUM | P3 — Before implementation |
| Cross-Cutting | 7 | Various | P1-P2 as applicable |

---

## What Happens If These Are Not Clarified

| If we skip... | We risk building... | Discovered when... | Cost |
|---------------|--------------------|--------------------|------|
| REQ-01 ambiguities | Wrong auth system | UAT | $$$ |
| REQ-02 ambiguities | No duplicate check | Production | $$$$$ |
| REQ-07 ambiguities | Broken RBAC | Security audit | $$$$$$ |
| Cross-cutting | Non-compliant system | Regulatory review | $$$$$$$ |

---

## Next Steps

1. Submit `clarifying_questions.md` to the client/BA for response
2. Update this document with confirmed answers once received
3. Freeze requirements before test design begins
4. Every confirmed answer becomes acceptance criteria for a test case

---

**Related Documents:**
- [Clarifying Questions for Client](clarifying_questions.md)
- [Test Plan](../02-qa-artifacts/test-plan.md)
- [RTM](../02-qa-artifacts/rtm.md)

**Document Version:** 1.0
**Owner:** QA Team
**Status:** Awaiting client sign-off on clarifications
