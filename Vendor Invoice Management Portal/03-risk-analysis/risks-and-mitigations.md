# Risk Analysis & Mitigation Strategy

**Project:** Vendor Invoice Management Portal  
**Document:** Risks & Hidden Threats  
**Prepared By:** QA Team  
**Phase:** Requirements Analysis (Phase 1)

---

## Executive Summary

Beyond the stated requirements, this B2B invoice system poses several hidden risks that could impact operations, compliance, and user trust if not addressed proactively during QA.

This document identifies 15+ risks and mitigation strategies.

---

## 🔴 CRITICAL RISKS

### 1. **Financial Data Loss During Invoice Submission**

**Risk:** Vendor submits large invoice file. Network failure occurs mid-upload. Vendor unaware if submission succeeded. Re-submits → duplicate invoices created → duplicate payments.

**Impact:** 
- Financial loss (duplicate payments)
- AP team confusion
- Vendor frustration
- Audit trail complexity

**Test Cases to Create:**
- Upload large file, simulate network timeout mid-upload
- Verify: Upload resumption or clear failure message
- Verify: Duplicate prevention mechanism

**Mitigation:**
- Implement file upload checksum validation
- Show upload progress indicator
- Retry mechanism with duplicate detection
- Idempotent submission (same submission = same result)

---

### 2. **Authorization Bypass via Direct API Calls**

**Risk:** Vendor X discovers the invoice approval API endpoint. Crafts HTTP request to approve their own invoice. System trusts the request (bug in authorization).

**Impact:**
- Bypass AP approval workflow
- Fraudulent invoice payments
- Compliance violation
- Internal controls failure

**Test Cases to Create:**
- Vendor attempts to call `/api/invoices/{id}/approve`
- Verify: Request rejected (403 Forbidden)
- Verify: Audit log records attempt
- Verify: Only AP role can approve

**Mitigation:**
- Strict role-based access control (RBAC) on every endpoint
- API authentication + authorization
- Audit all authorization decisions
- Penetration testing of APIs

---

### 3. **Email Notification Phishing / Interception**

**Risk:** AP team gets invoice approval email. Email contains direct link to approve invoice. Hacker intercepts email, changes link to phishing site. AP team logs in to fake portal → credentials stolen.

**Impact:**
- Compromised AP credentials
- Further system compromise
- Vendor trust loss
- Security breach

**Test Cases to Create:**
- Verify email content (no sensitive data in body)
- Verify links in email go to legitimate domain
- Verify email is over SMTP/TLS
- Verify unsubscribe/preference options exist

**Mitigation:**
- Email should NOT contain clickable approval links
- Email directs user to portal, user logs in fresh
- DMARC/SPF/DKIM setup
- Email security scanning

---

### 4. **Concurrent Approval Race Condition**

**Risk:** Two AP users both see the same pending invoice. Both click "Approve" within 1 second. System processes both approvals. Invoice gets forwarded to payment twice → duplicate payment.

**Impact:**
- Duplicate payments
- Financial loss
- Reconciliation nightmare

**Test Cases to Create:**
- Two concurrent requests to approve same invoice
- Verify: Only one succeeds, other returns error
- Verify: Audit log shows both attempts
- Verify: Invoice status updated atomically

**Mitigation:**
- Database transaction with optimistic locking
- Prevent double-click: Button disable after click
- Idempotent approval operations
- Distributed locking (if multi-instance system)

---

### 5. **PO Amount Exceeded - Silent Failure**

**Risk:** Invoice amount ($15,000) exceeds PO amount ($10,000) by 50%. System accepts it silently. AP approves. Invoice goes to payment → overpayment to vendor. No warning, no block, no audit trail of the amount mismatch.

**Impact:**
- Financial loss (overpayment)
- Vendor gets unearned amount
- Compliance: 3-way match failure (PO ≠ Invoice ≠ Goods)
- Detection only in reconciliation (days later)

**Test Cases to Create:**
- Invoice amount > PO amount
  - Test 1%: Should warn (minor variance acceptable)
  - Test 10%: Should block (require AP override)
  - Test 50%: Should block + escalate
- Verify: User sees clear warning/error message
- Verify: Block reason logged
- Verify: AP can override with documented reason

**Mitigation:**
- Implement 3-way matching: PO ≠ Invoice ≠ Goods Receipt
- Define tolerance thresholds (1%, 5%, 10%)
- Clear UI warning for discrepancies
- Escalation workflow for variances
- Audit trail of overrides

---

## 🟠 HIGH RISKS

### 6. **Session Fixation Attack**

**Risk:** Vendor logs in from home. Session cookie issued. Hacker crafts URL with hardcoded session ID. Sends vendor fake invoice amount ($100k). If vendor's browser accepts the session ID, hacker could intercept.

**Mitigation:**
- Regenerate session ID after login
- Mark session for HTTPS only
- Add HttpOnly flag to prevent JavaScript access
- Implement CSRF token for state-changing operations
- Short session timeout (30 min)

---

### 7. **SQL Injection via Vendor Name / PO Number**

**Risk:** Vendor submits invoice against PO name: `'; DROP TABLE invoices; --`. If backend concatenates this into SQL query without parameterization, entire invoice table deleted.

**Impact:** Data loss, system unavailability, compliance breach

**Test Cases to Create:**
- Vendor submits PO with SQL injection payload
- Verify: Payload treated as literal string, not SQL
- Verify: No data loss
- Verify: Error message is user-friendly (no SQL error)

**Mitigation:**
- Parameterized SQL queries (prepared statements)
- Input validation & sanitization
- Security testing (OWASP Top 10)

---

### 8. **Missing Audit Trail for Financial Transactions**

**Risk:** Invoice approved, forwarded to payment. Later, audit questions: Who approved? When? Why? If no audit log exists, compliance team has no proof of approval. Regulatory failure.

**Mitigation:**
- Log all state changes: Submit → Approve → Payment
- Capture: User ID, timestamp, IP, action, before/after state
- Immutable audit log (database append-only)
- Regular audit log review

---

### 9. **Vendor Data Exposure via Report Download**

**Risk:** Monthly report generated includes all invoice details (vendor names, amounts, POs). Report stored in unencrypted folder. Admin credentials compromised → hacker downloads all reports → knows all vendor spend patterns.

**Impact:** Vendor confidentiality breach, competitive disadvantage, compliance (GDPR, data privacy)

**Mitigation:**
- Encrypt reports at rest
- Encrypt reports in transit (HTTPS)
- Role-based access (vendors see own data only)
- Data masking for sensitive fields in shared reports
- DLP (Data Loss Prevention) tool to detect downloads

---

### 10. **No Rollback Plan for Approved Invoices**

**Risk:** Invoice approved, sent to payment gateway. 2 hours later, vendor calls: "That invoice was a duplicate, please cancel." But invoice is already in payment system. No cancellation workflow. AP team stuck.

**Impact:** Manual intervention required, customer dissatisfaction, possible overpayment

**Mitigation:**
- Implement invoice recall/cancellation workflow (within time window)
- Payment gateway integration: Can we recall submitted invoices?
- Document SLA: Invoices can be recalled up to 24 hours post-approval
- User communication of recall deadline

---

## 🟡 MEDIUM RISKS

### 11. **Notification Delivery Failure - Silent Handoff**

**Risk:** Invoice approved. System attempts to send email to vendor. Email fails (invalid vendor email, mail server down). System silently continues. Vendor never knows invoice was approved. Vendor doesn't invoice follow-up → late payment, cash flow issue.

**Mitigation:**
- Email delivery verification (bounce detection)
- Retry logic with exponential backoff
- Fallback notification (SMS, in-app notification)
- Dashboard showing "Notification Status"
- Vendor can re-request notifications from portal

---

### 12. **Report Generation Timeout on Large Data**

**Risk:** End of month. 50,000 invoices in system. Report generation query runs for 30 minutes, times out. No data returned. User sees error: "Something went wrong." AP team can't close month.

**Mitigation:**
- Query optimization & indexing
- Pagination: Generate report in batches
- Background job (async): Generate report, email link when ready
- Timeout alerts & logging
- Test performance at scale (load testing)

---

### 13. **Lack of Vendor Deactivation Handling**

**Risk:** Vendor goes out of business. Admin deactivates vendor account. But pending invoices still in workflow. Approval email sent to deleted vendor. New user with same email gets accidentally added. Compliance confusion.

**Mitigation:**
- Clear deactivation workflow: Handle pending invoices
- Mark invoices as "Vendor Inactive"
- Block new submissions from inactive vendor
- Preserve audit trail (soft delete, not hard delete)
- Data retention policy for deactivated vendor records

---

### 14. **Accessibility Issues - AP Users with Disability**

**Risk:** Report download button has no alt text. AP user with screen reader cannot find button. Cannot access reports, excluded from workflow. Compliance (ADA, WCAG).

**Mitigation:**
- WCAG 2.1 AA compliance
- Keyboard navigation for all features
- Screen reader testing
- Color contrast ratios (4.5:1 for normal text)
- Semantic HTML structure

---

### 15. **Missing Disaster Recovery / Business Continuity**

**Risk:** Production database crashes. No backup. Months of invoices lost. Legal/audit requirement: prove all invoices processed. Can't recover. Compliance disaster.

**Mitigation:**
- Regular automated backups (hourly/daily)
- Backup verification & restore testing
- RTO/RPO defined (Recovery Time/Point Objectives)
- DR plan documented & tested
- Database replication to secondary site

---

## 🟢 LOW RISKS

### 16. **UI Usability Issues (First-Time User)**

**Risk:** Vendor logs in first time. Invoice submission form is confusing. Which field is "PO Number"? Where do I attach the file? Vendor gives up. Calls support. High support load.

**Mitigation:**
- Usability testing with real vendors
- Clear labels, tooltips, help text
- Field validation: Clear error messages ("PO Number not found")
- Guided workflow: Step-by-step wizard if complex
- Video tutorial for invoice submission

---

### 17. **Third-Party Email Service Dependency**

**Risk:** System uses SendGrid for emails. SendGrid API rate limit hit. All pending notifications queued. Delayed notifications. Late delivery can cause workflow delays.

**Mitigation:**
- Email queue with retry mechanism
- Monitor API usage & alerts
- SLA agreement with email provider
- Test email delivery under load
- Fallback email provider if possible

---

## 📊 Risk Summary Table

| # | Risk | Severity | Probability | Impact | Mitigation |
|----|------|----------|-------------|--------|-----------|
| 1 | Data loss in upload | 🔴 CRITICAL | High | $$ Loss | Checksum, idempotency |
| 2 | Auth bypass | 🔴 CRITICAL | Medium | $$$ + Compliance | RBAC audit, pen testing |
| 3 | Email phishing | 🔴 CRITICAL | High | Credentials, fraud | Email security, TLS |
| 4 | Concurrent approval race | 🔴 CRITICAL | Medium | $$ Duplicate payment | Atomic transactions, locking |
| 5 | PO overrun silent | 🔴 CRITICAL | High | $$ Overpayment | 3-way match, thresholds |
| 6 | Session fixation | 🟠 HIGH | Low | Credential theft | Regenerate ID, HTTPS |
| 7 | SQL injection | 🟠 HIGH | Medium | Data loss | Parameterized queries |
| 8 | Missing audit trail | 🟠 HIGH | High | Compliance fail | Log all changes |
| 9 | Data exposure | 🟠 HIGH | Medium | Privacy breach | Encryption, RBAC |
| 10 | No rollback | 🟠 HIGH | Medium | Customer dissatisfaction | Recall workflow |
| 11-17 | Various Medium/Low | 🟡🟢 | Low-Med | Minor operational | See mitigations |

---

## 🧪 QA Test Coverage for Risks

- **Phase 3 (Test Design):** Map each risk to test scenario
- **Phase 5 (Functional Testing):** Execute test cases
- **Phase 6 (Non-Functional Testing):** Security, performance, usability
- **Regression Testing:** Verify fixes don't introduce new risks

---

## Escalation Path

| Risk Level | Owner | Action | Timeline |
|-----------|-------|--------|----------|
| CRITICAL | Tech Lead + PM | Immediate meeting, plan fix | Before sign-off |
| HIGH | QA Lead | Document, prioritize for sprint | Sprint planning |
| MEDIUM | Dev Team | Backlog, address if capacity | Next sprint |
| LOW | Product Owner | Nice to have, track for future | Roadmap |

---

**This document is LIVING - Update as risks are identified and mitigated.**

**Review Schedule:** Weekly during active development  
**Last Updated:** [Date]  
**Owner:** QA Team
