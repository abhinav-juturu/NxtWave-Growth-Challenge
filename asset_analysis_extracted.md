# Asset_Analysis.docx

Analysis of Your Asset

index.html, app.js, styles.css – NxtWave Growth Challenge

Summary: The asset is well structured and visually polished, with 4 tracks, a diagnostic quiz, an admit pass and a referral hub. It also has responsive CSS (11 media queries) and a mobile sticky bar. But it is a front-end demo with no backend, and several things in it are fake or risky.

Note: This is based on reading the code only. The page was not run in a browser.

Critical Issues

1. Nothing is saved or sent

handleRegistration builds a registeredUser object in memory and never sends it anywhere. If someone registers and refreshes, the registration is gone. For a registration campaign, zero registrations would actually be captured.

Fix: POST the form to a Google Apps Script / Sheets endpoint (or n8n webhook, Supabase, Formspree).

2. The referral system is fake

The referral link https://nxtwave.ai/workshop?ref=... is a made-up domain. It's not yours, and the page never reads ?ref= from the URL.

The "Referral Code" field is collected but never validated or counted.

Ticket IDs are Math.random(), so they can collide and aren't stored.

"Simulate +1 Friend Joined" is a demo button and must not appear on a real page. Its alerts claim "Access details sent to your registered email" when nothing is sent.

3. The leaderboard is fabricated

Sneha Reddy (42), Karthik Raja (36), etc. look like real people with real colleges and prize amounts. Showing invented named students with vouchers as if real is misleading, and a reviewer may read it as dishonest. Replace it with a clearly labelled "Sample data" or compute it from your Sheet. The ranks (#12, #07, #04) are also hard-coded, not real.

4. Fake scarcity and urgency

"67 / 500 Seats Left" is hard-coded and randomly ticks down by timer.

"Final Registration Window Closing" has no real deadline.

A 500-seat cap would also contradict your goal of getting 500 sign-ups.

Make the counter real (count rows in your Sheet) or remove it.

5. Unverified company claims on the page

"NSDC Partner," "WEF Technology Pioneer 2024," "T-Hub Startup of the Year," and "Certified by NxtWave CCBP 4.0 Skilling" are asserted as fact. Verify each against NxtWave's own site, or delete.

The founders' names and credentials are written as fact. Same rule: verify before publishing.

The trust bar says "alumni hired across 2,000+ top technology companies" with Amazon, Microsoft, Deloitte etc. This implies endorsement. Remove unless sourced.

"Over 82% of technical recruiter filters… reject standard CRUD templates" is an invented statistic. Remove it.

Invented metrics in the resume bullets: "94% hallucination reduction," "34% response rate," "88% branch coverage," "<15ms latency." Students are told to copy these, so they would put false metrics on their resumes. This is a real ethical problem. Rewrite the bullets with placeholders like [X]%, or tell students to replace numbers with their own measured results.

The page promises OpenAI/Claude API credits, a hosting sandbox, 1:1 mentorship, a verified certificate and a GitHub repo invite. None of these are in your ₹2,000 budget. Cut them or state who provides them.

Product and Content Issues

6. The workshop promise doesn't match 60 minutes

Pinecone, LangGraph, MediaPipe + Whisper, and a GitHub webhook bot are not realistic first projects for beginners in 60 minutes. The page promises "production-grade," "100-page," "60 FPS." For Tier-2/3 students this can feel intimidating, which contradicts your own insight. Simplify each track to one beginner-friendly build (e.g. a PDF chatbot with Streamlit).

7. Wrong dates

The page says "2025–2026 Placement Sprint" and "2026 AI Screening Filters," and the form offers graduation years 2025 / 2026 / 2027 with 2026 pre-selected. It's October 2026, so current final-years are mostly Class of 2027. Fix the default and the headline.

8. The diagnostic quiz is loose

The result card shows a default "Score: 1/9" text before use, and the scoring is nearly always favourable to the pitch (even top scorers are told to join). The label onclick pattern also means the radio inputs aren't driving state, so keyboard users can't use it.

9. Text mismatches

Track names differ between the tab ("Track 4: GenAI DevTools"), the data ("GenAI Software Engineering"), the trackLabels map ("GenAI Code Reviewer") and the video script. The pass says "Google Calendar Invite Synced" and shows a QR code, but both are decoration: the QR is a static SVG icon and no calendar invite exists.

Technical and Quality Issues

10. Security and robustness

renderTrackSpec uses innerHTML with internal data. Safe today, but avoid the pattern if content ever becomes dynamic.

copyReferralLink uses alert(), and navigator.clipboard fails on non-HTTPS pages with no error handling.

No duplicate detection, no email/phone dedupe, no rate limit. Cash prizes plus no validation invite fake sign-ups.

The email field says "Institutional" but accepts any email, so there is no .edu.in / .ac.in check even though your plan claims one.

Consent: there is no privacy or consent text for collecting phone numbers (India's DPDP Act expects clear notice).

11. Dependencies and performance

unpkg.com/lucide@latest is an unpinned CDN dependency. A breaking release or outage will take icons down. Pin a version. Fonts and confetti also load from CDNs, so add fallbacks.

12. Accessibility

Only form inputs have focus styles. Add :focus-visible on buttons and tabs, role="tab" and aria-selected on the track tabs, labels tied to radio inputs, and a prefers-reduced-motion rule for the confetti and animations.

13. Branding risk

The page uses the NxtWave name, logo mark and "Official Partner" language. The footer says "Created for Growth Intern Strategy Challenge," but the top bar and registration area read as official. Add a clear "Concept prototype for the NxtWave Growth Challenge" banner so it can't be mistaken for an official page.

What's Good (Keep)

Clear value-first flow: quiz → track preview → register → pass → share.

Per-track customizer with copy-to-clipboard is a nice utility.

Responsive layout and a sticky mobile CTA.

Pre-filled WhatsApp share message is well written.

Good code organisation (data object separate from rendering).

Updated Fix List (Priority Order)

Wire the form to Google Sheets: capture every registration with name, email, phone, college, year, track, referral code and timestamp. Reject duplicates.

Real referral tracking: read ?ref= from the URL, store it, and use real counts for the leaderboard and milestone bar. Remove the "Simulate +1" button.

Deploy it (Netlify/Vercel/GitHub Pages) and use that real URL in the share link instead of nxtwave.ai.

Remove fake social proof: the leaderboard names, the seat counter, the unverified accreditations and the invented statistics.

Fix the resume bullets to use placeholders instead of fake metrics.

Simplify the tracks to beginner-appropriate builds for 60 minutes.

Update the year (Class of 2027, 2026–27 placement season).

Add a consent line, a "concept prototype" banner and basic accessibility fixes.

Optional upgrade: a real AI feature (free-text "tell me your branch → get a project idea") using a server-side API key.

Fixing the two backend items plus the fake-claims cleanup would change the evaluation most. Right now an evaluator who opens the DevTools network tab sees nothing being sent.

