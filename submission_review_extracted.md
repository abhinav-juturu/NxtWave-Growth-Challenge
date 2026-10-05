# Submission_Review.docx

Review of Your Submission Package

NxtWave Growth Intern Challenge – recommended changes

Caveat: Only the five markdown files were reviewed, not the asset's code (index.html, app.js). Everything said about the asset comes from your own descriptions.

Overall: The core thinking is strong. You did the math to kill paid ads, picked a specific persona, and built something beyond a landing page. The problems are mostly execution gaps, inconsistencies and claims you can't back up. Some of these would hurt you in front of an evaluator.

Must Fix (Blockers)

1. The asset isn't live

The brief asks for a live link, prototype or demo. Right now it's localhost:8085, and the video demos localhost. Deploy it to Netlify, Vercel or GitHub Pages and use that URL everywhere.

2. Nothing is actually tracked

From your description it's front-end only, so the referral links, the leaderboard (CBIT, PSG Tech, etc.) and the ticket IDs are simulated. Either:

Connect the form to Google Sheets (Apps Script) or n8n so registrations, referral counts and the leaderboard are real. This is the single biggest upgrade, since you claim "referral tracking" on Day 1.

Or label everything clearly as "demo data."

3. The video is too long

Your script is roughly 750–800 words, which is about 5 minutes at normal pace, and you also need time for the demo clicks. A 3-minute video is about 400–450 words. Cut it hard, speak naturally instead of reading word for word, and replace [Your Name] and the LaTeX arrows ($\rightarrow$) that would be read aloud.

4. The plan isn't in the required format

The brief says max 5 slides or 2 pages. Your "5 slides" are long text walls in markdown. Make a real deck or 2-page PDF with one idea per slide and a visual funnel. Also remove the file:///d:/... and C:/Users/HP/... links, because reviewers can't open them.

5. Your numbers don't reconcile

6. Remove or verify unsupported claims

"Recruiter-tested" ATS bullets: nobody tested them.

"WEF Technology Pioneer 2024, NSDC Partner": verify with a source, or remove it. Getting facts about the company wrong is costly.

"90% of AI job openings…" and "5x higher intent": invented stats. Remove them or mark them as assumptions.

"Final 60 seats remaining": fake scarcity is misleading unless the capacity is real. Make it real or drop it.

Should Fix

7. Outdated dates

The copy says "2025–2026 placements," but it's now October 2026, so current final-years are the Class of 2027. Update the headlines unless you target a different batch.

8. Gaps in the plan

How do you get 12–15 reps in one day? This is the core assumption and it has no sourcing plan (club leads, LinkedIn DMs, NIAT students).

No measurement. Your framework says "Measure → Learn," but there's no UTM link per rep, no daily checkpoints, and no "if we're behind on Day 3, do X" rule. Growth roles care about this.

Day 1 shows 30 registrations before any outreach. Where do they come from?

₹100 for 25 registrations is a weak incentive. Consider tiered payouts (e.g. ₹30 / ₹60 / ₹100).

Referral fraud. Cash prizes invite fake sign-ups, so basic dedupe and verification belongs in the core build, not in "24 more hours."

Unbudgeted promises. The "Top 50 Interview Questions Pack" and "1:1 code review" must actually exist. Generate the pack with AI, and either drop the code review or say who delivers it.

Data consent. Add one line about consent for collecting phones and emails.

9. AI notes may not look authentic

The prompts read as written after the fact, and the rejections are generic ("PyTorch from scratch"). Use real chat screenshots or links, show at least one back-and-forth where you pushed back, and include one case where AI got something technically wrong. Only claim what really happened.

10. The "24 hours" answer is too broad

You list three projects (WhatsApp bot, fraud validation, auto-evaluator) that would take far more than a day. Pick one or two and say why. That shows judgment.

Nice to Have

One genuinely AI-powered feature. Right now the customizer sounds like hardcoded content. A free-text "tell me your branch and interest → get a personalized project idea" feature is more convincing for an AI workshop. Keep API keys server-side.

College vs college leaderboard instead of only individuals, since peer pride drives sharing.

Use NxtWave's existing audience (current students, community) as a zero-cost Day 1 channel.

Suggested Order of Work

Deploy and wire up a Google Sheet backend.

Reconcile the numbers into one source of truth.

Build the real 5-slide deck.

Rewrite the notes with real chat evidence.

Cut and record the video.

### Table

| Item | Conflict |
| Channel split vs funnel | Channels say 275 + 175 + 50. Funnel says 370 direct + 130 viral. |
| Campus reps | 12 (budget), 12–15 (channel), 15 (Day 2) |
| Show-up rate | 45% (plan) vs 40% (reflections) |
| Reward rules | Budget covers only top 2 vouchers (₹800), but the milestone says everyone with 5 referrals gets ₹500. If 20 people qualify, that's ₹10,000. |
| Track name | "GenAI Software Engineer" vs "GenAI Code Reviewer" (and a "RAG Engine" screenshot label) |
| Funnel rates | 22% CTR and 40% CVR are optimistic for WhatsApp links. Show conservative, base and optimistic scenarios. |

