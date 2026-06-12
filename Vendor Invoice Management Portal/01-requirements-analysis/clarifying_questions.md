# Requirement Analysis: Clarifying Questions

## Document Purpose
This document identifies ambiguous requirements from the client specifications and poses critical clarifying questions before development begins.

**Phase:** Requirements Analysis (Phase 1 of QA Lifecycle)  
**Status:** To be completed by client  
**Importance:** HIGH - Prevents costly rework and misalignment

---

## 📌 Requirement 1: Vendor Registration & Login

**Stated Requirement:**
> "Vendors can register and log in to the portal"

### Ambiguities & Questions:

1. **Registration Process**
   - Is self-registration allowed, or must an admin create vendor accounts?
   - What vendor information is required: Name, Tax ID, Email, PO account number?
   - Is there a verification step (e.g., email verification)?
   - Can a vendor register multiple users under one account?

2. **Authentication & Security**
   - Is single sign-on (SSO) required, or basic username/password?
   - Password policy: Length, complexity, expiry requirements?
   - Will 2FA (two-factor authentication) be required?
   - Session timeout duration? (e.g., 30 mins, 1 hour, 8 hours)

3. **Account Management**
   - Can vendors change their password? Forgot password flow?
   - What happens to an inactive account after 90/180 days?
   - Can vendors have multiple concurrent sessions?
   - How are deactivated vendors handled?

---

## 📌 Requirement 2: Invoice Submission Against POs

**Stated Requirement:**
> "Vendors can submit invoices against purchase orders"

### Ambiguities & Questions:

1. **PO Linkage**
   - How does the vendor know which POs they can invoice against? (API, dropdown list, search?)
   - Can one invoice be split against multiple POs?
   - What if a PO has already been fully invoiced? Can they re-invoice?

2. **File Upload & Format**
   - What file formats accepted? (PDF, Excel, Images, XML?)
   - Max file size? (1 MB, 10 MB, 50 MB?)
   - One file per invoice or multiple files allowed?
   - Is OCR (Optical Character Recognition) required for scanned invoices?

3. **Invoice Data**
   - Is invoice number mandatory, unique, or auto-generated?
   - Can vendors edit invoice details after submission but before AP approval?
   - What happens if PO amount is exceeded by invoice amount?
   - Currency support - single currency or multi-currency?

4. **Duplicate Prevention**
   - Can the same invoice be submitted twice? System validation needed?
   - Timestamp of submission - for audit trail?

---

## 📌 Requirement 3: AP Team Approval/Rejection Workflow

**Stated Requirement:**
> "The AP team can view, approve, or reject invoices"

### Ambiguities & Questions:

1. **Approval Process**
   - Is approval mandatory or optional?
   - Can multiple AP users approve the same invoice (sequential, parallel)?
   - What's the approval deadline/SLA? (e.g., 5 days, 10 days?)
   - Can AP approve in batches or only one at a time?

2. **Rejection Flow**
   - When rejected, can the vendor see why? (Rejection reason/comments required?)
   - Can vendors re-submit after rejection?
   - Limit on re-submissions? (e.g., max 3 times?)

3. **Amendment/Correction**
   - Can AP request amendments without full rejection?
   - Can AP modify invoice amounts, or must they reject?

---

## 📌 Requirement 4: Approved Invoices Forward to Payment Processing

**Stated Requirement:**
> "Approved invoices are forwarded for payment processing"

### Ambiguities & Questions:

1. **Integration**
   - Is there a manual handoff to the payment system, or is it automated?
   - What's the timing - immediate or batched (e.g., end of day)?
   - What data goes to the payment system? (Invoice amount, vendor bank details, PO reference?)

2. **Error Handling**
   - What happens if the payment system is down?
   - If payment processing fails, does it roll back to "approved" state?
   - Should vendors/AP be notified of payment failure?

---

## 📌 Requirement 5: Email Notifications on Status Changes

**Stated Requirement:**
> "Both parties receive email notifications on status changes"

### Ambiguities & Questions:

1. **What are "Status Changes"?**
   - Invoice submitted → AP
   - Invoice approved → Vendor
   - Invoice rejected → Vendor
   - Invoice sent to payment → Both?
   - Any others?

2. **Notification Content**
   - Should email include invoice details or just a link to portal?
   - What if vendor's email is invalid - fallback mechanism?
   - Can users configure notification preferences (on/off, frequency)?

3. **Notifications Timing**
   - Real-time or batched (e.g., daily digest)?
   - Any retry logic if email delivery fails?

---

## 📌 Requirement 6: Monthly Invoice Activity Reports

**Stated Requirement:**
> "The system generates monthly invoice activity reports"

### Ambiguities & Questions:

1. **Report Scope**
   - Who can generate reports? (AP only, Vendors, Admin?)
   - What data in the report? (Count, amounts, approval rate, rejection rate?)
   - Per vendor or company-wide?

2. **Report Format**
   - PDF, Excel, or both?
   - Auto-generated monthly or on-demand?
   - Emailed automatically or download from portal?

3. **Date Range & Accuracy**
   - Calendar month or rolling 30 days?
   - What timezone for month calculation?

---

## 📌 Requirement 7: Authorization & Access Control

**Stated Requirement:**
> "Only authorized users may access the system"

### Ambiguities & Questions:

1. **User Roles**
   - What roles exist? (Admin, AP User, Vendor User, Finance Manager?)
   - What can each role do? (Define permissions matrix)

2. **Access Levels**
   - Can an AP user see invoices from multiple vendors or just their assigned ones?
   - Can vendors see other vendors' invoices?
   - Can admins see everything?

3. **Permission Management**
   - How are roles assigned? (By admin, self-service, request-based?)
   - Access review/recertification cycle?

---

## ⚠️ Cross-Functional Ambiguities

1. **Data Retention**
   - How long are invoices retained? (1 year, 3 years, 7 years?)
   - Can records be deleted or only archived?

2. **Audit Trail**
   - All actions logged? (Login, file upload, approval, rejection?)
   - Who can access audit logs?

3. **Error Handling & Edge Cases**
   - What if a vendor tries to invoice for $0?
   - What if invoice amount exceeds PO by 1%? 10%? 50%?
   - Concurrent submissions from same vendor - allowed or blocked?

4. **Compliance & Legal**
   - Any regulatory requirements? (SOX, GDPR, local tax?)
   - Data encryption in transit and at rest?
   - Vendor data privacy - any PII considerations?

---

## 📊 Ambiguity Summary

| Requirement | Ambiguity Level | Priority |
|-------------|-----------------|----------|
| Registration & Login | 🔴 HIGH | Critical |
| Invoice Submission | 🔴 HIGH | Critical |
| AP Approval | 🟠 MEDIUM | High |
| Payment Forwarding | 🟠 MEDIUM | High |
| Notifications | 🟠 MEDIUM | High |
| Reports | 🟡 LOW | Medium |
| Authorization | 🔴 HIGH | Critical |

---

## 📝 Next Steps

1. **Submit these questions to the client**
2. **Document responses** (update this file with answers)
3. **Clarified requirements feed into Test Planning (Phase 2)**
4. **Use clarifications for test case design**

---

**Document Owner:** QA Team  
**Last Updated:** [Date]  
**Status:** Awaiting Client Response
