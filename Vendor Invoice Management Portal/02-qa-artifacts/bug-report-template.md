# Bug Report Template & Sample Reports

**Project:** Vendor Invoice Management Portal (B2B)
**Document Type:** Defect Management
**Phase:** Phase 5 — Test Execution
**Prepared By:** QA Team

---

## Bug Report Template

Use this template for every defect raised. A good bug report gets fixed. A poor one gets closed as "Cannot Reproduce".

---

```
=============================================================
BUG REPORT
=============================================================
Bug ID         : BUG-[NUMBER]
Project        : Vendor Invoice Management Portal
Module         : [e.g., Invoice Submission / AP Approval / Login]
Test Case ID   : [TC-XXX]
Requirement ID : [REQ-XX]

TITLE          : [One-line summary — specific and clear]
                 Example: "Vendor can submit invoice exceeding PO value without warning"

SEVERITY       : [ ] CRITICAL  [ ] HIGH  [ ] MEDIUM  [ ] LOW
PRIORITY       : [ ] P1  [ ] P2  [ ] P3  [ ] P4

Reported By    : [Name]
Reported Date  : [YYYY-MM-DD]
Assigned To    : [Developer Name]
Status         : [ ] New  [ ] Open  [ ] In Fix  [ ] Fixed  [ ] Retest  [ ] Closed

=============================================================
ENVIRONMENT
=============================================================
Browser        : [e.g., Chrome 125.0.6422.112]
OS             : [e.g., Windows 11 / macOS 14.4]
Environment    : [DEV / QA / Staging / Production]
App Version    : [e.g., v1.2.3-build.456]
Test Data Used : [e.g., Vendor: USR-V-001, PO: PO-2026-001]

=============================================================
PRECONDITIONS
=============================================================
1. [State required setup before reproducing]
2. [e.g., Vendor USR-V-001 is logged in]
3. [e.g., PO-2026-002 has $3,000 available balance]

=============================================================
STEPS TO REPRODUCE
=============================================================
1. [Exact, numbered steps]
2. [Be specific — URL, field names, input values]
3. [Any step ambiguous means developer cannot reproduce]
4. ...

=============================================================
EXPECTED RESULT
=============================================================
[What should happen based on requirements/acceptance criteria]

=============================================================
ACTUAL RESULT
=============================================================
[What actually happened — be precise, no interpretation]

=============================================================
IMPACT ANALYSIS
=============================================================
Business Impact : [e.g., "Vendor can over-bill, causing financial loss"]
Users Affected  : [e.g., "All vendors submitting invoices against capped POs"]
Workaround      : [e.g., "AP can manually check PO balance before approving" / "None"]

=============================================================
ATTACHMENTS
=============================================================
[ ] Screenshot(s): [filename.png]
[ ] Screen recording: [filename.mp4]
[ ] API request/response: [filename.json]
[ ] Browser console log: [filename.txt]
[ ] Network HAR file: [filename.har]
[ ] Database query result: [filename.sql]

=============================================================
REPRODUCIBILITY
=============================================================
[ ] Always (100%)
[ ] Intermittent (approx. X% of time)
[ ] Rare (happened once)
[ ] Unable to reproduce after initial report

=============================================================
ADDITIONAL NOTES
=============================================================
[Any relevant context, related bugs, suspected root cause,
similar bugs in other modules, etc.]

=============================================================
RETEST NOTES (filled by QA after fix)
=============================================================
Retested By    :
Retest Date    :
Fix Verified   : [ ] Yes  [ ] No
Close Notes    :
=============================================================
```

---

## Severity vs. Priority — Quick Guide

| | CRITICAL | HIGH | MEDIUM | LOW |
|-|----------|------|--------|-----|
| **P1** | System crash, security breach, no workaround | Core feature broken, no workaround | — | — |
| **P2** | — | Core feature broken, workaround exists | Business feature impacted | — |
| **P3** | — | — | Minor functionality issue | — |
| **P4** | — | — | — | Cosmetic issue |

> High severity ≠ always high priority. A critical security bug in a rarely-used admin screen might be P2 while a UX issue in the core invoice submission might be P1 due to business impact.

---

## Sample Bug Report 1 — CRITICAL Severity

```
=============================================================
BUG REPORT
=============================================================
Bug ID         : BUG-001
Project        : Vendor Invoice Management Portal
Module         : Invoice Submission
Test Case ID   : TC-011
Requirement ID : REQ-02

TITLE          : Invoice submission accepted when amount exceeds PO balance — no validation

SEVERITY       : [X] CRITICAL
PRIORITY       : [X] P1

Reported By    : QA Engineer
Reported Date  : 2026-06-13
Status         : New

=============================================================
ENVIRONMENT
=============================================================
Browser        : Chrome 125.0
OS             : Windows 11
Environment    : QA
App Version    : v0.9.1-build.103
Test Data Used : Vendor: USR-V-001, PO: PO-2026-002 (balance: $3,000)

=============================================================
PRECONDITIONS
=============================================================
1. Vendor USR-V-001 is logged in
2. PO-2026-002 is open with $3,000 available balance
3. No prior invoices against this PO

=============================================================
STEPS TO REPRODUCE
=============================================================
1. Log in as vendor.test1@acmesupplies.com
2. Navigate to Submit Invoice
3. Select PO: PO-2026-002 (balance shown: $3,000.00)
4. Enter Invoice Number: INV-EXCEED-001
5. Enter Invoice Amount: $3,500.00
6. Upload file: invoice_valid.pdf
7. Click "Submit Invoice"

=============================================================
EXPECTED RESULT
=============================================================
System should display an error: "Invoice amount ($3,500.00) exceeds 
the available PO balance ($3,000.00). Please enter an amount within 
the PO balance or contact your AP team."

Invoice should NOT be created in the database.

=============================================================
ACTUAL RESULT
=============================================================
Invoice is accepted and submitted successfully. 
Confirmation message: "Invoice INV-EXCEED-001 submitted. Status: Pending."
Invoice appears in AP queue for approval.
No warning or error shown at any point.

=============================================================
IMPACT ANALYSIS
=============================================================
Business Impact : Vendors can over-bill, leading to overpayment beyond PO authorization.
                  Violates 3-way matching control (PO ≠ Invoice ≠ Goods Receipt).
                  Financial loss and compliance risk.
Users Affected  : ALL vendors submitting invoices.
Workaround      : AP team must manually compare invoice amount to PO balance.
                  High risk of human error — NOT an acceptable workaround.

=============================================================
ATTACHMENTS
=============================================================
[X] Screenshot: BUG-001-invoice-exceed-submission.png
[X] API response: BUG-001-api-response.json (shows 200 OK)
[X] Database: BUG-001-db-check.sql (shows invoice created with $3,500)

=============================================================
REPRODUCIBILITY
=============================================================
[X] Always (100%)
=============================================================
```

---

## Sample Bug Report 2 — HIGH Severity

```
=============================================================
BUG REPORT
=============================================================
Bug ID         : BUG-002
Project        : Vendor Invoice Management Portal
Module         : Authorization / Security
Test Case ID   : TC-067
Requirement ID : REQ-07

TITLE          : IDOR — Vendor B can view Vendor A's invoice via URL ID manipulation

SEVERITY       : [X] HIGH
PRIORITY       : [X] P1

Reported By    : QA Engineer (Security Testing)
Reported Date  : 2026-06-13
Status         : New

=============================================================
ENVIRONMENT
=============================================================
Browser        : Firefox 127.0
OS             : macOS 14.4
Environment    : QA
App Version    : v0.9.1-build.103

=============================================================
PRECONDITIONS
=============================================================
1. Vendor A (USR-V-001) has submitted invoice with ID 1001
2. Vendor B (USR-V-002) is logged in
3. Vendor B does NOT own invoice ID 1001

=============================================================
STEPS TO REPRODUCE
=============================================================
1. Log in as Vendor B (vendor.test2@betatech.com)
2. Navigate to own invoice: /invoices/1002
3. In the URL bar, change 1002 to 1001
4. Press Enter / navigate to /invoices/1001
5. Observe the response

=============================================================
EXPECTED RESULT
=============================================================
HTTP 403 Forbidden response.
Message: "You do not have permission to access this resource."
Vendor A's invoice data NOT visible.

=============================================================
ACTUAL RESULT
=============================================================
HTTP 200 OK returned.
Vendor A's invoice (INV-TEST-001) including PO number, invoice amount,
vendor details, and attached file download link is fully visible to Vendor B.

=============================================================
IMPACT ANALYSIS
=============================================================
Business Impact : Insecure Direct Object Reference (IDOR) — OWASP A01.
                  Any vendor can access any other vendor's invoice data.
                  Commercially sensitive data exposed (amounts, PO numbers, vendor details).
                  Compliance breach (data privacy, GDPR if applicable).
Users Affected  : All vendors.
Workaround      : NONE — data is openly accessible.

=============================================================
ATTACHMENTS
=============================================================
[X] Screenshot: BUG-002-idor-vendor-data-exposed.png
[X] Network capture: BUG-002-request-response.har

=============================================================
REPRODUCIBILITY
=============================================================
[X] Always (100%)
=============================================================
```

---

## Sample Bug Report 3 — MEDIUM Severity

```
=============================================================
BUG REPORT
=============================================================
Bug ID         : BUG-003
Project        : Vendor Invoice Management Portal
Module         : Email Notifications
Test Case ID   : TC-040
Requirement ID : REQ-05

TITLE          : Approval notification email delayed up to 15 minutes (SLA breach)

SEVERITY       : [X] MEDIUM
PRIORITY       : [X] P2

Reported By    : QA Engineer
Reported Date  : 2026-06-13
Status         : New

=============================================================
ENVIRONMENT
=============================================================
Environment    : QA
App Version    : v0.9.1-build.103
Email Service  : Mailhog (local test SMTP)

=============================================================
STEPS TO REPRODUCE
=============================================================
1. Submit invoice as Vendor (USR-V-001)
2. Log in as AP user and approve invoice immediately
3. Monitor vendor email inbox (Mailhog dashboard)
4. Record time from approval to email receipt

=============================================================
EXPECTED RESULT
=============================================================
Email received within 2 minutes of approval action.

=============================================================
ACTUAL RESULT
=============================================================
Email received after 14 minutes and 33 seconds.
On 3 repeated tests: 12 min, 14 min, 15 min average delay.

=============================================================
IMPACT ANALYSIS
=============================================================
Business Impact : Vendors don't know invoice status in near real-time.
                  May cause follow-up calls to AP team, increasing workload.
Users Affected  : All vendors receiving notifications.
Workaround      : Vendors can check portal for status manually.

=============================================================
REPRODUCIBILITY
=============================================================
[X] Always (100%) — consistently slow
=============================================================
```

---

## Defect Metrics Dashboard (Template)

| Metric | Count |
|--------|-------|
| Total Defects Found | |
| CRITICAL | |
| HIGH | |
| MEDIUM | |
| LOW | |
| Open | |
| In Fix | |
| Fixed — Pending Retest | |
| Closed | |
| Rejected (Not a Bug) | |
| Deferred | |
| **Defect Density** (defects/test case) | |
| **Bug Escape Rate** (%) | |

---

**Related Documents:**
- [Test Cases](test-design/test-cases.md)
- [Test Execution Report](test-execution-report.md)
- [Risk Register](../03-risk-analysis/risks-and-mitigations.md)
