# Test Cases — Detailed

**Project:** Vendor Invoice Management Portal (B2B)
**Document Type:** Test Cases
**Phase:** Phase 3 — Test Design
**Prepared By:** QA Team
**Date:** June 2026

> Test Case format: ID | Title | Preconditions | Steps | Test Data | Expected Result | Status

---

## Module: Vendor Registration & Login

---

### TC-001 — Vendor Successful Registration

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC-001 |
| **Test Scenario** | TS-01-01 |
| **Requirement** | REQ-01 |
| **Title** | Vendor successfully registers with valid information |
| **Priority** | P1 |
| **Severity (if fail)** | CRITICAL |

**Preconditions:**
- Registration page is accessible
- Email address is not already registered

**Test Steps:**
1. Navigate to the vendor portal registration page
2. Enter Company Name: "Acme Supplies Ltd"
3. Enter Email: "vendor.test@acmesupplies.com"
4. Enter Password: "Vendor@2024Secure"
5. Enter Confirm Password: "Vendor@2024Secure"
6. Enter Tax ID / GST Number: "GST123456789"
7. Click "Register" button
8. Check registered email inbox for verification email
9. Click the verification link in email
10. Attempt to log in with registered credentials

**Test Data:**
```
Company Name: Acme Supplies Ltd
Email: vendor.test@acmesupplies.com
Password: Vendor@2024Secure
Tax ID: GST123456789
```

**Expected Result:**
- Registration form submits successfully
- Success message shown: "Registration submitted. Please verify your email."
- Verification email received within 2 minutes
- After clicking verification link, account is activated
- Login with these credentials succeeds
- Vendor dashboard is displayed

**Actual Result:** _[To be filled during execution]_
**Status:** NOT EXECUTED
**Tested By:** _
**Date Tested:** _

---

### TC-002 — Duplicate Email Registration

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC-002 |
| **Test Scenario** | TS-01-02 |
| **Requirement** | REQ-01 |
| **Title** | Registration fails when email is already registered |
| **Priority** | P1 |
| **Severity (if fail)** | HIGH |

**Preconditions:**
- Email "existing.vendor@test.com" is already registered

**Test Steps:**
1. Navigate to vendor registration page
2. Enter Email: "existing.vendor@test.com"
3. Fill all other required fields with valid data
4. Click "Register"

**Expected Result:**
- Error message displayed: "An account with this email already exists. Please log in or use a different email."
- No duplicate account created in database
- User not redirected to dashboard

**Status:** NOT EXECUTED

---

### TC-003 — Login with Valid Credentials

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC-003 |
| **Test Scenario** | TS-02-01 |
| **Requirement** | REQ-01 |
| **Title** | Vendor successfully logs in with correct credentials |
| **Priority** | P1 |
| **Severity (if fail)** | CRITICAL |

**Preconditions:**
- Verified vendor account exists: "vendor.test@acmesupplies.com"

**Test Steps:**
1. Navigate to vendor portal login page
2. Enter Email: "vendor.test@acmesupplies.com"
3. Enter Password: "Vendor@2024Secure"
4. Click "Login"

**Expected Result:**
- User authenticated successfully
- Redirected to vendor dashboard
- Username/company name displayed in header
- Session cookie issued with HttpOnly and Secure flags

**Status:** NOT EXECUTED

---

### TC-004 — Login Lockout After Failed Attempts

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC-004 |
| **Test Scenario** | TS-02-03 |
| **Requirement** | REQ-01, REQ-07 |
| **Title** | Account locks after 5 consecutive failed login attempts |
| **Priority** | P1 |
| **Severity (if fail)** | CRITICAL |

**Preconditions:**
- Verified vendor account exists: "vendor.test@acmesupplies.com"

**Test Steps:**
1. Navigate to login page
2. Enter correct email, enter WRONG password: "wrongpassword1"
3. Click Login — note error message
4. Repeat steps 2-3 four more times (5 attempts total)
5. On 6th attempt, try with correct password

**Expected Result:**
- After each failed attempt: "Invalid email or password" error shown
- After 5th failed attempt: Account locked message shown
- Lockout email sent to registered email address
- 6th attempt with correct password fails (account still locked)
- Account auto-unlocks after defined lockout period (e.g., 30 min), OR admin can unlock

**Status:** NOT EXECUTED

---

### TC-005 — Session Expiry After Inactivity

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC-005 |
| **Test Scenario** | TS-02-05 |
| **Requirement** | REQ-01, REQ-07 |
| **Title** | Session expires after inactivity timeout |
| **Priority** | P1 |
| **Severity (if fail)** | HIGH |

**Preconditions:**
- Vendor is logged in

**Test Steps:**
1. Log in as vendor
2. Leave browser idle for [defined timeout period, e.g., 30 minutes]
3. Attempt to navigate to invoice submission page

**Expected Result:**
- User is redirected to login page
- Message shown: "Your session has expired. Please log in again."
- Previous session cookie is invalidated
- No access to protected pages without re-authentication

**Status:** NOT EXECUTED

---

## Module: Invoice Submission

---

### TC-010 — Successful Invoice Submission (Happy Path)

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC-010 |
| **Test Scenario** | TS-03-01 |
| **Requirement** | REQ-02 |
| **Title** | Vendor submits a valid invoice against an open PO |
| **Priority** | P1 |
| **Severity (if fail)** | CRITICAL |

**Preconditions:**
- Vendor is logged in
- Open PO "PO-2026-001" exists with available amount $5,000
- Test PDF file "invoice_valid.pdf" (2 MB) is ready

**Test Steps:**
1. Navigate to "Submit Invoice" page
2. Select Purchase Order: "PO-2026-001"
3. Enter Invoice Number: "INV-TEST-001"
4. Enter Invoice Date: [current date]
5. Enter Invoice Amount: $4,500
6. Upload file: "invoice_valid.pdf"
7. Enter Description: "Services for May 2026"
8. Click "Submit Invoice"
9. Verify submission confirmation
10. Check invoice appears in vendor's invoice history with status "Pending"

**Test Data:**
```
PO Number: PO-2026-001
Invoice Number: INV-TEST-001
Invoice Amount: $4,500 (within PO limit of $5,000)
File: invoice_valid.pdf (2 MB — within limit)
Description: Services for May 2026
```

**Expected Result:**
- Invoice submitted successfully
- Confirmation message: "Invoice INV-TEST-001 submitted successfully. Status: Pending Review."
- Invoice appears in vendor's submission history
- AP team sees the invoice in their pending queue
- Notification email sent to AP team
- Submission timestamp and user recorded in audit log

**Status:** NOT EXECUTED

---

### TC-011 — Invoice Amount Exceeds PO Value

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC-011 |
| **Test Scenario** | TS-03-03 |
| **Requirement** | REQ-02 |
| **Title** | Invoice submission blocked when amount exceeds PO value |
| **Priority** | P1 |
| **Severity (if fail)** | CRITICAL |

**Preconditions:**
- Open PO "PO-2026-002" with total value of $3,000
- No previous invoices against this PO

**Test Steps:**
1. Log in as vendor
2. Navigate to Submit Invoice
3. Select PO: "PO-2026-002"
4. Enter Invoice Amount: $3,500 (exceeds PO by $500)
5. Fill remaining fields with valid data
6. Click Submit

**Expected Result:**
- Warning or error message displayed: "Invoice amount ($3,500) exceeds the available PO balance ($3,000)."
- Submission blocked until amount is corrected
- No invoice record created in database
- PO balance remains unchanged

**Status:** NOT EXECUTED

---

### TC-012 — Duplicate Invoice Number Detection

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC-012 |
| **Test Scenario** | TS-03-09, TS-03-17 |
| **Requirement** | REQ-02 |
| **Title** | System blocks duplicate invoice number from same vendor |
| **Priority** | P1 |
| **Severity (if fail)** | CRITICAL |

**Preconditions:**
- Invoice "INV-TEST-001" already submitted by this vendor

**Test Steps:**
1. Log in as the same vendor
2. Navigate to Submit Invoice
3. Enter Invoice Number: "INV-TEST-001" (already used)
4. Fill remaining fields with valid data
5. Click Submit

**Expected Result:**
- Error displayed: "Invoice number INV-TEST-001 already exists. Please use a unique invoice number."
- Submission rejected
- No duplicate invoice record created

**Status:** NOT EXECUTED

---

### TC-013 — File Upload Size Boundary Testing

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC-013 |
| **Test Scenario** | TS-03-07 |
| **Requirement** | REQ-02 |
| **Title** | File upload boundary value analysis — at, below, and above max size |
| **Priority** | P1 |
| **Severity (if fail)** | HIGH |

**Preconditions:**
- Max file upload size is 10 MB (assumed — clarify with client)
- Files prepared: 9.9 MB, 10 MB, 10.1 MB

**Test Steps (3 sub-tests):**

**Sub-test A (Below limit):**
1. Upload file: 9.9 MB PDF
2. Submit form with valid data
3. Expected: SUCCESS — file accepted

**Sub-test B (At limit):**
1. Upload file: 10.0 MB PDF
2. Submit form with valid data
3. Expected: SUCCESS — file accepted (boundary value included)

**Sub-test C (Above limit):**
1. Upload file: 10.1 MB PDF
2. Attempt to upload
3. Expected: ERROR — "File exceeds the maximum allowed size of 10 MB. Please compress or split the file."

**Expected Result:**
- A: Upload succeeds
- B: Upload succeeds
- C: Upload rejected with clear message

**Status:** NOT EXECUTED

---

### TC-014 — Unsupported File Format Upload

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC-014 |
| **Test Scenario** | TS-03-08 |
| **Requirement** | REQ-02 |
| **Title** | System rejects unsupported file format |
| **Priority** | P1 |
| **Severity (if fail)** | HIGH |

**Test Steps:**
1. Attempt to upload: "malware_test.exe" renamed to "invoice.exe"
2. Attempt to upload: "invoice.html"
3. Attempt to upload: "invoice.bat"

**Expected Result:**
- All three files rejected immediately on selection or on submit
- Error: "Unsupported file type. Accepted formats: PDF, Excel (.xlsx), JPEG, PNG."
- No file stored on server
- No executable content processed

**Status:** NOT EXECUTED

---

### TC-015 — Concurrent Invoice Submission (Race Condition)

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC-015 |
| **Test Scenario** | TS-03-16 |
| **Requirement** | REQ-02 |
| **Title** | Prevent double-submission via concurrent clicks |
| **Priority** | P1 |
| **Severity (if fail)** | CRITICAL |

**Test Steps:**
1. Fill complete invoice form
2. Rapidly double-click "Submit Invoice" button
3. Alternatively, use a script to send two identical POST requests simultaneously

**Expected Result:**
- Only one invoice record created
- Submit button disabled after first click
- Second request rejected: HTTP 409 Conflict or idempotency handled
- No duplicate invoices in database

**Status:** NOT EXECUTED

---

## Module: AP Approval Workflow

---

### TC-020 — AP Approves Invoice (Happy Path)

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC-020 |
| **Test Scenario** | TS-04-02 |
| **Requirement** | REQ-03 |
| **Title** | AP user approves a pending invoice |
| **Priority** | P1 |
| **Severity (if fail)** | CRITICAL |

**Preconditions:**
- AP user is logged in
- Invoice "INV-TEST-001" exists with status "Pending Review"

**Test Steps:**
1. Log in as AP user
2. Navigate to Pending Invoices dashboard
3. Locate invoice "INV-TEST-001"
4. Click to open invoice details
5. Review invoice details and attached file
6. Click "Approve" button
7. Confirm approval in confirmation dialog

**Expected Result:**
- Invoice status changes to "Approved"
- Audit log entry: "Invoice INV-TEST-001 approved by [AP User] at [timestamp]"
- Vendor receives email notification of approval
- Invoice forwarded to payment processing system
- Invoice no longer appears in AP pending queue

**Status:** NOT EXECUTED

---

### TC-021 — AP Rejects Invoice with Reason

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC-021 |
| **Test Scenario** | TS-04-03 |
| **Requirement** | REQ-03 |
| **Title** | AP user rejects invoice and provides rejection reason |
| **Priority** | P1 |
| **Severity (if fail)** | HIGH |

**Test Steps:**
1. Log in as AP user
2. Navigate to Pending Invoices
3. Open invoice "INV-TEST-002"
4. Click "Reject"
5. Enter rejection reason: "Invoice amount does not match PO #PO-2026-002. Please resubmit with correct amount."
6. Confirm rejection

**Expected Result:**
- Invoice status changes to "Rejected"
- Rejection reason stored with invoice record
- Vendor receives email with rejection reason
- Audit log records rejection with reason and user
- Invoice accessible for vendor to view rejection details

**Status:** NOT EXECUTED

---

### TC-022 — Concurrent Approval Race Condition

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC-022 |
| **Test Scenario** | TS-04-05 |
| **Requirement** | REQ-03 |
| **Title** | Only one approval processed when two APs approve simultaneously |
| **Priority** | P1 |
| **Severity (if fail)** | CRITICAL |

**Preconditions:**
- Invoice "INV-TEST-003" with status "Pending"
- Two AP user accounts: "ap.user1@company.com", "ap.user2@company.com"

**Test Steps:**
1. Log in as AP User 1 in Browser A, open invoice INV-TEST-003
2. Log in as AP User 2 in Browser B, open same invoice INV-TEST-003
3. Both click "Approve" within the same second

**Expected Result:**
- Only one approval is processed
- Second approval request returns error: "This invoice has already been approved."
- Invoice status = Approved (not duplicated)
- Only one payment forwarding event triggered
- Audit log shows both attempt records

**Status:** NOT EXECUTED

---

### TC-023 — Unauthorized Vendor Attempts AP Approval

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC-023 |
| **Test Scenario** | TS-04-09, TS-08-01 |
| **Requirement** | REQ-03, REQ-07 |
| **Title** | Vendor cannot access AP approval functionality |
| **Priority** | P1 |
| **Severity (if fail)** | CRITICAL |

**Test Steps:**
1. Log in as vendor account
2. Attempt to navigate directly to: `/ap/invoices/INV-TEST-001/approve`
3. Attempt HTTP GET: `/ap/invoices/pending`
4. Attempt HTTP POST to approval API with vendor's auth token

**Expected Result:**
- All direct URL access: 302 redirect to login or 403 Forbidden
- All API calls: HTTP 403 with message "Access denied"
- No AP data returned to vendor session
- Attempt logged in security audit log

**Status:** NOT EXECUTED

---

## Module: Email Notifications

---

### TC-040 — Vendor Notified on Invoice Approval

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC-040 |
| **Test Scenario** | TS-06-03 |
| **Requirement** | REQ-05 |
| **Title** | Vendor receives email when invoice is approved |
| **Priority** | P1 |
| **Severity (if fail)** | HIGH |

**Preconditions:**
- Invoice "INV-TEST-001" approved by AP in TC-020

**Test Steps:**
1. Check vendor's email inbox (vendor.test@acmesupplies.com) after AP approval
2. Verify email is received within defined SLA (e.g., 2 minutes)
3. Open email and verify content

**Expected Result:**
- Email received within 2 minutes of approval
- Subject: "Your invoice INV-TEST-001 has been approved"
- Email contains: Invoice number, amount, approval date, link to portal
- Email does NOT contain: password, bank account details, full invoice file
- Link in email points to legitimate domain (not external)

**Status:** NOT EXECUTED

---

### TC-041 — Notification for Invalid Email Address

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC-041 |
| **Test Scenario** | TS-06-07 |
| **Requirement** | REQ-05 |
| **Title** | System handles email delivery failure gracefully |
| **Priority** | P1 |
| **Severity (if fail)** | HIGH |

**Preconditions:**
- Vendor account registered with invalid/unreachable email

**Test Steps:**
1. Register vendor with email: "invalid@nonexistentdomain12345.com"
2. Submit invoice
3. Trigger approval to send notification
4. Monitor system behavior

**Expected Result:**
- System attempts email delivery
- Bounce/failure detected
- Delivery failure logged in system
- Notification status shows "Delivery Failed" in audit/dashboard
- System does NOT crash
- AP/admin alerted to delivery failure (or vendor can re-request)

**Status:** NOT EXECUTED

---

## Module: Reports

---

### TC-060 — Monthly Report Generation

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC-060 |
| **Test Scenario** | TS-07-01 |
| **Requirement** | REQ-06 |
| **Title** | AP admin successfully generates monthly invoice activity report |
| **Priority** | P1 |
| **Severity (if fail)** | HIGH |

**Preconditions:**
- AP admin logged in
- Multiple invoices in various states exist for current month

**Test Steps:**
1. Log in as AP admin
2. Navigate to Reports section
3. Select "Monthly Report" for [current month]
4. Click "Generate Report"
5. Download/view generated report

**Expected Result:**
- Report generated successfully
- Report contains: Invoice count, total amounts (submitted/approved/rejected), vendor breakdown
- Data is accurate (verify against known invoice data)
- Report available in PDF and/or Excel
- Download completes without error

**Status:** NOT EXECUTED

---

### TC-061 — Vendor Cannot View Other Vendor's Report Data

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC-061 |
| **Test Scenario** | TS-07-04 |
| **Requirement** | REQ-06, REQ-07 |
| **Title** | Vendor report shows only their own invoice data |
| **Priority** | P1 |
| **Severity (if fail)** | CRITICAL |

**Test Steps:**
1. Ensure Vendor A and Vendor B both have invoices in the system
2. Log in as Vendor A
3. Navigate to Reports
4. Download monthly report
5. Inspect report for any data from Vendor B

**Expected Result:**
- Report contains ONLY Vendor A's invoices
- No reference to Vendor B's invoice numbers, amounts, or POs
- Attempting to access Vendor B's report via URL returns 403

**Status:** NOT EXECUTED

---

## Module: Authorization / RBAC

---

### TC-065 — SQL Injection in Invoice Form

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC-065 |
| **Test Scenario** | TS-09-01 |
| **Requirement** | REQ-07 |
| **Title** | SQL injection attempt via invoice form fields is rejected |
| **Priority** | P1 |
| **Severity (if fail)** | CRITICAL |

**Test Steps:**
1. Log in as vendor
2. Open invoice submission form
3. In Invoice Number field, enter: `' OR '1'='1`
4. In Description field, enter: `'; DROP TABLE invoices; --`
5. In PO Number field, enter: `1 UNION SELECT * FROM users --`
6. Submit form

**Expected Result:**
- Inputs treated as literal strings, not SQL commands
- No database errors or unexpected behavior
- Form either validates and processes safely OR shows validation error
- No data loss or table deletion
- Error message does NOT expose SQL syntax or stack trace

**Status:** NOT EXECUTED

---

### TC-066 — XSS in Vendor Name Field

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC-066 |
| **Test Scenario** | TS-09-02 |
| **Requirement** | REQ-07 |
| **Title** | XSS attempt via vendor name is sanitized |
| **Priority** | P1 |
| **Severity (if fail)** | CRITICAL |

**Test Steps:**
1. Register new vendor with name: `<script>alert('XSS')</script>`
2. Submit registration
3. Log in as AP user and view vendor list

**Expected Result:**
- Script tag NOT executed in any browser
- Vendor name displayed as literal text: `<script>alert('XSS')</script>` (escaped)
- OR registration rejected with validation error: "Invalid characters in company name"
- No JavaScript executed

**Status:** NOT EXECUTED

---

### TC-067 — IDOR via Invoice ID Manipulation

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC-067 |
| **Test Scenario** | TS-09-07 |
| **Requirement** | REQ-07 |
| **Title** | Vendor cannot access another vendor's invoice by manipulating ID |
| **Priority** | P1 |
| **Severity (if fail)** | CRITICAL |

**Preconditions:**
- Vendor A has invoice ID 1001
- Vendor B is logged in and has invoice ID 1002

**Test Steps:**
1. Log in as Vendor B
2. Navigate to Vendor B's own invoice: `/invoices/1002`
3. Manually change URL to `/invoices/1001` (Vendor A's invoice)
4. Observe response

**Expected Result:**
- HTTP 403 Forbidden OR HTTP 404 Not Found
- Vendor A's invoice data is NOT displayed to Vendor B
- Attempt logged in security audit log

**Status:** NOT EXECUTED

---

## Module: Performance

---

### TC-070 — Invoice List Page Load Time

| Field | Detail |
|-------|--------|
| **Test Case ID** | TC-070 |
| **Test Scenario** | TS-10-01 |
| **Requirement** | Non-functional |
| **Title** | Invoice list loads within 2 seconds with 1000+ records |
| **Priority** | P1 |
| **Severity (if fail)** | HIGH |

**Test Steps:**
1. Seed database with 1000 invoices for test vendor
2. Log in as vendor
3. Navigate to Invoice History page
4. Measure page load time using browser DevTools or JMeter

**Expected Result:**
- Page loads in under 2 seconds
- All 1000 records either loaded or paginated correctly
- No timeout errors

**Status:** NOT EXECUTED

---

## Test Execution Summary Template

| Metric | Count |
|--------|-------|
| Total Test Cases | [Fill after execution] |
| Executed | |
| Passed | |
| Failed | |
| Blocked | |
| Not Executed | |
| Pass Rate | |
| Defects Found | |

---

## Test Case ID Reference

| Range | Module |
|-------|--------|
| TC-001 to TC-009 | Vendor Registration |
| TC-010 to TC-019 | Invoice Submission |
| TC-020 to TC-029 | AP Approval Workflow |
| TC-030 to TC-039 | Payment Forwarding |
| TC-040 to TC-049 | Email Notifications |
| TC-050 to TC-059 | Authorization / RBAC |
| TC-060 to TC-064 | Reports |
| TC-065 to TC-069 | Security Testing |
| TC-070 to TC-079 | Performance |
| TC-080 to TC-089 | Integration |
| TC-090 to TC-099 | Deployment Verification |

---

**Related Documents:**
- [Test Scenarios](test-scenarios.md)
- [RTM](../rtm.md)
- [Test Data](../test-data.md)
- [Bug Report Template](../bug-report-template.md)
