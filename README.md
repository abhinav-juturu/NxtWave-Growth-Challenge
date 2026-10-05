# NxtWave Growth Intern Challenge — Complete Submission Package

> **Applicant Track:** Growth Intern – AI, Experiments & Community (NxtWave / NIAT)  
> **Candidate:** Abhinav Juturu  
> **Campaign Goal:** 500 Verified Engineering Student Registrations in 7 Days  
> **Target Cohort:** Class of 2027 (Final-Year B.Tech / B.E. Students)  
> **Workshop Concept:** *"Build Your First AI Project in 60 Minutes"*  
> **Budget:** ₹2,000 | **Timeline:** 7 Days | **Channel Blended CAC:** ₹4.00  
> **Official Submission Form:** [Google Form Link](https://forms.gle/xEtJSgJfeqvnxv8q6)  

---

## 📁 Repository Structure & Deliverables

| Deliverable | File / Directory | Description |
| :--- | :--- | :--- |
| **Complete Dossier** | [`NXTWAVE_GROWTH_CHALLENGE_COMPLETE_SUBMISSION.md`](./NXTWAVE_GROWTH_CHALLENGE_COMPLETE_SUBMISSION.md) | Master all-in-one submission document |
| **Deliverable 1** | [`1_GROWTH_PLAN_SUBMISSION.md`](./1_GROWTH_PLAN_SUBMISSION.md) | 5-Slide Growth Strategy, Channels, Timeline & Funnel Math |
| **Deliverable 2** | [`interactive_growth_asset/`](./interactive_growth_asset/) | Working web asset (Diagnostic, Customizer, Admit Pass & Viral Referral Hub) |
| **Deliverable 3** | [`2_AI_LEARNING_NOTES.md`](./2_AI_LEARNING_NOTES.md) | 3 Detailed AI Collaboration Case Studies (Prompt vs Output vs Human Pivot) |
| **Deliverable 4** | [`3_THREE_MINUTE_VIDEO_SCRIPT.md`](./3_THREE_MINUTE_VIDEO_SCRIPT.md) | Exact word-for-word timed video walkthrough script (~420 words) |
| **Deliverable 5** | [`4_STRATEGIC_REFLECTIONS.md`](./4_STRATEGIC_REFLECTIONS.md) | Post-mortem reflections, pivots, and rejected AI proposals |

---

## 🚀 Live Working Asset (`interactive_growth_asset/`)

Rather than a static registration page, we engineered a high-converting **AI Project Studio & Verified Admit Pass Hub**:

1. **Portfolio Diagnostic Tool:** 3-question placement check assessing whether a student's resume projects stand out to recruiters.
2. **60-Minute Career Track Customizer:** 4 practical tracks (*Streamlit Document QA, AI Job Matcher, Focus Telemetry, Code Reviewer*) with build architectures and honest ATS resume templates with measurement placeholders.
3. **Verified Digital Admit Pass:** Generates a personalized student badge with dynamic Ticket ID, college branding, and calendar instructions.
4. **Transparent Peer Referral Hub:** URL parameter tracking (`?ref=TICKET_ID`), 1-click WhatsApp sharing, client-side deduplication, and a live benchmark ambassador leaderboard.

### Running the Asset Locally:
```bash
cd interactive_growth_asset
python -m http.server 8085
```
Then open your browser at `http://localhost:8085`.

---

## 📊 Core Campaign Funnel & Budget Allocation

* **Total Budget:** ₹2,000
  * **₹1,200** $\rightarrow$ 12 Campus Representatives (CRs) across Tier-2/3 colleges (Tiered: ₹50 for 15 regs, ₹100 for 25+).
  * **₹800** $\rightarrow$ Top 2 Student Referrer Prize Pool (1st: ₹500 Amazon Voucher, 2nd: ₹300 Voucher).
* **Blended CAC:** $\frac{₹2,000}{500} = \mathbf{₹4.00}$ per verified registration.
* **Viral Coefficient ($k$):** $0.33$ (125 organic peer registrations unlocked via the referral loop).

---

## 🛠️ Tech Stack & Design System
* **Frontend:** Vanilla HTML5, Modern CSS3 (Enterprise Light Theme, Inter + Plus Jakarta Sans fonts, CSS custom properties, WCAG-compliant contrast), Pure JavaScript (zero heavy dependencies).
* **Tracking:** Query parameter attribution (`?ref=`), localStorage deduplication, responsive on desktop and mobile.
